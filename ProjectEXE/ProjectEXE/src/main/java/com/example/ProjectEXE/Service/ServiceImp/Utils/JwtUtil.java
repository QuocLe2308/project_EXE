package com.example.ProjectEXE.Service.ServiceImp.Utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.util.Date;

@Configuration
@ConfigurationProperties(prefix = "jwt")
public class JwtUtil {
    @Value("${jwt.secret}")
    private String secret;
    @Value("${jwt.expiration}")
    private long expiration;
    private HttpServletRequest request;

    // Setter injection cho HttpServletRequest
    @Autowired
    public void setRequest(HttpServletRequest request) {
        this.request = request;
    }

    // Tạo JWT
    public String generateToken(String username, long userID, int role) {
        return Jwts.builder()
                .claim("username",username)
                .claim("userID", userID)
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact();
    }

    // Lấy username từ JWT
    public String getUsernameFromToken(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(secret)
                .parseClaimsJws(token)
                .getBody();

        return claims.getSubject();
    }
    public Claims getClaimsFromToken(String token) {
        return Jwts.parser()
                .setSigningKey(secret)
                .parseClaimsJws(token)
                .getBody();
    }
    public Long getUserIdFromToken(String token) {
        if (validateToken(token)) {
            Claims claims = Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
            Number userId = (Number) claims.get("userID");
            return userId.longValue();
        } else {
            return 0L;
        }
    }
    public Long getUserId() {
        HttpServletRequest httpRequest = request;
        String authorizationHeader = httpRequest.getHeader("Authorization");
        String token = authorizationHeader.substring(7); // Bỏ qua phần "Bearer "
        return getUserIdFromToken(token);
    }

    public int getRoleFromToken(String token) {
        return (int) getClaimsFromToken(token).get("role");
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(secret).parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
