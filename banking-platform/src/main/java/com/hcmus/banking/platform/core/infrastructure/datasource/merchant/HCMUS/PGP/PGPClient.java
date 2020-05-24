package com.hcmus.banking.platform.core.infrastructure.datasource.merchant.HCMUS.PGP;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hcmus.banking.platform.config.security.PGPCryptography;
import com.hcmus.banking.platform.config.security.RSACryptography;
import com.hcmus.banking.platform.core.application.user.PasswordService;
import com.hcmus.banking.platform.core.infrastructure.datasource.merchant.MerchantClient;
import com.hcmus.banking.platform.core.infrastructure.datasource.merchant.MerchantCriteria;
import com.hcmus.banking.platform.domain.merchant.MerchantAccount;
import com.hcmus.banking.platform.domain.merchant.MerchantDeposit;
import com.hcmus.banking.platform.domain.merchant.MerchantTransfer;
import org.bouncycastle.openpgp.PGPSecretKey;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.security.PrivateKey;
import java.time.ZonedDateTime;

@Component("PGPClient")
public class PGPClient implements MerchantClient {
    private static final Integer EXPIRED_TIME = 5;
    @Autowired
    PasswordService passwordService;
    @Autowired
    RSACryptography rsaCryptography;
    @Autowired
    PGPCryptography pgpCryptography;

    @Value("${merchant.pgp.secret-key}")
    String secretKey;
    @Value("${merchant.pgp.account}")
    String accountURL;
    @Value("${merchant.pgp.transaction}")
    String transactionURL;

    @Override
    public MerchantAccount findAccount(MerchantCriteria merchantCriteria) {
        Long timeStamp = ZonedDateTime.now().plusMinutes(EXPIRED_TIME).toInstant().toEpochMilli();
        AccountRequest accountRequest = new AccountRequest(
                merchantCriteria.getAccount(),
                timeStamp,
                merchantCriteria.getPartner().getApiKey(),
                passwordService.encode(
                        String.format("%s%s%s%s",
                                merchantCriteria.getAccount(),
                                merchantCriteria.getPartner().getApiKey(),
                                timeStamp,
                                secretKey)
                )
        );

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<AccountRequest> request = new HttpEntity<>(accountRequest, headers);
        String url = String.format("%s%s", merchantCriteria.getPartner().getBaseUrl(), accountURL);

        try{
            ResponseEntity<AccountResponse> response = restTemplate.postForEntity(url, request, AccountResponse.class);

            if (response.getStatusCode() == HttpStatus.OK){
                return new MerchantAccount(response.getBody().getAccount().getFullName());
            }
        } catch (Exception e){
            e.printStackTrace();
        }
        return MerchantAccount.ofEmpty();
    }

    @Override
    public MerchantTransfer transfer(MerchantCriteria merchantCriteria) {
        ResponseEntity<String> response = transaction(merchantCriteria);
        if (response.getStatusCode() == HttpStatus.OK){
            return new MerchantTransfer("Success");
        }
        return MerchantTransfer.ofEmpty();
    }

    @Override
    public MerchantDeposit deposit(MerchantCriteria merchantCriteria) {
        ResponseEntity<String> response = transaction(merchantCriteria);
        if (response.getStatusCode() == HttpStatus.OK){
            return new MerchantDeposit("Success");
        }
        return MerchantDeposit.ofEmpty();
    }

    private ResponseEntity<String> transaction(MerchantCriteria merchantCriteria) {
        ResponseEntity<String> response = new ResponseEntity<>("", HttpStatus.BAD_REQUEST);
        try {
            PGPSecretKey privateKey = pgpCryptography.getPrivateKey();
            ObjectMapper objectMapper = new ObjectMapper();
            String signature = pgpCryptography.sign(objectMapper.writeValueAsString(merchantCriteria), privateKey);
            Long timeStamp = ZonedDateTime.now().plusMinutes(EXPIRED_TIME).toInstant().toEpochMilli();
            TransactionRequest transactionRequest = new TransactionRequest(
                    merchantCriteria.getAccount(),
                    timeStamp,
                    merchantCriteria.getPartner().getApiKey(),
                    passwordService.encode(
                            String.format("%s%s%s%s",
                                    merchantCriteria.getAccount(),
                                    merchantCriteria.getPartner().getApiKey(),
                                    timeStamp,
                                    secretKey)
                    ),
                    merchantCriteria.getInternalAccount(),
                    merchantCriteria.getMoney(),
                    signature
            );

            RestTemplate restTemplate = new RestTemplate();

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<TransactionRequest> request = new HttpEntity<>(transactionRequest, headers);

            String url = String.format("%s%s", merchantCriteria.getPartner().getBaseUrl(), transactionURL);
            response = restTemplate.postForEntity(url, request, String.class);
        }catch (Exception e){

        }

        return response;
    }
}
