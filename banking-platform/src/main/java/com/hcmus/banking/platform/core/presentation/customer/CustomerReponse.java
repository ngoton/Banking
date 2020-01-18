package com.hcmus.banking.platform.core.presentation.customer;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.hcmus.banking.platform.domain.customer.Customer;

import java.time.LocalDateTime;
import java.util.Date;

public class CustomerReponse {
    public String code;
    public String firstName;
    public String lastName;
    public String userName;
    @JsonFormat(pattern = "dd/MM/yyyy")
    public Date birthDate;
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    public LocalDateTime createdAt;
    public String gender;

    public CustomerReponse(Customer customer) {
        this.code = customer.getCode();
        this.firstName = customer.getFirstName();
        this.lastName = customer.getLastName();
        this.userName = customer.getUser().getUsername();
        this.birthDate = customer.getBirthDate();
        this.createdAt = customer.getCreatedAt().getValue();
        this.gender = customer.getGender().name();

    }
}
