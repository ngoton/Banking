package com.hcmus.banking.platform.api.presentation.advice;

import com.hcmus.banking.platform.api.application.partner.PartnerUseCaseService;
import com.hcmus.banking.platform.domain.exception.UnauthorizedException;
import com.hcmus.banking.platform.domain.partner.Partner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

@RestControllerAdvice(basePackages = "com.hcmus.banking.platform.api.presentation")
public class ApiAdvice {
    private final static String X_API_KEY = "x-api-key";
    private final static String X_PARTNER_CODE = "x-partner-code";

    @Autowired
    PartnerUseCaseService partnerUseCaseService;

    @ModelAttribute("partner")
    Partner validateApiKey(@RequestHeader Map<String,String> headers) throws SecurityException {
        Long partnerId = getPartnerId(headers);

        Partner partner =  partnerUseCaseService.findById(partnerId);
        if (!partner.sameCode(headers.get(X_PARTNER_CODE))) {
            throw new UnauthorizedException();
        }

        return partner;
    }

    private Long getPartnerId(Map<String, String> headers) {
        String xApiKey = headers.get(X_API_KEY);
        String xPartnerCode = headers.get(X_PARTNER_CODE);

        if(StringUtils.isEmpty(xApiKey) || StringUtils.isEmpty(xPartnerCode)) {
            throw new UnauthorizedException();
        }

        Partner partner = partnerUseCaseService.findByKey(xApiKey);
        if (partner.isEmpty()) {
            throw new UnauthorizedException();
        }

        return partner.getId();
    }
}
