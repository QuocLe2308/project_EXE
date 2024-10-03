package com.example.ProjectEXE.Controller.Account;

import com.example.ProjectEXE.DTO.Account.ChangePasswordAccountDTO;
import com.example.ProjectEXE.DTO.Account.EditAccountDTO;
import com.example.ProjectEXE.DTO.Account.ForgotPasswordAccountDTO;
import com.example.ProjectEXE.DTO.Account.LoginDTO;
import com.example.ProjectEXE.Models.Account.Landlord;
import com.example.ProjectEXE.Service.IService.Account.LandlordService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/landlord")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class LandlordController {

    @Autowired
    private final LandlordService landlordService;

    @GetMapping("/viewList")
    public String getAllLandlord() {
        return landlordService.getAllLandlords();
    }

    @PostMapping("/add")
    public String addAdmin(@RequestBody Landlord landlord) {
        return landlordService.addLandlord(landlord);
    }

    @PutMapping()
    public String editAdmin(@RequestBody EditAccountDTO editAccountDTO) {
        return landlordService.editLandlord(editAccountDTO);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteAdmin(@PathVariable Long id) {
        return landlordService.deleteLandlord(id);
    }

    @PostMapping("/login")
    public String loginAdmin(@RequestBody LoginDTO LoginRequestDTO, HttpServletRequest request) {
        return landlordService.loginLandlord(LoginRequestDTO, request);
    }

    @PostMapping("/forgot_password_send")
    public String forgotPasswordAdminSend(@RequestBody ForgotPasswordAccountDTO forgotPasswordAccountDTO, HttpServletRequest request) {
        return landlordService.forgotPasswordLandlordSend(forgotPasswordAccountDTO, request);
    }

    @PostMapping("/forgot_password_confirm")
    public String forgotPasswordAdminConfirm(@RequestBody ForgotPasswordAccountDTO forgotPasswordAccountDTO, HttpServletRequest request) {
        return landlordService.forgotPasswordLandlordConfirm(forgotPasswordAccountDTO, request);
    }

    @PostMapping("/change_password")
    public String changePasswordAdmin(@RequestBody ChangePasswordAccountDTO changePasswordAccountDTO) {
        return landlordService.changePasswordLandlord(changePasswordAccountDTO);
    }

    @GetMapping("/profile")
    public String getProfile() {
        return landlordService.getInfoUser().toString();
    }

    @GetMapping("/{id}")
    public String getUserById(@PathVariable Long id) {
        return landlordService.getById(id);
    }
}
