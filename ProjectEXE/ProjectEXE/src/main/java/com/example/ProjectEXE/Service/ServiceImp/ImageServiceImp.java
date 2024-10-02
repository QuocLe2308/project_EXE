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
import java.util.*;

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
            System.out.println("This is id of the property "+property.getOwner().getLandlordID());
            System.out.println("This is id of the user login "+jwtUtil.getUserId());
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
    public String downloadImage(String fileName) throws IOException {
        Optional<Image> dbImageData = imageRepository.findByName(fileName);
        if (dbImageData.isPresent()) {
            byte[] imageData = ImageUtil.decompressImage(dbImageData.get().getImageData());
            String base64Image = Base64.getEncoder().encodeToString(imageData);
            JSONObject response = new JSONObject();
            response.put("status", "success");
            response.put("image", "data:image/png;base64," + base64Image);
            return response.toString();
        } else {
            JSONObject response = new JSONObject();
            response.put("status", "error");
            response.put("message", "Image not found");
            return response.toString();
        }
    }

    @Override
    public String getImagesByPropertyId(Long propertyId) throws IOException {
        List<Image> images = imageRepository.findImageByProperty_PropertyId(propertyId);
        JSONObject jsonResponse = new JSONObject();
        List<JSONObject> imageList = new ArrayList<>();
        for (Image image : images) {
            byte[] imageData = ImageUtil.decompressImage(image.getImageData());
            String base64Image = Base64.getEncoder().encodeToString(imageData);
            JSONObject imageJson = new JSONObject();
            imageJson.put("status", "success");
            imageJson.put("image", "data:image/png;base64," + base64Image);

            imageList.add(imageJson);
        }
        jsonResponse.put("images", imageList);
        return jsonResponse.toString();
    }
}
