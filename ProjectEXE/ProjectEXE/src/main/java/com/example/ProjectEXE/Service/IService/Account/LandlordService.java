package com.example.ProjectEXE.Service.IService.Account;

import com.example.ProjectEXE.DTO.Account.ChangePasswordAccountDTO;
import com.example.ProjectEXE.DTO.Account.EditAccountDTO;
import com.example.ProjectEXE.DTO.Account.ForgotPasswordAccountDTO;
import com.example.ProjectEXE.DTO.Account.LoginDTO;
import com.example.ProjectEXE.Models.Account.Landlord;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;

public interface LandlordService {
    public String getAllLandlords();
    public String loginLandlord(LoginDTO loginDTO, HttpServletRequest request);
    public String addLandlord(Landlord landlord);
    public String editLandlord(EditAccountDTO editAccountDTO);
    public String deleteLandlord(Long id);
    public String forgotPasswordLandlordSend(ForgotPasswordAccountDTO forgotPasswordAccountDTO, HttpServletRequest request);
    public String forgotPasswordLandlordConfirm(ForgotPasswordAccountDTO forgotPasswordAccountDTO, HttpServletRequest request);
    public String changePasswordLandlord(ChangePasswordAccountDTO changePasswordAccountDTO);
    public Landlord getInfoUser();
    public List<String> validateLandlord(Landlord landlord, String type);
    public String hashString(String input);
}
