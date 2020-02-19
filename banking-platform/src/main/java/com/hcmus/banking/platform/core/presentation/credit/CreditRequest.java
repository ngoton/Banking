package com.hcmus.banking.platform.core.presentation.credit;

import com.hcmus.banking.platform.domain.credit.Credit;
import com.hcmus.banking.platform.domain.customer.Customer;
import com.hcmus.banking.platform.domain.general.Created;
import lombok.AllArgsConstructor;

import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

@AllArgsConstructor
public class CreditRequest {
    public Long creditId;
    @NotNull(message = "Account is required")
    public String account;
    @NotNull(message = "Money is required")
    public BigDecimal money;
    @NotNull(message = "Content is required")
    public String content;

    public static Credit toCredit(CreditRequest creditRequest, Customer customer) {
        return new Credit(creditRequest.account, creditRequest.money, creditRequest.content, customer, Created.ofEmpty());
    }
}
