package com.example.ProjectEXE.DTO.Account;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EditAccountDTO {
    private Long id;
    private String fullName;
    private String phoneNumber;
    private String address;
}
