alter table banking.debits
    add credits_id INT NULL,
    add CONSTRAINT fk_debits_credits1
    FOREIGN KEY (credits_id)
    REFERENCES banking.credits (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION;