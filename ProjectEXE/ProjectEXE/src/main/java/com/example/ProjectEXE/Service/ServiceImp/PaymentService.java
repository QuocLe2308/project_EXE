package com.example.ProjectEXE.Service.ServiceImp;

import com.example.ProjectEXE.DTO.PaymentDTO.GetQrBankPaymentDTO;
import com.example.ProjectEXE.Models.Payment;
import com.example.ProjectEXE.Models.Property;
import com.example.ProjectEXE.Repository.Account.UserRepository;
import com.example.ProjectEXE.Repository.PaymentRepository;
import com.example.ProjectEXE.Repository.PropertyRepository;
import com.example.ProjectEXE.Service.ServiceImp.Utils.JwtUtil;
import com.example.ProjectEXE.Service.ServiceImp.Utils.ResponseUtil;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.apache.http.HttpEntity;
import org.springframework.web.client.RestTemplate;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class PaymentService implements com.example.ProjectEXE.Service.IService.PaymentService {

    @Autowired
    private final PaymentRepository paymentRepository;
    @Autowired
    private final ResponseUtil responseUtil;
    @Autowired
    private final JwtUtil jwtUtil;
    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final RestTemplate restTemplate;
    @Autowired
    private final PropertyRepository propertyRepository;

    @Override
    public String getAllPayment() {
        List<Payment> payments;
        if(jwtUtil.getRole() == 1){
            payments = paymentRepository.findAll();
        }else{
            payments = paymentRepository.findAllByUserUserID(jwtUtil.getUserId());
        }

        if (payments.isEmpty()) {
            JSONObject errorResponse = responseUtil.getErrorResponse("No Have Payment");
            return errorResponse.toString();
        } else {
            JSONObject successResponse = responseUtil.getSuccessResponse("Success!", payments);
            return successResponse.toString();
        }
    }

    @Override
    public String getPaymentByID(int id) {
        Payment payments = paymentRepository.findByPaymentID(id);
        if (payments.getPaymentID() == 0) {
            JSONObject errorResponse = responseUtil.getErrorResponse("No Have Payment");
            return errorResponse.toString();
        } else {
            JSONObject successResponse = responseUtil.getSuccessResponse("Success!", new JSONObject(payments));
            return successResponse.toString();
        }
    }

    @Override
    public String addPayment(Payment payment) {
        Property existingProperty = propertyRepository.findByPropertyId(payment.getProperty().getPropertyId());
        if (existingProperty != null) {
            payment.setUser(userRepository.findByUserID(jwtUtil.getUserId()));
            payment.setProperty(existingProperty);
            paymentRepository.save(payment);
            JSONObject successResponse = responseUtil.getSuccessResponse("Success!", payment);
            return successResponse.toString();
        }else{
            JSONObject errorResponse = responseUtil.getErrorResponse("No Have Payment");
            return errorResponse.toString();
        }
    }

    @Override
    public String editPayment(Payment payment) {
        List<String> validationResults = validatePayment(payment, "edit");
        if (payment.getUser() == null) {
            Payment payment1 = paymentRepository.findByPaymentID(payment.getPaymentID());
            payment.setUser(payment1.getUser());
        }
        if (!validationResults.isEmpty()) {
            JSONObject response = responseUtil.getErrorResponse(String.join(", ", validationResults));
            return response.toString();
        } else {
            paymentRepository.save(payment);
            JSONObject response = responseUtil.getSuccessResponse("Success!", payment);
            return response.toString();
        }
    }

    @Override
    public String deletePayment(Long id) {
        if (!paymentRepository.existsById(id)) {
            JSONObject response = responseUtil.getErrorResponse("Payment ID does not exist");
            return response.toString();
        } else {
            paymentRepository.deleteById(id);
            JSONObject response = responseUtil.getSuccessResponse("Delete Successfully!");
            return response.toString();
        }
    }

    @Override
    public List<String> validatePayment(Payment payment, String type) {
        List<String> errors = new ArrayList<>();

        if (type.equals("edit") && !paymentRepository.existsById(payment.getPaymentID())) {
            errors.add("Payment ID does not exist");
        }
        if (payment.getContent() == null || payment.getContent().isEmpty()) {
            errors.add("Please enter a Content");
        }
        /*if (payment.getUser().getUserID() == null) {
            errors.add("Please enter User ID");
        }*/
        if (payment.getAmount() == null) {
            errors.add("Please enter Amount to Pay");
        }
        if (payment.getPaymentStatus() == null) {
            errors.add("Please enter Status");
        }
        /*if (payment.getQrData() == null || payment.getQrData().isEmpty()) {
            errors.add("Please enter QR Data");
        }*/
        /*if (payment.getPaid_at() == null) {
            errors.add("Please enter Paid At");
        }*/
        /*if (payment.getCreatedAt() == null) {
            errors.add("Please enter Created At");
        }*/
        if (type.equals("add") && paymentRepository.existsById(payment.getPaymentID())) {
            errors.add("Payment ID already exists");
        }

        return errors;
    }

    @Override
    public String getQrBank(Long paymentID) {
        Payment payments = paymentRepository.findByPaymentID(paymentID);
        HttpClient httpClient = HttpClients.createDefault();
        HttpPost httpPost = new HttpPost("https://api.vietqr.io/v2/generate");

        httpPost.setHeader("Content-Type", "application/json");

        JSONObject jsonPayload = new JSONObject();
        jsonPayload.put("accountNo", "0791000055332");
        jsonPayload.put("accountName", "Le Tan Quoc");
        jsonPayload.put("acqId", 970436);
        jsonPayload.put("amount", payments.getAmount());
        jsonPayload.put("addInfo", "PAY_" + payments.getPaymentID() + "_CSSK");
        jsonPayload.put("format", "text");
        jsonPayload.put("template", "PAY_" + payments.getPaymentID() + "_CSSK");

        String qrDataURL = null;
        try {
            StringEntity entity = new StringEntity(jsonPayload.toString());
            httpPost.setEntity(entity);

            HttpResponse response = httpClient.execute(httpPost);
            HttpEntity responseEntity = response.getEntity();

            if (responseEntity != null) {
                String jsonResponse = EntityUtils.toString(responseEntity);
                JSONObject jsonObject = new JSONObject(jsonResponse);
                JSONObject dataObject = jsonObject.getJSONObject("data");
                qrDataURL = dataObject.getString("qrDataURL");
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return qrDataURL;
    }

    @Override
    public String checkLsgd(int paymentID) throws JsonProcessingException {
        int status = 0;
        String url = "http://localhost/lsgd.php";
        Payment payment = paymentRepository.findByPaymentID(paymentID);
        if (payment == null) {
            return responseUtil.getErrorResponse("paymentID does not exist!").toString();
        }
        if (payment.getPaymentStatus() == 1) {
            status = 1;
        }
        String jsonData = restTemplate.getForObject(url, String.class);
        ObjectMapper objectMapper = new ObjectMapper();
        StringBuilder resultBuilder = new StringBuilder();

        try {
            JsonNode jsonNode = objectMapper.readTree(jsonData);
            JsonNode transactionsNode = jsonNode.get("transactions");

            for (JsonNode transactionNode : transactionsNode) {
                String amountStr = transactionNode.get("Amount").asText();
                int amount = Integer.parseInt(amountStr.replace(",", ""));
                String description = transactionNode.get("Description").asText();

                String contentbank = "PAY" + payment.getPaymentID() + "CSSK";
                if (description.contains(contentbank) && amount >= payment.getAmount()) {
                    payment.setPaymentStatus(1);
                    payment.setCreatedAt(LocalDateTime.now());
                    paymentRepository.save(payment);
                    status = 1;
                }

                resultBuilder.append("Amount: ").append(amount).append("\n");
                resultBuilder.append("Description: ").append(description).append("\n");
            }
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            throw e;
        }

        if (status == 1) {
            return responseUtil.getSuccessResponse("Bill " + payment.getPaymentID() + " Paid", null).toString();
        } else {
            return responseUtil.getResponse("error", payment.getQrData(), null).toString();
        }
    }
}
