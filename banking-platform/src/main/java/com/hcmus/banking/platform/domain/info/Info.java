package com.hcmus.banking.platform.domain.info;

import com.hcmus.banking.platform.domain.customer.Customer;
import com.hcmus.banking.platform.domain.general.Created;
import com.hcmus.banking.platform.domain.general.IDEntity;
import com.hcmus.banking.platform.domain.staff.Staff;
import com.hcmus.banking.platform.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "infos", schema = "banking")
@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Info extends IDEntity {
    private static final String EMPTY_STRING = "";
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
    @OneToOne(mappedBy = "info", fetch = FetchType.LAZY)
    private Customer customer;
    @OneToOne(mappedBy = "info", fetch = FetchType.LAZY)
    private Staff staff;
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "createdAt.value", column = @Column(name = "created_at")),
            @AttributeOverride(name = "createdBy.value", column = @Column(name = "created_by")),
            @AttributeOverride(name = "createProgram.value", column = @Column(name = "create_program"))
    })
    private Created created;

    public Info(String firstName, String lastName, LocalDate birthDate, Gender gender, String phone, String address, Created created) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
        this.gender = gender;
        this.phone = phone;
        this.address = address;
        this.created = created;
    }

    public Info(String firstName, String lastName, LocalDate birthDate, Gender gender, String phone, String address, User user, Created created) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
        this.gender = gender;
        this.phone = phone;
        this.address = address;
        this.user = user;
        this.created = created;
    }

    public static Info ofEmpty(){
        return new Info(EMPTY_STRING, EMPTY_STRING, LocalDate.now(), Gender.Male, EMPTY_STRING, EMPTY_STRING, User.ofEmpty(), Created.ofEmpty());
    }

    public boolean isEmpty(){
        return firstName.equals(EMPTY_STRING);
    }
}
