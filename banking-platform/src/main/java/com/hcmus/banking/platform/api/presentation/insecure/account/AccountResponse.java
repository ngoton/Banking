package com.hcmus.banking.platform.api.presentation.insecure.account;

import com.hcmus.banking.platform.domain.beneficiary.Beneficiary;
import com.hcmus.banking.platform.domain.payment.Payment;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class AccountResponse {
    public String account;
    public String name;
    public String bank;

    public static AccountResponse of(Payment payment){
        return new AccountResponse(
                payment.getAccount(),
                String.format("%s %s", payment.getCustomer().getInfo().getFirstName(), payment.getCustomer().getInfo().getLastName()),
                Beneficiary.BANK_NAME
        );
    }
}
