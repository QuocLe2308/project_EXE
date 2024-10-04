package com.example.ProjectEXE.DTO.Account;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor

public class ForgotPasswordAccountDTO {
    private String email;
    private String otp;
    private String newPassword;
    private String confirmPassword;
}
