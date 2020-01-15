CREATE SCHEMA IF NOT EXISTS banking;

-- -----------------------------------------------------
-- Table banking.users
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS banking.users (
  id SERIAL,
  username VARCHAR(45) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL,
  role VARCHAR(45) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  created_by INT NOT NULL,
  create_program VARCHAR(45) NOT NULL,
  PRIMARY KEY (id));


-- -----------------------------------------------------
-- Table banking.payments
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS banking.payments (
  id SERIAL,
  account VARCHAR(45) NOT NULL UNIQUE,
  balance DECIMAL NOT NULL,
  created_at TIMESTAMP NOT NULL,
  created_by INT NOT NULL,
  create_program VARCHAR(45) NOT NULL,
  PRIMARY KEY (id));


-- -----------------------------------------------------
-- Table banking.customers
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS banking.customers (
  id SERIAL,
  code VARCHAR(20) NOT NULL UNIQUE,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  birth_date DATE NOT NULL,
  gender VARCHAR(10) NOT NULL,
  phone VARCHAR(20) NULL,
  address VARCHAR(255) NULL,
  users_id INT NOT NULL,
  payments_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL,
  created_by INT NOT NULL,
  create_program VARCHAR(45) NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_customers_users
    FOREIGN KEY (users_id)
    REFERENCES banking.users (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_customers_payments1
    FOREIGN KEY (payments_id)
    REFERENCES banking.payments (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table banking.savings
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS banking.savings (
  id SERIAL,
  account VARCHAR(45) NOT NULL UNIQUE,
  balance DECIMAL NOT NULL,
  customers_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL,
  created_by INT NOT NULL,
  create_program VARCHAR(45) NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_savings_customers1
    FOREIGN KEY (customers_id)
    REFERENCES banking.customers (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table banking.saving_transactions
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS banking.saving_transactions (
  id SERIAL,
  code VARCHAR(45) NOT NULL UNIQUE,
  money DECIMAL NOT NULL,
  content VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  created_by INT NOT NULL,
  create_program VARCHAR(45) NOT NULL,
  savings_id INT NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_saving_transactions_savings1
    FOREIGN KEY (savings_id)
    REFERENCES banking.savings (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table banking.beneficiarys
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS banking.beneficiarys (
  id SERIAL,
  name VARCHAR(45) NOT NULL,
  short_name VARCHAR(45) NULL,
  account VARCHAR(45) NOT NULL UNIQUE,
  bank_name VARCHAR(45) NOT NULL,
  customers_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL,
  created_by INT NOT NULL,
  create_program VARCHAR(45) NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_beneficiarys_customers1
    FOREIGN KEY (customers_id)
    REFERENCES banking.customers (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table banking.payment_transactions
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS banking.payment_transactions (
  id SERIAL,
  code VARCHAR(45) NOT NULL UNIQUE,
  money DECIMAL NOT NULL,
  content VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  created_by INT NOT NULL,
  create_program VARCHAR(45) NOT NULL,
  payments_id INT NOT NULL,
  beneficiarys_id INT NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_payment_transactions_payments1
    FOREIGN KEY (payments_id)
    REFERENCES banking.payments (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_payment_transactions_beneficiarys1
    FOREIGN KEY (beneficiarys_id)
    REFERENCES banking.beneficiarys (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table banking.credits
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS banking.credits (
  id SERIAL,
  account VARCHAR(45) NOT NULL,
  money DECIMAL NOT NULL,
  content VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  created_by INT NOT NULL,
  create_program VARCHAR(45) NOT NULL,
  status INT NULL,
  customers_id INT NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_credits_customers1
    FOREIGN KEY (customers_id)
    REFERENCES banking.customers (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table banking.debits
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS banking.debits (
  id SERIAL,
  account VARCHAR(45) NOT NULL,
  money DECIMAL NOT NULL,
  content VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  created_by INT NOT NULL,
  create_program VARCHAR(45) NOT NULL,
  status INT NULL,
  customers_id INT NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_debits_customers1
    FOREIGN KEY (customers_id)
    REFERENCES banking.customers (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table banking.partners
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS banking.partners (
  id SERIAL,
  name VARCHAR(100) NOT NULL UNIQUE,
  key VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP NOT NULL,
  created_by INT NOT NULL,
  create_program VARCHAR(45) NOT NULL,
  PRIMARY KEY (id));