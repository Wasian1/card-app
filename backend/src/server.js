// K-Pop Card Collection Game - Server Startup  
// This file imports our Express app and starts the HTTP server
// Think of this as Python's "if __name__ == '__main__':" section

const app = require('./app');  // Import our Express application from app.js

const PORT = process.env.PORT || 5000;           // Server port (5000 for development)
const HOST = process.env.HOST || 'localhost';    // Server host (localhost for development)

// ============================================================================
// START THE HTTP SERVER
// ============================================================================
// This actually starts listening for HTTP requests on the specified port
// Similar to Python Flask's app.run(host='localhost', port=5000)

const server = app.listen(PORT, HOST, () => {
    // This callback function runs AFTER the server successfully starts
    console.log('🎉 K-Pop Card Collection API Server Started!');
    console.log(`🌐 Server running on: http://${HOST}:${PORT}`);
    console.log(`📊 Health check: http://${HOST}:${PORT}/api/health`);
    console.log(`🔧 Environment: ${process.env.NODE_ENV || 'development'}`);
});

// ============================================================================
// GRACEFUL SHUTDOWN HANDLING
// ============================================================================
// These process event listeners handle server shutdown gracefully
// Similar to Python's signal handling or try/finally cleanup blocks
// Important for production: properly close database connections, finish requests, etc.

process.on('SIGTERM', () => {
    console.log('⏹️  SIGTERM received, shutting down gracefully...');
    server.close(() => {
        console.log('✅ Server closed');
        process.exit(0);                // Exit with success code
    });
});

process.on('SIGINT', () => {
    console.log('⏹️  SIGINT received, shutting down gracefully...');
    server.close(() => {
        console.log('✅ Server closed');
        process.exit(0);                // Exit with success code
    });
});