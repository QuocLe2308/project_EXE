package com.example.ProjectEXE.DTO.Property;

import com.example.ProjectEXE.Models.Account.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EditPropertyDTO {
    private Long id;
    private String description;
    private Double monthlyRent;
    private Integer maxTenants;
    private String propertyName;
    private User user;
}