package com.hcmus.banking.platform.core.presentation.staff;

import com.hcmus.banking.platform.domain.staff.Staff;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
public class StaffResponses {
    final List<StaffResponse> customerResponses;

    public static Page<StaffResponse> ofPage(Page<Staff> staffPage, Pageable pageable) {
        List<Staff> staffs = staffPage.getContent();
        long total = staffPage.getTotalElements();
        List<StaffResponse> responses = staffs.stream()
                .map(staff -> new StaffResponse(staff))
                .collect(Collectors.toList());
        return new PageImpl(responses, pageable, total);
    }


}
