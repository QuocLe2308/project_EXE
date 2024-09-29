package com.example.ProjectEXE.Controller.Account;

import com.example.ProjectEXE.DTO.Account.*;
import com.example.ProjectEXE.Models.Account.User;
import com.example.ProjectEXE.Service.IService.Account.UserService;
import com.example.ProjectEXE.Service.ServiceImp.Account.UserServiceImp;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/user")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class UserController {
    @Autowired
    private final UserService userService;

    @GetMapping("/viewList")
    public String getAllAUser() {
        return userService.getAllUser();
    }


    @PostMapping("/login")
    public String loginUser(@RequestBody LoginDTO loginDTO, HttpServletRequest request) {
        return userService.loginUser(loginDTO, request);
    }

    @PostMapping("/register_send")
    public String registerSendUser(@RequestBody RegisterSendDTO registerSendDTO, HttpServletRequest request) {
        return userService.registerSendUser(registerSendDTO, request);
    }
    @PostMapping("/register_confirm")
    public String registerConfirmUser(@RequestBody RegisterConfirmDTO registerConfirmDTO, HttpServletRequest request) {
        return userService.registerConfirmUser(registerConfirmDTO, request);
    }

    @PutMapping()
    public String editUser(@RequestBody EditAccountDTO editAccountDTO, HttpServletRequest request) {
        return userService.editUser(editAccountDTO, request);
    }
    @DeleteMapping("/delete/{id}")
    public String deleteUser(@PathVariable Long id) {
        return userService.deleteUser(id);
    }
    @PostMapping("/forgot_password_send")
    public String forgotPasswordAdminSend(@RequestBody ForgotPasswordAccountDTO forgotPasswordAccountDTO, HttpServletRequest request) {
        return userService.forgotPasswordUserSend(forgotPasswordAccountDTO, request);
    }

    @PostMapping("/forgot_password_confirm")
    public String forgotPasswordAdminConfirm(@RequestBody ForgotPasswordAccountDTO forgotPasswordAccountDTO, HttpServletRequest request) {
        return userService.forgotPasswordUserConfirm(forgotPasswordAccountDTO, request);
    }

    @PostMapping("/change_password")
    public String changePasswordAdmin(@RequestBody ChangePasswordAccountDTO changePasswordAccountDTO) {
        return userService.changePasswordUser(changePasswordAccountDTO);
    }

}
