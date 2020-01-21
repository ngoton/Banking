package com.hcmus.banking.platform.domain.exception;

import org.hibernate.service.spi.ServiceException;

public class BankingServiceException extends ServiceException {
    public BankingServiceException(){
        super("Banking service error");
    }
}
