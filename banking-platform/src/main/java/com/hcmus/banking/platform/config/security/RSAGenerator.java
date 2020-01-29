package com.hcmus.banking.platform.config.security;

import java.security.*;
import java.util.Base64;

public class RSAGenerator {
    private static final Integer KEY_LENGTH = 2048;
    private static Base64.Encoder encoder = Base64.getEncoder();

    private KeyPairGenerator keyGen;
    private KeyPair pair;
    private PrivateKey privateKey;
    private PublicKey publicKey;

    public RSAGenerator() throws NoSuchAlgorithmException {
        this.keyGen = KeyPairGenerator.getInstance("RSA");
        this.keyGen.initialize(KEY_LENGTH);
    }

    public void createKeys() {
        this.pair = this.keyGen.generateKeyPair();
        this.privateKey = pair.getPrivate();
        this.publicKey = pair.getPublic();
    }

    public PrivateKey getPrivateKey() {
        return this.privateKey;
    }

    public PublicKey getPublicKey() {
        return this.publicKey;
    }

    public String getPrivateKeyAsText(){
        String key = "-----BEGIN RSA PRIVATE KEY-----\n" +
                encoder.encodeToString(getPrivateKey().getEncoded()) +
                "\n-----END RSA PRIVATE KEY-----\n";
        return key;
    }

    public String getPublicKeyAsText(){
        String key = "-----BEGIN PUBLIC KEY-----\n" +
                    encoder.encodeToString(getPublicKey().getEncoded()) +
                    "\n-----END PUBLIC KEY-----\n";
        return key;
    }
}
