-- ═══════════════════════════════════════════════════════════
-- SUBCVLT Database Schema
-- ═══════════════════════════════════════════════════════════

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ── Users (admin accounts) ──────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username      VARCHAR(50)  UNIQUE NOT NULL,
    email         VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role          VARCHAR(20)  NOT NULL DEFAULT 'admin',
    created_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- ── Projects ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS projects (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug          VARCHAR(100) UNIQUE NOT NULL,
    name          VARCHAR(200) NOT NULL,
    description   TEXT         NOT NULL DEFAULT '',
    long_description TEXT,
    why_it_exists TEXT,
    type          VARCHAR(50)  NOT NULL DEFAULT 'software',
    status        VARCHAR(50)  NOT NULL DEFAULT 'active',
    stack         TEXT[]       NOT NULL DEFAULT '{}',
    topics        TEXT[]       NOT NULL DEFAULT '{}',
    repo_url      VARCHAR(500),
    homepage      VARCHAR(500),
    cover_pattern VARCHAR(50)  DEFAULT 'circuit',
    cover_color   VARCHAR(20),
    featured      BOOLEAN      NOT NULL DEFAULT false,
    sort_order    INTEGER      NOT NULL DEFAULT 0,
    stars         INTEGER      NOT NULL DEFAULT 0,
    last_updated  TIMESTAMPTZ,
    created_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- ── Posts (zine articles) ────────────────────────────────────
CREATE TABLE IF NOT EXISTS posts (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug        VARCHAR(200) UNIQUE NOT NULL,
    title       VARCHAR(300) NOT NULL,
    excerpt     TEXT         NOT NULL DEFAULT '',
    content     TEXT         NOT NULL DEFAULT '',
    tags        TEXT[]       NOT NULL DEFAULT '{}',
    author      VARCHAR(100),
    published   BOOLEAN      NOT NULL DEFAULT false,
    date        DATE         NOT NULL DEFAULT CURRENT_DATE,
    created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- ── Contact submissions ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS contacts (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name       VARCHAR(200) NOT NULL,
    email      VARCHAR(255) NOT NULL,
    subject    VARCHAR(300),
    message    TEXT         NOT NULL,
    read       BOOLEAN      NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- ── Newsletter subscribers ───────────────────────────────────
CREATE TABLE IF NOT EXISTS subscribers (
    id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email             VARCHAR(255) UNIQUE NOT NULL,
    unsubscribe_token VARCHAR(100) UNIQUE NOT NULL,
    confirmed         BOOLEAN   NOT NULL DEFAULT false,
    subscribed_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    unsubscribed_at   TIMESTAMPTZ
);

-- ── Indexes ──────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_projects_status  ON projects (status);
CREATE INDEX IF NOT EXISTS idx_projects_type    ON projects (type);
CREATE INDEX IF NOT EXISTS idx_projects_slug    ON projects (slug);
CREATE INDEX IF NOT EXISTS idx_posts_slug       ON posts (slug);
CREATE INDEX IF NOT EXISTS idx_posts_published  ON posts (published);
CREATE INDEX IF NOT EXISTS idx_posts_date       ON posts (date DESC);
CREATE INDEX IF NOT EXISTS idx_contacts_read    ON contacts (read);
CREATE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers (email);
