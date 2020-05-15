package com.hcmus.banking.platform.api.presentation.advice;

import com.hcmus.banking.platform.api.application.partner.PartnerUseCaseService;
import com.hcmus.banking.platform.core.application.user.PasswordService;
import com.hcmus.banking.platform.domain.exception.BankingServiceException;
import com.hcmus.banking.platform.domain.exception.UnauthorizedException;
import com.hcmus.banking.platform.domain.partner.Partner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.Instant;
import java.util.Map;

@RestControllerAdvice(basePackages = "com.hcmus.banking.platform.api.presentation.insecure")
public class InSecureApiAdvice {
    private final static String X_API_KEY = "x-api-key";
    private final static String X_TIME_CODE = "x-time-code";
    private final static String HASH_STRING = "hash";
    private final static String CONTENT = "content";

    @Autowired
    PartnerUseCaseService partnerUseCaseService;

    @Autowired
    PasswordService passwordService;

    @ModelAttribute
    public void validateApiKey(@RequestHeader Map<String,String> headers, @RequestBody Map<String,Object> bodies, Model model) throws SecurityException {
        String xApiKey = headers.get(X_API_KEY);
        String xTimeCode = headers.get(X_TIME_CODE);

        if(StringUtils.isEmpty(xApiKey) || StringUtils.isEmpty(xTimeCode)) {
            throw new UnauthorizedException();
        }

        if(bodies.get(HASH_STRING) == null || bodies.get(CONTENT) == null) {
            throw new BankingServiceException("Body request is missing");
        }

        String hashString = bodies.get(HASH_STRING).toString();

        Partner partner = getPartner(xApiKey);

        Instant instant = Instant.now();
        Long timeStampMillis = instant.toEpochMilli();
        if (Long.valueOf(xTimeCode) < timeStampMillis){
            throw new BankingServiceException("The request is expired");
        }

        if (!passwordService.isMatchPassword(String.format("%s%s", xApiKey, xTimeCode), hashString)){
            throw new BankingServiceException("Password not matched");
        }

        model.addAttribute("request", bodies);
        model.addAttribute("partner", partner);
    }


    Partner getPartner(String partnerCode) throws SecurityException {
        Partner partner = partnerUseCaseService.findByKey(partnerCode);
        if (partner.isEmpty()) {
            throw new BankingServiceException("Partner not found");
        }
        return partner;
    }

}