package com.hcmus.banking.platform.core.presentation.staff;

import com.hcmus.banking.platform.core.application.admin.StaffUseCaseService;
import com.hcmus.banking.platform.domain.staff.Staff;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/internal/staffs")
@RequiredArgsConstructor
public class StaffController {
    private final StaffUseCaseService staffService;

    @GetMapping
    @PreAuthorize("hasAnyRole('STAFF', 'ADMIN')")
    public Page<StaffResponse> findAllBy(Pageable pageable){
       Page<Staff> staffs = staffService.findAllBy(pageable);
       return StaffResponses.ofPage(staffs, pageable);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('STAFF', 'ADMIN')")
    public StaffResponse findBy(@PathVariable Long id){
        Staff staff = staffService.findById(id);
        return new StaffResponse(staff);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasRole('ADMIN')")
    public void create(@Valid @RequestBody StaffRequest staffRequest){
        Staff staff = StaffRequest.toStaff(staffRequest);
        staffService.create(staff);
    }

    @PutMapping
    @PreAuthorize("hasRole('ADMIN')")
    public void update(@Valid @RequestBody StaffRequest staffRequest){
        Staff staff = StaffRequest.toStaff(staffRequest);
        staffService.update(staff);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void delete(@PathVariable Long id){
        staffService.delete(id);
    }
}
