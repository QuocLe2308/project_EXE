package com.example.ProjectEXE.Service.IService;

import com.example.ProjectEXE.DTO.CombineDTO.PropertyWithImagesDTO;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ImageService {
    public String uploadImage(MultipartFile file, Long propertyId) throws IOException;
    public String downloadImage(String fileName) throws IOException;
    public String getImagesByPropertyId(Long propertyId) throws IOException;
}
