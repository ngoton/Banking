package com.hcmus.banking.platform.core.infrastructure.datasource.merchant.HCMUS.RSA;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hcmus.banking.platform.core.application.user.PasswordService;
import com.hcmus.banking.platform.core.infrastructure.datasource.merchant.MerchantClient;
import com.hcmus.banking.platform.core.infrastructure.datasource.merchant.MerchantCriteria;
import com.hcmus.banking.platform.domain.merchant.MerchantAccount;
import com.hcmus.banking.platform.domain.merchant.MerchantDeposit;
import com.hcmus.banking.platform.domain.merchant.MerchantTransfer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Primary;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.Objects;

@Primary
@Component("RSAClient")
public class RSAClient implements MerchantClient {
    @Autowired
    PasswordService passwordService;

    RestTemplate restTemplate = new RestTemplate();
    HttpHeaders headers = new HttpHeaders();
    ObjectMapper objectMapper;

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
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(token);

        AccountContentRequest accountContentRequest = new AccountContentRequest(Long.valueOf(10000), merchantCriteria.getAccount());
        AccountHashRequest accountHashRequest = new AccountHashRequest(secretKey, accountContentRequest.getValidity(), accountContentRequest.getAccId());
        String hash = "";
        try {
            hash = passwordService.encode(objectMapper.writeValueAsString(accountHashRequest));
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        AccountRequest accountRequest = new AccountRequest(hash, accountContentRequest);

        AccountResponse accountResponse = restTemplate.postForObject(accountUrl, accountRequest, AccountResponse.class);
        if (Objects.isNull(accountResponse)){
            return MerchantAccount.ofEmpty();
        }
        return new MerchantAccount(String.format("%s %s", accountResponse.getFirstName(), accountResponse.getLastName()));
    }

    @Override
    public MerchantTransfer transfer(MerchantCriteria merchantCriteria) {
        return null;
    }

    @Override
    public MerchantDeposit deposit(MerchantCriteria merchantCriteria) {
        return null;
    }
}
