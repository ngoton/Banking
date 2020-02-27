package com.hcmus.banking.platform.core.infrastructure.datasource.merchant;

import com.hcmus.banking.platform.domain.partner.Partner;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
public class MerchantCriteria {
    Partner partner;
    String content;
    BigDecimal money;

    public MerchantCriteria(Partner partner, String content, BigDecimal money){
        this.partner = partner;
        this.content = content;
        this.money = money;
    }
}
