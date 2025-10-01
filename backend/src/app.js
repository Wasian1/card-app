// K-Pop Card Collection Game - Express App Configuration
// This file sets up the Express application with middleware and routes
// Think of this as the "main application factory" - similar to creating a Flask app in Python

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config({ path: '../.env' });

// Load database configuration (this will test connection on startup)
require('./config/database');

// ============================================================================
// EXPRESS APPLICATION CREATION
// ============================================================================
// This creates our web application instance - like creating app = Flask(__name__) in Python
// The 'app' object will handle all HTTP requests (GET, POST, PUT, DELETE)

const app = express();

// ============================================================================
// SECURITY & CORS MIDDLEWARE
// ============================================================================
// Middleware functions run BEFORE your route handlers - like Python decorators
// They can modify requests, add security headers, enable cross-origin requests, etc.

// helmet() adds security HTTP headers to protect against common vulnerabilities
// Similar to Python's flask-talisman or django-security
app.use(helmet()); // Adds headers like X-Frame-Options, X-XSS-Protection, etc.

// CORS (Cross-Origin Resource Sharing) allows frontend on port 3000 to talk to backend on port 5000
// Without this, browsers block requests between different origins (security feature)
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000', // Allow requests from our React app
    credentials: true // Allow cookies and authorization headers to be sent
}));

// ============================================================================
// BODY PARSING MIDDLEWARE
// ============================================================================
// These middleware functions parse incoming request bodies into JavaScript objects
// Similar to how Python Flask automatically parses request.json or request.form

// Parse JSON request bodies (from fetch() requests, axios, etc.)
// Converts raw JSON string → JavaScript object that you can access as req.body
// Example: {"username": "john"} becomes accessible as req.body.username
app.use(express.json({ limit: '10mb' })); // 10mb limit prevents huge payloads

// Parse URL-encoded form data (from HTML forms with method="POST")
// Converts form data → JavaScript object accessible as req.body
// Example: username=john&email=test@email.com becomes req.body.username, req.body.email
app.use(express.urlencoded({ extended: true })); // extended:true allows nested objects

// ============================================================================
// API ROUTES SETUP
// ============================================================================
// These are commented out for now - we'll create these route files in the next steps
// Think of routes like Python Flask's @app.route() decorators, but organized in separate files
// Each route file handles related endpoints (auth routes, user routes, card routes, etc.)

app.use('/api/artists', require('./routes/artists'));  // Artists: /api/artists/*, /api/artists/:id
//    ↑ Base path               ↑ Import router
// app.use('/api/auth', require('./routes/auth'));     // Authentication: /api/auth/login, /api/auth/register
// app.use('/api/users', require('./routes/users'));   // User management: /api/users/profile, /api/users/:id
// app.use('/api/cards', require('./routes/cards'));   // Card operations: /api/cards/collection, /api/cards/gacha
// app.use('/api/pulls', require('./routes/pulls'));   // Gacha pulls: /api/pulls/available, /api/pulls/execute

// ============================================================================
// HEALTH CHECK ENDPOINT  
// ============================================================================
// This is a simple test endpoint to verify our server is running correctly
// Similar to a "ping" endpoint - useful for monitoring and debugging

app.get('/api/health', (req, res) => {
    // res.json() sends a JSON response back to the client
    // Similar to Python Flask's return jsonify({...})
    res.json({
        status: 'ok',
        message: 'K-Pop Card Collection API is running!',
        timestamp: new Date().toISOString(),  // Current time in ISO format
        environment: process.env.NODE_ENV || 'development'  // Our environment (dev/prod)
    });
});

// ============================================================================
// 404 HANDLER - CATCH ALL UNKNOWN ROUTES
// ============================================================================
// This catches ANY request that doesn't match our defined routes above
// In Express v5, we remove the '*' path and let it catch all unmatched routes

app.use((req, res) => {
    // Send a 404 "Not Found" response with error details
    res.status(404).json({
        success: false,                           // Boolean flag for error status
        message: `Route ${req.originalUrl} not found`  // Dynamic error message with actual URL
    });
});

// ============================================================================
// GLOBAL ERROR HANDLER - CATCHES ALL UNHANDLED ERRORS
// ============================================================================
// This is Express's error handling middleware - runs when anything goes wrong
// It has 4 parameters (error, req, res, next) - the extra 'error' parameter is key
// Similar to Python's try/except at the application level

app.use((error, req, res, next) => {
    // Log the error details to console for debugging (like Python's logging)
    console.error('Error:', error);
    
    // Send error response back to client
    res.status(error.status || 500).json({
        success: false,                              // Always false for errors
        message: error.message || 'Internal server error'  // Error details or generic message
    });
});

// ============================================================================
// EXPORT THE APP
// ============================================================================
// Make this app available to other files (like server.js)
// Similar to Python's if __name__ == '__main__' pattern, but for modules

module.exports = app;