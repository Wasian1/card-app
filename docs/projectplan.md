# K-Pop Card Collection Game - Project Plan

## Project Overview
A learning-focused hobby project to build a gacha-style K-pop artist card collection game using Docker, Kubernetes (minikube), and free-tier services. Emphasis on understanding each component and technology.

## Learning Goals
- Full-stack web development (React frontend, Node.js/Express backend)
- Database design and management (PostgreSQL)
- Container orchestration with Docker and Kubernetes
- **Cronjob scheduling and automation** (system tasks, data pipelines, maintenance)
- **Version control and collaboration** (Git workflows, GitHub integration, CI/CD)
- Authentication and user management
- API design and integration
- Free-tier service integration and deployment strategies

## Project Phases

### Phase 1: Foundation Setup ✅ **COMPLETED**
**Status**: Completed
**Learning Focus**: Project structure, containerization basics, local development environment, cronjob fundamentals

#### Step 1.1: Environment Preparation
- [ ] Verify Docker and minikube installation
- [ ] Set up project directory structure
- [ ] Create initial Docker configuration files
- [ ] Test local container orchestration

#### Step 1.2: Database Design
- [ ] Study and implement database schema
- [ ] Set up local PostgreSQL in Docker
- [ ] Create initial migration scripts
- [ ] Understand relationships between entities

#### Step 1.3: Basic Backend API
- [ ] Set up Node.js/Express foundation
- [ ] Implement basic CRUD operations
- [ ] Containerize backend service
- [ ] Test API endpoints locally

#### Step 1.4: Version Control Setup
- [ ] Initialize Git repository and understand Git workflow
- [ ] Create GitHub repository for project collaboration
- [ ] Set up proper .gitignore for Node.js, Docker, and IDE files
- [ ] Learn branching strategies and commit best practices

#### Step 1.5: Cronjob Foundations
- [ ] Understand Unix/Linux cron syntax and scheduling
- [ ] Learn about Node.js cronjob libraries (node-cron, cron)
- [ ] Create basic scheduled task examples
- [ ] Test cronjob execution in Docker containers

### Phase 2: Core Game Logic ⏳ **CURRENT PHASE**
**Status**: In Progress - Backend Foundation Setup
**Learning Focus**: Game mechanics, authentication, business logic, automated pull refresh

#### Step 2.1: User Authentication
- [ ] Implement user registration/login
- [ ] Set up password hashing and security
- [ ] Create user session management
- [ ] Test authentication flow

#### Step 2.2: Gacha Pull System
- [ ] Implement 12-hour cooldown logic
- [ ] Create pull stacking mechanism
- [ ] Build card generation logic
- [ ] Test pull mechanics

#### Step 2.3: Card Management
- [ ] Implement user card collections
- [ ] Create card display functionality
- [ ] Build card metadata system
- [ ] Test card operations

#### Step 2.4: Pull Refresh Automation
- [ ] Create cronjob to refresh available pulls every 12 hours
- [ ] Implement batch processing for all users
- [ ] Add logging and error handling for scheduled tasks
- [ ] Test automated pull distribution and caps

### Phase 3: Data Integration
**Status**: Pending
**Learning Focus**: External APIs, data processing, image handling, data pipeline automation

#### Step 3.1: Artist Data Pipeline
- [ ] Set up Kaggle CSV processing
- [ ] Implement Wikipedia API integration
- [ ] Create data refresh mechanisms
- [ ] Build artist database population

#### Step 3.2: Image Collection System
- [ ] Research free image sources
- [ ] Implement image scraping/collection
- [ ] Set up image storage solution
- [ ] Create image processing pipeline

#### Step 3.3: Data Pipeline Automation
- [ ] Create cronjobs for daily artist data synchronization
- [ ] Implement weekly image collection and processing
- [ ] Set up automated data validation and cleanup tasks
- [ ] Build monitoring and alerting for failed data jobs

### Phase 4: Frontend Development
**Status**: Pending
**Learning Focus**: React development, UI/UX, animations

#### Step 4.1: Basic UI Components
- [ ] Set up React application structure
- [ ] Create user authentication UI
- [ ] Build card display components
- [ ] Implement basic navigation

#### Step 4.2: Game Interface
- [ ] Create gacha pull interface
- [ ] Implement pull animations
- [ ] Build card collection gallery
- [ ] Add user profile pages

### Phase 5: Kubernetes Integration
**Status**: Pending
**Learning Focus**: Container orchestration, service discovery, scaling, Kubernetes cronjobs

#### Step 5.1: Service Decomposition
- [ ] Split application into microservices
- [ ] Create Kubernetes manifests
- [ ] Set up service communication
- [ ] Implement health checks

#### Step 5.2: Local Deployment
- [ ] Deploy to minikube cluster
- [ ] Set up ingress controllers
- [ ] Implement persistent volumes
- [ ] Test full system integration

#### Step 5.3: Kubernetes Cronjobs
- [ ] Convert Node.js cronjobs to Kubernetes CronJobs
- [ ] Implement job scheduling and management
- [ ] Set up job monitoring and failure handling
- [ ] Test cronjob execution in Kubernetes environment

### Phase 6: Testing & Documentation
**Status**: Pending
**Learning Focus**: Testing strategies, documentation, maintenance

#### Step 6.1: Testing Implementation
- [ ] Write unit tests
- [ ] Implement integration tests
- [ ] Create end-to-end tests
- [ ] Set up automated testing with Jest and Cypress

#### Step 6.2: CI/CD Pipeline
- [ ] Configure GitHub Actions workflows
- [ ] Set up automated testing on pull requests
- [ ] Implement automated deployment pipelines
- [ ] Learn about code quality checks and security scanning

#### Step 6.3: Final Documentation
- [ ] Complete technical documentation
- [ ] Create deployment guides
- [ ] Write user manual
- [ ] Document lessons learned

## Current Status
- **Phase**: 1 (Foundation Setup)
- **Step**: 1.1 (Environment Preparation)
- **Next Action**: Verify local development environment setup

## Notes
- All services must use free tiers only
- Emphasis on learning and understanding over speed
- Docker and Kubernetes integration required
- Step-by-step approach with detailed explanations

---
*Last Updated*: [Current Date]
*Current Focus*: Setting up development environment and project structure
