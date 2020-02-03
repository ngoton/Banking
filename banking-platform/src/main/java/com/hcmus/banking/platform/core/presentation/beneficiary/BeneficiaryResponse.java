package com.hcmus.banking.platform.core.presentation.beneficiary;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.hcmus.banking.platform.domain.beneficiary.Beneficiary;

import java.time.LocalDateTime;

public class BeneficiaryResponse {
    public String name;
    public String shortName;
    public String bankName;
    public String account;
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    public LocalDateTime createdAt;

    public BeneficiaryResponse(Beneficiary beneficiary) {
        this.name = beneficiary.getName();
        this.shortName = beneficiary.getShortName();
        this.bankName = beneficiary.getBankName();
        this.account = beneficiary.getAccount();
        this.createdAt = beneficiary.getCreated().getCreatedAt().getValue();
    }
}
