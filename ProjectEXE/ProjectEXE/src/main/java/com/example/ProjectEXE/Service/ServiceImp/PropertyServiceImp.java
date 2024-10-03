package com.example.ProjectEXE.Service.ServiceImp;

import com.example.ProjectEXE.Config.GoogleApiConfig;
import com.example.ProjectEXE.DTO.CombineDTO.CombineImageAndPropertyDTO;
import com.example.ProjectEXE.DTO.CombineDTO.PropertyWithImagesDTO;
import com.example.ProjectEXE.DTO.Property.EditPropertyDTO;
import com.example.ProjectEXE.DTO.Property.GetLocationPropertyDTO;
import com.example.ProjectEXE.Models.Image;
import com.example.ProjectEXE.Models.Property;
import com.example.ProjectEXE.Repository.Account.LandlordRepository;
import com.example.ProjectEXE.Repository.Account.UserRepository;
import com.example.ProjectEXE.Repository.ImageRepository;
import com.example.ProjectEXE.Repository.PropertyRepository;
import com.example.ProjectEXE.Service.IService.PropertyService;
import com.example.ProjectEXE.Service.ServiceImp.Utils.ImageUtil;
import com.example.ProjectEXE.Service.ServiceImp.Utils.JwtUtil;
import com.example.ProjectEXE.Service.ServiceImp.Utils.ResponseUtil;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.Value;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.*;
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
    @Autowired
    private final RestTemplate restTemplate;

    private final String googleDistanceMatrixUrl = "https://maps.googleapis.com/maps/api/distancematrix/json";

    @Autowired
    private GoogleApiConfig googleApiConfig;

    @Override
    public String createProperty(Property property) {
            int role = jwtUtil.getRole();
        if(role!=2) {
            JSONObject response = responseUtil.getErrorResponse(String.join(", ", "You do not have permission to do this action!"));
            return response.toString();
        }
            List<String> validationResults = validateProperty(property, "add");
            if (!validationResults.isEmpty()) {
                JSONObject response = responseUtil.getErrorResponse(String.join(", ", validationResults));
                return response.toString();
            } else {
                property.setOwner(landlordRepository.findByLandlordID(jwtUtil.getUserId()));
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
            List<PropertyWithImagesDTO> propertyWithImagesDTOList = convertPropertiesToDTO(properties);
            JSONObject successResponse = responseUtil.getSuccessResponse("Success!", propertyWithImagesDTOList);
            return successResponse.toString();
        }
    }


