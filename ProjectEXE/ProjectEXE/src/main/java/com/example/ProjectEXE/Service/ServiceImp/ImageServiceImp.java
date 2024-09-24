package com.example.ProjectEXE.Service.ServiceImp;

import com.example.ProjectEXE.Models.Image;
import com.example.ProjectEXE.Models.Property;
import com.example.ProjectEXE.Repository.ImageRepository;
import com.example.ProjectEXE.Repository.PropertyRepository;
import com.example.ProjectEXE.Service.IService.ImageService;
import com.example.ProjectEXE.Service.ServiceImp.Utils.ImageUtil;
import com.example.ProjectEXE.Service.ServiceImp.Utils.JwtUtil;
import com.example.ProjectEXE.Service.ServiceImp.Utils.ResponseUtil;
import lombok.AllArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.Objects;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ImageServiceImp implements ImageService {

    @Autowired
    private ImageRepository imageRepository;
    @Autowired
    private PropertyRepository propertyRepository;
    @Autowired
    private final JwtUtil jwtUtil;
    @Autowired
    private final ResponseUtil responseUtil;

    @Override
    public String uploadImage(MultipartFile file, Long propertyId) throws IOException {
        int role = jwtUtil.getRole();
        if(role!=2) {
            JSONObject response = responseUtil.getErrorResponse(String.join(", ", "You do not have permission to do this action!"));
            return response.toString();
        }
        Property property = propertyRepository.findByPropertyId(propertyId);
        if(!Objects.equals(property.getOwner().getLandlordID(), jwtUtil.getUserId())) {
            JSONObject response = responseUtil.getErrorResponse(String.join(", ", "You do not have permission to do this action!"));
            return response.toString();
        }
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
