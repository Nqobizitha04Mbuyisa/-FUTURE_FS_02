package com.example.crm.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UpdateLeadRequest {

    @Size(max = 160)
    private String fullName;

    @Email
    @Size(max = 160)
    private String email;

    @Size(max = 40)
    private String phone;

    @Size(max = 160)
    private String company;

    @Size(max = 80)
    private String leadSource;

    @Size(max = 2000)
    private String message;
}
