package com.hcmus.banking.platform.domain.partner;

import com.hcmus.banking.platform.domain.general.Created;
import com.hcmus.banking.platform.domain.general.IDEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "partners", schema = "banking")
@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Partner extends IDEntity {
    private static final String EMPTY_STRING = "";
    private String name;
    private String key;
    private String apiKey;
    private String secretKey;
    private String signature;
    private String privateKey;
    private String publicKey;
    @Enumerated(EnumType.STRING)
    private Encryption encryption;
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "createdAt.value", column = @Column(name = "created_at")),
            @AttributeOverride(name = "createdBy.value", column = @Column(name = "created_by")),
            @AttributeOverride(name = "createProgram.value", column = @Column(name = "create_program"))
    })
    private Created created;

    public Partner(String name, String apiKey, String secretKey, String signature, Encryption encryption, Created created){
        this.name = name;
        this.apiKey = apiKey;
        this.secretKey = secretKey;
        this.signature = signature;
        this.encryption = encryption;
        this.created = created;
    }

    public static Partner ofEmpty(){
        return new Partner(EMPTY_STRING, EMPTY_STRING, EMPTY_STRING, EMPTY_STRING, EMPTY_STRING, EMPTY_STRING, EMPTY_STRING, Encryption.RSA, Created.ofEmpty());
    }

    public boolean isEmpty(){
        return name.equals(EMPTY_STRING);
    }
}
