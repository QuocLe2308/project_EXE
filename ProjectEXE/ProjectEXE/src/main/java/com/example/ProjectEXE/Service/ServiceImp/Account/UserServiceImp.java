package com.example.ProjectEXE.Service.ServiceImp.Account;

import com.example.ProjectEXE.DTO.Account.*;
import com.example.ProjectEXE.Models.Account.User;
import com.example.ProjectEXE.Repository.Account.UserRepository;
import com.example.ProjectEXE.Service.IService.Account.UserService;
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
public class UserServiceImp implements UserService {
    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final JwtUtil jwtUtil;
    @Autowired
    private final ResponseUtil responseUtil;
    @Autowired
    private SendMailServiceImp sendMailServiceImp;

    @Override
    public String getAllUser() {
        List<User> users = userRepository.findAllByisDisableFalse();
        users.forEach(user -> user.setPasswordHash(""));
        if (users.isEmpty()) {
            JSONObject errorResponse = responseUtil.getErrorResponse("Not Have Account!");
            return errorResponse.toString();
        } else {
            JSONObject errorResponse = responseUtil.getSuccessResponse("Success!", users);
            return errorResponse.toString();
        }
    }
    @Override
    public String loginUser(LoginDTO loginDTO, HttpServletRequest request) {
        if (loginDTO.getCaptcha().equals(request.getSession().getAttribute("captcha"))) {
            User user = userRepository.findByUserName(loginDTO.getUsername());
            if (user != null) {
                if (!user.isDisable()) {
                    String hashPassword = hashString(loginDTO.getPassword());
                    if (hashPassword.matches(user.getPasswordHash())) {
                        String token = "";
                            token = jwtUtil.generateToken(loginDTO.getUsername(), user.getUserID(), 3);
                        JSONObject response = responseUtil.getResponseLogin("success", token, "Login success!");
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
    public String registerSendUser(RegisterSendDTO registerSendDTO, HttpServletRequest request) {
        if (userRepository.existsByUserName(registerSendDTO.getUsername())) {
            JSONObject errorResponse = responseUtil.getErrorResponse("Username Exists!");
            return errorResponse.toString();
        }else{
            request.getSession().setAttribute("user_name_register", String.valueOf(registerSendDTO.getUsername()));
        }
        if (userRepository.existsByEmail(registerSendDTO.getEmail())) {
            JSONObject errorResponse = responseUtil.getErrorResponse("Email Exists!");
            return errorResponse.toString();
        }
        else{
            request.getSession().setAttribute("email_register", String.valueOf(registerSendDTO.getEmail()));
        }
        int randomNumber = new Random().nextInt(900000) + 100000;
        String subject = "OTP authentication";
        sendMailServiceImp.send_otp(registerSendDTO.getEmail(), subject, randomNumber);
        request.getSession().setAttribute("code_register", String.valueOf(randomNumber));
        JSONObject errorResponse = responseUtil.getSuccessResponse("Send OTP success!");
        return errorResponse.toString();
    }

    @Override
    public String registerConfirmUser(RegisterConfirmDTO registerConfirmDTO, HttpServletRequest request) {
        String otp = registerConfirmDTO.getOtp();
        if (otp.equals(request.getSession().getAttribute("code_register"))) {
            User user = registerConfirmDTO.toUser();
            List<String> validationResults = validateUser(user, "add");
            if (!validationResults.isEmpty()) {JSONObject response = responseUtil.getErrorResponse(String.join(", ", validationResults));
                return response.toString();
            } else {
                if(!user.getEmail().equals(request.getSession().getAttribute("email_register"))){
                    JSONObject errorResponse = responseUtil.getErrorResponse("Email must be the same as the email you originally registered with!");
                    return errorResponse.toString();
                }
                if(!user.getUserName().equals(request.getSession().getAttribute("user_name_register"))){
                    JSONObject errorResponse = responseUtil.getErrorResponse("UserName must be the same as the UserName you originally registered with!");
                    return errorResponse.toString();
                }
                user.setRole(3);
                user.setPasswordHash(hashString(user.getPasswordHash()));
                userRepository.save(user);
                JSONObject errorResponse = responseUtil.getSuccessResponse("Create success!");
                return new JSONObject(user).toString();
            }
        } else {
            JSONObject errorResponse = responseUtil.getErrorResponse("OTP is not correct!!");
            return errorResponse.toString();
        }
    }

    @Transactional
    @Override
    public String deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            JSONObject response = responseUtil.getErrorResponse("User does not exist");
            return response.toString();
        } else {
            User user = userRepository.findByUserID(id);
            user.setDisable(true);
            JSONObject response = responseUtil.getSuccessResponse("Delete Successfully!");
            return response.toString();
        }
    }

    @Override
    public String editUser(EditAccountDTO editAccountDTO, HttpServletRequest request) {
        List<String> validationResults = validateEditUser(editAccountDTO);
        if (!validationResults.isEmpty()) {
            JSONObject response = responseUtil.getErrorResponse(String.join(", ", validationResults));
            return response.toString();
        } else {
            if(!Objects.equals(editAccountDTO.getId(), jwtUtil.getUserId())){
                JSONObject response = responseUtil.getErrorResponse(String.join(", ", "Invalid user operation!"));
                return response.toString();
            }else {
                User user = userRepository.findByUserID(editAccountDTO.getId());
                user.setFullName(editAccountDTO.getFullName());
                user.setPhoneNumber(editAccountDTO.getPhoneNumber());
                user.setAddress(editAccountDTO.getAddress());
                user.onUpdate();
                userRepository.save(user);
                JSONObject errorResponse = responseUtil.getSuccessResponse("Edit success!");
                return new JSONObject(user).toString();
            }
        }

    }

    //function hash password
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

    @Override
    public List<String> validateUser(User user, String type) {
        List<String> errors = new ArrayList<>();
        if (type.equals("edit") && userRepository.existsById(user.getUserID())) {
            errors.add("UserID does not exist");
        }
        if (user.getFullName().isEmpty()) {
            errors.add("Please enter Full Name");
        }
        if (user.getEmail().isEmpty()) {
            errors.add("Please enter email");
        } else if (userRepository.existsByEmail(user.getEmail()) && !type.equals("edit")) {
            errors.add("Email already exists");
        }
        if (user.getUserName().isEmpty()) {
            errors.add("Please enter username");
        } else if (userRepository.existsByUserName(user.getUserName()) && !type.equals("edit")) {
            errors.add("Username already exists");
        }
        if (user.getPasswordHash().isEmpty()) {
            errors.add("Please enter password");
        }
        if (user.getPhoneNumber().isEmpty()) {
            errors.add("Please enter phone");
        }

        return errors;
    }

    @Override
    public List<String> validateEditUser(EditAccountDTO editAccountDTO) {

        List<String> errors = new ArrayList<>();

        if (!userRepository.existsById(editAccountDTO.getId())) {
            errors.add("UserID does not exist");
        }
        if (editAccountDTO.getFullName().isEmpty()) {
            errors.add("Please enter Full Name");
        }
        if (editAccountDTO.getPhoneNumber().isEmpty()) {
            errors.add("Please enter phone");
        }
        return errors;
    }
    @Override
    public String forgotPasswordUserSend(ForgotPasswordAccountDTO forgotPasswordAccountDTO, HttpServletRequest request) {
        if (!userRepository.existsByEmail(forgotPasswordAccountDTO.getEmail())) {
            JSONObject response = responseUtil.getErrorResponse("Email does not exist");
            return response.toString();
        } else {
            int randomNumber = new Random().nextInt(900000) + 100000;
            String subject = "OTP authentication forgot password";
            sendMailServiceImp.send_otp(forgotPasswordAccountDTO.getEmail(), subject, randomNumber);
            request.getSession().setAttribute("code_forgot", String.valueOf(randomNumber));
            JSONObject response = responseUtil.getSuccessResponse("Send OTP success!");
            return response.toString();
        }
    }
    @Override
    public String forgotPasswordUserConfirm(ForgotPasswordAccountDTO forgotPasswordAccountDTO, HttpServletRequest request) {
        if (forgotPasswordAccountDTO.getOtp().equals(request.getSession().getAttribute("code_forgot"))) {
            if (forgotPasswordAccountDTO.getNewPassword().equals(forgotPasswordAccountDTO.getConfirmPassword())) {
                User user = userRepository.findByEmail(forgotPasswordAccountDTO.getEmail());
                user.setPasswordHash(hashString(forgotPasswordAccountDTO.getNewPassword()));
                userRepository.save(user);
                JSONObject response = responseUtil.getSuccessResponse("Success!");
                return response.toString();
            } else {
                JSONObject response = responseUtil.getErrorResponse("RePassword not match!");
                return response.toString();
            }
        } else {
            JSONObject response = responseUtil.getErrorResponse("OTP is not correct!");
            return response.toString();
        }
    }
    @Override
    public String changePasswordUser(ChangePasswordAccountDTO changePasswordAccountDTO) {
        User user = userRepository.findByUserID(jwtUtil.getUserId());
        if (user.getPasswordHash().equals(hashString(changePasswordAccountDTO.getOldPassword()))) {
            if (changePasswordAccountDTO.getNewPassword().equals(changePasswordAccountDTO.getConfirmPassword())) {
                user.setPasswordHash(hashString(changePasswordAccountDTO.getNewPassword()));
                userRepository.save(user);
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
}
