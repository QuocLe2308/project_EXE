package com.example.ProjectEXE.Repository;

import com.example.ProjectEXE.Models.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PropertyRepository extends JpaRepository<Property, Long> {
    boolean existsByPropertyId(Long propertyId);
    Property findByPropertyId(Long propertyId);
    void deleteByPropertyId(Long propertyId);
    List<Property> findAllByOrderByMonthlyRentDesc();
    List<Property> findAllByOrderByMonthlyRentAsc();
    /*@Query("SELECT p FROM Property p WHERE (6371 * acos(cos(radians(:lat)) * cos(radians(p.latitude)) * cos(radians(p.longitude) - radians(:lng)) + sin(radians(:lat)) * sin(radians(p.latitude)))) < :distance")
    List<Property> findNearbyProperties(
            @Param("lat") double lat,
            @Param("lng") double lng,
            @Param("distance") double distance
    );*/
    @Query(value = "SELECT * FROM properties p WHERE " +
            "(6371 * acos(cos(radians(:userLatitude)) * cos(radians(p.latitude)) * " +
            "cos(radians(p.longitude) - radians(:userLongitude)) + " +
            "sin(radians(:userLatitude)) * sin(radians(p.latitude)))) < :distance", nativeQuery = true)
    List<Property> findPropertiesWithinDistance(
            @Param("userLatitude") double userLatitude,
            @Param("userLongitude") double userLongitude,
            @Param("distance") double distance);
}

