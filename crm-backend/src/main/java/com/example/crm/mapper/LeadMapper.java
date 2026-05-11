package com.example.crm.mapper;

import com.example.crm.dto.LeadResponse;
import com.example.crm.dto.NoteResponse;
import com.example.crm.dto.StatusHistoryResponse;
import com.example.crm.dto.UserDto;
import com.example.crm.model.Lead;
import com.example.crm.model.LeadNote;
import com.example.crm.model.LeadStatusHistory;
import com.example.crm.model.User;
import org.springframework.stereotype.Component;

@Component
public class LeadMapper {

    public LeadResponse toLeadResponse(Lead lead) {
        return LeadResponse.builder()
                .id(lead.getId())
                .fullName(lead.getFullName())
                .email(lead.getEmail())
                .phone(lead.getPhone())
                .company(lead.getCompany())
                .leadSource(lead.getLeadSource())
                .message(lead.getMessage())
                .status(lead.getStatus().name())
                .createdAt(lead.getCreatedAt())
                .updatedAt(lead.getUpdatedAt())
                .build();
    }

    public NoteResponse toNoteResponse(LeadNote note) {
        return NoteResponse.builder()
                .id(note.getId())
                .noteText(note.getNoteText())
                .authorName(note.getAuthor() != null ? note.getAuthor().getName() : null)
                .authorId(note.getAuthor() != null ? note.getAuthor().getId() : null)
                .createdAt(note.getCreatedAt())
                .build();
    }

    public StatusHistoryResponse toStatusHistoryResponse(LeadStatusHistory h) {
        return StatusHistoryResponse.builder()
                .id(h.getId())
                .fromStatus(h.getFromStatus() != null ? h.getFromStatus().name() : null)
                .toStatus(h.getToStatus().name())
                .changedByName(h.getChangedBy() != null ? h.getChangedBy().getName() : "system")
                .changedAt(h.getChangedAt())
                .build();
    }

    public UserDto toUserDto(User user) {
        return UserDto.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole().name())
                .build();
    }
}
