alter table banking.partners
    add api_key VARCHAR(255) NULL,
    add api_private_key TEXT NULL,
    add api_public_key TEXT NULL,
	add private_key TEXT NULL,
	add public_key TEXT NULL,
    add encryption VARCHAR(10) NULL;

comment on column partners.api_key is 'This is a key generated by external system';
comment on column partners.api_private_key is 'This is a private key generated by external system';
comment on column partners.api_public_key is 'This is a public key generated by external system';