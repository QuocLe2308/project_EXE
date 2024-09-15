package com.example.ProjectEXE.Service.ServiceImp;

import com.example.ProjectEXE.Models.Image;
import com.example.ProjectEXE.Models.Property;
import com.example.ProjectEXE.Repository.ImageRepository;
import com.example.ProjectEXE.Repository.PropertyRepository;
import com.example.ProjectEXE.Service.IService.ImageService;
import com.example.ProjectEXE.Service.ServiceImp.Utils.ImageUtil;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ImageServiceImp implements ImageService {

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private PropertyRepository propertyRepository;

    @Override
    public String uploadImage(MultipartFile file, Long propertyId) throws IOException {
        Property property = propertyRepository.findByPropertyId(propertyId);
        if (property == null) {
            return "Property Not Found";
        }

        Image imageData = imageRepository.save(Image.builder()
                .name(file.getOriginalFilename())
                .type(file.getContentType())
                .imageData(ImageUtil.compressImage(file.getBytes()))
                .property(property)
                .build());

        if (imageData != null) {
            return "File uploaded successfully: " + file.getOriginalFilename();
        }
        return null;
    }

    @Override
    public byte[] downloadImage(String fileName) {
        Optional<Image> dbImageData = imageRepository.findByName(fileName);
        byte[] images = ImageUtil.decompressImage(dbImageData.get().getImageData());
        return images;
    }
}
