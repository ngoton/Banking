package com.hcmus.banking.platform.core.application.debit;

import com.hcmus.banking.platform.core.infrastructure.datasource.debit.DebitRepository;
import com.hcmus.banking.platform.domain.debit.Debit;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DebitService {
    private final DebitRepository debitRepository;

    public Page<Debit> findAllBy(Pageable pageable) {
        return debitRepository.findAllByOrderByIdDesc(pageable);
    }

    public Debit findById(Long id) {
        return debitRepository.findById(id).orElse(Debit.ofEmpty());
    }

    public Debit findByAccount(String account) {
        return debitRepository.findByAccount(account).orElse(Debit.ofEmpty());
    }
    public Page<Debit> findAllByCustomerCode(String code, Pageable pageable) {
        return debitRepository.findAllByCustomerCodeOrderByIdDesc(code, pageable);
    }
    public Page<Debit> findAllByCustomerId(Long id, Pageable pageable) {
        return debitRepository.findAllByCustomerIdOrderByIdDesc(id, pageable);
    }

    public void create(Debit debit) {
        debitRepository.save(debit);
    }

    public void update(Debit oldDebit, Debit debit) {
        oldDebit.setAccount(debit.getAccount());
        oldDebit.setMoney(debit.getMoney());
        oldDebit.setContent(debit.getContent());
        debitRepository.save(oldDebit);
    }

    public void delete(Debit debit) {
        debitRepository.delete(debit);
    }
}
