package com.example.ProjectEXE.Service.ServiceImp;

import com.example.ProjectEXE.Service.ServiceImp.Utils.JwtUtil;
import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.FilterConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@WebFilter("/*")
@CrossOrigin(origins = "http://localhost:3000")
public class TokenValidationFilter implements Filter {

    private final JwtUtil jwtUtil;

    public TokenValidationFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    // List of endpoints that should bypass authentication
    private final List<String> BYPASS_URLS = Arrays.asList(
            "/api/account/captcha",
            "/api/account/login",
            "/api/activity",
            "/api/user/captcha",
            "/api/user/login",
            "/api/doctor/export",
            "/api/doctor/import"
    );

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {


        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;

        String requestURI = httpRequest.getRequestURI();

        String requestMethod = httpRequest.getMethod();
        if ("OPTIONS".equals(requestMethod)) {
            chain.doFilter(request, response);
            return;
        }
        // Allow some endpoints to bypass authentication
        if (BYPASS_URLS.contains(requestURI) || 1 == 1) {
            chain.doFilter(request, response);
            return;
        }

        String authorizationHeader = httpRequest.getHeader("Authorization");
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            httpResponse.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Token not found or token format is incorrect!");
            return;
        }

        String token = authorizationHeader.substring(7);
        if (!jwtUtil.validateToken(token)) {
            httpResponse.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Token is invalid or expired!");
            return;
        }

        // Get user role from token
        int role = jwtUtil.getRoleFromToken(token);

        // Check role for specific endpoint
        if (requestURI.equals("/api/account/add") && role != 1) {
            httpResponse.sendError(HttpServletResponse.SC_FORBIDDEN, "You do not have permission to access this resource!");
            return;
        }

        chain.doFilter(request, response);
    }

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
    }

    @Override
    public void destroy() {
    }
}

