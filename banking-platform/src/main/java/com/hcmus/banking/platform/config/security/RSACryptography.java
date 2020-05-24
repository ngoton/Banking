package com.hcmus.banking.platform.config.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import java.io.*;
import java.security.*;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;
import java.util.stream.Collectors;

@Component
public class RSACryptography {
    private static Base64.Encoder encoder = Base64.getEncoder();
    private static Base64.Decoder decoder = Base64.getDecoder();

    @Value("${banking.security.rsa.private-file}")
    private String privateFile;
    @Value("${banking.security.rsa.public-file}")
    private String publicFile;

    private Cipher cipher;
    private KeyFactory keyFactory;

    public RSACryptography() throws NoSuchAlgorithmException, NoSuchPaddingException {
        this.cipher = Cipher.getInstance("RSA");
        this.keyFactory = KeyFactory.getInstance("RSA");
    }

    public PrivateKey getPrivateKey(String key) throws InvalidKeySpecException {
        key = key.replaceAll("\\n", "").replaceAll("\\r", "").replace("-----BEGIN RSA PRIVATE KEY-----", "").replace("-----END RSA PRIVATE KEY-----", "");

        byte[] keyBytes = decoder.decode(key);
        PKCS8EncodedKeySpec spec = new PKCS8EncodedKeySpec(keyBytes);
        return keyFactory.generatePrivate(spec);
    }

    public PrivateKey getPrivateKey() throws InvalidKeySpecException, IOException {
        ClassLoader classLoader = getClass().getClassLoader();
        InputStream inputStream = classLoader.getResourceAsStream(privateFile);
        BufferedReader br = new BufferedReader(new InputStreamReader(inputStream, "UTF-8"));
        String privateKeyContent = br.lines()
                .collect(Collectors.joining(System.lineSeparator()));
        return getPrivateKey(privateKeyContent);
    }

    public PublicKey getPublicKey(String key) throws InvalidKeySpecException {
        key = key.replaceAll("\\n", "").replaceAll("\\r", "").replace("-----BEGIN PUBLIC KEY-----", "").replace("-----END PUBLIC KEY-----", "");

        byte[] keyBytes = decoder.decode(key);
        X509EncodedKeySpec spec = new X509EncodedKeySpec(keyBytes);
        return keyFactory.generatePublic(spec);
    }

    public PublicKey getPublicKey() throws InvalidKeySpecException, IOException {
        ClassLoader classLoader = getClass().getClassLoader();
        InputStream inputStream = classLoader.getResourceAsStream(publicFile);
        BufferedReader br = new BufferedReader(new InputStreamReader(inputStream, "UTF-8"));
        String publicKeyContent = br.lines()
                .collect(Collectors.joining(System.lineSeparator()));
        return getPublicKey(publicKeyContent);
    }

    public String encrypt(String plainText, PublicKey key) throws InvalidKeyException, UnsupportedEncodingException, BadPaddingException, IllegalBlockSizeException {
        this.cipher.init(Cipher.ENCRYPT_MODE, key);
        return encoder.encodeToString(cipher.doFinal(plainText.getBytes("UTF-8")));
    }

    public String decrypt(String cipherText, PrivateKey key) throws InvalidKeyException, BadPaddingException, IllegalBlockSizeException, UnsupportedEncodingException {
        this.cipher.init(Cipher.DECRYPT_MODE, key);
        return new String(cipher.doFinal(decoder.decode(cipherText)), "UTF-8");
    }

    public String sign(String plainText, PrivateKey key) throws Exception {
        Signature privateSignature = Signature.getInstance("SHA256withRSA");
        privateSignature.initSign(key);
        privateSignature.update(plainText.getBytes("UTF-8"));

        byte[] signature = privateSignature.sign();

        return encoder.encodeToString(signature);
    }

    public boolean verify(String plainText, String signature, PublicKey key) throws Exception {
        Signature publicSignature = Signature.getInstance("SHA256withRSA");
        publicSignature.initVerify(key);
        publicSignature.update(plainText.getBytes("UTF-8"));

        byte[] signatureBytes = decoder.decode(signature);

        return publicSignature.verify(signatureBytes);
    }
}
