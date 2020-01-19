package com.hcmus.banking.platform.domain.user;

import com.hcmus.banking.platform.domain.customer.Customer;
import com.hcmus.banking.platform.domain.general.Created;
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
    private static final String EMPTY_STRING = "";
    private String username;
    private String email;
    private String password;
    @Enumerated(EnumType.STRING)
    private Role role;
    @OneToOne(mappedBy = "user", fetch = FetchType.LAZY, cascade = {CascadeType.ALL})
    private Customer customer;
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "createdAt.value", column = @Column(name = "created_at")),
            @AttributeOverride(name = "createdBy.value", column = @Column(name = "created_by")),
            @AttributeOverride(name = "createProgram.value", column = @Column(name = "create_program"))
    })
    private Created created;


    public User(String username, String email, String password, Role role, Created created){
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
        this.created = created;
    }
    public static User ofEmpty(){
        return new User(EMPTY_STRING, EMPTY_STRING, EMPTY_STRING, Role.NONE, Created.ofEmpty());
    }
}
