alter table banking.debits
    add payment_transactions_id INT NULL,
    add CONSTRAINT fk_debits_payment_transactions1
    FOREIGN KEY (payment_transactions_id)
    REFERENCES banking.payment_transactions (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION;

alter table banking.credits
    add payment_transactions_id INT NULL,
    add CONSTRAINT fk_credits_payment_transactions1
    FOREIGN KEY (payment_transactions_id)
    REFERENCES banking.payment_transactions (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION;