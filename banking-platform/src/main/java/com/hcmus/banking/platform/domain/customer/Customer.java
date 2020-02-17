package com.hcmus.banking.platform.domain.customer;

import com.hcmus.banking.platform.domain.beneficiary.Beneficiary;
import com.hcmus.banking.platform.domain.credit.Credit;
import com.hcmus.banking.platform.domain.debit.Debit;
import com.hcmus.banking.platform.domain.general.*;
import com.hcmus.banking.platform.domain.info.Info;
import com.hcmus.banking.platform.domain.payment.Payment;
import lombok.*;


import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "customers", schema = "banking")
@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Customer extends IDEntity {
    private static final String EMPTY_STRING = "";
    private String code;
    @OneToOne(fetch = FetchType.LAZY, cascade = {CascadeType.ALL})
    @JoinColumn(name = "infos_id")
    private Info info;
    @OneToOne(fetch = FetchType.LAZY, cascade = {CascadeType.ALL})
    @JoinColumn(name = "payments_id")
    private Payment payment;
    @OneToMany(mappedBy = "customer", fetch = FetchType.LAZY, cascade = {CascadeType.ALL})
    private List<Beneficiary> beneficiaries;
    @OneToMany(mappedBy = "customer", fetch = FetchType.LAZY, cascade = {CascadeType.ALL})
    private List<Debit> debits;
    @OneToMany(mappedBy = "customer", fetch = FetchType.LAZY, cascade = {CascadeType.ALL})
    private List<Credit> credits;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "createdAt.value", column = @Column(name = "created_at")),
            @AttributeOverride(name = "createdBy.value", column = @Column(name = "created_by")),
            @AttributeOverride(name = "createProgram.value", column = @Column(name = "create_program"))
    })
    private Created created;

    public Customer(String code, Info info, Payment payment, Created created) {
        this.code = code;
        this.info = info;
        this.payment = payment;
        this.created = created;
    }

    public static Customer ofEmpty() {
        return new Customer(EMPTY_STRING, Info.ofEmpty(), Payment.ofEmpty(), Created.ofEmpty());
    }

    public boolean isEmpty() {
        return code.equals(EMPTY_STRING);
    }
}
