package com.hcmus.banking.platform.domain.general;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Embeddable;

@Embeddable
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CreatedBy {
    private static final Long EMPTY_VALUE = Long.valueOf(0);
    private Long value;

    public static CreatedBy ofEmpty(){
        return new CreatedBy(EMPTY_VALUE);
    }
}
