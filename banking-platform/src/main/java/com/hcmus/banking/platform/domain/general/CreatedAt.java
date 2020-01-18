package com.hcmus.banking.platform.domain.general;

import lombok.Getter;

import javax.persistence.Embeddable;
import java.time.LocalDateTime;

@Embeddable
@Getter
public class CreatedAt {
    private LocalDateTime value;
}
