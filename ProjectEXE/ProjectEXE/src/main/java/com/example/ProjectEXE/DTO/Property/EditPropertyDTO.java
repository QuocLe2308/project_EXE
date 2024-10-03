package com.example.ProjectEXE.DTO.Property;

import com.example.ProjectEXE.Models.Account.Landlord;
import com.example.ProjectEXE.Models.Account.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EditPropertyDTO {
    private Long propertyId;
    private Landlord owner;
    private String description;
    private Double monthlyRent;
    private Integer maxTenants;
    private String propertyName;
    private User user;
}