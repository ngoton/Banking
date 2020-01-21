package com.hcmus.banking.platform.core.presentation.authentication;

import com.hcmus.banking.platform.config.jwt.JWTFilter;
import com.hcmus.banking.platform.config.jwt.TokenProvider;
import com.hcmus.banking.platform.domain.exception.UnauthorizedException;
import lombok.Getter;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.io.IOException;

@RequiredArgsConstructor
@RestController
@RequestMapping("/auth")
public class AuthController {
    @NonNull
    private final TokenProvider tokenProvider;

    @NonNull
    private final AuthenticationManager authenticationManager;

    @NotNull
    private final UserDetailsService userDetailsService;

    @PostMapping("/authenticate")
    public ResponseEntity<JWTToken> authenticate(@Valid @RequestBody LoginRequest loginRequest) {
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword());
        Authentication authentication = this.authenticationManager.authenticate(authenticationToken);
        return token(authentication, loginRequest.getRememberMe());
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<JWTToken> refreshToken(@Valid @RequestBody RefreshTokenRequest refreshTokenRequest) {
        if (!tokenProvider.validateToken(refreshTokenRequest.getToken())) {
            throw new UnauthorizedException();
        }
        String userName = this.tokenProvider.getUsername(refreshTokenRequest.getToken());
        if (!StringUtils.hasText(userName)) {
            throw new UnauthorizedException();
        }
        UserDetails userDetails = userDetailsService.loadUserByUsername(userName);
        if (!tokenProvider.isTokenTakeEffect(refreshTokenRequest.getToken(), userDetails)) {
            throw new UnauthorizedException();
        }
        Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, userDetails.getPassword(), userDetails.getAuthorities());
        return token(authentication, false);
    }

    private ResponseEntity<JWTToken> token(Authentication authentication, boolean remember){
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = tokenProvider.createToken(authentication, remember);
        String refreshToken = tokenProvider.createRefreshToken(authentication);
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(JWTFilter.AUTHORIZATION_HEADER, "Bearer " + token);
        return new ResponseEntity<>(new JWTToken(token, refreshToken), httpHeaders, HttpStatus.OK);
    }

    @Getter
    public class JWTToken {
        private String accessToken;
        private String refreshToken;

        JWTToken(String accessToken, String refreshToken) {
            this.accessToken = accessToken;
            this.refreshToken = refreshToken;
        }
    }
}