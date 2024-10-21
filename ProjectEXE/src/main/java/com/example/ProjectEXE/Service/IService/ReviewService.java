package com.example.ProjectEXE.Service.IService;

import com.example.ProjectEXE.DTO.Review.CreateReviewDTO;
import com.example.ProjectEXE.DTO.Review.EditReviewDTO;
import com.example.ProjectEXE.Models.Review;

import java.util.List;

public interface ReviewService {
    public List<Review> getReviewByPropertyId(Long propertyId);
    public String editReview(EditReviewDTO editReviewDTO);
    public String DeleteReview(Long reviewId);
    public String createReview(CreateReviewDTO createReviewDTO);
}
