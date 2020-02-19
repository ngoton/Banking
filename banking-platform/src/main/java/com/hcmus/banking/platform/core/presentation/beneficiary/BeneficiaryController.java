package com.hcmus.banking.platform.core.presentation.beneficiary;

import com.hcmus.banking.platform.core.application.admin.BeneficiaryUseCaseService;
import com.hcmus.banking.platform.core.application.admin.CustomerUseCaseService;
import com.hcmus.banking.platform.core.presentation.advice.UserAdvice;
import com.hcmus.banking.platform.domain.beneficiary.Beneficiary;
import com.hcmus.banking.platform.domain.customer.Customer;
import com.hcmus.banking.platform.domain.exception.NotFoundException;
import com.hcmus.banking.platform.domain.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/internal/beneficiaries")
@RequiredArgsConstructor
@UserAdvice.On
public class BeneficiaryController {
    private final BeneficiaryUseCaseService beneficiaryService;
    private final CustomerUseCaseService customerService;

    @GetMapping
    public Page<BeneficiaryResponse> findAllBy(Pageable pageable) {
        Page<Beneficiary> beneficiaries = beneficiaryService.findAllBy(pageable);
        return BeneficiaryResponses.ofPage(beneficiaries, pageable);
    }

    @GetMapping("/{id}")
    public BeneficiaryResponse findById(@PathVariable Long id) {
        Beneficiary beneficiary = beneficiaryService.findById(id);
        return new BeneficiaryResponse(beneficiary);
    }

    @GetMapping("/customer/{code}")
    public List<BeneficiaryResponse> findByCustomerCode(@PathVariable String code) {
        List<Beneficiary> beneficiaries = beneficiaryService.findAllByCustomerCode(code);
        return BeneficiaryResponses.ofList(beneficiaries);
    }

    @GetMapping("/bank/{bankName}")
    public List<BeneficiaryResponse> findByBankName(@PathVariable String bankName) {
        List<Beneficiary> beneficiaries = beneficiaryService.findAllByBankName(bankName);
        return BeneficiaryResponses.ofList(beneficiaries);
    }

    @GetMapping("/internal")
    public List<BeneficiaryResponse> findInternal() {
        List<Beneficiary> beneficiaries = beneficiaryService.findInternal();
        return BeneficiaryResponses.ofList(beneficiaries);
    }

    @GetMapping("/external")
    public List<BeneficiaryResponse> findExternal() {
        List<Beneficiary> beneficiaries = beneficiaryService.findExternal();
        return BeneficiaryResponses.ofList(beneficiaries);
    }

    @GetMapping("/account/{account}")
    public BeneficiaryResponse findByAccount(@PathVariable String account) {
        Beneficiary beneficiary = beneficiaryService.findByAccount(account);
        return new BeneficiaryResponse(beneficiary);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void create(@Valid @RequestBody BeneficiaryRequest beneficiaryRequest, @ModelAttribute("user") User user) {
        Customer customer = customerService.findByUserId(user.getId());
        if (customer.isEmpty()) {
            throw new NotFoundException();
        }
        Beneficiary beneficiary = BeneficiaryRequest.toBeneficiary(beneficiaryRequest, customer);
        beneficiaryService.create(beneficiary);
    }

    @PutMapping
    public void update(@Valid @RequestBody BeneficiaryRequest beneficiaryRequest, @ModelAttribute("user") User user) {
        Customer customer = customerService.findByUserId(user.getId());
        if (customer.isEmpty()) {
            throw new NotFoundException();
        }
        Beneficiary beneficiary = BeneficiaryRequest.toBeneficiary(beneficiaryRequest, customer);
        beneficiaryService.update(beneficiary);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        beneficiaryService.delete(id);
    }

}
