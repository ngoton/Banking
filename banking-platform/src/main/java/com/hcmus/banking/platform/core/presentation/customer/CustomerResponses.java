package com.hcmus.banking.platform.core.presentation.customer;

import com.hcmus.banking.platform.domain.customer.Customer;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
public class CustomerResponses {
    final List<CustomerResponse> customerResponses;

    public static Page<CustomerResponse> ofPage(Page<Customer> customerPage, Pageable pageable) {
        List<Customer> customers = customerPage.getContent();
        long total = customerPage.getTotalElements();
        List<CustomerResponse> responses = customers.stream()
                .map(customer -> new CustomerResponse(customer))
                .collect(Collectors.toList());
        return new PageImpl(responses, pageable, total);
    }


}
