# Docker Database Setup - Phase 1.2 Validation

## 🎯 Learning Objectives
- Understand Docker Compose for database setup
- Learn PostgreSQL container configuration
- Master automatic schema loading with Docker volumes

## 🐳 Docker Compose Configuration

### File: `database/docker/docker-compose.yml`

#### PostgreSQL Service Setup
```yaml
version: '3.8'
services:
  postgres:
    image: postgres:15-alpine          # Lightweight PostgreSQL 15
    container_name: card-app-postgres  # Easy identification in docker ps
    restart: unless-stopped            # Auto-restart on crashes
    
    environment:
      POSTGRES_DB: card_game           # Creates database named "card_game"
      POSTGRES_USER: card_admin        # Admin username (not default "postgres")
      POSTGRES_PASSWORD: dev_password_2024  # Development password
    
    ports:
      - "5432:5432"                    # Map container port to host port
    
    volumes:
      - postgres_data:/var/lib/postgresql/data     # Persistent storage
      - ../schema:/docker-entrypoint-initdb.d     # Automatic schema loading
```

## 🪄 **Critical Concept: Automatic Schema Loading**

### How `../schema:/docker-entrypoint-initdb.d` Works

**Volume Mapping Explained:**
- **Left side (`../schema`)**: Your local database/schema/ folder
- **Right side (`/docker-entrypoint-initdb.d`)**: Special PostgreSQL Docker directory
- **Result**: Your SQL files appear inside the container automatically

**PostgreSQL Docker Image Behavior:**
1. **First startup only**: Checks if database is empty
2. **If empty**: Looks for files in `/docker-entrypoint-initdb.d/`
3. **Execution**: Runs all `.sql` files in alphabetical order
4. **Your files**:
   - `01-create-tables.sql` → Runs first (creates tables)
   - `02-create-indexes.sql` → Runs second (adds indexes)
   - `03-seed-data.sql` → Would run third (if created)

**Professional Benefits:**
- ✅ **Zero manual setup** - database fully configured on first run
- ✅ **Consistent environment** - same setup for all developers
- ✅ **Version controlled** - schema changes tracked in Git
- ✅ **Repeatable** - destroy and recreate database anytime

### Port Mapping
- **"5432:5432"**: PostgreSQL's standard port mapped to host
- **Access**: Connect from host using `localhost:5432`
- **Tools**: pgAdmin, DataGrip, or API connections work immediately

### Data Persistence
- **Named volume `postgres_data`**: Data survives container restarts
- **Location**: Docker manages storage location automatically
- **Backup**: Can be backed up using Docker volume commands

---

## 🚀 **Next Steps**
1. Complete Docker Compose configuration (volumes & networks)
2. Start PostgreSQL container and validate schema loading
3. Connect and test database with sample queries

*Created: [Current Date]*
*Phase: 1.2 - Database Validation & Testing*
