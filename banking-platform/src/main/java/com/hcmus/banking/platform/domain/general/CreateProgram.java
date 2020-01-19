package com.hcmus.banking.platform.domain.general;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Embeddable;

@Embeddable
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CreateProgram {
    private static final String EMPTY_VALUE = "";
    private String value;

    public static CreateProgram ofEmpty(){
        return new CreateProgram(EMPTY_VALUE);
    }
}
