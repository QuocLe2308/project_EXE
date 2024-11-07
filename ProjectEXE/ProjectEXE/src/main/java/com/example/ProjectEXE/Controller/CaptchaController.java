package com.example.ProjectEXE.Controller;

import com.example.ProjectEXE.Service.ServiceImp.CaptchaServiceImp;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/api/captcha")
@AllArgsConstructor
public class CaptchaController {
    private CaptchaServiceImp captchaServiceImp;
    @GetMapping()
    public String generateCaptcha(HttpServletRequest request) throws IOException {
        return captchaServiceImp.generateCaptcha(request);
    }
}
