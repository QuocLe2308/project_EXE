package com.example.ProjectEXE.DTO.Review;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EditReviewDTO {
    private Long id;
    private String comments;
}
