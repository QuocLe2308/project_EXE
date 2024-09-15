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

@RestController
@RequestMapping("/api/image")
@AllArgsConstructor
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
    public ResponseEntity<?> downloadImage(@PathVariable String fileName){
        byte[] imageData = imageService.downloadImage(fileName);
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.valueOf("image/png"))
                .body(imageData);

    }
}
