package com.hcmus.banking.platform.domain.general;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Embeddable;
import java.time.LocalDateTime;

@Embeddable
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CreatedAt {
    private LocalDateTime value;

    public static CreatedAt ofEmpty(){
        return new CreatedAt(LocalDateTime.now());
    }
}
