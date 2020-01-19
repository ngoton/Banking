package com.hcmus.banking.platform.domain.general;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Embeddable;
import javax.persistence.Embedded;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Embeddable
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Created {
    @Embedded
    @Temporal(TemporalType.TIMESTAMP)
    private CreatedAt createdAt;
    @Embedded
    private CreatedBy createdBy;
    @Embedded
    private CreateProgram createProgram;

    public static Created ofEmpty(){
        return new Created(CreatedAt.ofEmpty(), CreatedBy.ofEmpty(), CreateProgram.ofEmpty());
    }
}
