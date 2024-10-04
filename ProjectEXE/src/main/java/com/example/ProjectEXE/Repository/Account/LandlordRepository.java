package com.example.ProjectEXE.Repository.Account;


import com.example.ProjectEXE.Models.Account.Landlord;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LandlordRepository extends JpaRepository<Landlord, Long> {

    Landlord findByUserName(String username);
    Landlord findByLandlordID(Long adminId);
    Landlord findByEmail(String email);
    boolean existsByEmail(String email);
    boolean existsByUserName(String username);
    boolean existsByLandlordID(Long landlordId);
    //List<Landlord> findAll();
//    List<Landlord> findAllByIsDisableFalse();
}
