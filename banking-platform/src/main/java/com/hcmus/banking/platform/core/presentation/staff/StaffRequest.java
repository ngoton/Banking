package com.hcmus.banking.platform.core.presentation.staff;

import com.hcmus.banking.platform.domain.general.Created;
import com.hcmus.banking.platform.domain.general.Gender;
import com.hcmus.banking.platform.domain.info.Info;
import com.hcmus.banking.platform.domain.staff.Staff;
import lombok.AllArgsConstructor;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@AllArgsConstructor
public class StaffRequest {
    @NotNull(message = "Staff code is required")
    public String code;
    @NotNull(message = "First name is required")
    public String firstName;
    @NotNull(message = "Last name is required")
    public String lastName;
    @NotNull(message = "Date of birth is required")
    public LocalDate birthDate;
    @NotNull(message = "Gender is required")
    public String gender;
    public String phone;
    public String address;

    public static Staff toStaff(StaffRequest staffRequest){
        Info info = new Info(
                staffRequest.firstName,
                staffRequest.lastName,
                staffRequest.birthDate,
                Gender.valueOf(staffRequest.gender),
                staffRequest.phone,
                staffRequest.address,
                Created.ofEmpty()
        );
        return new Staff(
                staffRequest.code,
                info,
                Created.ofEmpty()
        );
    }
}
