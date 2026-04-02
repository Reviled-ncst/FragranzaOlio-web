# Authentication & Role-Based Access Testing Guide

## Working Login Credentials

All of these credentials work with mock authentication (no PHP backend required):

### Superadmin Account (Full Access)
- **Email**: superadmin@example.com
- **Password**: superadmin123
- **Role**: SUPERADMIN
- **Accessible Modules**: All 7 modules

### Admin Account (Full Access)
- **Email**: admin.internship@example.com
- **Password**: admin123
- **Role**: ADMIN
- **Accessible Modules**: All 7 modules

### Supervisor Account (Department Access)
- **Email**: supervisor.it@example.com
- **Password**: supervisor123
- **Role**: SUPERVISOR
- **Accessible Modules**: HR, Tasks, Inventory, Sales, POS, Reports (6/7 - no Interns dashboard)

### Intern Account (Limited Access)
- **Email**: intern.general@example.com
- **Password**: intern123
- **Role**: INTERN
- **Accessible Modules**: Tasks only

---

## Testing Steps

### 1. Test Login Flow
1. Navigate to `http://localhost:3000/login`
2. Click on any demo account to auto-fill credentials
3. Click "Login"
4. You should be redirected to `/enterprise` dashboard

### 2. Verify Role-Based Module Access
- **Admin Login**: Should see 7 modules in sidebar
- **Supervisor Login**: Should see 6 modules (HR, Tasks, Inventory, Sales, POS, Reports)
- **Intern Login**: Should see only Tasks module

### 3. Test Module Navigation
Each module link navigates to:
- `/enterprise/hr` - HR Management (7 sub-pages)
- `/enterprise/tasks` - Task Management
- `/enterprise/inventory` - Products & Inventory
- `/enterprise/sales` - Sales Management
- `/enterprise/pos` - POS System
- `/enterprise/interns` - Intern Dashboard
- `/enterprise/reports` - Reports & Analytics

### 4. Test User Info Display
- Sidebar shows logged-in user's name, email, and role
- Header shows role description with permissions level
- Logout button available in both sidebar and header

### 5. Test Unauthorized Access
- As INTERN, try accessing `/enterprise/hr` directly
- Should be redirected to `/login` (ProtectRoute enforces access control)

---

## Database Status

**Databases**: ✅ All set up and verified
- `shared_auth` - User authentication (5+ users)
- `enterprise_system` - Enterprise data (30+ tables)
- `internship_system` - Internship programs (30+ tables)

**Note**: Currently using mock authentication (MOCK_USERS in AuthContext.tsx). For real database authentication, ensure PHP API endpoint is running at:
```
http://localhost/internship_system/api/auth/login.php
```

---

## Current Module Status

| Module | Route | Status | Notes |
|--------|-------|--------|-------|
| HR Management | `/enterprise/hr` | ✅ Complete | 7 sub-pages implemented |
| Task Management | `/enterprise/tasks` | 🚀 Stub | Coming soon |
| Products & Inventory | `/enterprise/inventory` | 🚀 Stub | Coming soon |
| Sales Management | `/enterprise/sales` | 🚀 Stub | Coming soon |
| POS System | `/enterprise/pos` | 🚀 Stub | Coming soon |
| Intern Dashboard | `/enterprise/interns` | 🚀 Stub | Coming soon |
| Reports & Analytics | `/enterprise/reports` | 🚀 Stub | Coming soon |

---

## Architecture Overview

### Authentication Flow
1. User enters credentials on login page
2. AuthContext.login() tries PHP endpoint first
3. Falls back to MOCK_USERS if API unavailable
4. On success: Sets user/token in state + localStorage
5. Redirects to `/enterprise` dashboard

### Role-Based Access Control (RBAC)
- ProtectRoute component checks user's role
- Enterprise layout filters modules by role
- Unauthorized access redirected to login
- Each module has its own access requirements

### State Management
- React Context (AuthContext) for global auth state
- localStorage for session persistence
- useRouter for navigation
- useAuth hook for accessing auth context anywhere

---

## Next Steps

### Phase 2: Build Task Management Module
- [ ] Task creation form
- [ ] Task listing with filtering
- [ ] Assign tasks to interns
- [ ] Status tracking

### Phase 3: Build Inventory Module
- [ ] Product catalog
- [ ] Stock management
- [ ] Inventory transactions

### Phase 4: Build Sales Module
- [ ] Customer management
- [ ] Sales orders
- [ ] Payment tracking

### Phase 5: Build POS Module
- [ ] Transaction interface
- [ ] Receipt generation
- [ ] Refund handling

### Phase 6: Build Reports Module
- [ ] Dashboard analytics
- [ ] Custom report builder
- [ ] Data visualization

### Phase 7: Build Intern Dashboard
- [ ] Intern roster
- [ ] Performance tracking
- [ ] Assignment management

---

## Quick Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run tests
npm test
```

Server runs at: `http://localhost:3000`
