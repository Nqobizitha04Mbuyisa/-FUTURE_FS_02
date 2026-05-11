package com.example.crm.controller;

import com.example.crm.dto.CreateLeadRequest;
import com.example.crm.dto.LeadResponse;
import com.example.crm.service.LeadService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/public")
@RequiredArgsConstructor
public class PublicLeadController {

    private final LeadService leadService;

    /** Public contact form endpoint - no authentication required. */
    @PostMapping("/leads")
    public ResponseEntity<LeadResponse> submitContactForm(@Valid @RequestBody CreateLeadRequest req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(leadService.createLead(req));
    }
}
