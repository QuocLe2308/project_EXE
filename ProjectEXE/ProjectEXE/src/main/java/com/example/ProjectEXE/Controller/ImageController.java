package com.example.ProjectEXE.Controller;

import com.example.ProjectEXE.Service.IService.ImageService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/image")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class ImageController {

    @Autowired
    private final ImageService imageService;

    @PostMapping()
    public ResponseEntity<?> uploadImage(@RequestParam("file") MultipartFile file, @RequestParam("propertyId") Long propertyId) throws IOException {
        String uploadImage = imageService.uploadImage(file, propertyId);
        return ResponseEntity.status(HttpStatus.OK)
                .body(uploadImage);
    }

    @GetMapping("/{fileName}")
    public ResponseEntity<?> downloadImage(@PathVariable String fileName) throws IOException {
        String jsonResponse = imageService.downloadImage(fileName);
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.APPLICATION_JSON)
                .body(jsonResponse);
    }

    @GetMapping("/property/{propertyId}")
    public ResponseEntity<?> getImagesByPropertyId(@PathVariable Long propertyId) throws IOException {
        String jsonResponse = imageService.getImagesByPropertyId(propertyId); // Lấy JSON từ service

        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.APPLICATION_JSON)
                .body(jsonResponse);
    }
}
