package com.hcmus.banking.platform.core.application.beneficiary;

import com.hcmus.banking.platform.core.infrastructure.datasource.beneficiary.BeneficiaryRepository;
import com.hcmus.banking.platform.domain.beneficiary.Beneficiary;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BeneficiaryService {
    private final BeneficiaryRepository beneficiaryRepository;

    public Page<Beneficiary> findAllBy(Pageable pageable) {
        return beneficiaryRepository.findAllBy(pageable);
    }

    public Beneficiary findById(Long id) {
        return beneficiaryRepository.findById(id).orElse(Beneficiary.ofEmpty());
    }

    public Beneficiary findByName(String name) {
        return beneficiaryRepository.findByName(name).orElse(Beneficiary.ofEmpty());
    }

    public Beneficiary findByAccount(String account) {
        return beneficiaryRepository.findByAccount(account).orElse(Beneficiary.ofEmpty());
    }
    public List<Beneficiary> findAllByCustomerCode(String code) {
        return beneficiaryRepository.findAllByCustomerCode(code);
    }
    public void create(Beneficiary beneficiary) {
        beneficiaryRepository.save(beneficiary);
    }

    public void update(Beneficiary oldBeneficiary, Beneficiary beneficiary) {
        oldBeneficiary.setName(beneficiary.getName());
        oldBeneficiary.setShortName(beneficiary.getShortName());
        oldBeneficiary.setBankName(beneficiary.getBankName());
        beneficiaryRepository.save(oldBeneficiary);
    }

    public void delete(Beneficiary beneficiary) {
        beneficiaryRepository.delete(beneficiary);
    }

    public List<Beneficiary> findAllByBankName(String bankName) {
        return beneficiaryRepository.findAllByBankName(bankName);
    }

    public List<Beneficiary> findAll() {
        return beneficiaryRepository.findAll();
    }

    public Beneficiary findByCustomerAccount(String account, Long id) {
        return beneficiaryRepository.findByAccountAndCustomerId(account, id).orElse(Beneficiary.ofEmpty());
    }
}
