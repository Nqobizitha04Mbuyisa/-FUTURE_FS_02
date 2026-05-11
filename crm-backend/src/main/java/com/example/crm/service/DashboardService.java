package com.example.crm.service;

import com.example.crm.dto.DashboardStatsResponse;
import com.example.crm.dto.LeadResponse;
import com.example.crm.mapper.LeadMapper;
import com.example.crm.model.Lead;
import com.example.crm.model.LeadStatus;
import com.example.crm.repository.LeadRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final LeadRepository leadRepository;
    private final LeadMapper mapper;

    @Transactional(readOnly = true)
    public DashboardStatsResponse getStats() {
        long total = leadRepository.count();
        long newLeads = leadRepository.countByStatus(LeadStatus.NEW);
        long contacted = leadRepository.countByStatus(LeadStatus.CONTACTED);
        long qualified = leadRepository.countByStatus(LeadStatus.QUALIFIED);
        long converted = leadRepository.countByStatus(LeadStatus.CONVERTED);
        long lost = leadRepository.countByStatus(LeadStatus.LOST);

        Instant weekAgo = Instant.now().minus(7, ChronoUnit.DAYS);
        long thisWeek = leadRepository.countByCreatedAtAfter(weekAgo);

        double conversionRate = total == 0 ? 0.0 :
                Math.round(((double) converted / total) * 1000.0) / 10.0;

        Map<String, Long> breakdown = new LinkedHashMap<>();
        breakdown.put("NEW", newLeads);
        breakdown.put("CONTACTED", contacted);
        breakdown.put("QUALIFIED", qualified);
        breakdown.put("CONVERTED", converted);
        breakdown.put("LOST", lost);

        List<Lead> recent = leadRepository.findAll(
                PageRequest.of(0, 5, Sort.by(Sort.Direction.DESC, "createdAt"))
        ).getContent();
        List<LeadResponse> recentDtos = recent.stream().map(mapper::toLeadResponse).toList();

        return DashboardStatsResponse.builder()
                .totalLeads(total)
                .newLeads(newLeads)
                .contactedLeads(contacted)
                .qualifiedLeads(qualified)
                .convertedLeads(converted)
                .lostLeads(lost)
                .newLeadsThisWeek(thisWeek)
                .conversionRate(conversionRate)
                .statusBreakdown(breakdown)
                .recentLeads(recentDtos)
                .build();
    }
}
