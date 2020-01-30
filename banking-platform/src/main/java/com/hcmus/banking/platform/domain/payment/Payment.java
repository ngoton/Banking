package com.hcmus.banking.platform.domain.payment;

import com.hcmus.banking.platform.domain.general.Created;
import com.hcmus.banking.platform.domain.general.IDEntity;
import com.hcmus.banking.platform.domain.paymentTransaction.PaymentTransaction;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Collections;
import java.util.List;


@Entity
@Table(name = "payments", schema = "banking")
@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Payment extends IDEntity {
    private static final String EMPTY_STRING = "";
    private String account;
    private BigDecimal balance;
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "createdAt.value", column = @Column(name = "created_at")),
            @AttributeOverride(name = "createdBy.value", column = @Column(name = "created_by")),
            @AttributeOverride(name = "createProgram.value", column = @Column(name = "create_program"))
    })
    private Created created;
    @OneToMany(mappedBy = "payment")
    private List<PaymentTransaction> paymentTransactions;

    public static Payment ofEmpty() {
        return new Payment(EMPTY_STRING, new BigDecimal(0), Created.ofEmpty());
    }

    public Payment(String account, BigDecimal balance, Created created) {
        this.account = account;
        this.balance = balance;
        this.created = created;
    }
    public boolean isEmpty(){
        return account.equals(EMPTY_STRING);
    }
}
