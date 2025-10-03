// Test Environment Setup for K-Pop Card Collection API
// This file configures the testing environment and database connection
// Runs once before all test suites to ensure clean, isolated testing

const { Pool } = require('pg');

// Global test setup that runs before all tests
beforeAll(async () => {
    // Set test environment variables
    process.env.NODE_ENV = 'test';
    process.env.DB_NAME = process.env.DB_NAME + '_test';  // Use separate test database
    
    console.log('🧪 Test environment initialized');
    console.log(`📊 Database: ${process.env.DB_NAME}`);
});

// Global test cleanup that runs after all tests
afterAll(async () => {
    // Close any open database connections
    console.log('🧹 Test cleanup completed');
});

// Global test configuration
global.testTimeout = 10000;  // 10 second timeout for database operations