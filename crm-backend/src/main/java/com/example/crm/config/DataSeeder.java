package com.example.crm.config;

import com.example.crm.model.Lead;
import com.example.crm.model.LeadStatus;
import com.example.crm.model.LeadStatusHistory;
import com.example.crm.model.Role;
import com.example.crm.model.User;
import com.example.crm.repository.LeadRepository;
import com.example.crm.repository.LeadStatusHistoryRepository;
import com.example.crm.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final LeadRepository leadRepository;
    private final LeadStatusHistoryRepository historyRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.admin.email}")
    private String adminEmail;

    @Value("${app.admin.password}")
    private String adminPassword;

    @Value("${app.admin.name}")
    private String adminName;

    @Override
    public void run(String... args) {
        seedAdmin();
        seedSampleLeads();
    }

    private void seedAdmin() {
        if (userRepository.existsByEmailIgnoreCase(adminEmail)) {
            log.info("Admin user already exists: {}", adminEmail);
            return;
        }
        User admin = User.builder()
                .name(adminName)
                .email(adminEmail)
                .passwordHash(passwordEncoder.encode(adminPassword))
                .role(Role.ADMIN)
                .active(true)
                .build();

                
        userRepository.save(admin);
        log.info("Seeded admin: {}", adminEmail);
    }
   /*private void seedAdmin() {

    userRepository.findByEmailIgnoreCase(adminEmail)
            .ifPresent(userRepository::delete);

    User admin = User.builder()
            .name(adminName)
            .email(adminEmail)
            .passwordHash(passwordEncoder.encode(adminPassword))
            .role(Role.ADMIN)
            .active(true)
            .build();

    userRepository.save(admin);

    log.info("Fresh admin user seeded: {}", adminEmail);
}*/

    private void seedSampleLeads() {
        if (leadRepository.count() > 0) return;

        List<Lead> samples = List.of(
                Lead.builder().fullName("Aarav Mehta").email("aarav.mehta@example.com")
                        .phone("+91 98000 11122").company("Mehta Industries")
                        .leadSource("Website").message("Interested in enterprise plan demo.")
                        .status(LeadStatus.NEW).build(),
                Lead.builder().fullName("Sara Khan").email("sara.khan@acmecorp.io")
                        .phone("+1 415 555 0123").company("Acme Corp")
                        .leadSource("Referral").message("Looking for CRM for 50-person sales team.")
                        .status(LeadStatus.CONTACTED).build(),
                Lead.builder().fullName("Liam O'Connor").email("liam@oconnordesign.ie")
                        .phone("+353 87 654 3210").company("O'Connor Design")
                        .leadSource("LinkedIn").message("Need lead tracking for boutique studio.")
                        .status(LeadStatus.QUALIFIED).build(),
                Lead.builder().fullName("Yuki Tanaka").email("yuki@tanaka-solutions.jp")
                        .phone("+81 3 1234 5678").company("Tanaka Solutions")
                        .leadSource("Google Ads").message("Signed annual contract.")
                        .status(LeadStatus.CONVERTED).build(),
                Lead.builder().fullName("Maria Garcia").email("maria.g@startuplab.es")
                        .phone("+34 612 345 678").company("StartupLab")
                        .leadSource("Cold Outreach").message("Went with competitor.")
                        .status(LeadStatus.LOST).build()
        );

        for (Lead l : samples) {
            Lead saved = leadRepository.save(l);
            historyRepository.save(LeadStatusHistory.builder()
                    .lead(saved)
                    .fromStatus(null)
                    .toStatus(saved.getStatus())
                    .changedBy(null)
                    .build());
        }
        log.info("Seeded {} sample leads", samples.size());
    }
}
