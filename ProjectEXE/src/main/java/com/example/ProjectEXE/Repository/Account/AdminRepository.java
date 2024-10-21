package com.example.ProjectEXE.Repository.Account;

import com.example.ProjectEXE.Models.Account.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AdminRepository extends JpaRepository<Admin, Integer> {
    Admin findByUserName(String username);
    Admin findByAdminID(Long adminId);
    Admin findByEmail(String email);
    boolean existsByEmail(String email);
    boolean existsByUserName(String username);
    boolean existsAdminByAdminID(Long adminId);
    List<Admin> findAllByisDisableFalse();

}
