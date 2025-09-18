# Project Setup Commands - Phase 1

## Environment Verification

### Docker and Minikube Check
```bash
# Check Docker installation and status
docker --version && docker info

# Check minikube version and status
minikube version && minikube status

# Test kubectl connectivity
kubectl get nodes
```

## Directory Structure Creation

### Create Project Directories
```bash
# Create all necessary directories
mkdir -p {backend,frontend,database,k8s,scripts,docker-compose,.github/workflows}

# Verify directory structure
ls -la
```

**Purpose of each directory:**
- `backend/` → Node.js/Express API server
- `frontend/` → React application  
- `database/` → SQL schemas, migrations, seed data
- `k8s/` → Kubernetes manifests (deployments, services, cronjobs)
- `scripts/` → Cronjob scripts for pull refresh, data sync
- `docker-compose/` → Multi-container development setup
- `.github/workflows/` → GitHub Actions CI/CD pipelines

## Git Repository Initialization

### Step 1: Initialize Git
```bash
git init
```
**Creates:** Hidden `.git` folder for version control

### Step 2: Create .gitignore
```bash
touch .gitignore
```
**Next:** Add content to .gitignore file (see next section)

---
*Created: [Current Date]*
*Phase: 1 - Foundation Setup*
