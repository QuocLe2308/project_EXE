package com.example.ProjectEXE.Service.ServiceImp;

import com.example.ProjectEXE.DTO.Review.CreateReviewDTO;
import com.example.ProjectEXE.DTO.Review.EditReviewDTO;
import com.example.ProjectEXE.Models.Account.User;
import com.example.ProjectEXE.Models.Property;
import com.example.ProjectEXE.Models.Review;
import com.example.ProjectEXE.Repository.Account.UserRepository;
import com.example.ProjectEXE.Repository.PropertyRepository;
import com.example.ProjectEXE.Repository.ReviewRepository;
import com.example.ProjectEXE.Service.IService.ReviewService;
import com.example.ProjectEXE.Service.ServiceImp.Utils.JwtUtil;
import com.example.ProjectEXE.Service.ServiceImp.Utils.ResponseUtil;
import lombok.AllArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@AllArgsConstructor
public class ReviewServiceImp implements ReviewService {

    @Autowired
    private final ReviewRepository reviewRepository;
    @Autowired
    private final PropertyRepository propertyRepository;
    @Autowired
    private final JwtUtil jwtUtil;
    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final ResponseUtil responseUtil;

    @Override
    public List<Review> getReviewByPropertyId(Long propertyId) {
        Property property = propertyRepository.findByPropertyId(propertyId);
        if (property == null) {
            throw new IllegalArgumentException("Property not found");
        }
        List<Review> reviews = reviewRepository.findReviewByProperty(property);
        if (reviews == null || reviews.isEmpty()) {
            throw new IllegalArgumentException("No reviews found");
        }
        return reviews;
    }


    @Override
    public String editReview(EditReviewDTO editReviewDTO) {
        Property property = propertyRepository.findByPropertyId(editReviewDTO.getProperty().getPropertyId());
        if (property == null) {
            JSONObject response = responseUtil.getErrorResponse(String.join(", ", "Property not found"));
            return response.toString();
        }
        Review review = reviewRepository.findReviewByReviewId(editReviewDTO.getId());
        if (review == null) {
            JSONObject response = responseUtil.getErrorResponse(String.join(", ", "Review not found"));
            return response.toString();
        }
        if (!Objects.equals(review.getUser().getUserID(), jwtUtil.getUserId())) {
            JSONObject response = responseUtil.getErrorResponse(String.join(", ", "You do not have permission to edit this review"));
            return response.toString();
        }
        if (editReviewDTO.getComments().isEmpty()) {
            JSONObject response = responseUtil.getErrorResponse(String.join(", ", "Comments cannot be empty"));
            return response.toString();
        }
        if (!Objects.equals(review.getProperty().getPropertyId(), editReviewDTO.getProperty().getPropertyId())) {
            JSONObject response = responseUtil.getErrorResponse(String.join(", ", "Review does not belong to this property"));
            return response.toString();
        }
        review.setComment(editReviewDTO.getComments());
        return new JSONObject(reviewRepository.save(review)).toString();
    }


    @Override
    public String DeleteReview(Long reviewId) {
        Review review = reviewRepository.findReviewByReviewId(reviewId);
        if(review == null){
            throw new IllegalArgumentException("Review not found");
        }
        else{
            if(!Objects.equals(review.getUser().getUserID(), jwtUtil.getUserId())){
                JSONObject response = responseUtil.getErrorResponse(String.join(", ", "You do not have permission to delete this review"));
                return response.toString();
            }else {
                reviewRepository.delete(review);
                JSONObject response = responseUtil.getSuccessResponse("Delete Successfully!");
                return response.toString();
            }
        }
    }

    @Override
    public String createReview(CreateReviewDTO createReviewDTO){
        Property property = propertyRepository.findByPropertyId(createReviewDTO.getProperty().getPropertyId());
        if (property == null) {
            throw new IllegalArgumentException("Property not found");
        }else{
            Review review = new Review();
            User user = userRepository.findByUserID(jwtUtil.getUserId());
            review.setUser(user);
            review.setProperty(createReviewDTO.getProperty());
            review.setComment(createReviewDTO.getComment());
            reviewRepository.save(review);
            return new JSONObject(review).toString();
        }
    }

}
