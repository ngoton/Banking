package com.hcmus.banking.platform.core.infrastructure.datasource.merchant.HCMUS.RSA;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hcmus.banking.platform.config.security.RSACryptography;
import com.hcmus.banking.platform.core.application.user.PasswordService;
import com.hcmus.banking.platform.core.infrastructure.datasource.merchant.MerchantClient;
import com.hcmus.banking.platform.core.infrastructure.datasource.merchant.MerchantCriteria;
import com.hcmus.banking.platform.domain.merchant.MerchantAccount;
import com.hcmus.banking.platform.domain.merchant.MerchantDeposit;
import com.hcmus.banking.platform.domain.merchant.MerchantTransfer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Primary;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.security.PrivateKey;

@Primary
@Component("RSAClient")
public class RSAClient implements MerchantClient {
    private static final Long validity = 10000L;
    @Autowired
    PasswordService passwordService;
    @Autowired
    RSACryptography rsaCryptography;

    @Value("${merchant.rsa.account}")
    private String accountUrl;
    @Value("${merchant.rsa.transaction}")
    private String transactionUrl;
    @Value("${merchant.rsa.secret-key}")
    private String secretKey;
    @Value("${merchant.rsa.client-id}")
    private String clientId;
    @Value("${merchant.rsa.token}")
    private String token;

    @Override
    public MerchantAccount findAccount(MerchantCriteria merchantCriteria) {
        ObjectMapper objectMapper = new ObjectMapper();

        AccountContentRequest accountContentRequest = new AccountContentRequest(validity, merchantCriteria.getAccount());
        AccountHashRequest accountHashRequest = new AccountHashRequest(secretKey, accountContentRequest.getValidity(), accountContentRequest.getAccId());
        String hash = "";
        try {
            hash = passwordService.encode(objectMapper.writeValueAsString(accountHashRequest));
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        AccountRequest accountRequest = new AccountRequest(hash, accountContentRequest);

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(token);

        HttpEntity<AccountRequest> request = new HttpEntity<>(accountRequest, headers);

        try{
            ResponseEntity<AccountResponse> response = restTemplate.postForEntity(accountUrl, request, AccountResponse.class);

            if (response.getStatusCode() == HttpStatus.OK){
                return new MerchantAccount(String.format("%s %s", response.getBody().getFirstName(), response.getBody().getLastName()));
            }
        } catch (Exception e){
            e.printStackTrace();
        }
        return MerchantAccount.ofEmpty();
    }

    @Override
    public MerchantTransfer transfer(MerchantCriteria merchantCriteria) {
        ResponseEntity<TransactionResponse> response = transaction(merchantCriteria, "WITHDRAW");
        if (response.getStatusCode() == HttpStatus.OK){
            return new MerchantTransfer("Success");
        }
        return MerchantTransfer.ofEmpty();
    }

    @Override
    public MerchantDeposit deposit(MerchantCriteria merchantCriteria) {
        ResponseEntity<TransactionResponse> response = transaction(merchantCriteria, "DEPOSIT");
        if (response.getStatusCode() == HttpStatus.OK){
            return new MerchantDeposit("Success");
        }
        return MerchantDeposit.ofEmpty();
    }

    private ResponseEntity<TransactionResponse> transaction(MerchantCriteria merchantCriteria, String transType) {
        try {
            PrivateKey privateKey = rsaCryptography.getPrivateKey();
            ObjectMapper objectMapper = new ObjectMapper();

            String feeType = merchantCriteria.getFee() ? "SENDER" : "RECEIVER";
            TransactionContentRequest transactionContentRequest = new TransactionContentRequest(validity, merchantCriteria.getAccount(), transType, feeType, Double.valueOf(0), merchantCriteria.getMoney().abs().doubleValue(), merchantCriteria.getContent());
            TransactionHashRequest transactionHashRequest = new TransactionHashRequest(secretKey, transactionContentRequest);
            String hash = "";
            try {
                hash = passwordService.encode(objectMapper.writeValueAsString(transactionHashRequest));
            } catch (JsonProcessingException e) {
                e.printStackTrace();
            }
            String signature = rsaCryptography.sign(objectMapper.writeValueAsString(transactionContentRequest), privateKey);

            TransactionRequest transactionRequest = new TransactionRequest(hash, transactionContentRequest, signature);

            RestTemplate restTemplate = new RestTemplate();

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(token);

            HttpEntity<TransactionRequest> request = new HttpEntity<>(transactionRequest, headers);


            ResponseEntity<TransactionResponse> response = restTemplate.postForEntity(transactionUrl, request, TransactionResponse.class);
            return response;
        }catch (Exception e){

        }

        return new ResponseEntity(TransactionResponse.class, HttpStatus.BAD_REQUEST);
    }
}
