package com.example.ProjectEXE.DTO.Account;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor

public class RegisterSendDTO {
    private String username;
    private String email;
    private String passwordHash;
    private String fullName;
    private String phoneNumber;
    private String address;
}
