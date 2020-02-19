package com.hcmus.banking.platform.domain.savingTransaction;

import com.hcmus.banking.platform.domain.general.Created;
import com.hcmus.banking.platform.domain.general.IDEntity;
import com.hcmus.banking.platform.domain.saving.Saving;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "saving_transactions", schema = "banking")
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
public class SavingTransaction extends IDEntity {
    private static final String EMPTY_STRING = "";
    private String code;
    private BigDecimal money;
    private String content;
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "createdAt.value", column = @Column(name = "created_at")),
            @AttributeOverride(name = "createdBy.value", column = @Column(name = "created_by")),
            @AttributeOverride(name = "createProgram.value", column = @Column(name = "create_program"))
    })
    private Created created;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "savings_id")
    private Saving saving;

    public SavingTransaction(BigDecimal money, String content, Saving saving, Created created) {
        this.money = money;
        this.content = content;
        this.created = created;
        this.saving = saving;
    }

    public SavingTransaction(String code, BigDecimal money, String content, Created created, Saving saving) {
        this.code = code;
        this.money = money;
        this.content = content;
        this.created = created;
        this.saving = saving;
    }

    public boolean isEmpty() {
        return code.equals(EMPTY_STRING);
    }

    public static SavingTransaction ofEmpty() {
        return new SavingTransaction(EMPTY_STRING, BigDecimal.ZERO, EMPTY_STRING, Created.ofEmpty(), Saving.ofEmpty());
    }
}
