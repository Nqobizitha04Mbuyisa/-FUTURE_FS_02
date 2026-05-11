-- ===========================================================
--  Mini CRM - SQL Server schema (reference only)
-- ===========================================================
--  Hibernate's spring.jpa.hibernate.ddl-auto=update will auto-
--  create these tables on first boot. This script is provided
--  for reference / manual provisioning.
-- ===========================================================

-- Create database (run once)
-- CREATE DATABASE mini_crm;
-- GO
-- USE mini_crm;
-- GO

IF OBJECT_ID(N'dbo.users', N'U') IS NULL
BEGIN
    CREATE TABLE dbo.users (
        id              BIGINT IDENTITY(1,1) PRIMARY KEY,
        name            NVARCHAR(120)  NOT NULL,
        email           NVARCHAR(160)  NOT NULL,
        password_hash   NVARCHAR(255)  NOT NULL,
        role            NVARCHAR(32)   NOT NULL,
        active          BIT            NOT NULL DEFAULT 1,
        created_at      DATETIME2(6)   NOT NULL DEFAULT SYSUTCDATETIME(),
        updated_at      DATETIME2(6)   NOT NULL DEFAULT SYSUTCDATETIME()
    );
    CREATE UNIQUE INDEX idx_users_email ON dbo.users(email);
END
GO

IF OBJECT_ID(N'dbo.leads', N'U') IS NULL
BEGIN
    CREATE TABLE dbo.leads (
        id              BIGINT IDENTITY(1,1) PRIMARY KEY,
        full_name       NVARCHAR(160)  NOT NULL,
        email           NVARCHAR(160)  NOT NULL,
        phone           NVARCHAR(40)   NULL,
        company         NVARCHAR(160)  NULL,
        lead_source     NVARCHAR(80)   NULL,
        message         NVARCHAR(2000) NULL,
        status          NVARCHAR(32)   NOT NULL DEFAULT 'NEW',
        created_at      DATETIME2(6)   NOT NULL DEFAULT SYSUTCDATETIME(),
        updated_at      DATETIME2(6)   NOT NULL DEFAULT SYSUTCDATETIME()
    );
    CREATE INDEX idx_leads_status     ON dbo.leads(status);
    CREATE INDEX idx_leads_email      ON dbo.leads(email);
    CREATE INDEX idx_leads_created_at ON dbo.leads(created_at);
END
GO

IF OBJECT_ID(N'dbo.lead_notes', N'U') IS NULL
BEGIN
    CREATE TABLE dbo.lead_notes (
        id          BIGINT IDENTITY(1,1) PRIMARY KEY,
        lead_id     BIGINT         NOT NULL,
        author_id   BIGINT         NOT NULL,
        note_text   NVARCHAR(4000) NOT NULL,
        created_at  DATETIME2(6)   NOT NULL DEFAULT SYSUTCDATETIME(),
        CONSTRAINT fk_notes_lead   FOREIGN KEY (lead_id)   REFERENCES dbo.leads(id)  ON DELETE CASCADE,
        CONSTRAINT fk_notes_author FOREIGN KEY (author_id) REFERENCES dbo.users(id)
    );
    CREATE INDEX idx_notes_lead_id ON dbo.lead_notes(lead_id);
END
GO

IF OBJECT_ID(N'dbo.lead_status_history', N'U') IS NULL
BEGIN
    CREATE TABLE dbo.lead_status_history (
        id              BIGINT IDENTITY(1,1) PRIMARY KEY,
        lead_id         BIGINT       NOT NULL,
        from_status     NVARCHAR(32) NULL,
        to_status       NVARCHAR(32) NOT NULL,
        changed_by_id   BIGINT       NULL,
        changed_at      DATETIME2(6) NOT NULL DEFAULT SYSUTCDATETIME(),
        CONSTRAINT fk_status_hist_lead FOREIGN KEY (lead_id)       REFERENCES dbo.leads(id) ON DELETE CASCADE,
        CONSTRAINT fk_status_hist_user FOREIGN KEY (changed_by_id) REFERENCES dbo.users(id)
    );
    CREATE INDEX idx_status_hist_lead_id ON dbo.lead_status_history(lead_id);
END
GO
