// Jest Configuration for K-Pop Card Collection API Testing
// This file configures the Jest testing framework for our Node.js API

module.exports = {
    // Test environment - Node.js instead of browser
    testEnvironment: 'node',
    
    // Test file patterns - Jest will run files matching these patterns
    testMatch: [
      '**/tests/**/*.test.js',     // All .test.js files in tests/ directory
      '**/tests/**/*.spec.js'      // All .spec.js files in tests/ directory
    ],
    
    // Coverage collection settings
    collectCoverageFrom: [
      'src/**/*.js',               // Include all source files
      '!src/server.js',            // Exclude server startup file
      '!**/node_modules/**'        // Exclude dependencies
    ],
    
    // Setup files - run before each test suite
    setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
    
    // Test timeout - how long to wait for async tests
    testTimeout: 10000,            // 10 seconds for database operations
    
    // Verbose output - show individual test results
    verbose: true,
    
    // Clear mocks between tests for isolation
    clearMocks: true
  };