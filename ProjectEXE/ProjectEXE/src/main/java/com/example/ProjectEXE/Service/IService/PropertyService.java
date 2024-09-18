package com.example.ProjectEXE.Service.IService;

import com.example.ProjectEXE.DTO.CombineDTO.ImageAndProperty.CombineImageAndPropertyDTO;
import com.example.ProjectEXE.DTO.Property.EditPropertyDTO;
import com.example.ProjectEXE.Models.Property;

import java.util.List;

public interface PropertyService {
    public  String createProperty(Property property);
    public List<String> validateProperty(Property property, String type);
    public String editProperty(EditPropertyDTO editPropertyDTO);
    public String deleteProperty(Long id);
    public List<Property> sortByPriceHighToLow();
    public List<Property> sortByPriceLowToHigh();
    public String getDetailOfProperty(Long id);
    public String getAllProperty();
    public String getCombinedData();
}
