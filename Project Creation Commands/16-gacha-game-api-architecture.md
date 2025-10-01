# K-Pop Gacha Card Game - API Architecture & Game Design

**Date**: Current Session  
**Phase**: 2.3 Database APIs and Game Mechanics Design  
**Achievement**: First database-backed API with complete game architecture planning

## 🎮 Complete Gacha Card Game Flow & Route Architecture

### Game Overview
A gacha-style card collection game where users collect digital cards of K-pop idols through a timed pull system, manage their collections, and track completion progress across different groups and rarity levels.

### Core Game Mechanics
- **44 Unique Cards**: 22 artists × 2 versions each (different photos/poses)
- **5-Tier Rarity System**: 1⭐ to 5⭐ cards with different pull rates
- **Cooldown System**: 12-hour cooldown between pulls, max 5 stored pulls
- **Collection Tracking**: Progress by group, rarity, and overall completion
- **Duplicate Management**: Track duplicates for future trading system

## 🚀 Complete API Route Architecture

### 1. 👤 User Authentication & Management
```javascript
// Authentication System
POST /api/auth/register          // Create new user account
POST /api/auth/login             // Get JWT authentication token  
GET  /api/auth/profile           // User profile information
PUT  /api/auth/profile           // Update user settings
POST /api/auth/logout            // Invalidate JWT token

// User Management
GET  /api/users/:id              // Public user profile
GET  /api/users/leaderboard      // Top collectors ranking
```

### 2. 🎯 Browse Available Content (Discovery Phase)
```javascript
// Artists & Idol Information
GET  /api/artists                // ✅ IMPLEMENTED - All 22 K-pop idols
GET  /api/artists/:id            // 🔄 NEXT - Individual artist details
GET  /api/artists/group/:name    // Artists by group (BTS, BLACKPINK, etc.)
GET  /api/artists/search?q=name  // Search artists by name

// Card Catalog System  
GET  /api/cards                  // All possible cards (44 total)
GET  /api/cards/:id              // Individual card details with artwork
GET  /api/cards/artist/:artistId // Both versions of an artist's cards
GET  /api/cards/rarity/:level    // Cards by rarity (1-5 stars)
GET  /api/cards/group/:name      // All cards from specific group
GET  /api/cards/random/preview   // Preview potential pull results
```

### 3. 🎲 Gacha Pull System (Core Game Loop)
```javascript
// Pull Availability & Cooldown
GET  /api/pulls/available        // Check current pull status and cooldown
GET  /api/pulls/cooldown         // Detailed cooldown information
POST /api/pulls/refresh          // Admin: manually reset cooldowns (testing)

// Pull Execution & Results
POST /api/pulls/execute          // 🎯 THE BIG MOMENT - Execute gacha pull!
GET  /api/pulls/history          // User's pull history and statistics
GET  /api/pulls/rates            // Display pull rates for transparency

// Pull Analytics
GET  /api/pulls/stats            // User's pull statistics (total, rates, etc.)
```

### 4. 📚 Collection Management (Progress Tracking)
```javascript
// User Collection Viewing
GET  /api/users/collection           // User's owned cards with details
GET  /api/users/collection/stats     // Collection completion statistics
GET  /api/users/collection/duplicates // Duplicate cards owned
GET  /api/users/collection/missing   // Cards not yet collected

// Collection Organization
GET  /api/users/collection/group/:name    // Collection by K-pop group
GET  /api/users/collection/rarity/:level  // Collection by rarity level
POST /api/users/collection/favorite       // Mark cards as favorites

// Wishlist & Goals
GET  /api/users/wishlist            // User's wanted cards list
POST /api/users/wishlist            // Add card to wishlist
DELETE /api/users/wishlist/:cardId  // Remove from wishlist
```

