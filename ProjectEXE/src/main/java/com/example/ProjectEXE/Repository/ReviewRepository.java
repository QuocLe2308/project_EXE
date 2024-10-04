package com.example.ProjectEXE.Repository;

import com.example.ProjectEXE.Models.Property;
import com.example.ProjectEXE.Models.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findReviewByProperty(Property property);
    Review findReviewByReviewId(Long id);
}
