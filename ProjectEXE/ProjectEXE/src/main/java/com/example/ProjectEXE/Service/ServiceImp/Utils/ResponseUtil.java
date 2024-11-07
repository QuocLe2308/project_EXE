package com.example.ProjectEXE.Service.ServiceImp.Utils;

import org.json.JSONObject;
import org.springframework.stereotype.Component;

@Component
public class ResponseUtil {

    public JSONObject getSuccessResponse(String message, Object data) {
        return getResponse("success", message, data);
    }


    public JSONObject getErrorResponse(String message) {
        return getResponse("error", message, null);
    }

    public JSONObject getSuccessResponse(String message) {
        return getResponse("success", message, null);
    }

    public JSONObject getResponseLogin(String status, String token, String message) {
        JSONObject response = new JSONObject();
        response.put("status", status);
        response.put("message", message);
        response.put("token", token);
        return response;
    }
    public JSONObject getResponseCaptcha(String status, String captcha) {
        JSONObject response = new JSONObject();
        response.put("status", status);
        response.put("captcha", captcha);
        return response;
    }
    public JSONObject getResponse(String status, String message, Object data) {
        JSONObject response = new JSONObject();
        response.put("status", status);
        response.put("message", message);
        response.put("data", data);
        return response;
    }
}
