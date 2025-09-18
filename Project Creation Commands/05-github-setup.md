# GitHub Repository Setup

## Step 1: Create GitHub Repository Online

**Go to GitHub.com and:**
1. Click the **"+"** button (top right) → **"New repository"**
2. **Repository name**: `card-app` (match your local folder name)
3. **Description**: "K-Pop card collection game - learning project with Docker & Kubernetes"
4. **Public** repository (free tier requirement)
5. **DO NOT** initialize with README, .gitignore, or license (we already have these locally)
6. Click **"Create repository"**

**Why these settings:**
- **Public**: Required for free GitHub features
- **No initialization**: We already have files locally, don't want conflicts
- **Same name**: Keeps things simple and organized

## Step 2: Connect Local Repository to GitHub

**After creating the repo, GitHub will show you commands. We'll use the "push an existing repository" section:**

```bash
git remote add origin https://github.com/YOUR_USERNAME/card-app.git
```

**What this does:**
- `git remote add` - Adds a remote repository connection
- `origin` - Standard name for your main remote repository
- **Replace YOUR_USERNAME** with your actual GitHub username

## Step 3: Rename Main Branch (Best Practice)

```bash
git branch -M main
```

**What this does:**
- `-M` renames the current branch to "main"
- Modern GitHub uses "main" instead of "master"
- Ensures consistency with GitHub's default branch name

## Step 4: Push to GitHub

```bash
git push -u origin main
```

**What this does:**
- `git push` - Sends commits to remote repository
- `-u origin main` - Sets up tracking between local main and remote main
- After this, future pushes can just use `git push`

## Step 5: Verify Push Success

**Check on GitHub.com:**
- Your repository should now show all your files
- docs/, Project Creation Commands/, .gitignore should be visible
- Commit history should show your "feat: initial project structure" commit

---
*Created: [Current Date]*
*Phase: 1 - Foundation Setup*
