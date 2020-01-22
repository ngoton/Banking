package com.hcmus.banking.platform.domain.otp;

import com.hcmus.banking.platform.domain.general.Created;
import com.hcmus.banking.platform.domain.general.IDEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "otps", schema = "banking")
@Data
@EqualsAndHashCode(callSuper=true)
@AllArgsConstructor
@NoArgsConstructor
public class OTP extends IDEntity {
    private static final String EMPTY_STRING = "";
    private static final Integer EXPIRED_TIME = 15;

    private String code;
    private LocalDateTime expired;
    private String email;
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "createdAt.value", column = @Column(name = "created_at")),
            @AttributeOverride(name = "createdBy.value", column = @Column(name = "created_by")),
            @AttributeOverride(name = "createProgram.value", column = @Column(name = "create_program"))
    })
    private Created created;

    public static OTP ofEmpty(){
        return new OTP(EMPTY_STRING, LocalDateTime.now(), EMPTY_STRING, Created.ofEmpty());
    }

    public boolean isEmpty(){
        return code.equals(EMPTY_STRING);
    }

    public boolean isExpired(){
        return expired.isBefore(LocalDateTime.now());
    }

    private static LocalDateTime expired(){
        return LocalDateTime.now().plusMinutes(EXPIRED_TIME);
    }

    public static OTP with(String code, String email){
        return new OTP(code, expired(), email, Created.ofEmpty());
    }
}
