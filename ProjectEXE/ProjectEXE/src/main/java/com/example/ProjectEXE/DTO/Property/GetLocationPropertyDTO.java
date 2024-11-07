package com.example.ProjectEXE.DTO.Property;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GetLocationPropertyDTO {
    private double latitude;
    private double longitude;
    private double distance;
}
