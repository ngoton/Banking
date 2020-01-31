package com.hcmus.banking.platform.core.application.staff;

import com.hcmus.banking.platform.core.infrastructure.datasource.staff.StaffRepository;
import com.hcmus.banking.platform.domain.staff.Staff;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StaffService {
    private final StaffRepository staffRepository;

    public Page<Staff> findAllBy(Pageable pageable) {
        return staffRepository.findAllBy(pageable);
    }

    public Staff findById(Long id){
        return staffRepository.findById(id).orElse(Staff.ofEmpty());
    }

    public Staff findByCode(String code){
        return staffRepository.findByCode(code).orElse(Staff.ofEmpty());
    }

    public Staff findByUserId(Long id){
        return staffRepository.findByInfoUserId(id).orElse(Staff.ofEmpty());
    }

    public void create(Staff staff){
        staffRepository.save(staff);
    }

    public void update(Staff oldStaff, Staff staff){
        oldStaff.setCode(staff.getCode());
        staffRepository.save(oldStaff);
    }

    public void delete(Staff staff){
        staffRepository.delete(staff);
    }
}
