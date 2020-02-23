-- pass 1234567
INSERT INTO banking.users(username, password, email, role, created_at, created_by, create_program, status) VALUES ('minhphong0601', '$2a$10$aaGK3grB55n1O5Hzlp3rAOJHF3njedXy.QisNyegmLzndzxb/NCGu', 'join.keljn@gmail.com', 'USER', '2020-02-21 10:10:24.562000', 0, 'initial', 'ACTIVE');
INSERT INTO banking.infos(first_name, last_name, birth_date, gender, phone, address, users_id, created_at, created_by, create_program) VALUES ('Nguyễn Minh', 'Phong', '1996-01-06', 'Male', '090990351', 'HCM', (SELECT MAX(id) FROM banking.users), '2020-02-21 10:10:24.562000', 0, 'initial');
INSERT INTO banking.customers(code, created_at, created_by, create_program, infos_id) VALUES ('KH002', '2020-02-21 10:10:24.562000', 0, 'initial', (SELECT MAX(id) FROM banking.infos));

--Insert Payment
INSERT INTO banking.payments(account, balance, created_at, created_by, create_program) VALUES ('12345678921022020', 10000000, '2020-02-21 10:10:24.562000', 0, 'initial');
UPDATE banking.customers SET payments_id = (SELECT MAX(id) FROM banking.payments) WHERE id = (SELECT MAX(id) FROM banking.customers);

--Insert Saving
INSERT INTO banking.savings(account, balance, customers_id, created_at, created_by, create_program) VALUES ('123456789', 5300000, (SELECT MAX(id) FROM banking.customers), '2020-02-21 10:10:24.562000', 0, 'initial');

--Create Function insert internal Benificiary
CREATE TYPE customer AS (id integer, first_name character varying, last_name character varying, account character varying, payments_id integer);

CREATE OR REPLACE FUNCTION insertQuery(idBenificiary integer, idCustomer integer) RETURNS VOID AS $$
DECLARE cur CURSOR FOR 
			SELECT c.id, i.first_name, i.last_name, p.account, p.id
			FROM banking.customers c 
			JOIN banking.infos i ON c.infos_id = i.id
			JOIN banking.payments p ON c.payments_id = p.id
			WHERE c.id = idBenificiary;
		cus customer;
BEGIN
  OPEN cur;
  FETCH cur INTO cus.id, cus.first_name, cus.last_name, cus.account, cus.payments_id;    -- Read a row from the cursor
  WHILE FOUND LOOP
    INSERT INTO banking.beneficiarys(name, short_name, account, bank_name, customers_id, created_at, created_by, create_program, payments_id) 
	VALUES (cus.first_name || '' || cus.last_name, '',cus.account, 'HCB_BANK', idCustomer, '2020-02-21 10:10:24.562000', 0, 'initial', cus.payments_id); --Insert beneficiary by cursor
    FETCH cur INTO cus.id, cus.first_name, cus.last_name, cus.account, cus.payments_id;  -- Keep on reading rows
  END LOOP;
  CLOSE cur;
END;
$$ LANGUAGE plpgsql;

-- pass 1234567
INSERT INTO banking.users(username, password, email, role, created_at, created_by, create_program, status) VALUES ('hongngoc123', '$2a$10$aaGK3grB55n1O5Hzlp3rAOJHF3njedXy.QisNyegmLzndzxb/NCGu', 'hongngoc321@gmail.com', 'USER', '2020-02-21 10:10:24.562000', 0, 'initial', 'ACTIVE');
INSERT INTO banking.infos(first_name, last_name, birth_date, gender, phone, address, users_id, created_at, created_by, create_program) VALUES ('Trịnh Hồng', 'Ngọc', '2000-05-30', 'Female', '090994103', 'HCM', (SELECT MAX(id) FROM banking.users), '2020-02-21 10:10:24.562000', 0, 'initial');
INSERT INTO banking.customers(code, created_at, created_by, create_program, infos_id) VALUES ('KH003', '2020-02-21 10:10:24.562000', 0, 'initial', (SELECT MAX(id) FROM banking.infos));

--Insert Payment
INSERT INTO banking.payments(account, balance, created_at, created_by, create_program) VALUES ('12131415121022020', 15000000, '2020-02-21 10:10:24.562000', 0, 'initial');
UPDATE banking.customers SET payments_id = (SELECT MAX(id) FROM banking.payments) WHERE id = (SELECT MAX(id) FROM banking.customers);

--Insert Saving
INSERT INTO banking.savings(account, balance, customers_id, created_at, created_by, create_program) VALUES ('98654321', 800000, (SELECT MAX(id) FROM banking.customers), '2020-02-21 10:10:24.562000', 0, 'initial');

--Insert internal Benificiary
SELECT insertQuery((SELECT MAX(id) FROM banking.customers) - 1, (SELECT MAX(id) FROM banking.customers));
SELECT insertQuery((SELECT MAX(id) FROM banking.customers), (SELECT MAX(id) FROM banking.customers) - 1);

--Insert external Benificiary
INSERT INTO banking.beneficiarys(name, short_name, account, bank_name, customers_id, created_at, created_by, create_program) VALUES ('Hồ Quang Phát', 'Hồ Phát', '5834593514230', 'GROUP_06', (SELECT MAX(id) FROM banking.customers), '2020-02-21 10:10:24.562000', 0, 'initial'); --Insert beneficiary
INSERT INTO banking.beneficiarys(name, short_name, account, bank_name, customers_id, created_at, created_by, create_program) VALUES ('Nguyễn Văn Khang', 'Văn Khang', '529585234820', 'GROUP_19', (SELECT MAX(id) FROM banking.customers) - 1, '2020-02-21 10:10:24.562000', 0, 'initial'); --Insert beneficiary








