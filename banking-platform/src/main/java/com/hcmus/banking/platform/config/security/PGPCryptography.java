package com.hcmus.banking.platform.config.security;

import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.bouncycastle.openpgp.*;
import org.springframework.stereotype.Component;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.security.NoSuchProviderException;
import java.security.Security;
import java.security.SignatureException;
import java.util.Base64;

@Component
public class PGPCryptography {
    private static Base64.Decoder decoder = Base64.getDecoder();

    public PGPCryptography(){
        Security.addProvider(new BouncyCastleProvider());
    }

    public PGPPublicKey getPublicKey(String key) throws IOException {
        key = key.replaceAll("\\n", "").replaceAll("\\r", "").replace("-----BEGIN PUBLIC KEY-----", "").replace("-----END PUBLIC KEY-----", "");

        byte[] keyBytes = decoder.decode(key);
        PGPObjectFactory pgpFact = new PGPObjectFactory(PGPUtil.getDecoderStream(new ByteArrayInputStream(keyBytes)));
        PGPPublicKeyRing keyRing = (PGPPublicKeyRing) pgpFact.nextObject();
        return keyRing.getPublicKey();
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
