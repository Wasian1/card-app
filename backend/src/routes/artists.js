// K-Pop Card Collection Game - Artists API Routes
// This file handles all artist-related API endpoints
// Routes are organized by feature (artists, cards, users, etc.)

const express = require('express');
const router = express.Router();       // Create a router for artist routes
const db = require('../config/database'); // Import our database connection

// ============================================================================
// GET /api/artists - List all K-pop artists
// ============================================================================
// This endpoint queries the database and returns all artists with their info
// Example: GET http://localhost:5000/api/artists

router.get('/', async (req, res) => {
    try {
        // Execute SQL query to get all artists from database
        const result = await db.query('SELECT * FROM artists ORDER BY name');
        
        // Send successful response with artist data
        res.json({
            success: true,
            message: `Found ${result.rows.length} K-pop artists`,
            data: result.rows
        });
    } catch (error) {
        // Handle database errors gracefully
        console.error('Database error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch artists',
            error: error.message
        });
    }
});

// ============================================================================
// GET /api/artists/search?name=lisa - Search artists by name/stage name
// ============================================================================
// This endpoint allows users to find artists by name instead of ID
// Examples: GET /api/artists/search?name=lisa, GET /api/artists/search?name=rm

router.get('/search', async (req, res) => {
    try {
        const searchName = req.query.name;
        
        // Validate search parameter exists
        if (!searchName || searchName.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'Search name is required',
                example: 'GET /api/artists/search?name=lisa'
            });
        }
        
        // Case-insensitive search in both name and stage_name columns
        const result = await db.query(`
            SELECT * FROM artists 
            WHERE LOWER(name) LIKE LOWER($1) 
               OR LOWER(stage_name) LIKE LOWER($1)
            ORDER BY name
        `, [`%${searchName.trim()}%`]);
        
        res.json({
            success: true,
            message: `Found ${result.rows.length} artists matching "${searchName}"`,
            data: result.rows
        });
        
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to search artists',
            error: error.message
        });
    }
});

// ============================================================================
// GET /api/artists/group/:groupName - Filter artists by group name
// ============================================================================
// This endpoint returns all artists from a specific K-pop group
// Examples: GET /api/artists/group/BTS, GET /api/artists/group/BLACKPINK

router.get('/group/:groupName', async (req, res) => {
    try {
        // Extract group name from URL parameter and clean it
        const groupName = req.params.groupName.trim();
        
        // Validate that group name is provided and not empty
        if (!groupName || groupName === '') {
            return res.status(400).json({
                success: false,
                message: 'Group name is required',
                example: 'GET /api/artists/group/BTS'
            });
        }
        
        // Execute case-insensitive exact match query for group name
        const result = await db.query(
            'SELECT * FROM artists WHERE LOWER(group_name) = LOWER($1) ORDER BY name',
            [groupName]
        );
        
        // Check if any artists were found in this group
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: `No artists found in group "${groupName}"`,
                suggestion: 'Try groups like: BTS, BLACKPINK, TWICE, or use GET /api/artists to see all groups'
            });
        }
        
        // Send successful response with group members
        res.json({
            success: true,
            message: `Found ${result.rows.length} artists in ${groupName}`,
            group: groupName,
            member_count: result.rows.length,
            data: result.rows
        });
        
    } catch (error) {
        // Handle database errors gracefully
        console.error('Group filter error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch artists by group',
            error: error.message
        });
    }
});

// ============================================================================
// GET /api/artists/:id - Get individual K-pop artist by ID
// ============================================================================  
// This endpoint returns detailed information for a specific artist
// Examples: GET /api/artists/1 (RM), GET /api/artists/8 (Lisa)

router.get('/:id', async (req, res) => {
    try {
        // Extract the ID from URL parameters and convert to an integer
        const artistId = parseInt(req.params.id);

        // Validate that ID is a valid number
        if (isNaN(artistId) || artistId <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Invalid artist ID. Must be a positive number.',
                example: 'GET /api/artists/1'
            });

        }

        // Execute parameterized query to prevent SQL injection
        const result = await db.query('SELECT * FROM artists WHERE artist_id = $1',
            [artistId]
        );

        // Check if artist was found
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: `Artist with ID ${artistId} was not found`,
                suggestion: 'Try GET /api/artists to see all artists'
            });
        }

        // Send successful response with single artist data
        res.json({
            success: true,
            message: `Found artist: ${result.rows[0].stage_name || result.rows[0].name}`,
            data: result.rows[0]  // Single object, not array
        });
    } catch (error) {
        // Handle database errors gracefully
        console.error('Database error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch artist',
            error: error.message
        });
    }
});

// ============================================================================
// EXPORT THE ROUTER
// ============================================================================
// Export this router so app.js can mount it at /api/artists
// Similar to Python Flask blueprint registration

module.exports = router;