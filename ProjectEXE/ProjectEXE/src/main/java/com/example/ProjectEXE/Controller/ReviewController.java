package com.example.ProjectEXE.Controller;

import com.example.ProjectEXE.DTO.Review.CreateReviewDTO;
import com.example.ProjectEXE.DTO.Review.EditReviewDTO;
import com.example.ProjectEXE.Models.Review;
import com.example.ProjectEXE.Service.IService.ReviewService;
import com.example.ProjectEXE.Service.ServiceImp.ReviewServiceImp;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/review")
@AllArgsConstructor
public class ReviewController {

    @Autowired
    private final ReviewService reviewService;


    @GetMapping("/{id}")
    public List<Review> getAllReviews(@PathVariable Long id) {
        return reviewService.getReviewByPropertyId(id);
    }

    @PostMapping()
    public String addReview(@RequestBody CreateReviewDTO createReviewDTO) {
        return reviewService.createReview(createReviewDTO);
    }

    @PutMapping()
    public String editReview(@RequestBody EditReviewDTO editReviewDTO) {
        return reviewService.editReview(editReviewDTO);
    }

    @DeleteMapping("/{id}")
    public String deleteReview(@PathVariable Long id) {
        return reviewService.DeleteReview(id);
    }

}
