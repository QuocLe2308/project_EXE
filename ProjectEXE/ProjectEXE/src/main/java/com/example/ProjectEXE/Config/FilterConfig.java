package com.example.ProjectEXE.Config;
import com.example.ProjectEXE.Service.ServiceImp.TokenValidationFilter;
import com.example.ProjectEXE.Service.ServiceImp.Utils.JwtUtil;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FilterConfig {
    private final JwtUtil jwtUtil;

    public FilterConfig(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Bean
    public FilterRegistrationBean<TokenValidationFilter> tokenValidationFilter() {
        FilterRegistrationBean<TokenValidationFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(new TokenValidationFilter(jwtUtil));
        registrationBean.addUrlPatterns("/*");
        return registrationBean;
    }

}
