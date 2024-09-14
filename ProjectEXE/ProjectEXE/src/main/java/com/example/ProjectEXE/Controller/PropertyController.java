package com.example.ProjectEXE.Controller;

import com.example.ProjectEXE.DTO.Property.EditPropertyDTO;
import com.example.ProjectEXE.Models.Property;
import com.example.ProjectEXE.Service.IService.PropertyService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/property")
@AllArgsConstructor
public class PropertyController {

    @Autowired
    private final PropertyService propertyService;

    @GetMapping()
    public String getAllProperty() {
        return propertyService.getAllProperty();
    }

    @PostMapping()
    public String createProperty(@RequestBody Property property) {
        return propertyService.createProperty(property);
    }

    @PutMapping()
    public String updateProperty(@RequestBody EditPropertyDTO editPropertyDTO) {
        return propertyService.editProperty(editPropertyDTO);
    }

    @DeleteMapping("/{id}")
    public String deleteProperty(@PathVariable Long id) {
        return propertyService.deleteProperty(id);
    }

    @GetMapping("/{id}")
    public String getProperty(@PathVariable Long id) {
        return propertyService.getDetailOfProperty(id);
    }

    @GetMapping("/desc")
    public List<Property> getDescProperty() {
        return propertyService.sortByPriceHighToLow();
    }

    @GetMapping("/asc")
    public List<Property> getAscProperty() {
        return propertyService.sortByPriceLowToHigh();
    }
}
