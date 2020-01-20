package com.hcmus.banking.platform.config.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import javax.annotation.PostConstruct;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import java.util.stream.Collectors;

@Component
public class TokenProvider {
    private final Logger log = LoggerFactory.getLogger(TokenProvider.class);

    private static final String AUTHORITIES_KEY = "auth";
    private Key key;

    @Value("${banking.security.authentication.jwt.token-validity-in-seconds}")
    private long tokenValidityInMilliseconds;

    @Value("${banking.security.authentication.jwt.token-validity-in-seconds-for-remember-me}")
    private long tokenValidityInMillisecondsForRememberMe;

    @Value("${banking.security.authentication.jwt.base64-secret}")
    private String secretKey;


    public TokenProvider() {
    }

    @PostConstruct
    public void init() {
        byte[] keyBytes;

        if (!StringUtils.isEmpty(secretKey)) {
            log.warn("Warning: the JWT key used is not Base64-encoded. " +
                    "We recommend using the `banking.security.authentication.jwt.base64-secret` key for optimum security.");
            keyBytes = secretKey.getBytes(StandardCharsets.UTF_8);
        } else {
            log.debug("Using a Base64-encoded JWT secret key");
            keyBytes = Decoders.BASE64.decode(secretKey);
        }
        this.key = Keys.hmacShaKeyFor(keyBytes);
        this.tokenValidityInMilliseconds =
                1000 * tokenValidityInMilliseconds;
        this.tokenValidityInMillisecondsForRememberMe =
                1000 * tokenValidityInMillisecondsForRememberMe;
    }

    public String createToken(Authentication authentication, boolean rememberMe) {
        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        long now = (new Date()).getTime();
        Date validity;
        if (rememberMe) {
            validity = new Date(now + this.tokenValidityInMillisecondsForRememberMe);
        } else {
            validity = new Date(now + this.tokenValidityInMilliseconds);
        }

        return Jwts.builder()
                .setSubject(authentication.getName())
                .claim(AUTHORITIES_KEY, authorities)
                .signWith(key, SignatureAlgorithm.HS256)
                .setExpiration(validity)
                .compact();
    }

    private Claims getAllClaimsFromToken(String token) {
        return Jwts.parser()
                .setSigningKey(key)
                .parseClaimsJws(token)
                .getBody();
    }

    public String getUsername(String token) {
        Claims claims = this.getAllClaimsFromToken(token);
        return claims.getSubject();
    }

    private boolean isTakeEffect(String token) {
        Date expiration = this.getAllClaimsFromToken(token).getExpiration();
        return expiration.after(new Date());
    }

    public boolean validateToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(key).parseClaimsJws(authToken);
            return true;
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            log.info("Invalid JWT signature.");
            log.trace("Invalid JWT signature trace: {}", e);
        } catch (ExpiredJwtException e) {
            log.info("Expired JWT token.");
            log.trace("Expired JWT token trace: {}", e);
        } catch (UnsupportedJwtException e) {
            log.info("Unsupported JWT token.");
            log.trace("Unsupported JWT token trace: {}", e);
        } catch (IllegalArgumentException e) {
            log.info("JWT token compact of handler are invalid.");
            log.trace("JWT token compact of handler are invalid trace: {}", e);
        }
        return false;
    }

    public boolean isTokenTakeEffect(String authToken, UserDetails userDetails) {
        String userName = this.getAllClaimsFromToken(authToken).getSubject();
        return (userName.equals(userDetails.getUsername())
                && isTakeEffect(authToken));
    }

}
