package com.example.ProjectEXE.Service.ServiceImp.Account;

import com.example.ProjectEXE.DTO.Account.ChangePasswordAccountDTO;
import com.example.ProjectEXE.DTO.Account.EditAccountDTO;
import com.example.ProjectEXE.DTO.Account.ForgotPasswordAccountDTO;
import com.example.ProjectEXE.DTO.Account.LoginDTO;
import com.example.ProjectEXE.Models.Account.Admin;
import com.example.ProjectEXE.Models.Account.User;
import com.example.ProjectEXE.Repository.Account.AdminRepository;
import com.example.ProjectEXE.Service.IService.Account.AdminService;
import com.example.ProjectEXE.Service.ServiceImp.SendMailServiceImp;
import com.example.ProjectEXE.Service.ServiceImp.Utils.JwtUtil;
import com.example.ProjectEXE.Service.ServiceImp.Utils.ResponseUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.transaction.Transactional;
import jakarta.websocket.Session;
import lombok.AllArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Random;

@Service
@AllArgsConstructor
public class AdminServiceImp implements AdminService {
    @Autowired
    private final AdminRepository adminRepository;
    @Autowired
    private final JwtUtil jwtUtil;
    @Autowired
    private final ResponseUtil responseUtil;
    @Autowired
    private SendMailServiceImp sendMailServiceImp;

    @Override
    public String getAllAdmins() {
        List<Admin> admins = adminRepository.findAllByisDisableFalse();
        admins.forEach(admin -> admin.setPasswordHash(""));
        if (admins.isEmpty()) {
            JSONObject errorResponse = responseUtil.getErrorResponse("Not Have Account!");
            return errorResponse.toString();
        } else {
            JSONObject successResponse = responseUtil.getSuccessResponse("Success!", admins);
            return successResponse.toString();
        }
    }

    @Override
    public String getById(Long id){
        if(jwtUtil.getRole() != 1) {
            JSONObject response = responseUtil.getErrorResponse(String.join(", ", "You do not have permission to do this action!"));
            return response.toString();
        }
        Admin admin = adminRepository.findByAdminID(id);
            return new JSONObject(admin).toString();
        }

    @Override
    public String loginAdmin(LoginDTO loginDTO, HttpServletRequest request) {
        if (loginDTO.getCaptcha().equals(request.getSession().getAttribute("captcha"))) {
            Admin admin = adminRepository.findByUserName(loginDTO.getUsername());
            if (admin != null) {
                if (!admin.isDisable()) {
                    String hashPassword = hashString(loginDTO.getPassword());
                    if (hashPassword.matches(admin.getPasswordHash())) {
                        String token = "";
                            token = jwtUtil.generateToken(loginDTO.getUsername(), admin.getAdminID(), 1);
                            JSONObject response = responseUtil.getResponseLogin("success", token, "Login success!");
                        int roleId = jwtUtil.getRoleFromToken(token);
                        String roleIdString = String.valueOf(roleId);
                        response.put("role", roleIdString);
                        return response.toString();
                    } else {
                        JSONObject errorResponse = responseUtil.getErrorResponse("Username or password is not correct!");
                        return errorResponse.toString();
                    }
                } else {
                    JSONObject errorResponse = responseUtil.getErrorResponse("Your account is disabled. Please contact the admin for more information");
                    return errorResponse.toString();
                }
            } else {
                JSONObject errorResponse = responseUtil.getErrorResponse("Account not found in the system");
                return errorResponse.toString();
            }
        } else {
            JSONObject errorResponse = responseUtil.getErrorResponse("Captcha is not correct!");
            return errorResponse.toString();
        }
    }
    @Override
    public String addAdmin(Admin admin) {
        List<String> validationResults = validateAdmin(admin, "add");
        if (!validationResults.isEmpty()) {
            JSONObject response = responseUtil.getErrorResponse(String.join(", ", validationResults));
            return response.toString();
        } else {
            admin.setRole(1);
            admin.setPasswordHash(hashString(admin.getPasswordHash()));
            adminRepository.save(admin);
            JSONObject response = responseUtil.getSuccessResponse("success");
            return new JSONObject(admin).toString();
        }
    }
    @Override
    public String editAdmin(Long id, EditAccountDTO editAccountDTO) {
        if (!Objects.equals(id, jwtUtil.getUserId())) {
            JSONObject response = responseUtil.getErrorResponse("Invalid user operation!");
            return response.toString();
        }
        Admin admin = adminRepository.findByAdminID(id);
        if (admin == null) {
            JSONObject response = responseUtil.getErrorResponse("User does not exist!");
            return response.toString();
        }
        admin.setFullName(editAccountDTO.getFullName());
        admin.setPhoneNumber(editAccountDTO.getPhoneNumber());
        admin.setAddress(editAccountDTO.getAddress());
        adminRepository.save(admin);
        JSONObject successResponse = responseUtil.getSuccessResponse("Edit success!");
        return new JSONObject(admin).toString();
    }

