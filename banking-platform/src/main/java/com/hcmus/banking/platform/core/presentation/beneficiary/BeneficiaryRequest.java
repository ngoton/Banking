package com.hcmus.banking.platform.core.presentation.beneficiary;

import com.hcmus.banking.platform.domain.beneficiary.Beneficiary;
import com.hcmus.banking.platform.domain.customer.Customer;
import com.hcmus.banking.platform.domain.general.Created;
import lombok.AllArgsConstructor;

import javax.validation.constraints.NotNull;

@AllArgsConstructor
public class BeneficiaryRequest {
    @NotNull(message = "Name code is required")
    public String name;
    public String shortName;
    @NotNull(message = "Account code is required")
    public String account;
    @NotNull(message = "Bank name code is required")
    public String bankName;

    public static Beneficiary toBeneficiary(BeneficiaryRequest beneficiaryRequest, Customer customer) {
        return new Beneficiary(beneficiaryRequest.name,
                beneficiaryRequest.shortName,
                beneficiaryRequest.account,
                beneficiaryRequest.bankName,
                customer,
                Created.ofEmpty());
    }
}
