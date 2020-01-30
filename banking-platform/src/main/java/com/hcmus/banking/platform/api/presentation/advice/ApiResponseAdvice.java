package com.hcmus.banking.platform.api.presentation.advice;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hcmus.banking.platform.config.security.RSACryptography;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.MethodParameter;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice;

import javax.crypto.NoSuchPaddingException;
import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.security.PrivateKey;
import java.security.spec.InvalidKeySpecException;

@RestControllerAdvice(basePackages = "com.hcmus.banking.platform.api.presentation")
public class ApiResponseAdvice implements ResponseBodyAdvice<Object> {
    @Autowired
    RSACryptography rsaCryptography;

    @Override
    public boolean supports(MethodParameter returnType, Class converterType) {
        return converterType.equals(MappingJackson2HttpMessageConverter.class);
    }

    @Override
    public Object beforeBodyWrite(Object body, MethodParameter returnType, MediaType selectedContentType, Class selectedConverterType, ServerHttpRequest request, ServerHttpResponse response) {
        ResponseWrapper wrapper = new ResponseWrapper();
        wrapper.setData(body);
        try {
            PrivateKey privateKey = rsaCryptography.getPrivateKey();
            ObjectMapper objectMapper = new ObjectMapper();
            String signature = rsaCryptography.sign(objectMapper.writeValueAsString(body), privateKey);
            wrapper.setSign(signature);
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        } catch (NoSuchPaddingException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (InvalidKeySpecException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return wrapper;
    }
}
