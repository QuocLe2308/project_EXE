package com.example.ProjectEXE.Service.IService;

import com.example.ProjectEXE.DTO.CombineDTO.PropertyWithImagesDTO;
import com.example.ProjectEXE.DTO.Property.EditPropertyDTO;
import com.example.ProjectEXE.DTO.Property.GetLocationPropertyDTO;
import com.example.ProjectEXE.Models.Property;

import java.io.IOException;
import java.util.List;

public interface PropertyService {
    public  String createProperty(Property property);
    public List<String> validateProperty(Property property, String type);
//    public String editProperty(EditPropertyDTO editPropertyDTO);
    public String deleteProperty(Long id);
//    public List<Property> sortByPriceHighToLow();
    public List<PropertyWithImagesDTO> sortByPriceHighToLow();
    public List<PropertyWithImagesDTO> sortByPriceLowToHigh();
//    public List<Property> sortByPriceLowToHigh();
    public String getDetailOfProperty(Long id);
    public String getAllProperty();
    public String getCombinedData();
//    public List<Property> findNearbyProperties(GetLocationPropertyDTO getLocationPropertyDTO);
//    public double getDistanceBetweenUserAndProperty(double userLat, double userLng, Property property);
//    Property getDetailOfPropertyForDistance(Long id);
//    public List<Property> findNearbyProperties(double latitude, double longitude, double distance);
//    public double getDistanceBetweenUserAndProperty(double userLatitude, double userLongitude, double propertyLatitude, double propertyLongitude);
//    public List<Property> getPropertiesWithinDistance(double userLatitude, double userLongitude, double distance);
    public List<PropertyWithImagesDTO> getPropertiesWithinDistance(double latitude, double longitude, double distance) throws IOException;
    public List<PropertyWithImagesDTO> convertPropertiesToDTO(List<Property> properties);
    public List<Property> getAllPropertiesByLandlordId();
    public String editProperty(Long id, EditPropertyDTO editPropertyDTO);
}
