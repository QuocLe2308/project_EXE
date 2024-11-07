package com.example.ProjectEXE.DTO.PaymentDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GetQrBankPaymentDTO {
    private Long id;
    private Long money;
}
