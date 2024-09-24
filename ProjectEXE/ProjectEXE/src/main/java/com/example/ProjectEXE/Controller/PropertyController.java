package com.example.ProjectEXE.Controller;

import com.example.ProjectEXE.DTO.Property.EditPropertyDTO;
import com.example.ProjectEXE.DTO.Property.GetLocationPropertyDTO;
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

    @PostMapping("/add")
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

    @GetMapping("/getCombine")
    public String getTwoJson(){
        return propertyService.getCombinedData();
    }

    @PostMapping("/nearby")
    public List<Property> getNearbyProperties(@RequestBody GetLocationPropertyDTO getLocationPropertyDTO) {

        List<Property> properties = propertyService.getPropertiesWithinDistance(
                getLocationPropertyDTO.getLatitude(),
                getLocationPropertyDTO.getLongitude(),
                getLocationPropertyDTO.getDistance());

        return properties;
    }

    /*@PostMapping("/nearby")
    public List<Property> getNearbyProperties(
            @RequestBody double latitude,
            @RequestBody double longitude,
            @RequestBody double distance) {
        return propertyService.findNearbyProperties(latitude, longitude, distance);
    }*/

//    @PostMapping("/distance")
//    public ResponseEntity<String> getDistanceBetweenUserAndProperty(
//            @RequestBody GetLocationPropertyDTO getLocationPropertyDTO, ) {
//        Property property = propertyService.getDetailOfPropertyForDistance(propertyId);
//        if (property == null) {
//            return ResponseEntity.status(404).body("Property not found");
//        }
//
//        double distance = propertyService.getDistanceBetweenUserAndProperty(userLat, userLng, property);
//        JSONObject response = new JSONObject();
//        response.put("distance", distance);
//        response.put("unit", "km");
//
//        return ResponseEntity.ok(response.toString());
//    }
}
