# API Testing Framework Documentation

## 🧪 **Testing Framework Overview**

This document describes the professional API testing implementation for the K-Pop Card Collection Game, built with Jest and Supertest.

## 📊 **Testing Statistics**

- **Total Test Suites**: 2 (`artists.test.js`, `cards.test.js`)
- **Total Test Cases**: 26 comprehensive API tests
- **Test Coverage**: 8 API endpoints (Artists: 4, Cards: 4)
- **Test Environment**: Isolated test database (`card-app_test`)

## 🔧 **Testing Stack**

### **Core Testing Libraries**
- **Jest**: Testing framework and assertion library
- **Supertest**: HTTP assertion library for API testing
- **cross-env**: Cross-platform environment variable management

### **Configuration Files**
- **`jest.config.js`**: Jest testing framework configuration
- **`tests/setup.js`**: Global test environment setup
- **`package.json`**: Test scripts and dependencies

## 📋 **Test Scripts**

```bash
# Run all tests once
npm test

# Run tests in watch mode (re-runs on file changes)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## 🎯 **Test Categories**

### **1. Artists API Tests (`tests/api/artists.test.js`)**

#### **GET /api/artists - List All Artists**
- ✅ Returns all 22 K-pop artists
- ✅ Returns artists with required fields
- ✅ Validates response structure and data types

#### **GET /api/artists/:id - Individual Artist**
- ✅ Returns RM for artist ID 1
- ✅ Returns 404 for non-existent artist
- ✅ Returns 400 for invalid artist ID

#### **GET /api/artists/search - Search Artists**
- ✅ Finds Lisa by name search
- ✅ Case insensitive search functionality
- ✅ Returns empty array when no matches
- ✅ Returns 400 for missing search parameter

#### **GET /api/artists/group/:groupName - Group Filter**
- ✅ Returns all 7 BTS members
- ✅ Returns all 4 BLACKPINK members
- ✅ Case insensitive group name matching
- ✅ Returns 404 for non-existent group

### **2. Cards API Tests (`tests/api/cards.test.js`)**

#### **GET /api/cards - List All Cards**
- ✅ Returns all 44 collectible cards (22 artists × 2 versions)
- ✅ Returns cards with complete artist information via JOIN queries
- ✅ Validates response metadata and breakdown statistics

#### **GET /api/cards/rarity/:level - Rarity Filter**
- ✅ Returns only legendary (5-star) cards
- ✅ Returns common (2-star) cards
- ✅ Returns 400 for invalid rarity levels
- ✅ Returns 400 for non-numeric rarity values

#### **GET /api/cards/artist/:artistId - Artist Cards**
- ✅ Returns both versions of Lisa's cards (artist ID 8)
- ✅ Returns RM's cards (artist ID 1)
- ✅ Returns 404 for non-existent artist
- ✅ Returns 400 for invalid artist ID

#### **GET /api/cards/:id - Individual Card**
- ✅ Returns specific card with collection hints
- ✅ Returns 404 for non-existent card
- ✅ Returns 400 for invalid card ID

## 🧪 **Test Design Patterns**

### **Static vs Dynamic Testing**
This implementation uses **static testing** with pre-seeded database data for consistency and reliability:

```javascript
// Static testing example - predictable data
test('should return RM for artist ID 1', async () => {
    const response = await request(app).get('/api/artists/1');
    expect(response.body.data.stage_name).toBe('RM'); // RM always has ID 1
});
```

### **Array Testing with .forEach()**
```javascript
// Test every item in an array
response.body.data.forEach(card => {
    expect(card.rarity_level).toBe(2);  // Every card must be rarity 2
});
```

### **Data Transformation with .map()**
```javascript
// Extract specific values for testing
const versions = response.body.data.map(card => card.version).sort();
expect(versions).toEqual([1, 2]);  // Must have both version 1 and 2
```

## 🔍 **Test Environment Setup**

### **Database Isolation**
Tests run against a separate test database (`card-app_test`) to avoid affecting development data:

```javascript
// tests/setup.js
beforeAll(async () => {
    process.env.NODE_ENV = 'test';
    process.env.DB_NAME = process.env.DB_NAME + '_test';
});
```

### **Test Data Requirements**
Tests depend on the seeded data from `database/schema/03-seed-data.sql`:
- **22 K-pop artists** (BTS, BLACKPINK, TWICE, IU, BoA)
- **44 collectible cards** (2 versions per artist)
- **Consistent IDs and data** for predictable testing

## 📈 **Testing Best Practices Implemented**

### **1. Comprehensive Edge Cases**
- ✅ **404 errors** for non-existent resources
- ✅ **400 errors** for invalid input validation
- ✅ **Success cases** with proper data validation
- ✅ **Case insensitive** search and filtering

### **2. Business Logic Validation**
- ✅ **Rarity levels** must be 1-5
- ✅ **Card versions** must be 1-2
- ✅ **Artist counts** match expected totals
- ✅ **JOIN queries** return complete data

### **3. Response Structure Testing**
- ✅ **Required fields** presence validation
- ✅ **Data types** verification
- ✅ **Metadata accuracy** (counts, breakdowns)
- ✅ **Error message** consistency

## 🚀 **Future Testing Expansions**

When new API endpoints are added, follow this pattern:

### **Authentication Tests** (Next Phase)
```javascript
// tests/api/auth.test.js
describe('Authentication API', () => {
    describe('POST /api/auth/register', () => {
        test('should register new user with valid data', async () => { /* ... */ });
        test('should return 400 for duplicate email', async () => { /* ... */ });
    });
});
```

### **Integration Tests**
```javascript
// tests/integration/gacha-flow.test.js
describe('Gacha Pull Integration', () => {
    test('should complete full pull flow: auth → pull → collection update', async () => {
        // Multi-endpoint integration testing
    });
});
```

## 📚 **JavaScript Testing Concepts Learned**

### **Array Methods for Testing**
- **`.map()`**: Transform arrays for data extraction and comparison
- **`.forEach()`**: Validate every item in response arrays
- **Direct `expect()`**: Test single values and metadata

### **Async/Await Patterns**
```javascript
// All API tests use async/await for clean, readable code
test('should return artist data', async () => {
    const response = await request(app).get('/api/artists/1').expect(200);
    expect(response.body.success).toBe(true);
});
```

### **Jest Assertion Methods**
- **`.toBe()`**: Exact equality testing
- **`.toContain()`**: String/array inclusion testing
- **`.toHaveLength()`**: Array length validation
- **`.toHaveProperty()`**: Object property verification

This testing framework provides a solid foundation for maintaining API quality as the project grows to include authentication, gacha pulls, and user management features.



