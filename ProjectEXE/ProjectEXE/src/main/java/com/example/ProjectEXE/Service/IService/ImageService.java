package com.example.ProjectEXE.Service.IService;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ImageService {
    public String uploadImage(MultipartFile file, Long propertyId) throws IOException;
    public String downloadImage(String fileName) throws IOException;
    public List<String> getImagesByPropertyId(Long propertyId) throws IOException;
}
