package com.hcmus.banking.platform.config.security;

import org.bouncycastle.crypto.generators.RSAKeyPairGenerator;
import org.bouncycastle.crypto.params.RSAKeyGenerationParameters;
import org.bouncycastle.openpgp.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.math.BigInteger;
import java.security.*;
import java.util.Base64;
import java.util.Date;

@Component
public class PGPGenerator {
    private static final Integer KEY_LENGTH = 2048;
    private static final String SECRET_KEY = "HCB_BANK";
    private static Base64.Encoder encoder = Base64.getEncoder();

    @Value("${banking.security.pgp.private-file}")
    private String privateFile;
    @Value("${banking.security.pgp.public-file}")
    private String publicFile;

    private KeyPairGenerator keyGen;
    private KeyPair pair;
    private PGPSecretKeyRing privateKey;
    private PGPPublicKeyRing publicKey;

    public PGPGenerator() throws NoSuchAlgorithmException, NoSuchProviderException {
        this.keyGen = KeyPairGenerator.getInstance("RSA", "BC");
        this.keyGen.initialize(KEY_LENGTH);
    }

    public void generateKeyPair() throws PGPException, NoSuchProviderException, IOException {

        RSAKeyPairGenerator kpg = new RSAKeyPairGenerator();
        kpg.init(new RSAKeyGenerationParameters(BigInteger.valueOf(0x10001), new SecureRandom(), 2048, 12));

        pair = keyGen.generateKeyPair();
        PGPKeyPair pgpKeyPair = new PGPKeyPair(PGPPublicKey.RSA_SIGN, pair, new Date());

        PGPKeyRingGenerator    keyRingGen = new PGPKeyRingGenerator(PGPSignature.POSITIVE_CERTIFICATION, pgpKeyPair,
                SECRET_KEY, PGPEncryptedData.AES_256, SECRET_KEY.toCharArray(), null, null, new SecureRandom(), "BC");

        privateKey = keyRingGen.generateSecretKeyRing();
        publicKey = keyRingGen.generatePublicKeyRing();

        String pub = encoder.encodeToString(publicKey.getEncoded());
        String pri = encoder.encodeToString(privateKey.getEncoded());
    }
}
