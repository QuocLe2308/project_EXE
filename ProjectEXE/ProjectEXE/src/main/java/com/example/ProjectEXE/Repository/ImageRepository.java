package com.example.ProjectEXE.Repository;

import com.example.ProjectEXE.Models.Image;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ImageRepository extends JpaRepository<Image, Long> {
    Optional<Image> findByName(String name);
    List<Image> findImageByProperty_PropertyId(long propertyId);
}
