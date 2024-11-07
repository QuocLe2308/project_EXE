package com.example.ProjectEXE.Service.IService.Account;

import com.example.ProjectEXE.DTO.Account.*;
import com.example.ProjectEXE.Models.Account.User;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;

public interface UserService {
    public String getAllUser();
    public String loginUser(LoginDTO loginDTO, HttpServletRequest request);
    public String registerSendUser(RegisterSendDTO registerSendDTO, HttpServletRequest request);
    public String registerConfirmUser(RegisterConfirmDTO registerConfirmDTO, HttpServletRequest request);
    public String editUser(EditAccountDTO editAccountDTO, HttpServletRequest request);
    public String hashString(String input);
    public List<String> validateUser(User user, String type);
    public List<String> validateEditUser(EditAccountDTO editAccountDTO);
    public String deleteUser(Long id);
    public String forgotPasswordUserSend(ForgotPasswordAccountDTO forgotPasswordAccountDTO, HttpServletRequest request);
    public String forgotPasswordUserConfirm(ForgotPasswordAccountDTO forgotPasswordAccountDTO, HttpServletRequest request);
    public String changePasswordUser(ChangePasswordAccountDTO changePasswordAccountDTO);
    public String getById(Long id);
    public String getInfoUser();

}
