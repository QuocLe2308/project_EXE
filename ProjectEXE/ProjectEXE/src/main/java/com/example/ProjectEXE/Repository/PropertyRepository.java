package com.example.ProjectEXE.Repository;

import com.example.ProjectEXE.Models.Property;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PropertyRepository extends JpaRepository<Property, Long> {
    boolean exitsByPropertyId(Long propertyId);
    Property findByPropertyId(Long propertyId);
    void deleteByPropertyId(Long propertyId);
    List<Property> findAllOrderByPriceDesc();
    List<Property> findAllByOrderByPriceAsc();

}
