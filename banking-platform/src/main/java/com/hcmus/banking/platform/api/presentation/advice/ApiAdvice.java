package com.hcmus.banking.platform.api.presentation.advice;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hcmus.banking.platform.api.application.partner.PartnerUseCaseService;
import com.hcmus.banking.platform.config.security.RSACryptography;
import com.hcmus.banking.platform.core.application.user.PasswordService;
import com.hcmus.banking.platform.domain.exception.UnauthorizedException;
import com.hcmus.banking.platform.domain.partner.Partner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.crypto.NoSuchPaddingException;
import java.security.NoSuchAlgorithmException;
import java.security.PublicKey;
import java.security.spec.InvalidKeySpecException;
import java.time.Instant;
import java.util.Map;

@RestControllerAdvice(basePackages = "com.hcmus.banking.platform.api.presentation")
public class ApiAdvice {
    private final static String X_API_KEY = "x-api-key";
    private final static String X_TIME_CODE = "x-time-code";
    private final static String HASH_STRING = "hash";
    private final static String SIGNATURE = "sign";
    private final static String CONTENT = "content";

    @Autowired
    PartnerUseCaseService partnerUseCaseService;

    @Autowired
    PasswordService passwordService;

    @Autowired
    RSACryptography rsaCryptography;

    @ModelAttribute("partner")
    Partner validateApiKey(@RequestHeader Map<String,String> headers, @RequestBody Map<String,Object> bodies) throws SecurityException {
        Partner partner =  getPartner(headers, bodies);

        return partner;
    }

    private Partner getPartner(Map<String, String> headers, Map<String,Object> bodies) {
        ObjectMapper objectMapper = new ObjectMapper();
        String xApiKey = headers.get(X_API_KEY);
        String xTimeCode = headers.get(X_TIME_CODE);
        String hashString = bodies.get(HASH_STRING).toString();
        String signature = bodies.get(SIGNATURE).toString();
        String content = bodies.get(CONTENT).toString();
        try {
            content = objectMapper.writeValueAsString(bodies.get(CONTENT));
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

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

        try {
            PublicKey publicKey = rsaCryptography.getPublicKey(partner.getPublicKey());

            if (!rsaCryptography.verify(content, signature, publicKey)){
                throw new UnauthorizedException();
            }
        } catch (NoSuchAlgorithmException e) {
            throw new UnauthorizedException();
        } catch (NoSuchPaddingException e) {
            throw new UnauthorizedException();
        } catch (InvalidKeySpecException e) {
            throw new UnauthorizedException();
        } catch (Exception e) {
            throw new UnauthorizedException();
        }


        return partner;
    }
}
