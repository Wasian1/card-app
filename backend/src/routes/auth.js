// K-Pop Card Collection Game - Authentication Routes
// This file handles user registration, login, logout, and profile access
// Similar to Python Flask-Login or Django authentication views

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/database');
const authenticateToken = require('../middleware/auth');

// ============================================================================
// JWT CONFIGURATION
// ============================================================================
// JWT (JSON Web Token) is like a secure "session cookie" that proves user identity
// Unlike traditional sessions, JWTs are stateless and contain user info encoded inside

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

// Security check - fail fast if JWT_SECRET is missing
if (!JWT_SECRET) {
    console.error('🚨 SECURITY ERROR: JWT_SECRET environment variable is required!');
    console.error('📝 Add JWT_SECRET to your .env file');
    process.exit(1); 
}

console.log('✅ JWT authentication configured securely');

// Helper function to generate JWT tokens
const generateToken = (userId, username, email) => {
    // jwt.sign() creates a token with user data + expiration + secret signature
    // Python equivalent: using libraries like PyJWT or python-jose
    return jwt.sign(
        { 
            userId: userId,      // User ID for database lookups
            username: username,  // Username for display
            email: email        // Email for additional verification
        },
        JWT_SECRET,             // Secret key to sign/verify tokens
        { expiresIn: JWT_EXPIRES_IN }  // Auto-expire for security
    );
};

// ============================================================================
// POST /api/auth/register - User Registration Endpoint
// ============================================================================
// Creates new user account with hashed password and returns JWT token
// Similar to Python: @app.route('/register', methods=['POST'])

router.post('/register', async (req, res) => {
    try {
        // ========================================================================
        // 1. EXTRACT AND VALIDATE INPUT DATA
        // ========================================================================
        const { username, email, password } = req.body;
        
        // Basic validation - ensure all required fields are provided
        // In production, you'd use libraries like joi or express-validator for robust validation
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required: username, email, password',
                errors: {
                    username: !username ? 'Username is required' : null,
                    email: !email ? 'Email is required' : null,
                    password: !password ? 'Password is required' : null
                }
            });
        }
        
        // Password strength validation (basic example)
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 6 characters long',
                requirements: {
                    minLength: 6,
                    recommended: 'Use mix of letters, numbers, and symbols'
                }
            });
        }
        
        // Email format validation (basic regex)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid email address',
                example: 'user@example.com'
            });
        }
        
        // ========================================================================
        // 2. CHECK FOR EXISTING USER (PREVENT DUPLICATES)
        // ========================================================================
        // Use database query to check if username or email already exists
        // IMPORTANT: Use parameterized queries to prevent SQL injection!
        
        const existingUserQuery = `
            SELECT user_id, username, email 
            FROM users 
            WHERE username = $1 OR email = $2
        `;
        
        const existingUser = await db.query(existingUserQuery, [username, email]);
        
        if (existingUser.rows.length > 0) {
            // Determine which field conflicts (username or email)
            const conflictingUser = existingUser.rows[0];
            const isUsernameConflict = conflictingUser.username === username;
            const isEmailConflict = conflictingUser.email === email;
            
            return res.status(409).json({  // 409 = Conflict status code
                success: false,
                message: 'User already exists',
                conflicts: {
                    username: isUsernameConflict ? 'Username is already taken' : null,
                    email: isEmailConflict ? 'Email is already registered' : null
                },
                suggestion: 'Try a different username or email, or login if this is your account'
            });
        }
        
        // ========================================================================
        // 3. HASH PASSWORD WITH BCRYPT
        // ========================================================================
        // bcrypt adds salt + multiple hash rounds
        // Python equivalent: from werkzeug.security import generate_password_hash
        
        const saltRounds = 12;  // Higher = more secure but slower (10-12 is good balance)
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        // ========================================================================
        // 4. INSERT NEW USER INTO DATABASE
        // ========================================================================
        const insertUserQuery = `
            INSERT INTO users (username, email, password_hash)
            VALUES ($1, $2, $3)
            RETURNING user_id, username, email, created_at
        `;
        
        const result = await db.query(insertUserQuery, [username, email, hashedPassword]);
        const newUser = result.rows[0];
        
        // ========================================================================
        // 5. GENERATE JWT TOKEN FOR IMMEDIATE LOGIN
        // ========================================================================
        const token = generateToken(newUser.user_id, newUser.username, newUser.email);
        
        // ========================================================================
        // 6. RETURN SUCCESS RESPONSE WITH TOKEN
        // ========================================================================
        res.status(201).json({  // 201 = Created status code
            success: true,
            message: `Welcome to K-Pop Card Collection, ${newUser.username}!`,
            data: {
                user: {
                    userId: newUser.user_id,
                    username: newUser.username,
                    email: newUser.email,
                    memberSince: newUser.created_at
                },
                token: token,
                tokenExpires: JWT_EXPIRES_IN
            },
            nextSteps: {
                message: 'You are now logged in! Start collecting K-pop cards.',
                endpoints: {
                    profile: 'GET /api/auth/me',
                    artists: 'GET /api/artists',
                    cards: 'GET /api/cards'
                }
            }
        });
        
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during registration',
            error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
        });
    }
});

// ============================================================================
// POST /api/auth/login - User Login Endpoint
// ============================================================================
// Authenticates existing user and returns JWT token
// Similar to Python: checking password_hash with check_password_hash()

