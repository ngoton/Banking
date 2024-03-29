package com.hcmus.banking.platform.domain.partner;

import com.hcmus.banking.platform.domain.general.Created;
import com.hcmus.banking.platform.domain.general.IDEntity;
import com.hcmus.banking.platform.domain.paymentTransaction.PaymentTransaction;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

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
    private String privateKey;
    private String publicKey;
    @Enumerated(EnumType.STRING)
    private Encryption encryption;
    private String baseUrl;
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "createdAt.value", column = @Column(name = "created_at")),
            @AttributeOverride(name = "createdBy.value", column = @Column(name = "created_by")),
            @AttributeOverride(name = "createProgram.value", column = @Column(name = "create_program"))
    })
    private Created created;
    @OneToMany(mappedBy = "partner", fetch = FetchType.LAZY, cascade = {CascadeType.ALL})
    private List<PaymentTransaction> paymentTransactions;

    public Partner(String name, String apiKey, String privateKey, String publicKey, Encryption encryption, String baseUrl, Created created){
        this.name = name;
        this.apiKey = apiKey;
        this.privateKey = privateKey;
        this.publicKey = publicKey;
        this.encryption = encryption;
        this.baseUrl = baseUrl;
        this.created = created;
    }

    public Partner(String name, String key, String apiKey, String privateKey, String publicKey, Encryption encryption, String baseUrl, Created created) {
        this.name = name;
        this.key = key;
        this.apiKey = apiKey;
        this.privateKey = privateKey;
        this.publicKey = publicKey;
        this.encryption = encryption;
        this.baseUrl = baseUrl;
        this.created = created;
    }

    public static Partner ofEmpty(){
        return new Partner(EMPTY_STRING, EMPTY_STRING, EMPTY_STRING, EMPTY_STRING, EMPTY_STRING, Encryption.RSA, EMPTY_STRING, Created.ofEmpty());
    }

    public boolean isEmpty(){
        return name.equals(EMPTY_STRING);
    }
}
