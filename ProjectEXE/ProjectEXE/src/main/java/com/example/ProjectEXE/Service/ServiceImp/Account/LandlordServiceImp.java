package com.example.ProjectEXE.Service.ServiceImp.Account;

import com.example.ProjectEXE.DTO.Account.ChangePasswordAccountDTO;
import com.example.ProjectEXE.DTO.Account.EditAccountDTO;
import com.example.ProjectEXE.DTO.Account.ForgotPasswordAccountDTO;
import com.example.ProjectEXE.DTO.Account.LoginDTO;
import com.example.ProjectEXE.Models.Account.Admin;
import com.example.ProjectEXE.Models.Account.Landlord;
import com.example.ProjectEXE.Repository.Account.LandlordRepository;
import com.example.ProjectEXE.Service.IService.Account.LandlordService;
import com.example.ProjectEXE.Service.ServiceImp.SendMailServiceImp;
import com.example.ProjectEXE.Service.ServiceImp.Utils.JwtUtil;
import com.example.ProjectEXE.Service.ServiceImp.Utils.ResponseUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
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
public class LandlordServiceImp implements LandlordService {
    @Autowired
    private final LandlordRepository landlordRepository;
    @Autowired
    private final JwtUtil jwtUtil;
    @Autowired
    private final ResponseUtil responseUtil;
    @Autowired
    private SendMailServiceImp sendMailServiceImp;

    @Override
    public String getAllLandlords() {
        List<Landlord> landlords = landlordRepository.findAll();
        landlords.forEach(landlord -> landlord.setPasswordHash(""));
        if (landlords.isEmpty()) {
            JSONObject errorResponse = responseUtil.getErrorResponse("Not Have Account!");
            return errorResponse.toString();
        } else {
            JSONObject successResponse = responseUtil.getSuccessResponse("Success!", landlords);
            return successResponse.toString();
        }
    }

    @Override
    public String getById(Long id){
        Landlord landlord = landlordRepository.findByLandlordID(id);
        if(jwtUtil.getRole() != 1) {
            JSONObject response = responseUtil.getErrorResponse(String.join(", ", "You do not have permission to do this action!"));
            return response.toString();
        }
        else{
            return new JSONObject(landlord).toString();
        }
    }

    @Override
    public Landlord getInfoUser() {
        Landlord landlord = landlordRepository.findByLandlordID(jwtUtil.getUserId());
        landlord.setPasswordHash("");
        return landlord;
    }

