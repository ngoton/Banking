package com.hcmus.banking.platform.api.presentation.advice;

import com.hcmus.banking.platform.api.application.partner.PartnerUseCaseService;
import com.hcmus.banking.platform.core.application.user.PasswordService;
import com.hcmus.banking.platform.domain.exception.UnauthorizedException;
import com.hcmus.banking.platform.domain.partner.Partner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.Instant;
import java.util.Map;

@RestControllerAdvice(basePackages = "com.hcmus.banking.platform.api.presentation")
public class ApiAdvice {
    private final static String X_API_KEY = "x-api-key";
    private final static String X_TIME_CODE = "x-time-code";
    private final static String HASH_STRING = "hash";

    @Autowired
    PartnerUseCaseService partnerUseCaseService;

    @Autowired
    PasswordService passwordService;

    @ModelAttribute("partner")
    Partner validateApiKey(@RequestHeader Map<String,String> headers, @RequestBody Map<String,String> bodies) throws SecurityException {
        Partner partner =  getPartner(headers, bodies);

        return partner;
    }

    private Partner getPartner(Map<String, String> headers, Map<String,String> bodies) {
        String xApiKey = headers.get(X_API_KEY);
        String xTimeCode = headers.get(X_TIME_CODE);
        String hashString = bodies.get(HASH_STRING);

        if(StringUtils.isEmpty(xApiKey) || StringUtils.isEmpty(xTimeCode)) {
            throw new UnauthorizedException();
        }

        Partner partner = partnerUseCaseService.findByKey(xApiKey);
        if (partner.isEmpty()) {
            throw new UnauthorizedException();
        }

        Instant instant = Instant.now();
        Long timeStampMillis = instant.toEpochMilli();
        if (Long.valueOf(xTimeCode) < timeStampMillis){
            throw new UnauthorizedException();
        }

        if (!passwordService.isMatchPassword(String.format("%s%s", xApiKey, xTimeCode), hashString)){
            throw new UnauthorizedException();
        }


        return partner;
    }
}
