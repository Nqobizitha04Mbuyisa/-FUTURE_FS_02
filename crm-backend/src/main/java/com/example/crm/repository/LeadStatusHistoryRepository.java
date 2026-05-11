package com.example.crm.repository;

import com.example.crm.model.LeadStatusHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LeadStatusHistoryRepository extends JpaRepository<LeadStatusHistory, Long> {
    List<LeadStatusHistory> findByLeadIdOrderByChangedAtDesc(Long leadId);
}