    @Override
    public String loginLandlord(LoginDTO loginDTO, HttpServletRequest request) {
        if (loginDTO.getCaptcha().equals(request.getSession().getAttribute("captcha"))) {
            Landlord landlord = landlordRepository.findByUserName(loginDTO.getUsername());
            if (landlord != null) {
                if (!landlord.isDisable()) {
                    String hashPassword = hashString(loginDTO.getPassword());
                    if (hashPassword.matches(landlord.getPasswordHash())) {
                        String token = "";
                        token = jwtUtil.generateToken(loginDTO.getUsername(), landlord.getLandlordID(), 2);
                        System.out.println(token);
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
    public String addLandlord(Landlord landlord) {
        List<String> validationResults = validateLandlord(landlord, "add");
        if (!validationResults.isEmpty()) {
            JSONObject response = responseUtil.getErrorResponse(String.join(", ", validationResults));
            return response.toString();
        } else {
            landlord.setRole(2);
            landlord.setPasswordHash(hashString(landlord.getPasswordHash()));
            landlordRepository.save(landlord);
            JSONObject response = responseUtil.getSuccessResponse("success");
            return new JSONObject(landlord).toString()  ;
        }
    }

    @Override
    public String editLandlord(EditAccountDTO editAccountDTO) {
        if (!landlordRepository.existsByLandlordID(editAccountDTO.getId())) {
            JSONObject response = responseUtil.getErrorResponse(String.join(", ", "Landlord does not exist!"));
            return response.toString();
        } else {
            if(!Objects.equals(editAccountDTO.getId(), jwtUtil.getUserId())){
                JSONObject response = responseUtil.getErrorResponse(String.join(", ", "Invalid user operation!"));
                return response.toString();
            }else {
                Landlord landlord = landlordRepository.findByLandlordID(editAccountDTO.getId());
                landlord.setFullName(editAccountDTO.getFullName());
                landlord.setPhoneNumber(editAccountDTO.getPhoneNumber());
                landlord.setAddress(editAccountDTO.getAddress());
                landlordRepository.save(landlord);
                JSONObject response = responseUtil.getSuccessResponse("success");
                return new JSONObject(landlord).toString();
            }
        }
    }

    @Override
    @Transactional
    public String deleteLandlord(Long id) {
        if (!landlordRepository.existsByLandlordID(id)) {
            JSONObject response = responseUtil.getErrorResponse("Landlord does not exist");
            return response.toString();
        } else {
            Landlord landlord = landlordRepository.findByLandlordID(id);
            landlord.setDisable(true);
            JSONObject response = responseUtil.getSuccessResponse("Delete Successfully!");
            return response.toString();
        }
    }

    @Override
    public String forgotPasswordLandlordSend(ForgotPasswordAccountDTO forgotPasswordAccountDTO, HttpServletRequest request) {
        if (!landlordRepository.existsByEmail(forgotPasswordAccountDTO.getEmail())) {
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
    public String forgotPasswordLandlordConfirm(ForgotPasswordAccountDTO forgotPasswordAccountDTO, HttpServletRequest request) {
        if (forgotPasswordAccountDTO.getOtp().equals(request.getSession().getAttribute("code_forgot"))) {
            if (request.getSession().getAttribute("email").equals(forgotPasswordAccountDTO.getEmail())) {
                if (forgotPasswordAccountDTO.getNewPassword().equals(forgotPasswordAccountDTO.getConfirmPassword())) {
                    Landlord landlord = landlordRepository.findByEmail(forgotPasswordAccountDTO.getEmail());
                    landlord.setPasswordHash(hashString(forgotPasswordAccountDTO.getNewPassword()));
                    landlordRepository.save(landlord);
                    JSONObject response = responseUtil.getSuccessResponse("Success!");
                    return response.toString();
                } else {
                    JSONObject response = responseUtil.getErrorResponse("RePassword not match!");
                    return response.toString();
                }
            } else{
                    JSONObject response = responseUtil.getErrorResponse("Email is not correct!");
                    return response.toString();
            }
        } else {
            JSONObject response = responseUtil.getErrorResponse("OTP is not correct!");
            return response.toString();
        }
    }

    @Override
    public String changePasswordLandlord(ChangePasswordAccountDTO changePasswordAccountDTO) {
        Landlord landlord = landlordRepository.findByLandlordID(jwtUtil.getUserId());
        if (landlord.getPasswordHash().equals(hashString(changePasswordAccountDTO.getOldPassword()))) {
            if (changePasswordAccountDTO.getNewPassword().equals(changePasswordAccountDTO.getConfirmPassword())) {
                landlord.setPasswordHash(hashString(changePasswordAccountDTO.getNewPassword()));
                landlordRepository.save(landlord);
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
    public List<String> validateLandlord(Landlord landlord, String type) {

        List<String> errors = new ArrayList<>();
        if (type.equals("edit") && !landlordRepository.existsByLandlordID(landlord.getLandlordID())) {
            errors.add("Landlord does not exist");
        }
        if (landlord.getFullName().isEmpty()) {
            errors.add("Please enter Full Name");
        }
        if (landlord.getEmail().isEmpty()) {
            errors.add("Please enter email");
        } else if (landlordRepository.existsByEmail(landlord.getEmail()) && !type.equals("edit")) {
            errors.add("Email already exists");
        }
        if (landlord.getUserName().isEmpty()) {
            errors.add("Please enter username");
        } else if (landlordRepository.existsByUserName(landlord.getUserName()) && !type.equals("edit")) {
            errors.add("Username already exists");
        }
        if (landlord.getPasswordHash().isEmpty()) {
            errors.add("Please enter password");
        }
        if (landlord.getPhoneNumber().isEmpty()) {
            errors.add("Please enter phone");
        }
        return errors;
    }

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

