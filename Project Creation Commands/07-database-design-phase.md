# Database Design Phase - Step 1.2

## 🎯 Learning Objectives
- Understand relational database design for gaming applications
- Learn PostgreSQL setup with Docker containers
- Practice SQL table creation and relationships
- Implement database indexing for performance

## 📋 Database Requirements Review

### Core Game Entities
1. **Users** - Player accounts and authentication
2. **Artists** - K-pop idol information and metadata
3. **Cards** - Two versions per artist (collectible items)
4. **User Collections** - Which cards each user owns
5. **Pull System** - Gacha mechanics and cooldowns

### Key Relationships
- One User → Many Cards (collection)
- One Artist → Two Cards (version 1 and 2)
- Users ↔ Pull System (cooldown tracking)

## 🐳 Docker PostgreSQL Setup

### Why PostgreSQL?
- **Free & Open Source** - Fits our no-cost requirement
- **JSON Support** - For artist metadata (favorite colors, MBTI, etc.)
- **Performance** - Excellent indexing and query optimization
- **Docker Official Images** - Easy containerization

### Why Docker for Database?
- **Consistent Environment** - Same database version everywhere
- **Easy Cleanup** - Remove containers without affecting system
- **Learning Kubernetes** - Practice container orchestration
- **Isolation** - Database runs in its own environment

## 📁 File Structure We'll Create
```
database/
├── schema/
│   ├── 01-create-tables.sql
│   ├── 02-create-indexes.sql
│   └── 03-seed-data.sql
├── docker/
│   └── docker-compose.yml
└── README.md
```

---
*Created: [Current Date]*
*Phase: 1.2 - Database Design*
