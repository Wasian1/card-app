-- K-Pop Card Collection Game - Database Indexes
-- Created: 9-19-2025
-- Purpose: Optimize performance with indexing

-- Benefits: ✅ Much faster queries
-- Cost: ❌ Slightly slower writes (index must be updated too)
-- For a card game: Reads (showing collections, searching artists) happen WAY more than writes 
-- (new users, new cards), so indexes are worth it!

-- ============================================================================
-- PRIMARY KEYS - Automatically indexed
-- ============================================================================

-- Primary keys are automatically indexed by PostgreSQL
-- Indexes focused on foreign keys and frequently searched columns

-- Email lookup for authentication (login queries)
CREATE INDEX idx_users_email ON users(email);

-- Username search and uniqueness checks
CREATE INDEX idx_users_username ON users(username);

-- User creation date for analytics/sorting
CREATE INDEX idx_users_created_at ON users(created_at);

-- ============================================================================
-- ARTISTS TABLE INDEXES  
-- ============================================================================

-- Group name filtering (show all members of a group)
CREATE INDEX idx_artists_group_name ON artists(group_name);

-- Name search functionality
CREATE INDEX idx_artists_name ON artists(name);
CREATE INDEX idx_artists_stage_name ON artists(stage_name);

-- Debut year filtering (by era/generation)
CREATE INDEX idx_artists_debut_year ON artists(debut_year);

-- Country filtering (Korean vs international members)
CREATE INDEX idx_artists_country ON artists(country);

-- JSONB index for searching extra_info (favorite colors, MBTI, etc.)
CREATE INDEX idx_artists_extra_info_gin ON artists USING GIN (extra_info);

-- ============================================================================
-- CARDS TABLE INDEXES
-- ============================================================================

-- Foreign key to artists (most common join)
CREATE INDEX idx_cards_artist_id ON cards(artist_id);

-- Rarity level filtering (show only rare cards)
CREATE INDEX idx_cards_rarity_level ON cards(rarity_level);

-- Version filtering (version 1 vs version 2)
CREATE INDEX idx_cards_version ON cards(version);

-- Composite index for artist + version queries
CREATE INDEX idx_cards_artist_version ON cards(artist_id, version);

-- ============================================================================
-- USER_CARDS TABLE INDEXES (Junction table - heavily queried)
-- ============================================================================

-- Foreign key to users (user's collection queries)
CREATE INDEX idx_user_cards_user_id ON user_cards(user_id);

-- Foreign key to cards (which users own this card)
CREATE INDEX idx_user_cards_card_id ON user_cards(card_id);

-- Acquisition date for sorting collections
CREATE INDEX idx_user_cards_acquired_at ON user_cards(acquired_at);

-- Composite index for user collection queries with date sorting
CREATE INDEX idx_user_cards_user_acquired ON user_cards(user_id, acquired_at DESC);

-- Composite index for card ownership queries
CREATE INDEX idx_user_cards_card_user ON user_cards(card_id, user_id);

-- ============================================================================
-- USER_PULLS TABLE INDEXES
-- ============================================================================

-- Available pulls lookup (main query for pull availability; frontend pull button state)
CREATE INDEX idx_user_pulls_available ON user_pulls(available_pulls) WHERE available_pulls > 0;

-- Last pull timestamp for cooldown calculations (Cronjob to grant new pulls)
CREATE INDEX idx_user_pulls_last_pull_at ON user_pulls(last_pull_at);

-- Updated timestamp for batch operations
CREATE INDEX idx_user_pulls_updated_at ON user_pulls(updated_at);