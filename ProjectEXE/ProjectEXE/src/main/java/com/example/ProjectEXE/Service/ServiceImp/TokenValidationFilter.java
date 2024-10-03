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
            "/api/captcha",
            "/api/admin/login",
            "/api/admin/forgot_password_send",
            "/api/admin/forgot_password_confirm",
            "/api/user/register_send",
            "/api/user/register_confirm",
            "/api/user/login",
            "/api/user/forgot_password_send",
            "/api/user/forgot_password_confirm",
            "/api/landlord/login",
            "/api/landlord/forgot_password_send",
            "/api/landlord/forgot_password_confirm"
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

        if (BYPASS_URLS.contains(requestURI)) {
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

        int role = jwtUtil.getRoleFromToken(token);
        if ((requestURI.equals("/api/admin/add") ||
                requestURI.equals("/api/landlord/add") ||
                requestURI.equals("/api/admin/viewList") ||
                requestURI.equals("/api/user/viewList") ||
                requestURI.equals("/api/landlord/viewList") ||
                requestURI.equals("/api/payment/viewList") ||
                requestURI.equals("/api/payment/edit") ||
                requestURI.startsWith("/api/admin/delete") ||
                requestURI.startsWith("/api/user/delete") ||
                requestURI.startsWith("/api/landlord/delete") ||
                requestURI.startsWith("/api/property/delete/")
                ) &&
                role != 1) { 
            httpResponse.sendError(HttpServletResponse.SC_FORBIDDEN, "You do not have permission to access this resource!");
            return;
        }

//        if ((requestURI.equals("/api/property/add") && role != 2)) {
//            httpResponse.sendError(HttpServletResponse.SC_FORBIDDEN, "You do not have permission to do this action!");
//            return;
//        }

        chain.doFilter(request, response);
    }

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
    }

    @Override
    public void destroy() {
    }
}

