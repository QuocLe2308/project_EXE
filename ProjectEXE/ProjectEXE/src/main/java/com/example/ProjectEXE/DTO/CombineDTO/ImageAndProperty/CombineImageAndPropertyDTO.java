package com.example.ProjectEXE.DTO.CombineDTO.ImageAndProperty;

import com.example.ProjectEXE.Models.Image;
import com.example.ProjectEXE.Models.Property;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CombineImageAndPropertyDTO {
    private List<Property> property;
    private List<Image> image;
}
