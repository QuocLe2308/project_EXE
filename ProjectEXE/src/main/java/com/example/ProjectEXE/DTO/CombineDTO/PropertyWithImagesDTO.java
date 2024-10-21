package com.example.ProjectEXE.DTO.CombineDTO;

import com.example.ProjectEXE.Models.Property;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PropertyWithImagesDTO {
    private Property property;
    private List<String> images;
}

