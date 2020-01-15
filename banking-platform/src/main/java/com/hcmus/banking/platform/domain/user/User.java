package com.hcmus.banking.platform.domain.user;

import com.hcmus.banking.platform.domain.general.IDEntity;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "users", schema = "banking")
@Data
@EqualsAndHashCode(callSuper=true)
@AllArgsConstructor
@NoArgsConstructor
public class User extends IDEntity {
    private String email;
    private String password;

}
