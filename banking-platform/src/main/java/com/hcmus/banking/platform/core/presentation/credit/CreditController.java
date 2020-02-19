package com.hcmus.banking.platform.core.presentation.credit;

import com.hcmus.banking.platform.core.application.admin.CreditUseCaseService;
import com.hcmus.banking.platform.domain.credit.Credit;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/internal/credits")
@RequiredArgsConstructor
public class CreditController {
    private final CreditUseCaseService creditService;

    @GetMapping
    public Page<CreditResponse> findAllBy(Pageable pageable) {
        Page<Credit> credits = creditService.findAllBy(pageable);
        return CreditResponses.ofPage(credits, pageable);
    }

    @GetMapping("/{id}")
    public CreditResponse findById(@PathVariable Long id) {
        Credit credit = creditService.findById(id);
        return new CreditResponse(credit);
    }

    @GetMapping("/history/customer/{id}")
    public Page<CreditResponse> findByCustomerCode(@PathVariable Long id, Pageable pageable) {
        Page<Credit> credits = creditService.findAllByCustomerIdAndPaymentTransactionNotNull(id, pageable);
        return CreditResponses.ofPage(credits, pageable);
    }


    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        creditService.delete(id);
    }
}
