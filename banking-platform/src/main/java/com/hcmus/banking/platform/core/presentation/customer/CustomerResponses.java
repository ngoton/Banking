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
    final List<CustomerReponse> customerResponses;

    public static Page<CustomerReponse> ofPage(Page<Customer> customerPage, Pageable pageable) {
        List<Customer> customers = customerPage.getContent();
        long total = customerPage.getTotalElements();
        List<CustomerReponse> responses = customers.stream()
                .map(customer -> new CustomerReponse(customer))
                .collect(Collectors.toList());
        return new PageImpl(responses, pageable, total);
    }


}
