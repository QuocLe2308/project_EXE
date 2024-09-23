package com.example.ProjectEXE.Service.ServiceImp;

import com.example.ProjectEXE.DTO.CombineDTO.CombineImageAndPropertyDTO;
import com.example.ProjectEXE.DTO.Property.EditPropertyDTO;
import com.example.ProjectEXE.Models.Image;
import com.example.ProjectEXE.Models.Property;
import com.example.ProjectEXE.Repository.Account.LandlordRepository;
import com.example.ProjectEXE.Repository.Account.UserRepository;
import com.example.ProjectEXE.Repository.ImageRepository;
import com.example.ProjectEXE.Repository.PropertyRepository;
import com.example.ProjectEXE.Service.IService.PropertyService;
import com.example.ProjectEXE.Service.ServiceImp.Utils.JwtUtil;
import com.example.ProjectEXE.Service.ServiceImp.Utils.ResponseUtil;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class PropertyServiceImp implements PropertyService {
    @Autowired
    private final PropertyRepository propertyRepository;
    @Autowired
    private final LandlordRepository landlordRepository;
    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final ResponseUtil responseUtil;
    @Autowired
    private final JwtUtil jwtUtil;
    @Autowired
    private final ImageRepository imageRepository;

    @Override
    public String createProperty(Property property) {
            List<String> validationResults = validateProperty(property, "add");
            if (!validationResults.isEmpty()) {
                JSONObject response = responseUtil.getErrorResponse(String.join(", ", validationResults));
                return response.toString();
            } else {
                propertyRepository.save(property);
                JSONObject response = responseUtil.getSuccessResponse("success");
                return new JSONObject(property).toString();
            }
    }

    @Override
    public String getAllProperty() {
        List<Property> properties = propertyRepository.findAll();
        if (properties.isEmpty()) {
            JSONObject errorResponse = responseUtil.getErrorResponse("Not Have Property!");
            return errorResponse.toString();
        } else {
            JSONObject successResponse = responseUtil.getSuccessResponse("Success!", properties);
            return successResponse.toString();
        }
    }

    @Override
    public String editProperty(EditPropertyDTO editPropertyDTO) {
        Property property = propertyRepository.findByPropertyId(editPropertyDTO.getId());
        if(!Objects.equals(property.getOwner().getLandlordID(), jwtUtil.getUserId())) {
            JSONObject response = responseUtil.getErrorResponse(String.join(", ", "You do not have permission to do this action!"));
            return response.toString();
        }
        if (!propertyRepository.existsByPropertyId(editPropertyDTO.getId())) {
            JSONObject response = responseUtil.getErrorResponse(String.join(", ", "Property does not exist!"));
            return response.toString();
        } else {
            property.setOwner(editPropertyDTO.getOwner());
            property.setDescription(editPropertyDTO.getDescription());
            property.setMonthlyRent(editPropertyDTO.getMonthlyRent());
            property.setMaxTenants(editPropertyDTO.getMaxTenants());
            property.setUser(editPropertyDTO.getUser());
            propertyRepository.save(property);
            JSONObject response = responseUtil.getSuccessResponse("success");
            return new JSONObject(property).toString();
        }
    }
    @Override
    @Transactional
    public String deleteProperty(Long id) {
        if (!propertyRepository.existsByPropertyId(id)) {
            JSONObject response = responseUtil.getErrorResponse("Property does not exist");
            return response.toString();
        } else {
            propertyRepository.deleteByPropertyId(id);
            JSONObject response = responseUtil.getSuccessResponse("Delete Successfully!");
            return response.toString();
        }
    }

    @Override
    public String getDetailOfProperty(Long id) {
        if (!propertyRepository.existsById(id)) {
            JSONObject response = responseUtil.getErrorResponse("Property does not exist");
            return response.toString();
        } else {
            Property property = propertyRepository.findById(id).orElse(null);

            if (property == null) {
                JSONObject response = responseUtil.getErrorResponse("Property not found");
                return response.toString();
            }
            return new JSONObject(property).toString();
        }
    }

    @Override
    public List<String> validateProperty(Property property, String type) {

        List<String> errors = new ArrayList<>();
        if (type.equals("edit") && !propertyRepository.existsByPropertyId(property.getPropertyId())) {
            errors.add("Property does not exist");
        }
        if (property.getPropertyName().isEmpty()) {
            errors.add("Please enter Full Name");
        }
        if (property.getDescription().isEmpty()) {
            errors.add("Please enter description");
        }
        if (property.getMaxTenants() == null || property.getMaxTenants() <= 0) {
            errors.add("Please enter a valid MaxTenants");
        }
        if (property.getMonthlyRent() == null || property.getMonthlyRent() <= 0) {
            errors.add("Please enter a valid MonthlyRent");
        }
        if (property.getOwner() == null || !landlordRepository.existsByLandlordID(property.getOwner().getLandlordID())) {
            errors.add("Please enter a valid Owner");
        }
        if (property.getUser() != null) {
            if (!userRepository.existsById(property.getUser().getUserID())) {
                errors.add("Please enter a valid User");
            }
        }
        return errors;
    }

    @Override
    public List<Property> sortByPriceHighToLow(){
        return propertyRepository.findAllByOrderByMonthlyRentDesc();
    }

    @Override
    public List<Property> sortByPriceLowToHigh(){
        return propertyRepository.findAllByOrderByMonthlyRentAsc();
    }

    @Override
    public String getCombinedData() {
        List<Image> images = imageRepository.findAll();
        List<Property> properties = propertyRepository.findAll();

        Set<Long> propertyIds = images.stream()
                .map(image -> image.getProperty().getPropertyId())
                .collect(Collectors.toSet());

        List<Property> filteredProperties = properties.stream()
                .filter(property -> propertyIds.contains(property.getPropertyId()))
                .collect(Collectors.toList());

        CombineImageAndPropertyDTO combineImageAndPropertyDTO = new CombineImageAndPropertyDTO();
        combineImageAndPropertyDTO.setImage(images);
        combineImageAndPropertyDTO.setProperty(filteredProperties);

        return new JSONObject(combineImageAndPropertyDTO).toString();
    }

}
