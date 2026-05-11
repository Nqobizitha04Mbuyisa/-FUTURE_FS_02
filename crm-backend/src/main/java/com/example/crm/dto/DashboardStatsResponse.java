package com.example.crm.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStatsResponse {
    private long totalLeads;
    private long newLeads;
    private long contactedLeads;
    private long qualifiedLeads;
    private long convertedLeads;
    private long lostLeads;
    private long newLeadsThisWeek;
    private double conversionRate;
    private Map<String, Long> statusBreakdown;
    private List<LeadResponse> recentLeads;
}
