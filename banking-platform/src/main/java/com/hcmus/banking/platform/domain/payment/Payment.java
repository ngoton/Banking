package com.hcmus.banking.platform.domain.payment;

import com.hcmus.banking.platform.core.utils.RandomUtils;
import com.hcmus.banking.platform.domain.beneficiary.Beneficiary;
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
import java.util.Collections;
import java.util.List;
import java.util.Objects;


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
    private Integer status;
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "createdAt.value", column = @Column(name = "created_at")),
            @AttributeOverride(name = "createdBy.value", column = @Column(name = "created_by")),
            @AttributeOverride(name = "createProgram.value", column = @Column(name = "create_program"))
    })
    private Created created;
    @OneToMany(mappedBy = "payment", fetch = FetchType.LAZY, cascade = {CascadeType.ALL})
    private List<PaymentTransaction> paymentTransactions;
    @OneToOne(mappedBy = "payment", fetch = FetchType.LAZY)
    private Customer customer;
    @OneToOne(mappedBy = "payment", fetch = FetchType.LAZY)
    private Beneficiary beneficiary;

    public static Payment ofEmpty() {
        return new Payment(EMPTY_STRING, new BigDecimal(0), Created.ofEmpty());
    }

    public Payment(String account, BigDecimal balance, Created created) {
        this.account = account;
        this.balance = balance;
        this.created = created;
    }

    public boolean isEmpty() {
        return account.equals(EMPTY_STRING);
    }

    public static Payment generate() {
        Payment payment = new Payment(RandomUtils.generateAccount(), BigDecimal.ZERO, Created.ofEmpty());
        return payment;
    }

    public boolean isLocked() {
        return Objects.nonNull(status) && status.equals(0);
    }
}
