package com.example.crm.repository;

import com.example.crm.model.Lead;
import com.example.crm.model.LeadStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.Instant;

public interface LeadRepository extends JpaRepository<Lead, Long> {

    long countByStatus(LeadStatus status);

    long countByCreatedAtAfter(Instant since);

    @Query("""
           SELECT l FROM Lead l
           WHERE (:status IS NULL OR l.status = :status)
             AND (
                  :q IS NULL OR :q = '' OR
                  LOWER(l.fullName) LIKE LOWER(CONCAT('%', :q, '%')) OR
                  LOWER(l.email)    LIKE LOWER(CONCAT('%', :q, '%')) OR
                  LOWER(COALESCE(l.company, '')) LIKE LOWER(CONCAT('%', :q, '%'))
             )
           """)
    Page<Lead> search(@Param("q") String q,
                      @Param("status") LeadStatus status,
                      Pageable pageable);
}
