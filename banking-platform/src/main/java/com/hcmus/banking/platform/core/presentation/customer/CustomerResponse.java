package com.hcmus.banking.platform.core.presentation.customer;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.hcmus.banking.platform.domain.customer.Customer;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class CustomerResponse {
    public String code;
    public String firstName;
    public String lastName;
    @JsonFormat(pattern = "dd/MM/yyyy")
    public LocalDate birthDate;
    public String gender;
    public String username;
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    public LocalDateTime createdAt;


    public CustomerResponse(Customer customer) {
        this.code = customer.getCode();
        this.firstName = customer.getFirstName();
        this.lastName = customer.getLastName();
        this.username = customer.getUser().getUsername();
        this.birthDate = customer.getBirthDate();
        this.createdAt = customer.getCreated().getCreatedAt().getValue();
        this.gender = customer.getGender().name();

    }
}
