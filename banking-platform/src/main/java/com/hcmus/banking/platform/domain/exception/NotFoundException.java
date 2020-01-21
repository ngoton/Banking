package com.hcmus.banking.platform.domain.exception;

import org.hibernate.service.spi.ServiceException;

public class NotFoundException extends ServiceException {
    public NotFoundException(){
        super("Not found");
    }
}
