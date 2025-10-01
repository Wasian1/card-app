# K-Pop Card Collection Game - Technical Documentation

## Application Overview
A gacha-style card collection game focused on K-pop artists, built as a learning project using modern containerized architecture.

## System Architecture

### High-Level Architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Frontend │    │  Express Backend │    │  PostgreSQL DB  │
│   (Port 3000)    │◄──►│   (Port 5000)    │◄──►│   (Port 5432)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                                ▼
                       ┌─────────────────┐
                       │   External APIs  │
                       │ (Wikipedia, etc.) │
                       └─────────────────┘
```

### Technology Stack

#### Frontend
- **Framework**: React.js with Next.js
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion (for gacha pull effects)
- **State Management**: React Context/useState
- **HTTP Client**: Axios

#### Backend
- **Runtime**: Node.js ✅ Setup Complete
- **Framework**: Express.js ✅ Foundation Complete
- **Authentication**: JWT tokens with bcrypt password hashing (In Progress)
- **Database Driver**: Raw SQL with pg ✅ Installed
- **Security**: helmet, cors ✅ Configured
- **Development**: nodemon ✅ Setup Complete

#### Database
- **Primary**: PostgreSQL
- **Caching**: Redis (optional, for session management)

#### DevOps & Infrastructure
- **Version Control**: Git with GitHub (public repository, free tier)
- **Containerization**: Docker
- **Orchestration**: Kubernetes (minikube for local development)
- **Task Scheduling**: Cronjobs (Node.js node-cron, Kubernetes CronJobs)
- **CI/CD**: GitHub Actions (free tier)
- **Hosting**: Free tier services (Render, Vercel, Supabase)

## Database Schema

### Core Tables

#### Users Table
```sql
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Artists Table
```sql
CREATE TABLE artists (
    artist_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    stage_name VARCHAR(100),
    group_name VARCHAR(100),
    date_of_birth DATE,
    country VARCHAR(50),
    hometown VARCHAR(100),
    debut_year INTEGER,
    extra_info JSONB, -- Stores flexible metadata like favorite color, MBTI, etc.
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Cards Table
```sql
CREATE TABLE cards (
    card_id SERIAL PRIMARY KEY,
    artist_id INTEGER REFERENCES artists(artist_id) ON DELETE CASCADE,
    version SMALLINT CHECK (version IN (1, 2)) NOT NULL,
    rarity_level SMALLINT DEFAULT 1 CHECK (rarity_level BETWEEN 1 AND 5),
    image_url TEXT,
    image_alt_text VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(artist_id, version) -- Ensures only 2 versions per artist
);
```

#### User_Cards Table (Collection Management)
```sql
CREATE TABLE user_cards (
    user_card_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    card_id INTEGER REFERENCES cards(card_id) ON DELETE CASCADE,
    acquired_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id, card_id) -- Prevents duplicate card ownership
);
```

#### Pulls Table (Gacha System)
```sql
CREATE TABLE user_pulls (
    user_id INTEGER PRIMARY KEY REFERENCES users(user_id) ON DELETE CASCADE,
    available_pulls INTEGER DEFAULT 1 CHECK (available_pulls >= 0),
    last_pull_at TIMESTAMP DEFAULT NOW(),
    max_stored_pulls INTEGER DEFAULT 5,
    updated_at TIMESTAMP DEFAULT NOW()
);
```

### Indexes for Performance
```sql
CREATE INDEX idx_user_cards_user_id ON user_cards(user_id);
CREATE INDEX idx_user_cards_acquired_at ON user_cards(acquired_at);
CREATE INDEX idx_artists_group_name ON artists(group_name);
CREATE INDEX idx_cards_artist_id ON cards(artist_id);
```

## API Design

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get user profile

### Game Endpoints
- `GET /api/pulls/available` - Check available pulls for user
- `POST /api/pulls/execute` - Execute a gacha pull
- `GET /api/cards/collection` - Get user's card collection
- `GET /api/cards/:cardId` - Get specific card details

### Admin/Data Endpoints
- `POST /api/admin/artists/sync` - Sync artist data from external sources
- `GET /api/artists/search` - Search available artists

## Scheduled Tasks & Automation

### Cronjob Architecture
The application uses multiple scheduled tasks for automation and maintenance:

#### Pull Refresh System
- **Schedule**: Every 12 hours (0 */12 * * *)
- **Function**: Grant new pulls to eligible users
- **Implementation**: Node.js with node-cron library
```javascript
cron.schedule('0 */12 * * *', async () => {
  await refreshUserPulls();
});
```

#### Data Pipeline Jobs
- **Artist Data Sync**: Daily at 2 AM (0 2 * * *)
- **Image Processing**: Weekly on Sundays at 3 AM (0 3 * * 0)
- **Database Cleanup**: Monthly on 1st at 1 AM (0 1 1 * *)

#### Kubernetes CronJob Migration
```yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: pull-refresh-job
spec:
  schedule: "0 */12 * * *"
  jobTemplate:
    spec:
      template:
        spec:
          containers:
          - name: pull-refresh
            image: card-app-backend:latest
            command: ["node", "scripts/refreshPulls.js"]
          restartPolicy: OnFailure
