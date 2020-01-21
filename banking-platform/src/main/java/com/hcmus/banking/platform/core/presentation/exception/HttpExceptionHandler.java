package com.hcmus.banking.platform.core.presentation.exception;

import com.hcmus.banking.platform.domain.exception.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RestControllerAdvice(basePackages = "com.hcmus.banking.platform")
@Slf4j
public class HttpExceptionHandler {
    @ExceptionHandler(NotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public void onNotFoundException(HttpServletResponse response) throws IOException {
        response.sendError(HttpStatus.NOT_FOUND.value());
    }

    @ExceptionHandler(UnauthorizedException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public void onUnauthorizedException(HttpServletResponse response) throws IOException {
        response.sendError(HttpStatus.UNAUTHORIZED.value());
    }

    @ExceptionHandler(ForbiddenException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public void onForbiddenException(HttpServletResponse response) throws IOException {
        response.sendError(HttpStatus.FORBIDDEN.value());
    }

    @ExceptionHandler(UnavailableException.class)
    @ResponseStatus(HttpStatus.SERVICE_UNAVAILABLE)
    public void onUnavailableException(HttpServletResponse response) throws IOException {
        response.sendError(HttpStatus.SERVICE_UNAVAILABLE.value());
    }

    @ExceptionHandler(BankingServiceException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public void onAgentServiceException(HttpServletResponse response) throws IOException {
        response.sendError(HttpStatus.BAD_REQUEST.value());
    }

    @ExceptionHandler(ServerErrorException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public void onServerErrorException(HttpServletResponse response, ServerErrorException ex) throws IOException{
        response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), ex.getMessage());
    }
}
