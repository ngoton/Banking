package com.hcmus.banking.platform.domain.customer;

import com.hcmus.banking.platform.domain.general.*;
import com.hcmus.banking.platform.domain.info.Info;
import lombok.*;


import javax.persistence.*;

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
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "createdAt.value", column = @Column(name = "created_at")),
            @AttributeOverride(name = "createdBy.value", column = @Column(name = "created_by")),
            @AttributeOverride(name = "createProgram.value", column = @Column(name = "create_program"))
    })
    private Created created;

    public static Customer ofEmpty(){
        return new Customer(EMPTY_STRING, Info.ofEmpty(), Created.ofEmpty());
    }

    public boolean isEmpty(){
        return code.equals(EMPTY_STRING);
    }
}
