package com.hcmus.banking.platform.api.presentation.advice;

import lombok.Data;

@Data
public class ResponseWrapper {
    private Object data;
    private String sign;
}
