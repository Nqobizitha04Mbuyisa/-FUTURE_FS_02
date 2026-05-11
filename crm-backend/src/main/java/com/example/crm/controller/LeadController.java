package com.example.crm.controller;

import com.example.crm.dto.*;
import com.example.crm.model.LeadStatus;
import com.example.crm.security.UserPrincipal;
import com.example.crm.service.LeadService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/leads")
@RequiredArgsConstructor
@PreAuthorize("isAuthenticated()")
public class LeadController {

    private final LeadService leadService;

    @GetMapping
    public ResponseEntity<PageResponse<LeadResponse>> list(
            @RequestParam(value = "q", required = false) String q,
            @RequestParam(value = "status", required = false) LeadStatus status,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "20") int size) {
        return ResponseEntity.ok(leadService.listLeads(q, status, page, size));
    }

    @PostMapping
    public ResponseEntity<LeadResponse> create(@Valid @RequestBody CreateLeadRequest req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(leadService.createLead(req));
    }

    @GetMapping("/{id}")
    public ResponseEntity<LeadDetailResponse> get(@PathVariable Long id) {
        return ResponseEntity.ok(leadService.getLeadDetail(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<LeadResponse> update(@PathVariable Long id,
                                               @Valid @RequestBody UpdateLeadRequest req) {
        return ResponseEntity.ok(leadService.updateLead(id, req));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        leadService.deleteLead(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<LeadResponse> updateStatus(
            @PathVariable Long id,
            @Valid @RequestBody StatusUpdateRequest req,
            @AuthenticationPrincipal UserPrincipal principal) {
        return ResponseEntity.ok(leadService.updateStatus(id, req.getStatus(), principal));
    }

    @PostMapping("/{id}/notes")
    public ResponseEntity<NoteResponse> addNote(
            @PathVariable Long id,
            @Valid @RequestBody CreateNoteRequest req,
            @AuthenticationPrincipal UserPrincipal principal) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(leadService.addNote(id, req, principal));
    }
}
