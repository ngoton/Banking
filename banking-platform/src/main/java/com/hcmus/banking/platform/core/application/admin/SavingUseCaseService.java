package com.hcmus.banking.platform.core.application.admin;

import com.hcmus.banking.platform.core.application.saving.SavingService;
import com.hcmus.banking.platform.domain.exception.BankingServiceException;
import com.hcmus.banking.platform.domain.exception.NotFoundException;
import com.hcmus.banking.platform.domain.saving.Saving;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SavingUseCaseService {
    private final SavingService savingService;

    @Transactional(readOnly = true)
    public Page<Saving> findAllBy(Pageable pageable) {
        return savingService.findAllBy(pageable);
    }

    @Transactional(readOnly = true)
    public Saving findById(Long id) {
        Saving saving = savingService.findById(id);
        if (saving.isEmpty()) {
            throw new BankingServiceException("Saving not found");
        }
        return saving;
    }


    @Transactional(readOnly = true)
    public List<Saving> findAllByCustomerId(Long id) {
        List<Saving> savings = savingService.findAllByCustomerId(id);
        return savings;
    }

    @Transactional
    public void create(Saving saving) {
        Saving oldSaving = savingService.findByAccount(saving.getAccount());
        if (!oldSaving.isEmpty()) {
            throw new BankingServiceException("Saving account is already exists");
        }
        savingService.create(saving);
    }

    @Transactional
    public void update(Saving saving) {
        Saving oldSaving = savingService.findByAccount(saving.getAccount());
        if (oldSaving.isEmpty()) {
            throw new BankingServiceException("Saving not found");
        }
        savingService.update(oldSaving, saving);
    }

    @Transactional
    public void delete(Long id) {
        Saving saving = savingService.findById(id);
        if (saving.isEmpty()) {
            throw new BankingServiceException("Saving not found");
        }
        savingService.delete(saving);
    }
}
