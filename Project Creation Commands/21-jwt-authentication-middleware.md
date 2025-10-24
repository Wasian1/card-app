# JWT Authentication Middleware Creation

## 🎯 **Learning Goal**
Create selective authentication middleware that can protect specific routes (unlike global middleware in app.js that runs on ALL requests).

## 🔐 **What is Authentication Middleware?**

**Authentication middleware is a "security gate"** that sits between incoming requests and your protected routes:

```
Client Request → Global Middleware (app.js) → Auth Middleware → Protected Route
                    ↑                            ↑              ↑
               (JSON parsing, CORS)        (Verify JWT)    (Your business logic)
```

## 📋 **Middleware vs Route Handler Pattern**

### **Route Handler (What we've built so far):**
```javascript
app.get('/api/artists', (req, res) => {
    // Handle request, send response
});
```

### **Middleware (What we're building now):**
```javascript
app.get('/api/auth/me', authenticateToken, (req, res) => {
    //                   ↑                    ↑
    //              Middleware           Route Handler
    //         (Runs first, validates)  (Runs if middleware allows)
});
```

## 🚀 **Implementation Steps**

### **Step 1: Create Middleware Directory**
```bash
mkdir -p backend/src/middleware
```

### **Step 2: Create JWT Authentication Middleware**
File: `backend/src/middleware/auth.js`

**This middleware will:**
1. Extract JWT token from Authorization header
2. Verify token signature and expiration
3. Decode user information from token
4. Attach user data to `req.user` for route handlers
5. Handle missing/invalid tokens with proper HTTP status codes

## 📚 **Key JavaScript Concepts**

### **Middleware Function Signature**
```javascript
const authenticateToken = (req, res, next) => {
    // req: incoming request object
    // res: response object (to send errors)
    // next: function to call when done (passes control forward)
};
```

### **Authorization Header Format**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjV9.signature
               ↑      ↑
            Scheme   Token
```

### **HTTP Status Codes for Authentication**
- **401 Unauthorized**: Missing or malformed token
- **403 Forbidden**: Token exists but is invalid/expired  
- **200 OK**: Token is valid, proceed to route

## 📝 **Implementation Notes**
- This middleware is **selective** (unlike app.js global middleware)
- It will be applied only to routes that need authentication
- Failed authentication stops the request chain (no `next()` call)
- Successful authentication adds `req.user` and calls `next()`

## 🔗 **Next Steps After Creation**
1. Test middleware with auth routes
2. Apply to protected endpoints
3. Create comprehensive tests