router.post('/login', async (req, res) => {
    try {
        // ========================================================================
        // 1. EXTRACT LOGIN CREDENTIALS
        // ========================================================================
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required',
                example: {
                    email: 'user@example.com',
                    password: 'yourpassword'
                }
            });
        }
        
        // ========================================================================
        // 2. FIND USER BY EMAIL
        // ========================================================================
        const findUserQuery = `
            SELECT user_id, username, email, password_hash, created_at 
            FROM users 
            WHERE email = $1
        `;
        
        const result = await db.query(findUserQuery, [email]);
        
        if (result.rows.length === 0) {
            return res.status(401).json({  // 401 = Unauthorized
                success: false,
                message: 'Invalid email or password',
                hint: 'Double-check your credentials or register a new account'
            });
        }
        
        const user = result.rows[0];
        
        // ========================================================================
        // 3. VERIFY PASSWORD WITH BCRYPT
        // ========================================================================
        // bcrypt.compare() safely compares plain password with stored hash
        // Python equivalent: check_password_hash(stored_hash, password)
        
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password',
                securityNote: 'Password attempts are logged for security'
            });
        }
        
        // ========================================================================
        // 4. GENERATE JWT TOKEN FOR SUCCESSFUL LOGIN
        // ========================================================================
        const token = generateToken(user.user_id, user.username, user.email);
        
        // ========================================================================
        // 5. RETURN SUCCESS RESPONSE WITH TOKEN
        // ========================================================================
        res.status(200).json({
            success: true,
            message: `Welcome back, ${user.username}!`,
            data: {
                user: {
                    userId: user.user_id,
                    username: user.username,
                    email: user.email,
                    memberSince: user.created_at
                },
                token: token,
                tokenExpires: JWT_EXPIRES_IN
            },
            actions: {
                message: 'You are now logged in.',
                availableEndpoints: [
                    'GET /api/auth/me - View your profile',
                    'GET /api/users/collection - View your cards',
                    'POST /api/pulls/gacha - Pull new cards (when implemented)'
                ]
            }
        });
        
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during login',
            error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
        });
    }
});

// ============================================================================
// GET /api/auth/me - Get Current User Profile (Protected Route)
// ============================================================================
// Returns current user information based on JWT token
// Uses authentication middleware to verify JWT token

router.get('/me', authenticateToken, async (req, res) => {
    try {
        // ========================================================================
        // JWT TOKEN VERIFICATION IS NOW HANDLED BY MIDDLEWARE
        // ========================================================================
        // The authenticateToken middleware has already:
        // 1. Verified the JWT token from Authorization header
        // 2. Decoded the token payload  
        // 3. Added user data to req.user (userId, username, email)
        // 4. Called next() to reach this route handler
        
        // If we reach this point, authentication was successful!
        // req.user contains: { userId, username, email, iat, exp }
        
        // ========================================================================
        // FETCH CURRENT USER INFORMATION FROM DATABASE
        // ========================================================================
        // Use the userId from the verified token to get fresh user data
        const getUserQuery = `
            SELECT user_id, username, email, created_at, updated_at
            FROM users 
            WHERE user_id = $1
        `;
        
        const result = await db.query(getUserQuery, [req.user.userId]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
                possibleCause: 'User account may have been deleted since token was issued'
            });
        }
        
        const user = result.rows[0];
        
        // ========================================================================
        // RETURN USER PROFILE INFORMATION
        // ========================================================================
        res.status(200).json({
            success: true,
            message: 'User profile retrieved successfully',
            data: {
                user: {
                    userId: user.user_id,
                    username: user.username,
                    email: user.email,
                    memberSince: user.created_at,
                    lastUpdated: user.updated_at
                },
                token: {
                    isValid: true,
                    expiresIn: JWT_EXPIRES_IN,
                    tokenInfo: 'Token verified by middleware'
                }
            },
            availableActions: [
                'PUT /api/users/profile - Update your profile',
                'GET /api/users/collection - View your card collection',
                'GET /api/users/stats - View collection statistics'
            ]
        });
        
    } catch (error) {
        console.error('Profile fetch error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error fetching profile',
            error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
        });
    }
});

// ============================================================================
// POST /api/auth/logout - User Logout Endpoint
// ============================================================================
// With JWT tokens, logout is mainly client-side (delete token)
// But we can provide guidance and potentially implement token blacklisting

router.post('/logout', (req, res) => {
    // ========================================================================
    // JWT LOGOUT EXPLANATION
    // ========================================================================
    // Unlike traditional sessions, JWT tokens are stateless
    // The server doesn't "track" active tokens, so logout is primarily client-side
    // Client should delete the token from storage (localStorage, cookies, etc.)
    
    res.status(200).json({
        success: true,
        message: 'Logout successful',
        instructions: {
            clientAction: 'Delete the JWT token from your client-side storage',
            tokenStorage: 'Remove from localStorage, sessionStorage, or cookies',
            nextLogin: 'Use POST /api/auth/login to get a new token'
        },
        securityNote: 'Your token will automatically expire in ' + JWT_EXPIRES_IN,
        alternatives: {
            immediateInvalidation: 'For enhanced security, consider token blacklisting (advanced feature)',
            shortTokenLifetime: 'Use shorter token expiration times for better security'
        }
    });
});

// ============================================================================
// EXPORT ROUTER FOR USE IN APP.JS
// ============================================================================
module.exports = router;