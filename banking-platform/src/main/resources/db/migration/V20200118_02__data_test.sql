INSERT INTO banking.users (id, username, password, email, role, created_at, created_by, create_program) VALUES (1, 'minh', '12213', '1231@gmail.com', '1', '2020-01-18 23:37:00.000000', 1, '1');
INSERT INTO banking.users (id, username, password, email, role, created_at, created_by, create_program) VALUES (2, '11', '3333333', '1231@22.com', '1', '2020-01-18 23:37:00.000000', 1, '1');

INSERT INTO banking.payments (id, account, balance, created_at, created_by, create_program) VALUES (2, '123123', 123123, '2020-01-18 23:39:23.000000', 1, '1');
INSERT INTO banking.payments (id, account, balance, created_at, created_by, create_program) VALUES (3, 'ddđ', 123123, '2020-01-18 23:39:23.000000', 1, '1');

INSERT INTO banking.customers (id, code, first_name, last_name, birth_date, gender, phone, address, users_id, payments_id, created_at, created_by, create_program) VALUES (3, '123123', 'ttttt', 'eeee', '2020-01-18', 'Male', '123123', '123123121', 1, 2, '2020-01-18 23:40:04.000000', 1, '1');
INSERT INTO banking.customers (id, code, first_name, last_name, birth_date, gender, phone, address, users_id, payments_id, created_at, created_by, create_program) VALUES (4, 'dfsfd', 'ttttt', 'eeee', '2020-01-18', 'Male', '123123', '123123121', 2, 3, '2020-01-18 23:40:04.000000', 1, '1');