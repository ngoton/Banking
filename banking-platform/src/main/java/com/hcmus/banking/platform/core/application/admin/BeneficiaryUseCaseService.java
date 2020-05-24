package com.hcmus.banking.platform.core.application.admin;

import com.hcmus.banking.platform.core.application.beneficiary.BeneficiaryService;
import com.hcmus.banking.platform.core.application.customer.CustomerService;
import com.hcmus.banking.platform.core.application.paymentTransaction.PaymentTransactionService;
import com.hcmus.banking.platform.domain.beneficiary.Beneficiary;
import com.hcmus.banking.platform.domain.exception.BankingServiceException;
import com.hcmus.banking.platform.domain.exception.NotFoundException;
import com.hcmus.banking.platform.domain.paymentTransaction.PaymentTransaction;
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
    private final PaymentTransactionService paymentTransactionService;

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
        Beneficiary oldBeneficiary = beneficiaryService.findByCustomerAccount(beneficiary.getAccount(), beneficiary.getCustomer().getId());
        if (oldBeneficiary.isEmpty()) {
            throw new NotFoundException();
        }
        beneficiaryService.update(oldBeneficiary, beneficiary);
    }

    @Transactional
    public void delete(Long id) {
        List<PaymentTransaction> paymentTransactions= paymentTransactionService.findAllByBeneficiaryId(id);
        if(!paymentTransactions.isEmpty()){
            throw new BankingServiceException("The account has generated the transaction");
        }
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

    @Transactional(readOnly = true)
    public List<Beneficiary> findInternal(Long id) {
        List<Beneficiary> beneficiaries = beneficiaryService.findAll(id);
        return beneficiaries.stream()
                .filter(beneficiary -> beneficiary.isInternal())
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<Beneficiary> findExternal(Long id) {
        List<Beneficiary> beneficiaries = beneficiaryService.findAll(id);
        return beneficiaries.stream()
                .filter(beneficiary -> !beneficiary.isInternal())
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public Beneficiary findByCustomerAccount(String account, Long id) {
        Beneficiary beneficiary = beneficiaryService.findByCustomerAccount(account, id);
        return beneficiary;
    }
}
