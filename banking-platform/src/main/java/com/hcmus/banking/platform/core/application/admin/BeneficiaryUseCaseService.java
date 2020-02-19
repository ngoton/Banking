package com.hcmus.banking.platform.core.application.admin;

import com.hcmus.banking.platform.core.application.beneficiary.BeneficiaryService;
import com.hcmus.banking.platform.core.application.customer.CustomerService;
import com.hcmus.banking.platform.domain.beneficiary.Beneficiary;
import com.hcmus.banking.platform.domain.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BeneficiaryUseCaseService {
    private final BeneficiaryService beneficiaryService;

    @Transactional(readOnly = true)
    public Page<Beneficiary> findAllBy(Pageable pageable) {
        return beneficiaryService.findAllBy(pageable);
    }

    @Transactional(readOnly = true)
    public Beneficiary findById(Long id) {
        Beneficiary beneficiary = beneficiaryService.findById(id);
        if (beneficiary.isEmpty()) {
            throw new NotFoundException();
        }
        return beneficiary;
    }

    @Transactional(readOnly = true)
    public Beneficiary findByAccount(String account) {
        Beneficiary beneficiary = beneficiaryService.findByAccount(account);
        return beneficiary;
    }

    @Transactional(readOnly = true)
    public Beneficiary findByName(String name) {
        Beneficiary beneficiary = beneficiaryService.findByName(name);
        if (beneficiary.isEmpty()) {
            throw new NotFoundException();
        }
        return beneficiary;
    }

    @Transactional(readOnly = true)
    public List<Beneficiary> findAllByCustomerCode(String code) {
        List<Beneficiary> beneficiaries = beneficiaryService.findAllByCustomerCode(code);
        return beneficiaries;
    }

    @Transactional
    public void create(Beneficiary beneficiary) {
        beneficiaryService.create(beneficiary);
    }

    @Transactional
    public void update(Beneficiary beneficiary) {
        Beneficiary oldBeneficiary = beneficiaryService.findByAccount(beneficiary.getAccount());
        if (oldBeneficiary.isEmpty()) {
            throw new NotFoundException();
        }
        beneficiaryService.update(oldBeneficiary, beneficiary);
    }

    @Transactional
    public void delete(Long id) {
        Beneficiary beneficiary = beneficiaryService.findById(id);
        if (beneficiary.isEmpty()) {
            throw new NotFoundException();
        }
        beneficiaryService.delete(beneficiary);
    }

    @Transactional(readOnly = true)
    public List<Beneficiary> findAllByBankName(String bankName) {
        List<Beneficiary> beneficiaries = beneficiaryService.findAllByBankName(bankName);
        return beneficiaries;
    }

    public List<Beneficiary> findInternal() {
        List<Beneficiary> beneficiaries = beneficiaryService.findAll();
        return beneficiaries.stream()
                .filter(beneficiary -> beneficiary.isInternal())
                .collect(Collectors.toList());
    }

    public List<Beneficiary> findExternal() {
        List<Beneficiary> beneficiaries = beneficiaryService.findAll();
        return beneficiaries.stream()
                .filter(beneficiary -> !beneficiary.isInternal())
                .collect(Collectors.toList());
    }
}
