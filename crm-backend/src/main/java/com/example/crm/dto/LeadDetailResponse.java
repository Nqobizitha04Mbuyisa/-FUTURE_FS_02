package com.example.crm.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LeadDetailResponse {
    private LeadResponse lead;
    private List<NoteResponse> notes;
    private List<StatusHistoryResponse> statusHistory;
}
