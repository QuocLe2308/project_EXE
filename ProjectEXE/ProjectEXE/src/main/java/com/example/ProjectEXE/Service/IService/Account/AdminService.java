package com.example.ProjectEXE.Service.IService.Account;

import com.example.ProjectEXE.DTO.Account.ChangePasswordAccountDTO;
import com.example.ProjectEXE.DTO.Account.EditAccountDTO;
import com.example.ProjectEXE.DTO.Account.ForgotPasswordAccountDTO;
import com.example.ProjectEXE.DTO.Account.LoginDTO;
import com.example.ProjectEXE.Models.Account.Admin;
import jakarta.servlet.http.HttpServletRequest;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.List;

public interface AdminService {
    public String getAllAdmins();
    public String loginAdmin(LoginDTO loginDTO, HttpServletRequest request);
    public String addAdmin(Admin admin);
    public String editAdmin(EditAccountDTO editAccountDTO);
    public String deleteAdmin(Long id);
    public String forgotPasswordAdminSend(ForgotPasswordAccountDTO forgotPasswordAccountDTO, HttpServletRequest request);
    public String forgotPasswordAdminConfirm(ForgotPasswordAccountDTO forgotPasswordAccountDTO, HttpServletRequest request);
    public String changePasswordAdmin(ChangePasswordAccountDTO changePasswordAccountDTO);
    public Admin getInfoUser();
    public List<String> validateAdmin(Admin admin, String type);
    public String hashString(String input);
}
