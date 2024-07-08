package com.example.ProjectEXE.Repository.Account;

import com.example.ProjectEXE.Models.Account.Admin;
import com.example.ProjectEXE.Models.Account.Landlord;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LandlordRepository extends JpaRepository<Landlord, Long> {

    Landlord findByUserName(String username);
    Landlord findByLandlordID(Long adminId);
    Landlord findByEmail(String email);
    boolean existsByEmail(String email);
    boolean existsByUserName(String username);
    boolean existsByLandlordID(Long landlordId);
    void deleteByLandlordID(Long landlordId);

}
