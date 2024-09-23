package com.example.ProjectEXE.Controller;

import com.example.ProjectEXE.DTO.PaymentDTO.GetQrBankPaymentDTO;
import com.example.ProjectEXE.Models.Payment;
import com.example.ProjectEXE.Service.ServiceImp.PaymentService;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payment")
@AllArgsConstructor
public class PaymentController {
    @Autowired
    private final PaymentService paymentService;

    @GetMapping("/check/{id}")
    public String check(@PathVariable int id) throws JsonProcessingException {
        return paymentService.checkLsgd(id);
    }

    @GetMapping("/viewList")
    public String viewList(){
        return paymentService.getAllPayment();
    }

    @GetMapping("/{id}")
    public String view(@PathVariable int id){
        return paymentService.getPaymentByID(id);
    }

    @PostMapping("/add")
    public String add(@RequestBody Payment payment){
        return paymentService.addPayment(payment);
    }

    @PutMapping()
    public String update(@RequestBody Payment payment){
        return paymentService.editPayment(payment);
    }

    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable Long id){
        return paymentService.deletePayment(id);
    }

    @GetMapping("/getQrBank")
    public String getQrBank(@RequestBody GetQrBankPaymentDTO getQrBankPaymentDTO){
        return paymentService.getQrBank(getQrBankPaymentDTO);
    }
}
