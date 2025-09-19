-- K-Pop Card Collection Game - Database Schema
-- Created: 9-18-2025
-- Purpose: Create all tables for the card collection system

-- Enable UUID extension for unique identifiers
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


-- ============================================================================
-- USERS TABLE - Player accounts and authentication
-- ============================================================================

CREATE TABLE users ( 
    user_id SERIAL PRIMARY KEY,
    username varchar(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================================================
-- ARTISTS TABLE - K-pop idol information and metadata
-- ============================================================================

CREATE TABLE artists (
    artist_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    stage_name VARCHAR(100),
    group_name VARCHAR(100),
    date_of_birth DATE,
    country VARCHAR(50),
    hometown VARCHAR(100),
    debut_year INTEGER,
    extra_info JSONB, -- Stores flexible metadata like favorite color, MBTI, etc.
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================================================
-- CARDS TABLE - K-Pop artist collectible cards (2 versions per artist)
-- ============================================================================

CREATE TABLE cards (
    card_id SERIAL PRIMARY KEY,
    artist_id INTEGER REFERENCES artists(artist_id) ON DELETE CASCADE,
    version SMALLINT CHECK (version IN (1,2)) NOT NULL,
    rarity_level SMALLINT DEFAULT 1 CHECK (rarity_level BETWEEN 1 AND 5),
    image_url TEXT,
    image_alt_text VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(artist_id, version) -- Ensures only 2 versions per artist
);

-- ============================================================================
-- USER_CARDS TABLE - Junction table for user card collections
-- ============================================================================
CREATE TABLE user_cards (
    user_card_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    card_id INTEGER REFERENCES cards(card_id) ON DELETE CASCADE,
    acquired_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id, card_id) -- Prevents duplicate card ownership
);

-- ============================================================================
-- USER_PULLS TABLE - Gacha pull system and cooldown tracking
-- ============================================================================

CREATE TABLE user_pulls (
    user_id INTEGER PRIMARY KEY REFERENCES users(user_id) ON DELETE CASCADE,
    available_pulls INTEGER DEFAULT 1 CHECK (available_pulls >= 0),
    last_pull_at TIMESTAMP DEFAULT NOW(),
    max_stored_pulls INTEGER DEFAULT 5,
    updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================================================
-- TIMESTAMP UPDATE FUNCTION - Automatically updates updated_at column
-- ============================================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- ============================================================================
-- APPLY UPDATE TRIGGERS - Attach function to tables with updated_at
-- ============================================================================

-- Apply update triggers to any table with updated_at column
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_artists_updated_at BEFORE UPDATE ON artists
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_pulls_updated_at BEFORE UPDATE ON user_pulls
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