```

### Task Management Strategy
- **Logging**: All scheduled tasks log execution times and results
- **Error Handling**: Failed jobs retry with exponential backoff
- **Monitoring**: Health checks for cronjob execution status
- **Resource Management**: Jobs run in separate containers to avoid affecting main application

## Version Control & Collaboration

### Git Workflow Strategy
The project follows a **feature-branch workflow** optimized for learning and individual development:

#### Branch Structure
- `main` - Production-ready code, always deployable
- `develop` - Integration branch for testing features
- `feature/*` - Individual feature development branches
- `hotfix/*` - Emergency fixes for production issues

#### Commit Convention
Following [Conventional Commits](https://www.conventionalcommits.org/) specification:
```
feat: add gacha pull system
fix: resolve database connection timeout
docs: update API documentation
chore: update dependencies
```

#### GitHub Integration
- **Issues**: Track features, bugs, and learning objectives
- **Pull Requests**: Code review and CI/CD trigger points
- **Projects**: Kanban board for task management
- **Actions**: Automated testing and deployment pipelines

### Repository Structure
```
card-app/
├── .github/
│   └── workflows/          # GitHub Actions CI/CD
├── backend/               # Node.js/Express API
├── frontend/              # React application
├── database/              # SQL schemas and migrations
├── k8s/                   # Kubernetes manifests
├── scripts/               # Cronjob scripts and utilities
├── docker-compose/        # Multi-container development setup
├── docs/                  # Project documentation
└── .gitignore            # Git ignore patterns
```

### CI/CD Pipeline Strategy
- **On Push to Feature Branch**: Run tests, linting, security checks
- **On Pull Request**: Full test suite, build verification, preview deployment
- **On Merge to Main**: Deploy to production environment
- **Scheduled**: Daily dependency updates, security scans

## Game Mechanics

### Gacha Pull System
1. **Cooldown Period**: 12 hours between automatic pull grants
2. **Pull Stacking**: Up to 5 unused pulls can be stored
3. **Pull Calculation**: 
   ```javascript
   const hoursSinceLastPull = (Date.now() - lastPullTime) / (1000 * 60 * 60);
   const newPulls = Math.min(Math.floor(hoursSinceLastPull / 12), maxStoredPulls - currentPulls);
   ```

### Card Rarity System (Future Enhancement)
- **Common (70%)**: Basic artist cards
- **Rare (20%)**: Special outfit/concept cards
- **Ultra Rare (8%)**: Limited edition cards
- **Legendary (2%)**: Exclusive anniversary/debut cards

## External Data Sources

### Primary Sources (Free)
1. **Kaggle Datasets**
   - K-pop artist information CSV files
   - Manual refresh process initially

2. **Wikipedia API**
   - Artist biographical data
   - Group information and discography
   - Structured infobox data extraction

3. **Wikimedia Commons**
   - Free-to-use artist images
   - Legal compliance for image usage

### Data Processing Pipeline
1. **CSV Import**: Process Kaggle data files
2. **API Enhancement**: Enrich with Wikipedia data
3. **Image Collection**: Gather images from free sources
4. **Database Population**: Store processed data
5. **Validation**: Ensure data quality and completeness

## Containerization Strategy

### Docker Configuration
- **Frontend Container**: Node.js with React build
- **Backend Container**: Node.js with Express
- **Database Container**: PostgreSQL official image
- **Reverse Proxy**: Nginx for request routing

### Kubernetes Architecture
```yaml
# Simplified structure
Services:
  - frontend-service (LoadBalancer)
  - backend-service (ClusterIP)
  - database-service (ClusterIP)

Deployments:
  - frontend-deployment (2 replicas)
  - backend-deployment (2 replicas)
  - database-deployment (1 replica with PVC)

Persistent Volumes:
  - database-pvc (PostgreSQL data)
  - images-pvc (Uploaded images)
```

## Security Considerations

### Authentication
- JWT tokens with secure secret keys
- Password hashing using bcrypt (salt rounds: 12)
- Token expiration (24 hours)
- Refresh token mechanism

### Data Protection
- Input validation and sanitization
- SQL injection prevention (parameterized queries)
- Rate limiting on API endpoints
- CORS configuration for frontend

### Image Handling
- File type validation
- Size limits on uploads
- Secure file storage paths
- Content-type verification

## Development Workflow

### Local Development
1. Start minikube cluster
2. Deploy database service
3. Run backend in development mode
4. Start frontend development server
5. Use port-forwarding for database access

### Testing Strategy
- **Unit Tests**: Jest for backend logic
- **Integration Tests**: API endpoint testing
- **Frontend Tests**: React Testing Library
- **E2E Tests**: Cypress for complete user flows

## Deployment Strategy

### Free Tier Limitations
- **Database**: Supabase (500MB limit)
- **Backend**: Render (750 hours/month)
- **Frontend**: Vercel (unlimited static hosting)
- **Images**: GitHub Pages or Supabase Storage (1GB)

### Monitoring & Logging
- Application logs to stdout (Docker best practice)
- Health check endpoints
- Basic metrics collection
- Error tracking with free tier services

## API Endpoints & Game Mechanics

### Implemented Endpoints
- **GET /api/health** - Server health check and status
- **GET /api/artists** - List all K-pop idols (22 artists from database)

### Planned Game Architecture
Complete gacha card collection game with:
- **44 Unique Cards**: 22 artists × 2 versions with 5-tier rarity system
- **Gacha Pull System**: 12-hour cooldowns, weighted randomization
- **Collection Tracking**: Progress by group, rarity, duplicates
- **Social Features**: Leaderboards, achievements, trading system

### Route Categories
1. **Authentication**: User registration, login, profile management
2. **Discovery**: Browse artists, cards, search and filter options  
3. **Gacha System**: Pull execution, cooldown management, history
4. **Collections**: User cards, statistics, wishlist, progress tracking
5. **Social**: Leaderboards, achievements, trading, comparisons

*See Project Creation Commands/16-gacha-game-api-architecture.md for complete route specifications*

## Future Enhancements

### Planned Features
- [ ] Card trading system between users
- [ ] Achievement/badge system
- [ ] Seasonal/limited edition cards
- [ ] Group collection bonuses
- [ ] User profile customization
- [ ] Social features (friends, sharing)

### Technical Improvements
- [ ] Implement caching layer (Redis)
- [ ] Add search functionality
- [ ] Implement real-time notifications
- [ ] Mobile app development
- [ ] Advanced analytics
- [ ] Performance optimization

## Learning Resources

### Recommended Reading
- Docker documentation for containerization
- Kubernetes concepts and kubectl commands
- **Cronjob and task scheduling**: Unix cron syntax, node-cron library, Kubernetes CronJobs
- PostgreSQL query optimization
- React hooks and state management
- Express.js middleware patterns
- Authentication best practices

### Cronjob Learning Resources
- **Unix/Linux Cron**: Understanding crontab syntax and scheduling
- **node-cron**: Node.js scheduling library for application-level tasks
- **Kubernetes CronJobs**: Container-orchestrated scheduled tasks
- **Task monitoring**: Logging, error handling, and job status tracking

---
*Document Version*: 1.0
*Last Updated*: [Current Date]
*Status*: Initial documentation - will be updated throughout development
