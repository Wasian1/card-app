// K-Pop Card Collection Game - Authentication Middleware
// Verifies JWT tokens to protect API routes
// Similar to Python Flask's @login_required decorator

const jwt = require('jsonwebtoken'); // Import JWT library for token verification
const db = require('../config/database'); // Import database connection (optional for this middleware)

// JWT Secret from environment variables (must match auth.js routes)
const JWT_SECRET = process.env.JWT_SECRET;

// Security check - fail fast if JWT_SECRET is missing
if (!JWT_SECRET) {
    console.error('🚨 SECURITY ERROR: JWT_SECRET environment variable is required for middleware!');
    console.error('📝 Ensure .env file is configured and loaded correctly.');
    process.exit(1); // Stop server - security is non-negotiable
}

// ============================================================================
// AUTHENTICATION MIDDLEWARE FUNCTION
// ============================================================================
// This function runs before protected routes to verify user's JWT token
// If token is valid: adds user data to req.user and calls next()
// If token is invalid: sends error response and stops the request chain

const authenticateToken = async (req, res, next) => {
    try {
        // ========================================================================
        // 1. EXTRACT JWT TOKEN FROM REQUEST HEADER  
        // ========================================================================
        // This logic was copied from routes/auth.js lines 302-313
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'Access token required',
                format: 'Authorization: Bearer <your-jwt-token>',
                howToGet: 'Login or register to get a token'
            });
        }
        
        const token = authHeader.substring(7); // Remove 'Bearer ' prefix
        
        // ========================================================================
        // 2. VERIFY AND DECODE JWT TOKEN
        // ========================================================================
        // This logic was copied from routes/auth.js lines 318-328
        let decoded;
        try {
            decoded = jwt.verify(token, JWT_SECRET);
        } catch (jwtError) {
            return res.status(401).json({
                success: false,
                message: 'Invalid or expired token',
                error: jwtError.message,
                action: 'Please login again to get a new token'
            });
        }
        
        // ========================================================================
        // 3. ATTACH USER DATA TO REQUEST FOR ROUTE HANDLERS
        // ========================================================================
        // Make decoded token data available to protected routes
        // Routes can now access: req.user.userId, req.user.username, req.user.email
        req.user = decoded;
        
        // ========================================================================
        // 4. PASS CONTROL TO THE ACTUAL ROUTE HANDLER
        // ========================================================================
        // Authentication successful - continue to route logic
        next();
        
    } catch (error) {
        // Catch any unexpected errors during middleware execution
        console.error('Authentication middleware error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during authentication',
            error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
        });
    }
};

// ============================================================================
// EXPORT MIDDLEWARE FOR USE IN ROUTE FILES
// ============================================================================
module.exports = authenticateToken;