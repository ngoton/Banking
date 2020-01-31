package com.hcmus.banking.platform.core.presentation.staff;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.hcmus.banking.platform.domain.staff.Staff;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class StaffResponse {
    public Long staffId;
    public String code;
    public String firstName;
    public String lastName;
    @JsonFormat(pattern = "dd/MM/yyyy")
    public LocalDate birthDate;
    public String gender;
    public String phone;
    public String address;
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    public LocalDateTime createdAt;


    public StaffResponse(Staff staff) {
        this.staffId = staff.getId();
        this.code = staff.getCode();
        this.firstName = staff.getInfo().getFirstName();
        this.lastName = staff.getInfo().getLastName();
        this.birthDate = staff.getInfo().getBirthDate();
        this.gender = staff.getInfo().getGender().name();
        this.phone = staff.getInfo().getPhone();
        this.address = staff.getInfo().getAddress();
        this.createdAt = staff.getCreated().getCreatedAt().getValue();
    }
}