//    @Override
//    public String editProperty(EditPropertyDTO editPropertyDTO) {
//        System.out.println("id truyen tu front end "+editPropertyDTO.getPropertyId());
//        Property property = propertyRepository.findByPropertyId(editPropertyDTO.getPropertyId());
//        if (!Objects.equals(property.getOwner().getLandlordID(), jwtUtil.getUserId()) && jwtUtil.getRole() != 2) {
//            JSONObject response = responseUtil.getErrorResponse(String.join(", ", "You do not have permission to do this action!"));
//            return response.toString();
//        }
//
//        if (!propertyRepository.existsByPropertyId(editPropertyDTO.getPropertyId())) {
//            JSONObject response = responseUtil.getErrorResponse(String.join(", ", "Property does not exist!"));
//            return response.toString();
//        } else {
//            if (editPropertyDTO.getOwner() != null) {
//                property.setOwner(editPropertyDTO.getOwner());
//            }
//            property.setDescription(editPropertyDTO.getDescription());
//            property.setMonthlyRent(editPropertyDTO.getMonthlyRent());
//            property.setMaxTenants(editPropertyDTO.getMaxTenants());
//            property.setUser(editPropertyDTO.getUser());
//            propertyRepository.save(property);
//            JSONObject response = responseUtil.getSuccessResponse("success");
//            return new JSONObject(property).toString();
//        }
//    }

    @Override
    public String editProperty(Long id, EditPropertyDTO editPropertyDTO) {
        System.out.println("ID truyền từ front end: " + id);
        Property property = propertyRepository.findByPropertyId(id);

        if (!Objects.equals(property.getOwner().getLandlordID(), jwtUtil.getUserId()) && jwtUtil.getRole() != 2) {
            JSONObject response = responseUtil.getErrorResponse("You do not have permission to do this action!");
            return response.toString();
        }

        if (!propertyRepository.existsByPropertyId(id)) {
            JSONObject response = responseUtil.getErrorResponse("Property does not exist!");
            return response.toString();
        } else {
            if (editPropertyDTO.getOwner() != null) {
                property.setOwner(editPropertyDTO.getOwner());
            }
                property.setPropertyName(editPropertyDTO.getPropertyName());
                property.setDescription(editPropertyDTO.getDescription());
                property.setMonthlyRent(editPropertyDTO.getMonthlyRent());
                property.setMaxTenants(editPropertyDTO.getMaxTenants());
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

            List<Image> images = imageRepository.findImageByProperty_PropertyId(property.getPropertyId());
            List<String> base64Images = new ArrayList<>();

            for (Image image : images) {
                byte[] imageData = ImageUtil.decompressImage(image.getImageData());
                String base64Image = Base64.getEncoder().encodeToString(imageData);
                base64Images.add("data:image/png;base64," + base64Image);
            }

            PropertyWithImagesDTO propertyWithImagesDTO = new PropertyWithImagesDTO(property, base64Images);
            JSONObject response = new JSONObject(propertyWithImagesDTO);
            return response.toString();
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
        if (property.getLatitude() == null || property.getLongitude() == null) {
            errors.add("Please enter a valid Latitude");
        }
        if (property.getMonthlyRent() == null || property.getMonthlyRent() <= 0) {
            errors.add("Please enter a valid MonthlyRent");
        }
        /*if (property.getOwner() == null || !landlordRepository.existsByLandlordID(property.getOwner().getLandlordID())) {
            errors.add("Please enter a valid Owner");
        }*/
        if (property.getUser() != null) {
            if (!userRepository.existsById(property.getUser().getUserID())) {
                errors.add("Please enter a valid User");
            }
        }
        return errors;
    }

    @Override
    public List<PropertyWithImagesDTO> sortByPriceHighToLow() {
        List<Property> properties = propertyRepository.findAllByOrderByMonthlyRentDesc();
        return convertPropertiesToDTO(properties);
    }

    @Override
    public List<PropertyWithImagesDTO> sortByPriceLowToHigh() {
        List<Property> properties = propertyRepository.findAllByOrderByMonthlyRentAsc();
        return convertPropertiesToDTO(properties);
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

    @Override
    public List<PropertyWithImagesDTO> getPropertiesWithinDistance(double latitude, double longitude, double distance) throws IOException {
        List<Property> properties = propertyRepository.findPropertiesWithinDistance(latitude, longitude, distance);
        List<PropertyWithImagesDTO> propertyWithImagesDTOList = new ArrayList<>();
        System.out.println("kinh do nhap tu web " + latitude);
        System.out.println("vi do nhap tu web " + longitude);
        System.out.println("ban kinh nhap tu web " + distance);
        System.out.println("danh sach nha tro nhan duoc khi nhan ve kinh do vi do" + properties);
        for (Property property : properties) {
            List<Image> images = imageRepository.findImageByProperty_PropertyId(property.getPropertyId());
            List<String> base64Images = new ArrayList<>();

            for (Image image : images) {
                byte[] imageData = ImageUtil.decompressImage(image.getImageData());
                String base64Image = Base64.getEncoder().encodeToString(imageData);
                base64Images.add("data:image/png;base64," + base64Image);
            }
            PropertyWithImagesDTO propertyWithImagesDTO = new PropertyWithImagesDTO(property, base64Images);
            propertyWithImagesDTOList.add(propertyWithImagesDTO);
        }
        System.out.println("danh sach sau khi add vao list " +propertyWithImagesDTOList);

        return propertyWithImagesDTOList;
    }

    @Override
    public List<PropertyWithImagesDTO> convertPropertiesToDTO(List<Property> properties) {
        List<PropertyWithImagesDTO> propertyWithImagesDTOList = new ArrayList<>();

        for (Property property : properties) {
            List<Image> images = imageRepository.findImageByProperty_PropertyId(property.getPropertyId());
            List<String> base64Images = new ArrayList<>();

            for (Image image : images) {
                byte[] imageData = ImageUtil.decompressImage(image.getImageData());
                String base64Image = Base64.getEncoder().encodeToString(imageData);
                base64Images.add("data:image/png;base64," + base64Image);
            }

            PropertyWithImagesDTO propertyWithImagesDTO = new PropertyWithImagesDTO(property, base64Images);
            propertyWithImagesDTOList.add(propertyWithImagesDTO);
        }

        return propertyWithImagesDTOList;
    }

    @Override
    public List<Property> getAllPropertiesByLandlordId() {
        if (jwtUtil.getRole() != 2) {
            throw new SecurityException("You do not have permission to do this action!");
        }
        return propertyRepository.findAllByOwner_LandlordID(jwtUtil.getUserId());
    }
}

