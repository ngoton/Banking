package com.hcmus.banking.platform.domain.general;

import org.hibernate.annotations.Type;

import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import java.util.UUID;

@MappedSuperclass
public class UIDEntity {
    @Id
    @Type(type = "pg-uuid")
    private UUID id;

    public UIDEntity() {
        this.id = UUID.randomUUID();
    }
}
