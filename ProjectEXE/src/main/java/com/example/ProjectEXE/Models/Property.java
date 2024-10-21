package com.example.ProjectEXE.Models;

import com.example.ProjectEXE.Models.Account.Landlord;
import com.example.ProjectEXE.Models.Account.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "properties")
public class Property {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "property_id")
    private Long propertyId;

    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    private Landlord owner;

    @Column(name = "property_name", nullable = false)
    private String propertyName;

    @Column(name = "address", nullable = false)
    private String address;

    @Lob
    @Column(name = "description")
    private String description;

    @Column(name = "monthly_rent", nullable = false)
    private Double monthlyRent;

    @Column(name = "max_tenants", nullable = false)
    private Integer maxTenants;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "latitude", nullable = false)
    private Double latitude;

    @Column(name = "longitude", nullable = false)
    private Double longitude;

    @Column(name = "created_at")
    @Convert(converter = LocalDateTimeToIntegerConverter.class)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    @Convert(converter = LocalDateTimeToIntegerConverter.class)
    private LocalDateTime updatedAt;

    @Column(name = "is_disable", nullable = false, columnDefinition = "TINYINT(1) default 0")
    private boolean isDisable;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}