package com.hcmus.banking.platform.domain.exception;

import org.hibernate.service.spi.ServiceException;

public class ForbiddenException extends ServiceException {
    public ForbiddenException(){
        super("Forbidden");
    }
}
