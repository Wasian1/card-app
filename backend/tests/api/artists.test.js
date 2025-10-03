// Artists API Test Suite
// Tests all artist endpoints with different test scenarios (success, failure, edge cases)
// Jest and Supertest

const request = require('supertest');
const app = require('../../src/app');

// Test suite for Artists API endpoints
describe('Artists API', () => {
    
    // ========================================================================
    // GET /api/artists - List all artists endpoint tests
    // ========================================================================
    
    describe('GET /api/artists', () => {
        test('should return all 22 K-pop artists', async () => {
            // Make HTTP GET request to our API
            const response = await request(app)
                .get('/api/artists')
                .expect(200);  // Expect HTTP 200 OK status
            
            // Test response structure and content
            expect(response.body.success).toBe(true);
            expect(response.body.data).toHaveLength(22);  // Should be 22 artists
            expect(response.body.message).toContain('22 K-pop artists');
            
            // Test that response contains expected fields
            const firstArtist = response.body.data[0];
            expect(firstArtist).toHaveProperty('artist_id');
            expect(firstArtist).toHaveProperty('name');
            expect(firstArtist).toHaveProperty('stage_name');
            expect(firstArtist).toHaveProperty('group_name');
        });
        
        test('should return artists ordered by name', async () => {
            const response = await request(app)
                .get('/api/artists')
                .expect(200);
            
            // Test ordering by checking first few artists
            const artistNames = response.body.data.map(artist => artist.name);
            const sortedNames = [...artistNames].sort();
            expect(artistNames).toEqual(sortedNames);
        });
    });
    
    // ========================================================================
    // GET /api/artists/:id - Individual artist endpoint tests
    // ========================================================================
    
    describe('GET /api/artists/:id', () => {
        test('should return RM for artist ID 1', async () => {
            const response = await request(app)
                .get('/api/artists/1')
                .expect(200);
            
            // Test specific artist data
            expect(response.body.success).toBe(true);
            expect(response.body.data.stage_name).toBe('RM');
            expect(response.body.data.group_name).toBe('BTS');
            expect(response.body.data.artist_id).toBe(1);
        });
        
        test('should return 404 for non-existent artist', async () => {
            const response = await request(app)
                .get('/api/artists/999')
                .expect(404);
            
            // Test error response structure
            expect(response.body.success).toBe(false);
            expect(response.body.message).toContain('Artist with ID 999 was not found');
        });
        
        test('should return 400 for invalid artist ID', async () => {
            const response = await request(app)
                .get('/api/artists/abc')
                .expect(400);
            
            // Test validation error
            expect(response.body.success).toBe(false);
            expect(response.body.message).toContain('Invalid artist ID');
        });
    });
    
    // ========================================================================
    // GET /api/artists/search - Search endpoint tests
    // ========================================================================
    
    describe('GET /api/artists/search', () => {
        test('should find Lisa by name search', async () => {
            const response = await request(app)
                .get('/api/artists/search?name=lisa')
                .expect(200);
            
            // Test search results
            expect(response.body.success).toBe(true);
            expect(response.body.data).toHaveLength(1);
            expect(response.body.data[0].stage_name).toBe('Lisa');
            expect(response.body.data[0].group_name).toBe('BLACKPINK');
        });
        
        test('should be case insensitive', async () => {
            const response = await request(app)
                .get('/api/artists/search?name=LISA')
                .expect(200);
            
            expect(response.body.data).toHaveLength(1);
            expect(response.body.data[0].stage_name).toBe('Lisa');
        });
        
        test('should return empty array for no matches', async () => {
            const response = await request(app)
                .get('/api/artists/search?name=nonexistent')
                .expect(200);
            
            expect(response.body.data).toHaveLength(0);
            expect(response.body.message).toContain('0 artists matching');
        });
        
        test('should return 400 for missing search parameter', async () => {
            const response = await request(app)
                .get('/api/artists/search')
                .expect(400);
            
            expect(response.body.success).toBe(false);
            expect(response.body.message).toContain('Search name is required');
        });
    });
    
    // ========================================================================
    // GET /api/artists/group/:groupName - Group filter endpoint tests
    // ========================================================================
    
    describe('GET /api/artists/group/:groupName', () => {
        test('should return all 7 BTS members', async () => {
            const response = await request(app)
                .get('/api/artists/group/BTS')
                .expect(200);
            
            expect(response.body.success).toBe(true);
            expect(response.body.data).toHaveLength(7);
            expect(response.body.group).toBe('BTS');
            expect(response.body.member_count).toBe(7);
            
            // Test that all returned artists are BTS members
            response.body.data.forEach(artist => {
                expect(artist.group_name).toBe('BTS');
            });
        });
        
        test('should return all 4 BLACKPINK members', async () => {
            const response = await request(app)
                .get('/api/artists/group/BLACKPINK')
                .expect(200);
            
            expect(response.body.data).toHaveLength(4);
            expect(response.body.group).toBe('BLACKPINK');
        });
        
        test('should be case insensitive for group names', async () => {
            const response = await request(app)
                .get('/api/artists/group/bts')
                .expect(200);
            
            expect(response.body.data).toHaveLength(7);
        });
        
        test('should return 404 for non-existent group', async () => {
            const response = await request(app)
                .get('/api/artists/group/NONEXISTENT')
                .expect(404);
            
            expect(response.body.success).toBe(false);
            expect(response.body.message).toContain('No artists found in group');
        });
    });
});