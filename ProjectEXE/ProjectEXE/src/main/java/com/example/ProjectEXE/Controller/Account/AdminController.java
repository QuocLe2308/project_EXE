package com.example.ProjectEXE.Controller.Account;

import com.example.ProjectEXE.DTO.Account.ChangePasswordAccountDTO;
import com.example.ProjectEXE.DTO.Account.EditAccountDTO;
import com.example.ProjectEXE.DTO.Account.ForgotPasswordAccountDTO;
import com.example.ProjectEXE.DTO.Account.LoginDTO;
import com.example.ProjectEXE.Models.Account.Admin;
import com.example.ProjectEXE.Service.IService.Account.AdminService;
import com.example.ProjectEXE.Service.ServiceImp.Account.AdminServiceImp;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@AllArgsConstructor
public class AdminController {

    @Autowired
    private final AdminService adminService;

    @GetMapping()
    public String getAllAdmin() {
        return adminService.getAllAdmins();
    }

    @PostMapping()
    public String addAdmin(@RequestBody Admin Admin) {
        return adminService.addAdmin(Admin);
    }

    @PutMapping()
    public String editAdmin(@RequestBody EditAccountDTO editAccountDTO) {
        return adminService.editAdmin(editAccountDTO);
    }

    @DeleteMapping("/{id}")
    public String deleteAdmin(@PathVariable Long id) {
        return adminService.deleteAdmin(id);
    }

    @PostMapping("/login")
    public String loginAdmin(@RequestBody LoginDTO LoginRequestDTO, HttpServletRequest request) {
        return adminService.loginAdmin(LoginRequestDTO, request);
    }

    @PostMapping("/forgot_password_send")
    public String forgotPasswordAdminSend(@RequestBody ForgotPasswordAccountDTO forgotPasswordAccountDTO, HttpServletRequest request) {
        return adminService.forgotPasswordAdminSend(forgotPasswordAccountDTO, request);
    }

    @PostMapping("/forgot_password_confirm")
    public String forgotPasswordAdminConfirm(@RequestBody ForgotPasswordAccountDTO forgotPasswordAccountDTO, HttpServletRequest request) {
        return adminService.forgotPasswordAdminConfirm(forgotPasswordAccountDTO, request);
    }

    @PostMapping("/change_password")
    public String changePasswordAdmin(@RequestBody ChangePasswordAccountDTO changePasswordAccountDTO) {
        return adminService.changePasswordAdmin(changePasswordAccountDTO);
    }
}
