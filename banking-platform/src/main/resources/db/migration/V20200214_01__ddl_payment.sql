alter table banking.beneficiarys
    add payments_id INT NULL,
    add CONSTRAINT fk_beneficiarys_payments1
    FOREIGN KEY (payments_id)
    REFERENCES banking.payments (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION