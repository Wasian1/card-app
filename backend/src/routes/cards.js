// K-Pop Card Collection Game - Cards API Routes
// This file handles all collectible card-related API endpoints

const express = require('express');
const router = express.Router();       // Create a router for card routes
const db = require('../config/database'); // Import our database connection

// ============================================================================
// GET /api/cards - List all collectible cards with artist information
// ============================================================================
// This endpoint returns all 44 cards with joined artist data and rarity info

router.get('/', async (req, res) => {
    try {
        // Execute JOIN to get cards with full artist info
        const result = await db.query(`
            SELECT
                c.card_id,
                c.version,
                c.rarity_level,
                c.image_url,
                c.image_alt_text,
                c.created_at as card_created_at,
                a.artist_id,
                a.name as artist_name,
                a.stage_name,
                a.group_name,
                a.country,
                a.debut_year,
                a.extra_info
            FROM cards c
            JOIN artists a ON c.artist_id = a.artist_id
            ORDER BY a.group_name, a.name, c.version
        `);

        // Send successful response with card data
        res.json({
            success: true,
            message: `Found ${result.rows.length} collectible cards`,
            total_cards: result.rows.length,
            breakdown: {
                total_artists: result.rows.length / 2, // Artists have 2 card versions
                versions_per_artist: 2
            },
            data: result.rows
        });

    } catch (error) {
        // Handle database errors gracefully
        console.error('Card catalog error', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch card catalog',
            error: error.message
        });

    }
});

// ============================================================================
// GET /api/cards/rarity/:level - Filter cards by rarity level
// ============================================================================
// This endpoint returns all cards of a specific rarity (1⭐ to 5⭐)
// Examples: GET /api/cards/rarity/5 (legendary), GET /api/cards/rarity/1 (common)

router.get('/rarity/:level', async (req, res) => {
    try {
        // Extract and validate rarity level from URL parameter
        const rarityLevel = parseInt(req.params.level);
        
        // Validate rarity level is between 1 and 5
        if (isNaN(rarityLevel) || rarityLevel < 1 || rarityLevel > 5) {
            return res.status(400).json({
                success: false,
                message: 'Invalid rarity level. Must be between 1 and 5.',
                examples: ['GET /api/cards/rarity/5 (legendary)', 'GET /api/cards/rarity/1 (common)']
            });
        }
        
        // Execute JOIN query to get cards of specific rarity with artist info
        const result = await db.query(`
            SELECT 
                c.card_id,
                c.version,
                c.rarity_level,
                c.image_url,
                c.image_alt_text,
                a.artist_id,
                a.name as artist_name,
                a.stage_name,
                a.group_name,
                a.extra_info
            FROM cards c
            JOIN artists a ON c.artist_id = a.artist_id
            WHERE c.rarity_level = $1
            ORDER BY a.group_name, a.name, c.version
        `, [rarityLevel]);
        
        // Define rarity names for user-friendly response
        const rarityNames = {
            1: 'Common ⭐',
            2: 'Uncommon ⭐⭐', 
            3: 'Rare ⭐⭐⭐',
            4: 'Epic ⭐⭐⭐⭐',
            5: 'Legendary ⭐⭐⭐⭐⭐'
        };
        
        // Send response with rarity-filtered cards
        res.json({
            success: true,
            message: `Found ${result.rows.length} ${rarityNames[rarityLevel]} cards`,
            rarity_level: rarityLevel,
            rarity_name: rarityNames[rarityLevel],
            card_count: result.rows.length,
            data: result.rows
        });
        
    } catch (error) {
        console.error('Rarity filter error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch cards by rarity',
            error: error.message
        });
    }
});

// ============================================================================
// GET /api/cards/artist/:artistId - Get both card versions for specific artist
// ============================================================================
// This endpoint returns both versions of an artist's cards (perfect for collection viewing)
// Examples: GET /api/cards/artist/8 (Lisa's 2 cards), GET /api/cards/artist/1 (RM's 2 cards)

router.get('/artist/:artistId', async (req, res) => {
    try {
        // Extract and validate artist ID from URL parameter
        const artistId = parseInt(req.params.artistId);
        
        // Validate artist ID is a positive number
        if (isNaN(artistId) || artistId <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Invalid artist ID. Must be a positive number.',
                example: 'GET /api/cards/artist/8'
            });
        }
        
        // Execute JOIN query to get both card versions for the artist
        const result = await db.query(`
            SELECT 
                c.card_id,
                c.version,
                c.rarity_level,
                c.image_url,
                c.image_alt_text,
                a.artist_id,
                a.name as artist_name,
                a.stage_name,
                a.group_name,
                a.country,
                a.debut_year,
                a.extra_info
            FROM cards c
            JOIN artists a ON c.artist_id = a.artist_id
            WHERE c.artist_id = $1
            ORDER BY c.version
        `, [artistId]);
        
        // Check if artist has any cards (should always be 2, but validate)
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: `No cards found for artist ID ${artistId}`,
                suggestion: 'Use GET /api/artists to see valid artist IDs'
            });
        }
        
        // Send response with artist's card collection
        res.json({
            success: true,
            message: `Found ${result.rows.length} cards for ${result.rows[0].stage_name || result.rows[0].artist_name}`,
            artist: {
                artist_id: result.rows[0].artist_id,
                name: result.rows[0].artist_name,
                stage_name: result.rows[0].stage_name,
                group: result.rows[0].group_name
            },
            card_count: result.rows.length,
            data: result.rows
        });
        
    } catch (error) {
        console.error('Artist cards error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch artist cards',
            error: error.message
        });
    }
});

// ============================================================================
// GET /api/cards/:id - Get individual card details
// ============================================================================  
// This endpoint returns detailed information for a specific card
// Examples: GET /api/cards/15 (Lisa v1), GET /api/cards/16 (Lisa v2)

router.get('/:id', async (req, res) => {
    try {
        // Extract and validate card ID from URL parameter
        const cardId = parseInt(req.params.id);
        
        // Validate card ID is a positive number
        if (isNaN(cardId) || cardId <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Invalid card ID. Must be a positive number.',
                example: 'GET /api/cards/15'
            });
        }
        
        // Execute JOIN query to get specific card with full artist information
        const result = await db.query(`
            SELECT 
                c.card_id,
                c.version,
                c.rarity_level,
                c.image_url,
                c.image_alt_text,
                c.created_at as card_created_at,
                a.artist_id,
                a.name as artist_name,
                a.stage_name,
                a.group_name,
                a.country,
                a.debut_year,
                a.hometown,
                a.extra_info
            FROM cards c
            JOIN artists a ON c.artist_id = a.artist_id
            WHERE c.card_id = $1
        `, [cardId]);
        
        // Check if card exists
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: `Card with ID ${cardId} not found`,
                suggestion: 'Use GET /api/cards to see all available cards'
            });
        }
        
        const card = result.rows[0];
        
        // Enhanced response with card collection context
        res.json({
            success: true,
            message: `Found ${card.stage_name || card.artist_name} - Version ${card.version}`,
            data: card,
            collection_info: {
                other_version_hint: `Try GET /api/cards/artist/${card.artist_id} to see both versions`,
                rarity_peers_hint: `Try GET /api/cards/rarity/${card.rarity_level} to see similar rarity cards`
            }
        });
        
    } catch (error) {
        console.error('Individual card error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch card details',
            error: error.message
        });
    }
});

module.exports = router;