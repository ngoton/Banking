package com.hcmus.banking.platform.core.presentation.debit;

import com.hcmus.banking.platform.domain.customer.Customer;
import com.hcmus.banking.platform.domain.debit.Debit;
import com.hcmus.banking.platform.domain.general.Created;
import lombok.AllArgsConstructor;

import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

@AllArgsConstructor
public class DebitRequest {
    public Long debitId;
    @NotNull(message = "Account is required")
    public String account;
    @NotNull(message = "Money is required")
    public BigDecimal money;
    @NotNull(message = "Content is required")
    public String content;

    public static Debit toDebit(DebitRequest debitRequest, Customer customer) {
        return new Debit(debitRequest.account, debitRequest.money, debitRequest.content, customer, Created.ofEmpty());
    }
}
