package com.example.ProjectEXE.Service.IService;

import com.example.ProjectEXE.DTO.PaymentDTO.GetQrBankPaymentDTO;
import com.example.ProjectEXE.Models.Payment;
import com.fasterxml.jackson.core.JsonProcessingException;

import java.nio.file.AccessDeniedException;
import java.util.List;

public interface PaymentService {
    public String checkLsgd(int paymentID) throws JsonProcessingException;
    public String getAllPaymentByUser();
    public String getPaymentByID(int id);
    public String addPayment(Payment payment);
    public String editPayment(Payment payment);
    public String deletePayment(Long id);
    public List<String> validatePayment(Payment payment, String type);
    public String getQrBank(Long paymentID);
    public String getAllPayment();
    public List<Payment> getPaymentsByLandlordId() throws AccessDeniedException;
}
