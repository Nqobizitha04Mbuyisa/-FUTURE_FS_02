-- ===========================================================
--  Mini CRM - Sample seed data (optional manual insert)
-- ===========================================================
--  NOTE: The application also contains a Java DataSeeder that
--  auto-inserts a default admin and sample leads on first run.
--  This file is for manual database seeding scenarios.
-- ===========================================================

-- Default admin user (password: Admin@123)
-- BCrypt hash below corresponds to "Admin@123" (cost factor 12).
-- For convenience, prefer letting the Java DataSeeder create the
-- admin so the BCrypt hash is computed at runtime.
--
-- INSERT INTO dbo.users (name, email, password_hash, role, active)
-- VALUES (
--   N'System Administrator',
--   N'admin@crm.com',
--   N'$2a$12$REPLACE_WITH_GENERATED_BCRYPT_HASH',
--   N'ADMIN',
--   1
-- );

-- Sample leads
INSERT INTO dbo.leads (full_name, email, phone, company, lead_source, message, status) VALUES
(N'Aarav Mehta',   N'aarav.mehta@example.com',     N'+91 98000 11122', N'Mehta Industries',  N'Website',       N'Interested in enterprise plan demo.',          N'NEW'),
(N'Sara Khan',     N'sara.khan@acmecorp.io',       N'+1 415 555 0123', N'Acme Corp',         N'Referral',      N'Looking for CRM for 50-person sales team.',    N'CONTACTED'),
(N'Liam O''Connor',N'liam@oconnordesign.ie',       N'+353 87 654 3210',N'O''Connor Design',  N'LinkedIn',      N'Need lead tracking for boutique studio.',      N'QUALIFIED'),
(N'Yuki Tanaka',   N'yuki@tanaka-solutions.jp',    N'+81 3 1234 5678', N'Tanaka Solutions',  N'Google Ads',    N'Signed annual contract.',                      N'CONVERTED'),
(N'Maria Garcia',  N'maria.g@startuplab.es',       N'+34 612 345 678', N'StartupLab',        N'Cold Outreach', N'Went with competitor.',                        N'LOST');
GO
