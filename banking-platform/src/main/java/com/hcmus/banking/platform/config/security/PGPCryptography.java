package com.hcmus.banking.platform.config.security;

import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.bouncycastle.openpgp.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.*;
import java.security.NoSuchProviderException;
import java.security.Security;
import java.security.SignatureException;
import java.util.Base64;
import java.util.stream.Collectors;

@Component
public class PGPCryptography {
    private static final String SECRET_KEY = "HCB_BANK";
    private static Base64.Encoder encoder = Base64.getEncoder();
    private static Base64.Decoder decoder = Base64.getDecoder();

    @Value("${banking.security.pgp.private-file}")
    private String privateFile;
    @Value("${banking.security.pgp.public-file}")
    private String publicFile;

    public PGPCryptography(){
        Security.addProvider(new org.bouncycastle.jce.provider.BouncyCastleProvider());
    }

    public PGPSecretKey getPrivateKey() throws IOException {
        ClassLoader classLoader = getClass().getClassLoader();
        InputStream inputStream = classLoader.getResourceAsStream(privateFile);
        BufferedReader br = new BufferedReader(new InputStreamReader(inputStream, "UTF-8"));
        String privateKeyContent = br.lines()
                .collect(Collectors.joining(System.lineSeparator()));
        return getPrivateKey(privateKeyContent);
    }

    public PGPSecretKey getPrivateKey(String key) throws IOException {
        key = key.replaceAll("\\n", "").replaceAll("\\r", "").replace("-----BEGIN PGP PRIVATE KEY-----", "").replace("-----END PGP PRIVATE KEY-----", "");

        byte[] keyBytes = decoder.decode(key);
        PGPObjectFactory pgpFact = new PGPObjectFactory(PGPUtil.getDecoderStream(new ByteArrayInputStream(keyBytes)));
        PGPSecretKeyRing keyRing = (PGPSecretKeyRing) pgpFact.nextObject();
        return keyRing.getSecretKey();
    }

    public PGPPublicKey getPublicKey() throws IOException {
        ClassLoader classLoader = getClass().getClassLoader();
        InputStream inputStream = classLoader.getResourceAsStream(publicFile);
        BufferedReader br = new BufferedReader(new InputStreamReader(inputStream, "UTF-8"));
        String publicKeyContent = br.lines()
                .collect(Collectors.joining(System.lineSeparator()));
        return getPublicKey(publicKeyContent);
    }

    public PGPPublicKey getPublicKey(String key) throws IOException {
        key = key.replaceAll("\\n", "").replaceAll("\\r", "").replace("-----BEGIN PUBLIC KEY-----", "").replace("-----END PUBLIC KEY-----", "");

        byte[] keyBytes = decoder.decode(key);
        PGPObjectFactory pgpFact = new PGPObjectFactory(PGPUtil.getDecoderStream(new ByteArrayInputStream(keyBytes)));
        PGPPublicKeyRing keyRing = (PGPPublicKeyRing) pgpFact.nextObject();
        return keyRing.getPublicKey();
    }

    public String sign(String plainText, PGPSecretKey key) throws Exception {
        PGPSignatureGenerator sGen = new PGPSignatureGenerator(PGPPublicKey.RSA_SIGN, PGPUtil.SHA256, "BC");
        sGen.initSign(PGPSignature.POSITIVE_CERTIFICATION, key.extractPrivateKey(SECRET_KEY.toCharArray(), "BC"));
        sGen.update(plainText.getBytes("UTF-8"));

        byte[] signature = sGen.generate().getEncoded();

        return encoder.encodeToString(signature);
    }

    public boolean verify(String plainText, String signature, PGPPublicKey key) throws SignatureException, PGPException, IOException, NoSuchProviderException {
        byte[] signatureBytes = decoder.decode(signature);
        PGPObjectFactory pgpFact = new PGPObjectFactory(PGPUtil.getDecoderStream(new ByteArrayInputStream(signatureBytes)));
        PGPSignatureList sigList = (PGPSignatureList) pgpFact.nextObject();
        PGPSignature sig = sigList.get(0);

        sig.initVerify(key, "BC");
        sig.update(plainText.getBytes());

        return sig.verify();
    }
}
