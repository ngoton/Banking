TRUNCATE TABLE  banking.customers CASCADE;
TRUNCATE TABLE  banking.users CASCADE;

CREATE TABLE IF NOT EXISTS banking.infos (
  id SERIAL,
  first_name VARCHAR(100) NULL,
  last_name VARCHAR(100) NULL,
  birth_date DATE NULL,
  gender VARCHAR(10) NULL,
  phone VARCHAR(20) NULL,
  address VARCHAR(255) NULL,
  users_id INT NULL,
  created_at TIMESTAMP NOT NULL,
  created_by INT NOT NULL,
  create_program VARCHAR(45) NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_infos_users
    FOREIGN KEY (users_id)
    REFERENCES banking.users (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE IF NOT EXISTS banking.staffs (
  id SERIAL,
  code VARCHAR(20) NOT NULL,
  infos_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL,
  created_by INT NOT NULL,
  create_program VARCHAR(45) NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_staffs_infos
    FOREIGN KEY (infos_id)
    REFERENCES banking.infos (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

alter table banking.customers
	add infos_id INT NOT NULL;
alter table banking.customers
	add constraint fk_customers_infos
		FOREIGN KEY (infos_id)
        REFERENCES banking.infos (id)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION;

alter table banking.customers drop constraint fk_customers_users;
alter table banking.customers drop column first_name;
alter table banking.customers drop column last_name;
alter table banking.customers drop column birth_date;
alter table banking.customers drop column gender;
alter table banking.customers drop column phone;
alter table banking.customers drop column address;
alter table banking.customers drop column users_id;