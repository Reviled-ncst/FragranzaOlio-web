# Internship Management System - Setup Guide

## Overview
Complete role-based authentication system with the following components:
- MySQL Database (XAMPP)
- PHP REST API Backend
- Next.js Frontend with React Context

## Setup Instructions

### 1. XAMPP Setup

1. **Start XAMPP Services**
   - Open XAMPP Control Panel
   - Start Apache and MySQL services
   - Apache Port: 80
   - MySQL Port: 3306

2. **Create Database**
   - Open phpMyAdmin: `http://localhost/phpmyadmin`
   - Default credentials: Username: `root`, Password: (empty)
   - Create new database: `internship_system`
   - Copy SQL schema from `database/schema.sql` and import

3. **Configure API Directory**
   - Create folder: `C:\xampp\htdocs\internship_system`
   - Copy `api/` folder contents into this directory
   - Database connection uses default XAMPP settings (user: root, no password)

### 2. Next.js Frontend Setup

1. **Environment Variables**
   - The frontend will call API at: `http://localhost/internship_system/api/auth/login.php`
   - Update if your API path is different

2. **Start Development Server**
   ```bash
   npm run dev
   ```
   - Frontend runs at: `http://localhost:3000`

### 3. Login Details

#### SUPERADMIN Account
- Email: `superadmin@internship.com`
- Password: `superadmin123`
- Access: Full system control

#### ADMIN Account
- Email: `admin@internship.com`
- Password: `admin123`
- Access: Manage internships and users

#### SUPERVISOR Accounts (any department)
- Email: `supervisor.it@internship.com`
- Password: `supervisor123`
- Access: Manage interns in department

#### INTERN Accounts
- Email: `intern1@student.com`
- Password: `intern123`
- Access: Apply, view progress, submit reports

### 4. Tech Stack

**Frontend:**
- Next.js 16.2 with App Router
- React 19 with Hooks
- Framer Motion for animations
- Tailwind CSS v4
- TypeScript

**Backend:**
- PHP with PDO
- MySQL Database
- REST API endpoints
- CORS enabled

**Authentication:**
- Session-based with localStorage
- Role-based access control
- Protected routes with middleware

### 5. File Structure

```
/api
  /config
    Database.php
  /auth
    login.php

/app
  /context
    AuthContext.tsx
  /components
    ProtectedRoute.tsx
  /dashboard
    page.tsx
    /superadmin
    /admin
    /supervisor
    /intern
  /login
    page.tsx

/database
  schema.sql
```

### 6. Key Features Implemented

✅ User Authentication (Email & Password)
✅ Role-Based Access Control (4 roles)
✅ Protected Routes with automatic redirects
✅ Responsive Dashboard with user-specific actions
✅ Session persistence with localStorage
✅ Mock data for demo purposes
✅ Professional UI matching theme
✅ Error handling and validation

### 7. Next Steps (To be completed)

- Create individual role dashboards (SUPERADMIN, ADMIN, SUPERVISOR, INTERN)
- Implement CRUD operations for internships
- Add application management system
- Create evaluation forms
- Add reporting system for interns
- Connect real database operations
- Add JWT tokens for enhanced security
- Implement email notifications

### 8. Troubleshooting

**Login fails:**
- Check if MySQL is running
- Verify database `internship_system` exists
- Check PHP file permissions

**CORS errors:**
- Ensure Apache is running
- Check API path is correct
- Verify PHP headers are set properly

**Database connection error:**
- Check phpMyAdmin connection
- Verify credentials (root, no password)
- Ensure MySQL port is 3306

### 9. Testing the System

1. Navigate to `http://localhost:3000/login`
2. Click on any demo account to auto-fill
3. Enter password and click Login
4. You'll be redirected to `/dashboard`
5. Logout button to return to login

### Security Notes (Production)

⚠️ Current system uses demo passwords for testing
⚠️ Implement proper bcrypt hashing for production
⚠️ Use JWT tokens instead of session storage
⚠️ Add rate limiting on API endpoints
⚠️ Implement HTTPS/SSL
⚠️ Add CSRF protection
⚠️ Validate all user inputs server-side
