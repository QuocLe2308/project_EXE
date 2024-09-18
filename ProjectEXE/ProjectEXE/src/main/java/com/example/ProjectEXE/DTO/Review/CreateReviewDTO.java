package com.example.ProjectEXE.DTO.Review;

import com.example.ProjectEXE.Models.Account.User;
import com.example.ProjectEXE.Models.Property;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateReviewDTO {
    private Property property;
    private String comment;
}
