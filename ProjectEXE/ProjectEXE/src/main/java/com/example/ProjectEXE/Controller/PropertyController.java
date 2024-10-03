package com.example.ProjectEXE.Controller;

import com.example.ProjectEXE.DTO.CombineDTO.PropertyWithImagesDTO;
import com.example.ProjectEXE.DTO.Property.EditPropertyDTO;
import com.example.ProjectEXE.DTO.Property.GetLocationPropertyDTO;
import com.example.ProjectEXE.Models.Property;
import com.example.ProjectEXE.Service.IService.PropertyService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/property")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class PropertyController {

    @Autowired
    private final PropertyService propertyService;

    @GetMapping()
    public ResponseEntity<String> getAllProperty() {
        String allProperties = propertyService.getAllProperty();
        return ResponseEntity.ok(allProperties);
    }

    @PostMapping("/add")
    public String createProperty(@RequestBody Property property) {
        return propertyService.createProperty(property);
    }

    @PutMapping("/{id}")
    public String updateProperty(@PathVariable Long id,@RequestBody EditPropertyDTO editPropertyDTO) {
        return propertyService.editProperty(id, editPropertyDTO);
    }

    @DeleteMapping("/{id}")
    public String deleteProperty(@PathVariable Long id) {
        return propertyService.deleteProperty(id);
    }

    @GetMapping("/{id}")
    public ResponseEntity<String> getProperty(@PathVariable Long id) {
        String propertyDetail = propertyService.getDetailOfProperty(id);
        return ResponseEntity.ok(propertyDetail);
    }

    @GetMapping("/desc")
    public ResponseEntity<List<PropertyWithImagesDTO>> getDescProperty() {
        List<PropertyWithImagesDTO> properties = propertyService.sortByPriceHighToLow();
        return ResponseEntity.ok(properties);
    }

    @GetMapping("/asc")
    public ResponseEntity<List<PropertyWithImagesDTO>> getAscProperty() {
        List<PropertyWithImagesDTO> properties = propertyService.sortByPriceLowToHigh();
        return ResponseEntity.ok(properties);
    }

    @GetMapping("/getCombine")
    public String getTwoJson(){
        return propertyService.getCombinedData();
    }

/*    @PostMapping("/nearby")
    public List<Property> getNearbyProperties(@RequestBody GetLocationPropertyDTO getLocationPropertyDTO) {

        List<Property> properties = propertyService.getPropertiesWithinDistance(
                getLocationPropertyDTO.getLatitude(),
                getLocationPropertyDTO.getLongitude(),
                getLocationPropertyDTO.getDistance());

        return properties;
    }*/

    @PostMapping("/nearby")
    public ResponseEntity<?> getNearbyProperties(@RequestBody GetLocationPropertyDTO getLocationPropertyDTO) throws IOException {

        List<PropertyWithImagesDTO> propertiesWithImages = propertyService.getPropertiesWithinDistance(getLocationPropertyDTO.getLatitude(), getLocationPropertyDTO.getLongitude(), getLocationPropertyDTO.getDistance());

        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.APPLICATION_JSON)
                .body(propertiesWithImages);
    }
    @GetMapping("/listProperty")
    public ResponseEntity<?> getPropertiesByLandlordId() {
        try {
            List<Property> properties = propertyService.getAllPropertiesByLandlordId();
            return ResponseEntity.ok(properties);
        } catch (SecurityException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
        }
    }
}
