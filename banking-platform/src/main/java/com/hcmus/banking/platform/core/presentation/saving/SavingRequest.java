package com.hcmus.banking.platform.core.presentation.saving;

import com.hcmus.banking.platform.domain.customer.Customer;
import com.hcmus.banking.platform.domain.general.Created;
import com.hcmus.banking.platform.domain.saving.Saving;
import lombok.AllArgsConstructor;

import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

@AllArgsConstructor
public class SavingRequest {
    @NotNull(message = "account is required")
    public String account;
    @NotNull(message = "balance is required")
    public BigDecimal balance;
    public Long customerId;

    public static Saving toSaving(SavingRequest savingRequest, Customer customer) {
        return new Saving(
                savingRequest.account,
                savingRequest.balance,
                customer,
                Created.ofEmpty());
    }

}
