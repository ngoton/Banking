alter table banking.payment_transactions
    add partners_id INT NULL,
    add CONSTRAINT fk_payment_transactions_partners1
    FOREIGN KEY (partners_id)
    REFERENCES banking.partners (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION