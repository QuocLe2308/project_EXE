package com.example.ProjectEXE.Service.ServiceImp;

import com.example.ProjectEXE.DTO.Review.EditReviewDTO;
import com.example.ProjectEXE.Models.Property;
import com.example.ProjectEXE.Models.Review;
import com.example.ProjectEXE.Repository.PropertyRepository;
import com.example.ProjectEXE.Repository.ReviewRepository;
import com.example.ProjectEXE.Service.IService.ReviewService;
import com.example.ProjectEXE.Service.ServiceImp.Utils.JwtUtil;
import lombok.AllArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ReviewServiceImp implements ReviewService {

    @Autowired
    private final ReviewRepository reviewRepository;
    @Autowired
    private final PropertyRepository propertyRepository;
    @Autowired
    private final JwtUtil jwtUtil;

    @Override
    public List<Review> getReviewByPropertyId(Long propertyId) {
        Property property = propertyRepository.findByPropertyId(propertyId);
        if (property == null) {
            throw new IllegalArgumentException("Property not found");
        }else{
            List<Review> review = reviewRepository.findReviewByProperty(property);
            if (review == null){
                throw new IllegalArgumentException("Review not found");
            }
            else{
                return review;
            }
        }
    }

    @Override
    public String editReview(EditReviewDTO editReviewDTO) {
        Review review = reviewRepository.findReviewByReviewId(editReviewDTO.getId());
        if (review == null) {
            throw new IllegalArgumentException("Review not found");
        }
        else{
            if (editReviewDTO.getComments().isEmpty()){
                throw new IllegalArgumentException("Comments cannot be empty");
            }
            else{
                review.setComment(editReviewDTO.getComments());
                reviewRepository.save(review);
                return new JSONObject(review).toString();
            }
        }
    }

    @Override
    public String DeleteReview(Long reviewId) {
        Review review = reviewRepository.findReviewByReviewId(reviewId);
        if(review == null){
            throw new IllegalArgumentException("Review not found");
        }
        else{
            reviewRepository.delete(review);
            return new JSONObject("status", "delete review successfully!").toString();
        }
    }

}
