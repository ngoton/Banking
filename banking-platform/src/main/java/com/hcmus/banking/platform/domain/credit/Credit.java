package com.hcmus.banking.platform.domain.credit;

import com.hcmus.banking.platform.domain.customer.Customer;
import com.hcmus.banking.platform.domain.general.Created;
import com.hcmus.banking.platform.domain.general.IDEntity;
import com.hcmus.banking.platform.domain.paymentTransaction.PaymentTransaction;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;


@Entity
@Table(name = "credits", schema = "banking")
@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Credit extends IDEntity {
    private static final String EMPTY_STRING = "";
    private String account;
    private BigDecimal money;
    private String content;
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "createdAt.value", column = @Column(name = "created_at")),
            @AttributeOverride(name = "createdBy.value", column = @Column(name = "created_by")),
            @AttributeOverride(name = "createProgram.value", column = @Column(name = "create_program"))
    })
    private Created created;

    @OneToOne(fetch = FetchType.LAZY, cascade = {CascadeType.ALL})
    @JoinColumn(name = "payment_transactions_id")
    private PaymentTransaction paymentTransaction;
    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.ALL})
    @JoinColumn(name = "customers_id")
    private Customer customer;

    public static Credit ofEmpty() {
        return new Credit(EMPTY_STRING, new BigDecimal(0), EMPTY_STRING, Created.ofEmpty());
    }

    public Credit(String account, BigDecimal money, String content, Created created) {
        this.account = account;
        this.money = money;
        this.content = content;
        this.created = created;
    }

    public boolean isEmpty() {
        return account.equals(EMPTY_STRING);
    }

}
