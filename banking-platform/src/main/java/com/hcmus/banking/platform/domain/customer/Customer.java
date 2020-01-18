package com.hcmus.banking.platform.domain.customer;

import com.hcmus.banking.platform.domain.general.CreatedAt;
import com.hcmus.banking.platform.domain.general.Gender;
import com.hcmus.banking.platform.domain.general.IDEntity;
import com.hcmus.banking.platform.domain.user.User;
import lombok.*;


import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "customers", schema = "banking")
@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Customer extends IDEntity {
    private String code;
    private String firstName;
    private String lastName;
    @Temporal(TemporalType.DATE)
    private Date birthDate;
    @Enumerated(EnumType.STRING)
    private Gender gender;
    private String phone;
    private String address;
    @OneToOne
    @JoinColumn(name = "users_id")
    private User user;
    @Temporal(TemporalType.TIMESTAMP)
    @Embedded
    @AttributeOverride(name = "value", column = @Column(name = "created_at"))
    private CreatedAt createdAt;

}
