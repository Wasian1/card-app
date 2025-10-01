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
// EXPORT THE ROUTER
// ============================================================================
// Export this router so app.js can mount it at /api/artists
// Similar to Python Flask blueprint registration

module.exports = router;