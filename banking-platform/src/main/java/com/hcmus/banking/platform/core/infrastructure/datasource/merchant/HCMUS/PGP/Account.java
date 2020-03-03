package com.hcmus.banking.platform.core.infrastructure.datasource.merchant.HCMUS.PGP;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@AllArgsConstructor
public class Account {
    String fullName;
    String phoneNumber;
    String email;
    @JsonFormat(pattern = "dd/MM/yy")
    LocalDate birthday;
}
