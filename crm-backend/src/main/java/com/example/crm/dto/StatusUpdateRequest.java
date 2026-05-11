package com.example.crm.dto;

import com.example.crm.model.LeadStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class StatusUpdateRequest {

    @NotNull
    private LeadStatus status;
}
