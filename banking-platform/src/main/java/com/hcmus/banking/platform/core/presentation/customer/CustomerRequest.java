package com.hcmus.banking.platform.core.presentation.customer;

import com.hcmus.banking.platform.domain.customer.Customer;
import com.hcmus.banking.platform.domain.general.Created;
import com.hcmus.banking.platform.domain.general.Gender;
import com.hcmus.banking.platform.domain.user.User;
import lombok.AllArgsConstructor;

import java.time.LocalDate;

@AllArgsConstructor
public class CustomerRequest {
    public String code;
    public String firstName;
    public String lastName;
    public LocalDate birthDate;
    public String gender;
    public String phone;
    public String address;

    public static Customer toCustomer(CustomerRequest customerRequest){
        return new Customer(
                customerRequest.code,
                customerRequest.firstName,
                customerRequest.lastName,
                customerRequest.birthDate,
                Gender.valueOf(customerRequest.gender),
                customerRequest.phone,
                customerRequest.address,
                User.ofEmpty(),
                Created.ofEmpty()
        );
    }
}
