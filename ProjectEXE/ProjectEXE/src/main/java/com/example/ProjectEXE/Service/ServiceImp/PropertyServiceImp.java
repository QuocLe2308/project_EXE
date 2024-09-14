package com.example.ProjectEXE.Service.ServiceImp;

import com.example.ProjectEXE.DTO.Account.EditAccountDTO;
import com.example.ProjectEXE.DTO.Property.EditPropertyDTO;
import com.example.ProjectEXE.Models.Account.Landlord;
import com.example.ProjectEXE.Models.Property;
import com.example.ProjectEXE.Repository.Account.LandlordRepository;
import com.example.ProjectEXE.Repository.Account.UserRepository;
import com.example.ProjectEXE.Repository.PropertyRepository;
import com.example.ProjectEXE.Service.IService.PropertyService;
import com.example.ProjectEXE.Service.ServiceImp.Utils.ResponseUtil;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

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

    @Override
    public String createProperty(Property property) {
        List<String> validationResults = validateProperty(property, "add");
        System.out.println(property.getOwner().getLandlordID());
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
        if (!propertyRepository.existsByPropertyId(editPropertyDTO.getId())) {
            JSONObject response = responseUtil.getErrorResponse(String.join(", ", "Property does not exist!"));
            return response.toString();
        } else {
            Property property = propertyRepository.findByPropertyId(editPropertyDTO.getId());
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
        if (!userRepository.existsById(property.getUser().getUserID())) {
            errors.add("Please enter a valid User");
        }
        return errors;
    }

    @Override
    public List<Property> sortByPriceHighToLow(){
        return propertyRepository.findAllByOrderByMonthlyRentDesc();
    }

    @Override
    public List<Property> sortByPriceLowToHigh(){
        return propertyRepository.findAllByOrderByMonthlyRentAsc()
                ;
    }
}
