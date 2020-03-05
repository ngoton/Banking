package com.hcmus.banking.platform.domain.beneficiary;

import com.hcmus.banking.platform.domain.customer.Customer;
import com.hcmus.banking.platform.domain.general.Created;
import com.hcmus.banking.platform.domain.general.IDEntity;
import com.hcmus.banking.platform.domain.payment.Payment;
import com.hcmus.banking.platform.domain.paymentTransaction.PaymentTransaction;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "beneficiarys", schema = "banking")
@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Beneficiary extends IDEntity {
    private static final String EMPTY_STRING = "";
    public static final String BANK_NAME = "HCB_BANK";
    private String name;
    @Column(name = "short_name")
    private String shortName;
    private String account;
    @Column(name = "bank_name")
    private String bankName;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customers_id")
    private Customer customer;
    @OneToOne(fetch = FetchType.LAZY, cascade = {CascadeType.ALL})
    @JoinColumn(name = "payments_id")
    private Payment payment;
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "createdAt.value", column = @Column(name = "created_at")),
            @AttributeOverride(name = "createdBy.value", column = @Column(name = "created_by")),
            @AttributeOverride(name = "createProgram.value", column = @Column(name = "create_program"))
    })
    private Created created;
    @OneToMany(mappedBy = "beneficiary")
    private List<PaymentTransaction> paymentTransactions;

    public static Beneficiary ofEmpty() {
        return new Beneficiary(EMPTY_STRING, EMPTY_STRING, EMPTY_STRING, EMPTY_STRING, Customer.ofEmpty(), Created.ofEmpty());
    }

    public Beneficiary(String name, String shortName, String account, String bankName, Customer customer, Created created) {
        this.name = name;
        this.shortName = shortName.isEmpty() ? name : shortName;
        this.account = account;
        this.bankName = bankName;
        this.customer = customer;
        this.created = created;
    }

    public boolean isEmpty() {
        return name.equals(EMPTY_STRING);
    }

    public boolean isInternal(){
        return bankName.equals(BANK_NAME);
    }
}
