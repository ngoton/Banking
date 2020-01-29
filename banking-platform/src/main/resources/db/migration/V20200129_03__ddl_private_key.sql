alter table banking.partners
    add api_key VARCHAR(255) NULL,
    add secret_key TEXT NULL,
    add signature TEXT NULL,
	add private_key TEXT NULL,
	add public_key TEXT NULL,
    add encryption VARCHAR(10) NULL;

comment on column partners.api_key is 'This is a key to call external api';
comment on column partners.secret_key is 'This is a public key to encrypt data when call external api';
comment on column partners.signature is 'This is a signature when call external api';