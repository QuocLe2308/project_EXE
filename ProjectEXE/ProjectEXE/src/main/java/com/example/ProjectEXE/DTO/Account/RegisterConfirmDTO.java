package com.example.ProjectEXE.DTO.Account;

import com.example.ProjectEXE.Models.Account.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor

public class RegisterConfirmDTO extends User {
    private String otp;
//    public RegisterConfirmDTO(User user, String otp) {
//        super(
//                user.getUserID(),
//                user.getUserName(),
//                user.getEmail(),
//                user.getPasswordHash(),
//                user.getFullName(),
//                user.getPhoneNumber(),
//                user.getAddress(),
//                user.getRole(),
//                user.isDisable(),
//                user.getCreatedAt(),
//                user.getUpdatedAt()
//        );
//        this.otp = otp;
//    }
//    public User toUser() {
//        return new User(
//                this.getUserID(),
//                this.getUserName(),
//                this.getEmail(),
//                this.getPasswordHash(),
//                this.getFullName(),
//                this.getPhoneNumber(),
//                this.getAddress(),
//                this.getRole(),
//                this.isDisable(),
//                this.getCreatedAt(),
//                this.getUpdatedAt()
//        );
//    }
}
