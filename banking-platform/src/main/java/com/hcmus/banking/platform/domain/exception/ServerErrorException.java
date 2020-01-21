package com.hcmus.banking.platform.domain.exception;

import org.hibernate.service.spi.ServiceException;

public class ServerErrorException extends ServiceException {
    public ServerErrorException(){
        super("Server error");
    }
}
