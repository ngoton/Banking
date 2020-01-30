package com.hcmus.banking.platform.config.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.security.*;
import java.util.Base64;

@Component
public class RSAGenerator {
    private static final Integer KEY_LENGTH = 2048;
    private static Base64.Encoder encoder = Base64.getEncoder();

    @Value("${banking.security.rsa.private-file}")
    private String privateFile;
    @Value("${banking.security.rsa.public-file}")
    private String publicFile;

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

    public void writePrivateKeyFile() throws IOException {
        writeToFile(privateFile, getPrivateKey().getEncoded());
    }

    public void writePublicKeyFile() throws IOException {
        writeToFile(publicFile, getPublicKey().getEncoded());
    }

    private void writeToFile(String path, byte[] key) throws IOException {
        File f = new File(path);
        f.getParentFile().mkdirs();

        FileOutputStream fos = new FileOutputStream(f);
        fos.write(key);
        fos.flush();
        fos.close();
    }
}
