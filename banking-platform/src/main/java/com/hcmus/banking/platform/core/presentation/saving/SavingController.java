package com.hcmus.banking.platform.core.presentation.saving;

import com.hcmus.banking.platform.core.application.admin.CustomerUseCaseService;
import com.hcmus.banking.platform.core.application.admin.SavingUseCaseService;
import com.hcmus.banking.platform.core.constants.SecurityUtils;
import com.hcmus.banking.platform.core.presentation.advice.UserAdvice;
import com.hcmus.banking.platform.core.presentation.beneficiary.BeneficiaryResponse;
import com.hcmus.banking.platform.core.presentation.beneficiary.BeneficiaryResponses;
import com.hcmus.banking.platform.domain.beneficiary.Beneficiary;
import com.hcmus.banking.platform.domain.customer.Customer;
import com.hcmus.banking.platform.domain.exception.NotFoundException;
import com.hcmus.banking.platform.domain.saving.Saving;
import com.hcmus.banking.platform.domain.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/internal/savings")
@RequiredArgsConstructor
@UserAdvice.On
public class SavingController {
    private final SavingUseCaseService savingService;
    private final CustomerUseCaseService customerService;

    @GetMapping
    public Page<SavingResponse> findAllBy(Pageable pageable) {
        Page<Saving> savings = savingService.findAllBy(pageable);
        return SavingResponses.ofPage(savings, pageable);
    }

    @GetMapping("/{id}")
    public SavingResponse findById(@PathVariable Long id) {
        Saving saving = savingService.findById(id);
        return new SavingResponse(saving);
    }

    @GetMapping("/customer/{id}")
    public List<SavingResponse> findAllByCustomerId(@PathVariable Long id) {
        List<Saving> savings = savingService.findAllByCustomerId(id);
        return SavingResponses.ofList(savings);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAnyRole('STAFF', 'ADMIN')")
    public void create(@Valid @RequestBody SavingRequest savingRequest) {
        Customer customer = customerService.findById(savingRequest.customerId);
        if (customer.isEmpty()) {
            throw new NotFoundException();
        }
        Saving saving = SavingRequest.toSaving(savingRequest, customer);
        savingService.create(saving);
    }

    @PutMapping
    @PreAuthorize("hasAnyRole('STAFF', 'ADMIN')")
    public void update(@Valid @RequestBody SavingRequest savingRequest, @ModelAttribute("user") User user) {
        Customer customer = customerService.findByUserId(user.getId());
        if (customer.isEmpty()) {
            throw new NotFoundException();
        }
        Saving saving = SavingRequest.toSaving(savingRequest, customer);
        savingService.update(saving);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('STAFF', 'ADMIN')")
    public void delete(@PathVariable Long id) {
        savingService.delete(id);
    }
}
