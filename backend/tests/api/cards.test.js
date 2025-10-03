// Cards API Test Suite
// Tests all card endpoints including rarity filtering, artist filtering, and individual card lookup

const request = require('supertest');
const app = require('../../src/app');

// Test suite for Cards API endpoints
describe('Cards API', () => {
    
    // ========================================================================
    // GET /api/cards - List all cards endpoint tests
    // ========================================================================
    
    describe('GET /api/cards', () => {
        test('should return all 44 collectible cards', async () => {
            const response = await request(app)
                .get('/api/cards')
                .expect(200);
            
            // Test response structure and count
            expect(response.body.success).toBe(true);
            expect(response.body.data).toHaveLength(44);  // 22 artists × 2 versions
            expect(response.body.message).toContain('44 collectible cards');
            expect(response.body.total_cards).toBe(44);
            
            // Test breakdown metadata
            expect(response.body.breakdown.total_artists).toBe(22);
            expect(response.body.breakdown.versions_per_artist).toBe(2);
        });
        
        test('should return cards with complete artist information', async () => {
            const response = await request(app)
                .get('/api/cards')
                .expect(200);
            
            // Test that JOIN query worked - cards have artist data
            const firstCard = response.body.data[0];
            expect(firstCard).toHaveProperty('card_id');
            expect(firstCard).toHaveProperty('version');
            expect(firstCard).toHaveProperty('rarity_level');
            expect(firstCard).toHaveProperty('artist_name');
            expect(firstCard).toHaveProperty('stage_name');
            expect(firstCard).toHaveProperty('group_name');
            expect(firstCard).toHaveProperty('extra_info');
            
            // Test data types
            expect(typeof firstCard.card_id).toBe('number');
            expect(typeof firstCard.version).toBe('number');
            expect(firstCard.version).toBeGreaterThanOrEqual(1);
            expect(firstCard.version).toBeLessThanOrEqual(2);
            expect(firstCard.rarity_level).toBeGreaterThanOrEqual(1);
            expect(firstCard.rarity_level).toBeLessThanOrEqual(5);
        });
    });
    
    // ========================================================================
    // GET /api/cards/rarity/:level - Rarity filter endpoint tests
    // ========================================================================
    
    describe('GET /api/cards/rarity/:level', () => {
        test('should return only legendary (5-star) cards', async () => {
            const response = await request(app)
                .get('/api/cards/rarity/5')
                .expect(200);
            
            expect(response.body.success).toBe(true);
            expect(response.body.rarity_level).toBe(5);
            expect(response.body.rarity_name).toBe('Legendary ⭐⭐⭐⭐⭐');
            
            // Test that all returned cards are 5-star
            response.body.data.forEach(card => {
                expect(card.rarity_level).toBe(5);
            });
            
            // Test we have some legendary cards
            expect(response.body.data.length).toBeGreaterThan(0);
        });
        
        test('should return common (2-star) cards', async () => {
            const response = await request(app)
                .get('/api/cards/rarity/2')
                .expect(200);
            
            expect(response.body.rarity_name).toBe('Uncommon ⭐⭐');
            response.body.data.forEach(card => {
                expect(card.rarity_level).toBe(2);
            });
        });
        
        test('should return 400 for invalid rarity level', async () => {
            const response = await request(app)
                .get('/api/cards/rarity/6')
                .expect(400);
            
            expect(response.body.success).toBe(false);
            expect(response.body.message).toContain('Invalid rarity level');
            expect(response.body.examples).toContain('GET /api/cards/rarity/5 (legendary)');
        });
        
        test('should return 400 for non-numeric rarity', async () => {
            const response = await request(app)
                .get('/api/cards/rarity/abc')
                .expect(400);
            
            expect(response.body.success).toBe(false);
            expect(response.body.message).toContain('Invalid rarity level');
        });
    });
    
    // ========================================================================
    // GET /api/cards/artist/:artistId - Artist cards endpoint tests
    // ========================================================================
    
    describe('GET /api/cards/artist/:artistId', () => {
        test('should return both versions of Lisa\'s cards (artist ID 8)', async () => {
            const response = await request(app)
                .get('/api/cards/artist/8')
                .expect(200);
            
            expect(response.body.success).toBe(true);
            expect(response.body.data).toHaveLength(2);  // Both versions
            expect(response.body.card_count).toBe(2);
            
            // Test artist metadata in response
            expect(response.body.artist.artist_id).toBe(8);
            expect(response.body.artist.stage_name).toBe('Lisa');
            expect(response.body.artist.group).toBe('BLACKPINK');
            
            // Test that we have version 1 and version 2
            const versions = response.body.data.map(card => card.version).sort();
            expect(versions).toEqual([1, 2]);
            
            // Test that both cards are for Lisa
            response.body.data.forEach(card => {
                expect(card.stage_name).toBe('Lisa');
                expect(card.artist_id).toBe(8);
            });
        });
        
        test('should return RM\'s cards (artist ID 1)', async () => {
            const response = await request(app)
                .get('/api/cards/artist/1')
                .expect(200);
            
            expect(response.body.data).toHaveLength(2);
            expect(response.body.artist.stage_name).toBe('RM');
            expect(response.body.artist.group).toBe('BTS');
        });
        
        test('should return 404 for non-existent artist', async () => {
            const response = await request(app)
                .get('/api/cards/artist/999')
                .expect(404);
            
            expect(response.body.success).toBe(false);
            expect(response.body.message).toContain('No cards found for artist ID 999');
        });
        
        test('should return 400 for invalid artist ID', async () => {
            const response = await request(app)
                .get('/api/cards/artist/abc')
                .expect(400);
            
            expect(response.body.success).toBe(false);
            expect(response.body.message).toContain('Invalid artist ID');
        });
    });
    
    // ========================================================================
    // GET /api/cards/:id - Individual card endpoint tests
    // ========================================================================
    
    describe('GET /api/cards/:id', () => {
        test('should return specific card with collection hints', async () => {
            // Test with Lisa v1 card (assuming card_id 15 based on your seed data)
            const response = await request(app)
                .get('/api/cards/15')
                .expect(200);
            
            expect(response.body.success).toBe(true);
            expect(response.body.data.card_id).toBe(15);
            
            // Test collection hints are provided
            expect(response.body.collection_info).toHaveProperty('other_version_hint');
            expect(response.body.collection_info).toHaveProperty('rarity_peers_hint');
            expect(response.body.collection_info.other_version_hint).toContain('/api/cards/artist/');
            expect(response.body.collection_info.rarity_peers_hint).toContain('/api/cards/rarity/');
        });
        
        test('should return 404 for non-existent card', async () => {
            const response = await request(app)
                .get('/api/cards/999')
                .expect(404);
            
            expect(response.body.success).toBe(false);
            expect(response.body.message).toContain('Card with ID 999 not found');
        });
        
        test('should return 400 for invalid card ID', async () => {
            const response = await request(app)
                .get('/api/cards/abc')
                .expect(400);
            
            expect(response.body.success).toBe(false);
            expect(response.body.message).toContain('Invalid card ID');
        });
    });
});