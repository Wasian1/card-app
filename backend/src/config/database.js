// K-Pop Card Collection Game - Database Configuration
// This file sets up the PostgreSQL connection using the 'pg' library
// Similar to Python's psycopg2 or SQLAlchemy database connections

const { Pool } = require('pg');  // Import PostgreSQL connection pool
require('dotenv').config();      // Load environment variables from .env file

// ============================================================================
// DATABASE CONNECTION POOL CONFIGURATION
// ============================================================================
// Configure connection to your PostgreSQL Docker container
// Pool manages multiple connections for better performance under load

const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',        // Docker container host
    port: process.env.DB_PORT || 5432,              // PostgreSQL default port
    database: process.env.DB_NAME || 'kpop_cards',  // Database name from docker-compose
    user: process.env.DB_USER || 'admin',           // Username from .env file
    password: process.env.DB_PASSWORD || 'password', // Password from .env file
    
    // Pool configuration for performance
    max: 20,                    // Maximum number of connections in pool
    idleTimeoutMillis: 30000,   // Close idle connections after 30 seconds
    connectionTimeoutMillis: 2000, // Timeout if can't get connection within 2 seconds
});

// ============================================================================
// CONNECTION TESTING AND ERROR HANDLING
// ============================================================================
// Test database connection on startup and handle connection errors gracefully
// Similar to Python's try/except blocks for database connections

// Test the database connection when this module is loaded
pool.connect((err, client, release) => {
    if (err) {
        // Connection failed - log error details for debugging
        console.error('❌ Database connection failed:', err.message);
        console.error('📝 Check that PostgreSQL container is running: docker-compose up -d');
        console.error('🔍 Verify connection details in .env file');
    } else {
        // Connection successful - log confirmation and release connection back to pool
        console.log('✅ Database connected successfully!');
        console.log(`🏢 Connected to: ${client.database} on ${client.host}:${client.port}`);
        release(); // Important: return connection to pool for reuse
    }
});

// ============================================================================
// EXPORT DATABASE FUNCTIONS
// ============================================================================
// Export the pool and helper functions for use in routes and models
// Similar to Python's database session management

module.exports = {
    pool,           // Export the connection pool for direct SQL queries
    query: (text, params) => pool.query(text, params), // Shorthand for simple queries
};