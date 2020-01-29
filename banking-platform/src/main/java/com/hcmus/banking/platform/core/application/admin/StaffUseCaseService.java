package com.hcmus.banking.platform.core.application.admin;

import com.hcmus.banking.platform.core.application.info.InfoService;
import com.hcmus.banking.platform.core.application.staff.StaffService;
import com.hcmus.banking.platform.domain.exception.BankingServiceException;
import com.hcmus.banking.platform.domain.exception.NotFoundException;
import com.hcmus.banking.platform.domain.info.Info;
import com.hcmus.banking.platform.domain.staff.Staff;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class StaffUseCaseService {
    private final StaffService staffService;
    private final InfoService infoService;

    @Transactional(readOnly = true)
    public Page<Staff> findAllBy(Pageable pageable) {
        return staffService.findAllBy(pageable);
    }

    @Transactional(readOnly = true)
    public Staff findById(Long id){
        Staff staff = staffService.findById(id);
        if (staff.isEmpty()){
            throw new NotFoundException();
        }
        return staff;
    }

    @Transactional(readOnly = true)
    public Staff findByCode(String code){
        Staff staff = staffService.findByCode(code);
        if (staff.isEmpty()){
            throw new NotFoundException();
        }
        return staff;
    }

    @Transactional
    public void create(Staff staff){
        Staff byCode = staffService.findByCode(staff.getCode());
        if (!byCode.isEmpty()){
            throw new BankingServiceException("Code is already exists");
        }
        staffService.create(staff);
    }

    @Transactional
    public void update(Staff staff){
        Staff oldStaff = staffService.findByCode(staff.getCode());
        if (oldStaff.isEmpty()){
            throw new NotFoundException();
        }
        Info info = infoService.findByStaffCode(staff.getCode());
        if (!info.isEmpty()){
            infoService.update(info, staff.getInfo());
        }
        staffService.update(oldStaff, staff);
    }

    @Transactional
    public void delete(Long id){
        Staff staff = staffService.findById(id);
        if (staff.isEmpty()){
            throw new NotFoundException();
        }
        staffService.delete(staff);
    }
}