    @Transactional
    @Override
    public String deleteAdmin(Long id) {
        if (!adminRepository.existsAdminByAdminID(id)) {
            JSONObject response = responseUtil.getErrorResponse("Admin does not exist");
            return response.toString();
        } else {
            Admin admin = adminRepository.findByAdminID(id);
            admin.setDisable(true);
            JSONObject response = responseUtil.getSuccessResponse("Delete Successfully!");
            return response.toString();
        }
    }
    @Override
    public String forgotPasswordAdminSend(ForgotPasswordAccountDTO forgotPasswordAccountDTO, HttpServletRequest request) {
        if (!adminRepository.existsByEmail(forgotPasswordAccountDTO.getEmail())) {
            JSONObject response = responseUtil.getErrorResponse("Email does not exist");
            return response.toString();
        } else {
            request.getSession().setAttribute("email", forgotPasswordAccountDTO.getEmail());
            int randomNumber = new Random().nextInt(900000) + 100000;
            String subject = "OTP authentication forgot password";
            sendMailServiceImp.send_otp(forgotPasswordAccountDTO.getEmail(), subject, randomNumber);
            request.getSession().setAttribute("code_forgot", String.valueOf(randomNumber));
            JSONObject response = responseUtil.getSuccessResponse("Send OTP success!");
            return response.toString();
        }
    }
    @Override
    public String forgotPasswordAdminConfirm(ForgotPasswordAccountDTO forgotPasswordAccountDTO, HttpServletRequest request) {
        if (forgotPasswordAccountDTO.getOtp().equals(request.getSession().getAttribute("code_forgot"))) {
            if (request.getSession().getAttribute("email").equals(forgotPasswordAccountDTO.getEmail())) {
                if (forgotPasswordAccountDTO.getNewPassword().equals(forgotPasswordAccountDTO.getConfirmPassword())) {
                    Admin admin = adminRepository.findByEmail(forgotPasswordAccountDTO.getEmail());
                    admin.setPasswordHash(hashString(forgotPasswordAccountDTO.getNewPassword()));
                    adminRepository.save(admin);
                    JSONObject response = responseUtil.getSuccessResponse("Success!");
                    return response.toString();
                } else {
                    JSONObject response = responseUtil.getErrorResponse("RePassword not match!");
                    return response.toString();
                }
            } else{
                JSONObject response = responseUtil.getErrorResponse("Email not match!");
                return response.toString();
            }
        }else {
                JSONObject response = responseUtil.getErrorResponse("OTP is not correct!");
                return response.toString();
        }
    }

    @Override
    public String changePasswordAdmin(ChangePasswordAccountDTO changePasswordAccountDTO) {
        Admin admin = adminRepository.findByAdminID(jwtUtil.getUserId());
        if (admin.getPasswordHash().equals(hashString(changePasswordAccountDTO.getOldPassword()))) {
            if (changePasswordAccountDTO.getNewPassword().equals(changePasswordAccountDTO.getConfirmPassword())) {
                admin.setPasswordHash(hashString(changePasswordAccountDTO.getNewPassword()));
                adminRepository.save(admin);
                JSONObject response = responseUtil.getSuccessResponse("Success!");
                return response.toString();
            } else {
                JSONObject response = responseUtil.getErrorResponse("RePassword not match!");
                return response.toString();
            }
        } else {
            JSONObject response = responseUtil.getErrorResponse("Old password is not correct!");
            return response.toString();
        }
    }
    @Override
    public Admin getInfoUser() {
        Admin admin = adminRepository.findByAdminID(jwtUtil.getUserId());
        admin.setPasswordHash("");
        return admin;
    }

    @Override
    public List<String> validateAdmin(Admin admin, String type) {

        List<String> errors = new ArrayList<>();
        if (type.equals("edit") && !adminRepository.existsAdminByAdminID(admin.getAdminID())) {
            errors.add("Admin does not exist");
        }
        if (admin.getFullName().isEmpty()) {
            errors.add("Please enter Full Name");
        }
        if (admin.getEmail().isEmpty()) {
            errors.add("Please enter email");
        } else if (adminRepository.existsByEmail(admin.getEmail()) && !type.equals("edit")) {
            errors.add("Email already exists");
        }
        if (admin.getUserName().isEmpty()) {
            errors.add("Please enter username");
        } else if (adminRepository.existsByUserName(admin.getUserName()) && !type.equals("edit")) {
            errors.add("Username already exists");
        }
        if (admin.getPasswordHash().isEmpty()) {
            errors.add("Please enter password");
        }
        if (admin.getPhoneNumber().isEmpty()) {
            errors.add("Please enter phone");
        }
        return errors;
    }

    @Override
    public String hashString(String input) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] encodedHash = digest.digest(
                    input.getBytes(StandardCharsets.UTF_8));
            StringBuilder hexString = new StringBuilder(2 * encodedHash.length);
            for (byte b : encodedHash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) {
                    hexString.append('0');
                }
                hexString.append(hex);
            }
            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            return null;
        }
    }
}

