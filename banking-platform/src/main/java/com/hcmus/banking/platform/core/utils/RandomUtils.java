package com.hcmus.banking.platform.core.utils;

import java.security.SecureRandom;
import java.time.ZonedDateTime;
import java.util.Base64;
import java.util.Random;

public class RandomUtils {
    private static final String CODE_KEY = "9999";
    private static final Integer CODE_LENGTH = 6;

    public static String generate(){
        Long seed = Long.valueOf(CODE_KEY) * 1000 + ZonedDateTime.now().toInstant().toEpochMilli();
        return generateRandom(seed, CODE_LENGTH);
    }

    public static String generateApiKey(){
        SecureRandom secureRandom = new SecureRandom();
        byte[] token = new byte[16];
        secureRandom.nextBytes(token);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(token).toUpperCase();
    }

    private static String generateRandom(Long seed, Integer length) {
        Random random = new SecureRandom();
        random.setSeed(seed);

        Long randomLong = random.nextLong();
        return  Long.toString(randomLong).substring(1, length+1);
    }
}
