# Backend Foundation Setup - Phase 2 Start

**Date**: Current Session  
**Phase**: 2.1 Backend Foundation  
**Learning Focus**: Node.js, Express.js, JavaScript fundamentals for Python developers

## Commands Executed

### 1. Navigate to Backend Directory and Initialize Node.js
```bash
cd backend
npm init -y
```

**What this does:**
- `npm init -y` creates `package.json` (like Python's `requirements.txt` + `setup.py` combined)
- The `-y` flag accepts all default values automatically
- `package.json` tracks dependencies, scripts, and project metadata

### 2. Install Core Backend Dependencies
```bash
npm install express pg dotenv cors helmet bcryptjs jsonwebtoken node-cron
npm install --save-dev nodemon
```

**Package Explanations:**
- **`express`** - Web framework (like Python's Flask/FastAPI)
- **`pg`** - PostgreSQL database driver (like Python's `psycopg2`)
- **`dotenv`** - Environment variable loader (like Python's `python-decouple`)
- **`cors`** - Cross-Origin Resource Sharing (enables frontend ↔ backend communication)
- **`helmet`** - Security middleware (adds protective HTTP headers)
- **`bcryptjs`** - Password hashing (like Python's `bcrypt` or `werkzeug.security`)
- **`jsonwebtoken`** - JWT token creation/validation (like Python's `pyjwt`)
- **`node-cron`** - Cronjob scheduling (like Python's `schedule` or `celery`)
- **`nodemon`** (dev) - Auto-restart server on changes (like Python's `watchdog`)

### 3. Create Organized Folder Structure
```bash
mkdir -p src/{controllers,models,routes,middleware,config,utils,jobs}
mkdir -p tests
touch src/app.js src/server.js
```

**Folder Structure Explained:**
```
backend/
├── src/
│   ├── controllers/    # Business logic handlers (like Python views/controllers)
│   ├── models/        # Database interaction layer (like Python models/DAOs)
│   ├── routes/        # API endpoint definitions (like Python blueprints/routers)
│   ├── middleware/    # Request/response interceptors (like Python decorators)
│   ├── config/        # Configuration management (database, JWT secrets)
│   ├── utils/         # Helper functions (like Python utilities)
│   ├── jobs/          # Cronjob definitions (scheduled tasks)
│   ├── app.js         # Express app configuration (like Python app factory)
│   └── server.js      # Server startup file (like Python's if __name__ == "__main__")
├── tests/             # API tests (like Python's pytest directory)
├── package.json       # Dependency management (requirements.txt + setup.py)
└── package-lock.json  # Exact version lock (like Python's poetry.lock)
```

### 4. Updated package.json Scripts
```json
"scripts": {
  "start": "node src/server.js",        // Production server start
  "dev": "nodemon src/server.js",       // Development with auto-restart
  "test": "echo \"Error no test specified\" && exit 1"
}
```

## JavaScript Learning Notes (for Python Developers)

### Key Differences from Python:

1. **Variable Declaration:**
   - **JavaScript**: `const`, `let`, `var`
   - **Python**: Just variable names
   - **`const`** = Cannot be reassigned (like Python's convention of UPPERCASE constants)
   - **`let`** = Can be reassigned (like normal Python variables)
   - **`var`** = Old syntax, avoid it

2. **Import System:**
   - **JavaScript (Node.js)**: `const express = require('express');`
   - **Python**: `import express` or `from package import module`
   - Node.js uses CommonJS module system
   - Can call methods immediately: `require('dotenv').config()`

3. **Comments:**
   - **JavaScript**: `//` (single line), `/* */` (multi-line)
   - **Python**: `#` (single line), `""" """` (multi-line)

4. **Semicolons:**
   - JavaScript traditionally uses semicolons to end statements
   - Modern JavaScript can auto-insert them, but explicit is clearer

5. **Function Syntax:**
   - **JavaScript**: `function myFunc() {}` or `const myFunc = () => {}`
   - **Python**: `def my_func():`

## Files Created in This Session

### 1. package.json
Contains project metadata and dependencies (like Python's setup.py + requirements.txt)

### 2. package-lock.json
Automatically generated exact version locks (like Python's poetry.lock)

### 3. Directory Structure
Organized MVC-style architecture following Node.js/Express best practices

## Next Steps

1. Create `src/app.js` - Express application configuration
2. Create `src/server.js` - Server startup logic
3. Learn JavaScript syntax through detailed code examples
4. Test the basic server with health check endpoint

## Status
✅ Node.js project initialized  
✅ Dependencies installed  
✅ Folder structure created  
✅ Scripts configured  
⏳ **CURRENT**: Learning JavaScript syntax through app.js creation
