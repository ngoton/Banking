package com.hcmus.banking.platform.domain.debit;

import com.hcmus.banking.platform.domain.credit.Credit;
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
import java.util.Objects;


@Entity
@Table(name = "debits", schema = "banking")
@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Debit extends IDEntity {
    private static final String EMPTY_STRING = "";
    private String account;
    private BigDecimal money;
    private String content;
    private Integer status;
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "createdAt.value", column = @Column(name = "created_at")),
            @AttributeOverride(name = "createdBy.value", column = @Column(name = "created_by")),
            @AttributeOverride(name = "createProgram.value", column = @Column(name = "create_program"))
    })
    private Created created;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "payment_transactions_id")
    private PaymentTransaction paymentTransaction;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customers_id")
    private Customer customer;
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "credits_id")
    private Credit credit;

    public Debit(String account, BigDecimal money, String content, Customer customer, Created created) {
        this.account = account;
        this.money = money;
        this.content = content;
        this.customer = customer;
        this.created = created;
    }

    public static Debit ofEmpty() {
        return new Debit(EMPTY_STRING, new BigDecimal(0), EMPTY_STRING, Created.ofEmpty());
    }

    public Debit(String account, BigDecimal money, String content, Created created) {
        this.account = account;
        this.money = money;
        this.content = content;
        this.created = created;
    }

    public boolean isEmpty() {
        return account.equals(EMPTY_STRING);
    }

    public boolean isPaid() {
        return Objects.nonNull(status) && status.equals(1);
    }
}