### 5. 🏆 Game Progression & Social Features
```javascript
// Achievements & Milestones
GET  /api/users/achievements        // Unlocked achievements
GET  /api/achievements              // All available achievements
POST /api/achievements/claim        // Claim achievement rewards

// Social & Competition
GET  /api/leaderboards              // Top collectors globally
GET  /api/leaderboards/group/:name  // Top collectors for specific group
GET  /api/users/compare/:userId     // Compare collections with another user

// Future: Trading System
POST /api/trades/offer              // Propose card trade
GET  /api/trades/incoming           // Received trade offers
POST /api/trades/accept/:tradeId    // Accept trade offer
```

## 🎯 Real Gacha Game Mechanics Implementation

### Pull System Response Structure
```javascript
// POST /api/pulls/execute - Successful Pull
{
  "success": true,
  "pull_result": {
    "card_id": 15,
    "artist": {
      "name": "Lisa",
      "stage_name": "Lisa", 
      "group_name": "BLACKPINK"
    },
    "version": 2,              // Version 1 or 2 of this artist
    "rarity": 5,               // 1-5 star rating
    "is_new": true,            // First time getting this card
    "duplicate_count": 0,      // How many of this card user now has
    "image_url": "https://..."  // Card artwork
  },
  "user_status": {
    "pulls_remaining": 4,      // Pulls left before cooldown
    "next_pull_at": "2024-01-15T22:30:00Z",
    "collection_progress": "13/44 cards (29.5%)"
  }
}
```

### Collection Progress Response
```javascript
// GET /api/users/collection/stats
{
  "overall": {
    "total_cards": 44,
    "owned_cards": 12,
    "completion_rate": "27.3%",
    "duplicates": 8
  },
  "by_group": {
    "BTS": {
      "owned": 8,
      "total": 14, 
      "completion": "57.1%",
      "missing": ["Jungkook v1", "V v2", ...]
    },
    "BLACKPINK": {
      "owned": 4,
      "total": 8,
      "completion": "50%"
    },
    "TWICE": {
      "owned": 0,
      "total": 18,
      "completion": "0%"
    },
    "Solo Artists": {
      "owned": 2,
      "total": 4,
      "completion": "50%"
    }
  },
  "by_rarity": {
    "5_star": {"owned": 1, "total": 6, "cards": ["Lisa v2"]},
    "4_star": {"owned": 3, "total": 16},
    "3_star": {"owned": 5, "total": 15},
    "2_star": {"owned": 2, "total": 7},
    "1_star": {"owned": 1, "total": 0}
  }
}
```

### Cooldown System Response  
```javascript
// GET /api/pulls/available
{
  "pulls_available": 2,
  "max_stored_pulls": 5,
  "cooldown_active": true,
  "next_pull_in": {
    "hours": 8,
    "minutes": 23,
    "seconds": 45,
    "total_seconds": 30225
  },
  "last_pull_at": "2024-01-15T10:30:00Z",
  "pulls_until_full": 3
}
```

## 🃏 Card Rarity & Pull Rate System

### Rarity Distribution (Matches Real Gacha Games)
```
⭐⭐⭐⭐⭐ (5-Star Legendary): Main idols (RM, Lisa, Nayeon) 
- Pull Rate: 2% 
- Count: 6 cards total
- Examples: RM v1, Lisa v2, Nayeon v1

⭐⭐⭐⭐ (4-Star Epic): Popular/Lead members
- Pull Rate: 8% 
- Count: 16 cards total
- Examples: Jungkook, Jennie, Sana

⭐⭐⭐ (3-Star Rare): Regular group members  
- Pull Rate: 25%
- Count: 15 cards total

⭐⭐ (2-Star Common): Supporting members
- Pull Rate: 35%
- Count: 7 cards total

⭐ (1-Star Basic): Entry-level cards
- Pull Rate: 30% 
- Count: 0 cards (none in current set)
```

