package com.hcmus.banking.platform.domain.saving;

import com.hcmus.banking.platform.domain.customer.Customer;
import com.hcmus.banking.platform.domain.general.Created;
import com.hcmus.banking.platform.domain.general.IDEntity;
import com.hcmus.banking.platform.domain.savingTransaction.SavingTransaction;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "savings", schema = "banking")
@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Saving extends IDEntity {
    private static final String EMPTY_STRING = "";
    private String account;
    private BigDecimal balance;
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customers_id")
    private Customer customer;
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "createdAt.value", column = @Column(name = "created_at")),
            @AttributeOverride(name = "createdBy.value", column = @Column(name = "created_by")),
            @AttributeOverride(name = "createProgram.value", column = @Column(name = "create_program"))
    })
    private Created created;
    @OneToMany(mappedBy = "saving", fetch = FetchType.LAZY, cascade = {CascadeType.ALL})
    private List<SavingTransaction> savingTransactions;

    public static Saving ofEmpty() {
        return new Saving(EMPTY_STRING, new BigDecimal(0),Customer.ofEmpty(), Created.ofEmpty());
    }

    public Saving(String account, BigDecimal balance,Customer customer, Created created) {
        this.account = account;
        this.balance = balance;
        this.customer = customer;
        this.created = created;
    }
    public boolean isEmpty() {
        return account.equals(EMPTY_STRING);
    }
}
