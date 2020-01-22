CREATE TABLE IF NOT EXISTS banking.otps (
  id SERIAL,
  code VARCHAR(45) NOT NULL UNIQUE,
  expired TIMESTAMP NOT NULL,
  email VARCHAR(100) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  created_by INT NOT NULL,
  create_program VARCHAR(45) NOT NULL,
  PRIMARY KEY (id));
