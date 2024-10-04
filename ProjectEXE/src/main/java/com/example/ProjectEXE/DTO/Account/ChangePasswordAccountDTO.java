package com.example.ProjectEXE.DTO.Account;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChangePasswordAccountDTO {
    private String oldPassword;
    private String newPassword;
    private String confirmPassword;
}
