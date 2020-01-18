package com.hcmus.banking.platform.core.presentation.customer;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.hcmus.banking.platform.domain.customer.Customer;

import java.util.Date;

public class CustomerReponse {
    public String code;
    public String firstName;
    public String lastName;
    public String userName;
    @JsonFormat(pattern = "dd/MM/yyyy")
    public Date birthDate;

    public CustomerReponse(Customer customer) {
        this.code = customer.getCode();
        this.firstName = customer.getFirstName();
        this.lastName = customer.getLastName();
        this.userName = customer.getUser().getUsername();
        this.birthDate = customer.getBirthDate();
    }
}
