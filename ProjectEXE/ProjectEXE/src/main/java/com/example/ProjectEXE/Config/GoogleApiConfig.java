package com.example.ProjectEXE.Config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "google.api")
public class GoogleApiConfig {
    private String key;

    // Getters và Setters
    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }
}

