package com.hcmus.banking.platform.domain.customer;

import com.hcmus.banking.platform.domain.general.*;
import com.hcmus.banking.platform.domain.user.User;
import lombok.*;


import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "customers", schema = "banking")
@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Customer extends IDEntity {
    private static final String EMPTY_STRING = "";
    private String code;
    private String firstName;
    private String lastName;
    @Column(name = "birth_date", columnDefinition = "DATE")
    private LocalDate birthDate;
    @Enumerated(EnumType.STRING)
    private Gender gender;
    private String phone;
    private String address;
    @OneToOne(fetch = FetchType.LAZY, cascade = {CascadeType.ALL})
    @JoinColumn(name = "users_id")
    private User user;
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "createdAt.value", column = @Column(name = "created_at")),
            @AttributeOverride(name = "createdBy.value", column = @Column(name = "created_by")),
            @AttributeOverride(name = "createProgram.value", column = @Column(name = "create_program"))
    })
    private Created created;

    public static Customer ofEmpty(){
        return new Customer(EMPTY_STRING, EMPTY_STRING, EMPTY_STRING, LocalDate.now(), Gender.Male, EMPTY_STRING, EMPTY_STRING, User.ofEmpty(), Created.ofEmpty());
    }

    public boolean isEmpty(){
        return code.equals(EMPTY_STRING);
    }
}
