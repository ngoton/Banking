package com.hcmus.banking.platform.api.presentation.advice;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hcmus.banking.platform.api.application.partner.PartnerUseCaseService;
import com.hcmus.banking.platform.config.security.PGPCryptography;
import com.hcmus.banking.platform.config.security.RSACryptography;
import com.hcmus.banking.platform.core.application.user.PasswordService;
import com.hcmus.banking.platform.domain.exception.BankingServiceException;
import com.hcmus.banking.platform.domain.exception.UnauthorizedException;
import com.hcmus.banking.platform.domain.partner.Encryption;
import com.hcmus.banking.platform.domain.partner.Partner;
import org.bouncycastle.openpgp.PGPPublicKey;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
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

@RestControllerAdvice(basePackages = "com.hcmus.banking.platform.api.presentation.secure")
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

    @Autowired
    PGPCryptography pgpCryptography;

    @ModelAttribute
    public void validateApiKey(@RequestHeader Map<String,String> headers, @RequestBody Map<String,Object> bodies, Model model) throws SecurityException {
        ObjectMapper objectMapper = new ObjectMapper();
        String xApiKey = headers.get(X_API_KEY);
        String xTimeCode = headers.get(X_TIME_CODE);

        if(StringUtils.isEmpty(xApiKey) || StringUtils.isEmpty(xTimeCode)) {
            throw new UnauthorizedException();
        }

        if(bodies.get(HASH_STRING) == null || bodies.get(SIGNATURE) == null || bodies.get(CONTENT) == null) {
            throw new BankingServiceException("Body request is missing");
        }

        String hashString = bodies.get(HASH_STRING).toString();
        String signature = bodies.get(SIGNATURE).toString();
        String content = bodies.get(CONTENT).toString();

        Partner partner = getPartner(xApiKey);

        Instant instant = Instant.now();
        Long timeStampMillis = instant.toEpochMilli();
        if (Long.valueOf(xTimeCode) < timeStampMillis){
            throw new BankingServiceException("The request is expired");
        }

        if (!passwordService.isMatchPassword(String.format("%s%s", xApiKey, xTimeCode), hashString)){
            throw new BankingServiceException("Password not matched");
        }

        try {
            content = objectMapper.writeValueAsString(bodies.get(CONTENT));
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        try {
            Encryption encryption = partner.getEncryption();
            if(encryption.isRSA()){
                PublicKey publicKey = rsaCryptography.getPublicKey(partner.getPublicKey());
                if (!rsaCryptography.verify(content, signature, publicKey)){
                    throw new BankingServiceException("Signature cannot verified");
                }
            }
            else if (encryption.isPGP()){
                PGPPublicKey publicKey = pgpCryptography.getPublicKey(partner.getPublicKey());
                if (!pgpCryptography.verify(content, signature, publicKey)){
                    throw new BankingServiceException("Signature cannot verified");
                }
            }
            else {
                throw new BankingServiceException("Signature is required");
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