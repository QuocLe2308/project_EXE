package com.example.ProjectEXE.Repository.Account;


import com.example.ProjectEXE.Models.Account.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUserName(String username);
    boolean existsByUserName(String username);
    boolean existsByEmail(String email);
    User findByUserID(Long userId);
    User findByEmail(String email);
    List<User> findAllByisDisableFalse();
}
