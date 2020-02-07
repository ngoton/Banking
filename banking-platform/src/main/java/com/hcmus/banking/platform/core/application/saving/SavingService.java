package com.hcmus.banking.platform.core.application.saving;

import com.hcmus.banking.platform.core.infrastructure.datasource.saving.SavingRepository;
import com.hcmus.banking.platform.domain.saving.Saving;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SavingService {
    private final SavingRepository savingRepository;

    public Page<Saving> findAllBy(Pageable pageable) {
        return savingRepository.findAllBy(pageable);
    }

    public Saving findById(Long id) {
        return savingRepository.findById(id).orElse(Saving.ofEmpty());
    }

    public Saving findByAccount(String account) {
        return savingRepository.findByAccount(account).orElse(Saving.ofEmpty());
    }

    public List<Saving> findAllByCustomerId(Long id) {
        return savingRepository.findAllByCustomerId(id);
    }

    public void create(Saving saving) {
        savingRepository.save(saving);
    }

    public void update(Saving oldSaving, Saving saving) {
        oldSaving.setBalance(saving.getBalance());
        savingRepository.save(oldSaving);
    }

    public void delete(Saving saving) {
        savingRepository.delete(saving);
    }
}
