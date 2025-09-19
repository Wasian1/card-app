# Database Schema Creation

## Step 1: Create Tables SQL File

**File**: `database/schema/01-create-tables.sql`

**Learning focus**: Understanding table relationships, data types, constraints

### Table Creation Order (Important!)
1. **users** - Independent table (no foreign keys)
2. **artists** - Independent table (no foreign keys)  
3. **cards** - References artists (foreign key to artists table)
4. **user_cards** - References both users and cards (junction table)
5. **user_pulls** - References users (one-to-one relationship)

**Why this order matters**: PostgreSQL requires referenced tables to exist before creating foreign keys.

## Step 2: Create Indexes SQL File

**File**: `database/schema/02-create-indexes.sql`

**Learning focus**: Database performance optimization

### Index Strategy
- **Primary Keys**: Automatically indexed
- **Foreign Keys**: Need manual indexes for query performance
- **Search Columns**: Index frequently searched columns (username, email, group_name)
- **Time Columns**: Index for sorting (acquired_at, last_pull_at)

## Step 3: Create Seed Data SQL File

**File**: `database/schema/03-seed-data.sql`

**Learning focus**: Test data for development

### Test Data Strategy
- Sample artists from different K-pop groups
- Sample users for testing authentication
- Sample cards for testing gacha mechanics
- Realistic data for frontend development

---
*Created: [Current Date]*
*Phase: 1.2 - Database Schema Implementation*
