package com.hcmus.banking.platform.core.utils;

import java.security.SecureRandom;
import java.time.ZonedDateTime;
import java.util.Random;

public class RandomUtil {
    private static final String CODE_KEY = "9999";
    private static final Integer CODE_LENGTH = 6;

    public static String generate(){
        Long seed = Long.valueOf(CODE_KEY) * 1000 + ZonedDateTime.now().toInstant().toEpochMilli();
        return generateRandom(seed);
    }

    private static String generateRandom(Long seed) {
        Random random = new SecureRandom();
        random.setSeed(seed);

        Long randomLong = random.nextLong();
        return  Long.toString(randomLong).substring(1, CODE_LENGTH+1);
    }
}
