package com.hcmus.banking.platform.core.application.credit;

import com.hcmus.banking.platform.core.infrastructure.datasource.credit.CreditRepository;
import com.hcmus.banking.platform.domain.credit.Credit;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CreditService {
    private final CreditRepository creditRepository;

    public Page<Credit> findAllBy(Pageable pageable) {
        return creditRepository.findAllBy(pageable);
    }

    public Credit findById(Long id) {
        return creditRepository.findById(id).orElse(Credit.ofEmpty());
    }

    public Credit findByAccount(String account) {
        return creditRepository.findByAccount(account).orElse(Credit.ofEmpty());
    }
    public List<Credit> findAllByCustomerCode(String code) {
        return creditRepository.findAllByCustomerCode(code);
    }
    public List<Credit> findAllByCustomerId(Long id) {
        return creditRepository.findAllByCustomerId(id);
    }

    public void create(Credit credit) {
        creditRepository.save(credit);
    }

    public void update(Credit oldCredit, Credit credit) {
        oldCredit.setAccount(credit.getAccount());
        oldCredit.setMoney(credit.getMoney());
        oldCredit.setContent(credit.getContent());
        creditRepository.save(oldCredit);
    }

    public void delete(Credit credit) {
        creditRepository.delete(credit);
    }
}
