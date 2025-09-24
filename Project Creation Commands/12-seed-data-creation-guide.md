# Seed Data Creation - Step-by-Step Guide

## 🎯 **Learning Objectives**
- Master SQL INSERT operations with complex data relationships
- Understand foreign key dependencies and insertion order
- Practice JSONB data insertion for flexible metadata
- Learn realistic data modeling with actual K-pop artists
- Validate database constraints and performance with real data

## 📊 **Seed Data Strategy**

### Data Insertion Order (Critical for Foreign Keys):
1. **Users** - Independent table (no dependencies)
2. **Artists** - Independent table (no dependencies)  
3. **Cards** - Depends on Artists (foreign key: artist_id)
4. **User_Cards** - Depends on Users + Cards (foreign keys: user_id, card_id)
5. **User_Pulls** - Depends on Users (foreign key: user_id)

### Artist Selection Strategy:
- **BTS** (4 members) - Most globally recognized group
- **BLACKPINK** (4 members) - Top girl group
- **TWICE** (3 members selected) - Popular multinational group  
- **Solo Artists** (2 artists) - Demonstrate group vs solo artist data

### Image Strategy:
- **Wikipedia Commons URLs** - Legally safe for portfolio projects
- **Version 1**: Main Wikipedia profile photo
- **Version 2**: Alternative photo or performance image
- **Fallback**: Placeholder service URLs if Wikipedia images unavailable

### Business Logic Demonstrations:
- **Sample users** with different collection stages
- **Realistic pull availability** scenarios
- **Artist metadata variety** (different countries, debut years, personalities)
- **Card rarity distribution** following game balance principles

---
*Created: [Current Date]*
*Phase: 1.3 - Database Population with Realistic Data*
