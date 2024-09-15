package com.example.ProjectEXE.Service.IService;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ImageService {
    public String uploadImage(MultipartFile file, Long propertyId) throws IOException;
    public byte[] downloadImage(String fileName);
}
