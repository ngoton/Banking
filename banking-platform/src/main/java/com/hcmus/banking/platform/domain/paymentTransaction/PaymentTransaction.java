package com.hcmus.banking.platform.domain.paymentTransaction;

import com.hcmus.banking.platform.domain.beneficiary.Beneficiary;
import com.hcmus.banking.platform.domain.general.Created;
import com.hcmus.banking.platform.domain.general.IDEntity;
import com.hcmus.banking.platform.domain.payment.Payment;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "payment_transactions", schema = "banking")
@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class PaymentTransaction extends IDEntity {
    private static final String EMPTY_STRING = "";
    private static final BigDecimal INTERNAL_FEE = BigDecimal.valueOf(10000);
    private static final BigDecimal EXTERNAL_FEE = BigDecimal.valueOf(20000);
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
    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.ALL})
    @JoinColumn(name = "payments_id")
    private Payment payment;
    @ManyToOne
    @JoinColumn(name = "beneficiarys_id")
    private Beneficiary beneficiary;

    public static PaymentTransaction ofEmpty() {
        return new PaymentTransaction(EMPTY_STRING, new BigDecimal(0), EMPTY_STRING, Created.ofEmpty(), Payment.ofEmpty(), Beneficiary.ofEmpty());
    }

    public boolean isEmpty() {
        return code.equals(EMPTY_STRING);
    }

    public PaymentTransaction(String code, BigDecimal money, String content, Created created, Payment payment) {
        this.code = code;
        this.money = money;
        this.content = content;
        this.created = created;
        this.payment = payment;
    }

    public PaymentTransaction(String content, BigDecimal money, Created created, Payment payment, Beneficiary beneficiary) {
        this.money = money;
        this.content = content;
        this.created = created;
        this.payment = payment;
        this.beneficiary = beneficiary;
    }

    public static BigDecimal internalFee() {
        return BigDecimal.ZERO.subtract(INTERNAL_FEE);
    }

    public static BigDecimal externalFee() {
        return BigDecimal.ZERO.subtract(EXTERNAL_FEE);
    }

}
