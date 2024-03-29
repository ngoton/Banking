package com.hcmus.banking.platform.domain.user;

import com.hcmus.banking.platform.domain.general.Created;
import com.hcmus.banking.platform.domain.general.IDEntity;
import com.hcmus.banking.platform.domain.info.Info;
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
    public static final String DEFAULT_PASSWORD = "$2a$10$aaGK3grB55n1O5Hzlp3rAOJHF3njedXy.QisNyegmLzndzxb/NCGu";//1234567
    private String username;
    private String email;
    private String password;
    @Enumerated(EnumType.STRING)
    private Role role;
    @Enumerated(EnumType.STRING)
    private Status status;
    @OneToOne(mappedBy = "user", fetch = FetchType.LAZY)
    private Info info;
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "createdAt.value", column = @Column(name = "created_at")),
            @AttributeOverride(name = "createdBy.value", column = @Column(name = "created_by")),
            @AttributeOverride(name = "createProgram.value", column = @Column(name = "create_program"))
    })
    private Created created;


    public User(String username, String email, String password, Role role, Status status, Created created){
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
        this.status = status;
        this.created = created;
    }

    public static User ofEmpty(){
        return new User(EMPTY_STRING, EMPTY_STRING, EMPTY_STRING, Role.NONE, Status.LOCKED, Created.ofEmpty());
    }

    public boolean isEmpty(){
        return username.equals(EMPTY_STRING);
    }

    public boolean hasInfo(){
        if (info == null){
            return false;
        }
        return !info.isEmpty();
    }

    public boolean isActive(){
        return status.isActive();
    }

    public boolean isExpired(){
        return status.isExpired();
    }

    public boolean isLocked(){
        return status.isLocked();
    }
}
