package com.hcmus.banking.platform.domain.exception;

import org.hibernate.service.spi.ServiceException;

public class UnavailableException extends ServiceException {
    public UnavailableException(){
        super("Unavailable");
    }
}
