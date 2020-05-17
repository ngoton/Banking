package com.hcmus.banking.platform.core.infrastructure.datasource.merchant;

import com.hcmus.banking.platform.domain.partner.Partner;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
public class MerchantCriteria {
    Partner partner;
    String account;
    String content;
    BigDecimal money;
    String internalAccount;
    Boolean fee;

    public MerchantCriteria(Partner partner, String account, String content, BigDecimal money, String internalAccount, Boolean fee){
        this.partner = partner;
        this.account = account;
        this.content = content;
        this.money = money;
        this.internalAccount = internalAccount;
        this.fee = fee;
    }

    public MerchantCriteria(Partner partner, String account) {
        this.partner = partner;
        this.account = account;
    }
}