### Database Query for Pull System
```sql
-- Weighted random card selection for gacha pulls
WITH rarity_weights AS (
  SELECT 
    card_id,
    rarity_level,
    CASE 
      WHEN rarity_level = 5 THEN 2    -- 2% chance
      WHEN rarity_level = 4 THEN 8    -- 8% chance  
      WHEN rarity_level = 3 THEN 25   -- 25% chance
      WHEN rarity_level = 2 THEN 35   -- 35% chance
      WHEN rarity_level = 1 THEN 30   -- 30% chance
    END as weight
  FROM cards
)
SELECT card_id, artist_id, version, rarity_level
FROM rarity_weights
ORDER BY RANDOM() * weight DESC
LIMIT 1;
```

## 🎮 User Experience Flow Examples

### New User Journey
```
1. POST /api/auth/register 
   → Account created, gets 5 welcome pulls

2. GET /api/artists
   → "Wow! I want to collect Lisa and RM cards!"

3. GET /api/pulls/available  
   → "I have 5 pulls ready to use!"

4. POST /api/pulls/execute
   → "Amazing! I got Jin 4⭐ card!"

5. GET /api/users/collection/stats
   → "I have 1/44 cards (2.3% complete)"

6. [Wait 12 hours]

7. GET /api/pulls/available
   → "My pulls recharged! I have 1 available"

8. POST /api/pulls/execute  
   → "I got Jin again... duplicate, but still progress!"
```

### Engaged User Journey  
```
1. GET /api/users/collection/stats
   → "I'm missing Nayeon v2 to complete TWICE set"

2. GET /api/cards/artist/18  
   → "Here's what Nayeon's cards look like"

3. POST /api/users/wishlist
   → "Added Nayeon v2 to my wishlist"

4. POST /api/pulls/execute × 5
   → "Got some duplicates and 1 new card!"

5. GET /api/leaderboards
   → "I'm rank #47 with 38/44 cards!"
```

## 🚀 Implementation Priority & Learning Path

### ✅ Completed (Phase 2.3)
- Database connection with connection pooling
- GET /api/artists - Returns all K-pop idols from PostgreSQL
- Async/await pattern mastery for database operations
- Professional error handling and modular route architecture

### 🔄 Next Steps (Phase 2.4)
- GET /api/artists/:id - Individual artist details
- GET /api/cards - All available cards with rarity info
- GET /api/cards/:id - Individual card details
- Basic collection viewing endpoints

### ⏳ Future Phases (2.5-2.6)
- User authentication system with JWT
- Gacha pull engine with weighted randomization
- Collection management and progress tracking
- Cooldown system with automated refresh cronjobs

## 📊 Database Schema Alignment

### Existing Tables Support Game Mechanics
```sql
-- artists (22 records) → Idol information
-- cards (44 records) → 2 versions per artist with rarity
-- users → Player accounts
-- user_cards → Collection ownership tracking  
-- user_pulls → Gacha cooldown and pull tracking
```

### Additional Tables for Full Game (Future)
```sql
-- achievements → Milestone tracking
-- trades → Card trading system
-- user_achievements → Achievement progress
-- pull_history → Detailed pull analytics
```

## 🎯 Success Metrics & Engagement

### Collection Completion Hooks
- **Group Completion Bonuses**: Complete BTS set → unlock special achievement
- **Rarity Challenges**: Collect all 5⭐ cards → exclusive title
- **Duplicate Value**: Trade duplicates for guaranteed pulls
- **Seasonal Events**: Limited-time cards with higher pull rates

### Social & Competition Features  
- **Leaderboards**: Global and group-specific rankings
- **Collection Sharing**: Show off rare card collections
- **Trade System**: Exchange duplicates with other players
- **Achievement Badges**: Display collection milestones

This architecture creates a genuinely engaging card collection game while serving as an excellent learning project for full-stack development, database optimization, and game mechanics implementation.

## Status
✅ **Game Architecture Designed**: Complete route structure and mechanics planned  
✅ **First API Endpoint**: GET /api/artists returning real database data  
✅ **Foundation Ready**: Database, authentication, and scalable route organization  
⏳ **NEXT**: Individual artist lookup API for card preview functionality
