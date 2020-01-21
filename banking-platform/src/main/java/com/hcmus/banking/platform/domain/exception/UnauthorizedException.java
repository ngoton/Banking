package com.hcmus.banking.platform.domain.exception;

import org.hibernate.service.spi.ServiceException;

public class UnauthorizedException extends ServiceException {
    public UnauthorizedException(){
        super("Unauthorized");
    }
}
