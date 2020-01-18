package com.hcmus.banking.platform.domain.customer;

import com.hcmus.banking.platform.domain.general.Gender;
import com.hcmus.banking.platform.domain.general.IDEntity;
import com.hcmus.banking.platform.domain.user.User;
import lombok.*;


import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "customers", schema = "banking")
@EqualsAndHashCode(callSuper=true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Customer extends IDEntity {
    private String code;
    @Column(name = "first_name")
    private String firstName;
    @Column(name = "last_name")
    private String lastName;
    @Temporal(TemporalType.DATE)
    @Column(name = "birth_date")
    private Date birthDate;
    @Enumerated(EnumType.STRING)
    private Gender gender;
    private String phone;
    private String address;
    @OneToOne
    @JoinColumn(name = "users_id")
    private User user;

}
