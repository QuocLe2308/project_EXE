package com.example.ProjectEXE.Models;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Converter(autoApply = true)
public class LocalDateTimeToIntegerConverter implements AttributeConverter<LocalDateTime, Integer> {

    @Override
    public Integer convertToDatabaseColumn(LocalDateTime locDateTime) {
        return (locDateTime == null ? null : (int) locDateTime.toEpochSecond(ZoneOffset.UTC));
    }

    @Override
    public LocalDateTime convertToEntityAttribute(Integer sqlTimestamp) {
        return (sqlTimestamp == null ? null : LocalDateTime.ofEpochSecond(sqlTimestamp, 0, ZoneOffset.UTC));
    }
}
