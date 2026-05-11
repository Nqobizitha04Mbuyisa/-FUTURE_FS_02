package com.example.crm.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LeadResponse {
    private Long id;
    private String fullName;
    private String email;
    private String phone;
    private String company;
    private String leadSource;
    private String message;
    private String status;
    private Instant createdAt;
    private Instant updatedAt;
}
