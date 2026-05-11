package com.example.crm.service;

import com.example.crm.dto.*;
import com.example.crm.exception.ResourceNotFoundException;
import com.example.crm.mapper.LeadMapper;
import com.example.crm.model.*;
import com.example.crm.repository.LeadNoteRepository;
import com.example.crm.repository.LeadRepository;
import com.example.crm.repository.LeadStatusHistoryRepository;
import com.example.crm.repository.UserRepository;
import com.example.crm.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LeadService {

    private final LeadRepository leadRepository;
    private final LeadNoteRepository noteRepository;
    private final LeadStatusHistoryRepository historyRepository;
    private final UserRepository userRepository;
    private final LeadMapper mapper;

    @Transactional
    public LeadResponse createLead(CreateLeadRequest req) {
        Lead lead = Lead.builder()
                .fullName(req.getFullName())
                .email(req.getEmail())
                .phone(req.getPhone())
                .company(req.getCompany())
                .leadSource(req.getLeadSource())
                .message(req.getMessage())
                .status(LeadStatus.NEW)
                .build();
        Lead saved = leadRepository.save(lead);

        LeadStatusHistory hist = LeadStatusHistory.builder()
                .lead(saved)
                .fromStatus(null)
                .toStatus(LeadStatus.NEW)
                .changedBy(null)
                .build();
        historyRepository.save(hist);

        return mapper.toLeadResponse(saved);
    }

    @Transactional(readOnly = true)
    public PageResponse<LeadResponse> listLeads(String q, LeadStatus status, int page, int size) {
        Page<Lead> p = leadRepository.search(
                q,
                status,
                PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"))
        );
        List<LeadResponse> content = p.getContent().stream().map(mapper::toLeadResponse).toList();
        return PageResponse.<LeadResponse>builder()
                .content(content)
                .page(p.getNumber())
                .size(p.getSize())
                .totalElements(p.getTotalElements())
                .totalPages(p.getTotalPages())
                .last(p.isLast())
                .build();
    }

    @Transactional(readOnly = true)
    public LeadDetailResponse getLeadDetail(Long id) {
        Lead lead = leadRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lead not found: " + id));

        List<NoteResponse> notes = noteRepository.findByLeadIdOrderByCreatedAtDesc(id)
                .stream().map(mapper::toNoteResponse).toList();

        List<StatusHistoryResponse> history = historyRepository.findByLeadIdOrderByChangedAtDesc(id)
                .stream().map(mapper::toStatusHistoryResponse).toList();

        return LeadDetailResponse.builder()
                .lead(mapper.toLeadResponse(lead))
                .notes(notes)
                .statusHistory(history)
                .build();
    }

    @Transactional
    public LeadResponse updateLead(Long id, UpdateLeadRequest req) {
        Lead lead = leadRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lead not found: " + id));

        if (req.getFullName() != null) lead.setFullName(req.getFullName());
        if (req.getEmail() != null) lead.setEmail(req.getEmail());
        if (req.getPhone() != null) lead.setPhone(req.getPhone());
        if (req.getCompany() != null) lead.setCompany(req.getCompany());
        if (req.getLeadSource() != null) lead.setLeadSource(req.getLeadSource());
        if (req.getMessage() != null) lead.setMessage(req.getMessage());

        return mapper.toLeadResponse(leadRepository.save(lead));
    }

    @Transactional
    public void deleteLead(Long id) {
        if (!leadRepository.existsById(id)) {
            throw new ResourceNotFoundException("Lead not found: " + id);
        }
        leadRepository.deleteById(id);
    }

    @Transactional
    public LeadResponse updateStatus(Long id, LeadStatus newStatus, UserPrincipal principal) {
        Lead lead = leadRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lead not found: " + id));

        if (lead.getStatus() == newStatus) {
            return mapper.toLeadResponse(lead);
        }

        LeadStatus from = lead.getStatus();
        lead.setStatus(newStatus);
        Lead saved = leadRepository.save(lead);

        User changer = userRepository.findById(principal.getId()).orElse(null);
        LeadStatusHistory hist = LeadStatusHistory.builder()
                .lead(saved)
                .fromStatus(from)
                .toStatus(newStatus)
                .changedBy(changer)
                .build();
        historyRepository.save(hist);

        return mapper.toLeadResponse(saved);
    }

    @Transactional
    public NoteResponse addNote(Long leadId, CreateNoteRequest req, UserPrincipal principal) {
        Lead lead = leadRepository.findById(leadId)
                .orElseThrow(() -> new ResourceNotFoundException("Lead not found: " + leadId));
        User author = userRepository.findById(principal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + principal.getId()));

        LeadNote note = LeadNote.builder()
                .lead(lead)
                .author(author)
                .noteText(req.getNoteText())
                .build();
        return mapper.toNoteResponse(noteRepository.save(note));
    }
}
