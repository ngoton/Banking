package com.hcmus.banking.platform.core.presentation.customer;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.hcmus.banking.platform.domain.customer.Customer;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class CustomerResponse {
    public Long customerId;
    public String code;
    public String firstName;
    public String lastName;
    @JsonFormat(pattern = "dd/MM/yyyy")
    public LocalDate birthDate;
    public String gender;
    public String phone;
    public String address;
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    public LocalDateTime createdAt;


    public CustomerResponse(Customer customer) {
        this.customerId = customer.getId();
        this.code = customer.getCode();
        this.firstName = customer.getInfo().getFirstName();
        this.lastName = customer.getInfo().getLastName();
        this.birthDate = customer.getInfo().getBirthDate();
        this.gender = customer.getInfo().getGender().name();
        this.phone = customer.getInfo().getPhone();
        this.address = customer.getInfo().getAddress();
        this.createdAt = customer.getCreated().getCreatedAt().getValue();
    }
}
