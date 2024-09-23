package com.example.ProjectEXE.Repository;

import com.example.ProjectEXE.Models.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

    List<Payment> findAllByUserUserID(long id);
    Payment findByPaymentID(long id);
}
