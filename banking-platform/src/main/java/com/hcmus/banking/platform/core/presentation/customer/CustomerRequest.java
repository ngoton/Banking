package com.hcmus.banking.platform.core.presentation.customer;

import com.hcmus.banking.platform.domain.customer.Customer;
import com.hcmus.banking.platform.domain.general.Created;
import com.hcmus.banking.platform.domain.info.Gender;
import com.hcmus.banking.platform.domain.info.Info;
import com.hcmus.banking.platform.domain.payment.Payment;
import lombok.AllArgsConstructor;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@AllArgsConstructor
public class CustomerRequest {
    @NotNull(message = "Customer code is required")
    public String code;
    @NotNull(message = "First name is required")
    public String firstName;
    @NotNull(message = "Last name is required")
    public String lastName;
    @NotNull(message = "Date of birth is required")
    public LocalDate birthDate;
    @NotNull(message = "Gender is required")
    public String gender;
    public String phone;
    public String address;

    public static Customer toCustomer(CustomerRequest customerRequest) {
        Info info = new Info(
                customerRequest.firstName,
                customerRequest.lastName,
                customerRequest.birthDate,
                Gender.valueOf(customerRequest.gender),
                customerRequest.phone,
                customerRequest.address,
                Created.ofEmpty()
        );
        return new Customer(
                customerRequest.code,
                info,
                Payment.generate(),
                Created.ofEmpty()
        );
    }
}
