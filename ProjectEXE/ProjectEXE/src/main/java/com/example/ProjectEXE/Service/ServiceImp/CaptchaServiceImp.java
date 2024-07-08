package com.example.ProjectEXE.Service.ServiceImp;

import com.example.ProjectEXE.Service.ServiceImp.Utils.ResponseUtil;
import com.google.code.kaptcha.impl.DefaultKaptcha;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Base64;

@Service
@AllArgsConstructor
public class CaptchaServiceImp {

    private DefaultKaptcha captchaProducer;

    private ResponseUtil responseUtil;

    public String generateCaptcha(HttpServletRequest request) throws IOException {
        String captchaText = captchaProducer.createText();
        request.getSession().setAttribute("captcha", captchaText);
        System.out.println(captchaText);
        BufferedImage bufferedImage = captchaProducer.createImage(captchaText);
        String base64Image = convertBufferedImageToBase64(bufferedImage);
        JSONObject response = responseUtil.getResponseCaptcha("success", "data:image/png;base64," + base64Image);
        return response.toString();
    }

    public String convertBufferedImageToBase64(BufferedImage bufferedImage) throws IOException {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(bufferedImage, "png", baos);
        byte[] imageBytes = baos.toByteArray();
        return Base64.getEncoder().encodeToString(imageBytes);
    }
}
