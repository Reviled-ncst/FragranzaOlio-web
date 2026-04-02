# Multi-System Architecture Guide

## Overview
Unified authentication with separate databases per system. Users have different roles and permissions in each system.

---

## Database Structure

### 1. Shared Authentication Database: `shared_auth`
Central hub for authentication across all systems.

**Tables:**
- `users` - Unified user accounts (email, password, profile)
- `user_roles` - Role assignments per system (user can have different roles in different systems)
- `user_permissions` - Granular permissions per system
- `systems` - Registered systems metadata
- `auth_sessions` - Active login sessions/tokens with expiration
- `audit_log` - Security audit trail across all systems

**Sample Data:**
```
User: superadmin@example.com
├── Role in internship: SUPERADMIN
├── Role in fragranza: SUPERADMIN
└── Role in saas: SUPERADMIN

User: supervisor.it@example.com
├── Role in internship: SUPERVISOR
├── Permissions: evaluate_interns, submit_reports
└── No access to other systems
```

### 2. System-Specific Databases

#### Internship System: `internship_system`
- departments, positions, applications, reports, evaluations
- plans, plan_milestones, plan_assignments, milestone_progress
- **Roles**: SUPERADMIN, ADMIN, SUPERVISOR, INTERN
- **Permissions**: manage_applications, evaluate_interns, submit_reports, etc.

#### Fragranza System: `fragranza_system` (NEW)
- products, inventory, orders, customers, reviews
- payments, shipments, returns, coupons
- **Roles**: SUPERADMIN, ADMIN, MANAGER, STAFF, CUSTOMER
- **Permissions**: manage_products, manage_orders, view_analytics, place_orders, etc.

#### SaaS System: `saas_system` (Future)
- subscriptions, features, billing, usage, integrations
- **Roles**: SUPERADMIN, ADMIN, OWNER, USER, GUEST
- **Permissions**: manage_account, view_usage, manage_billing, etc.

---

## Login Flow (Multi-System)

```
1. User enters email, password, selects system
                    ↓
2. Frontend calls: POST /api/auth/login-multisystem.php
   { email, password, system: "internship" }
                    ↓
3. Backend checks shared_auth database:
   - Verify user exists & password correct
   - Get user roles for requested system
   - Get user permissions for system
   - Check if user has ANY role in that system
                    ↓
4. If authorized:
   - Create session token in auth_sessions
   - Log action to audit_log
   - Return: token + user data + roles + permissions
                    ↓
5. Frontend stores in localStorage:
   { token, user: { id, email, name, system, roles, permissions } }
                    ↓
6. User can now access system
   Next login attempts can specify different system!
```

---

## User Role Matrix

| User | System | Role | Permissions |
|------|--------|------|-------------|
| superadmin@example.com | internship | SUPERADMIN | manage_all |
| superadmin@example.com | fragranza | SUPERADMIN | manage_all |
| admin.internship@example.com | internship | ADMIN | manage_applications, manage_positions |
| supervisor.it@example.com | internship | SUPERVISOR | evaluate_interns, submit_reports |
| intern1@student.com | internship | INTERN | submit_reports |
| customer@fragranza.com | fragranza | CUSTOMER | view_products, place_orders |

---

## Implementation Steps

### Step 1: Create Shared Auth Database
**File**: `database/shared_auth.sql`
**Action**: Run in phpMyAdmin

```sql
CREATE DATABASE shared_auth;
-- [Run the shared_auth.sql script]
```

### Step 2: Update Login Endpoint
**File**: `api/auth/login-multisystem.php`
**Change**: Now queries `shared_auth` database and returns roles/permissions

### Step 3: Choose Auth Strategy

**Option A: Keep Current (EASIEST)**
- Keep using `app/context/AuthContext.tsx` (single system)
- Only update login endpoint to use shared_auth
- Good for immediate deployment

**Option B: Implement Multi-System (RECOMMENDED)**
- Use new `AuthContext-MultiSystem.tsx`
- Support system switching in UI
- Full multi-system capabilities
- More complex but future-proof

---

## SQL Migration Commands

```bash
# 1. Create shared auth database
mysql -u root shared_auth < database/shared_auth.sql

# 2. Create internship system (already exists, for reference)
mysql -u root internship_system < database/schema.sql
mysql -u root internship_system < database/migration_plans.sql

# 3. Create fragranza system (when ready)
mysql -u root fragranza_system < database/fragranza_schema.sql

# 4. Create saas system (future)
mysql -u root saas_system < database/saas_schema.sql
```

---

## File Structure

```
/database
  ├── shared_auth.sql          ✓ (NEW) Central auth schema
  ├── schema.sql               ✓ (Internship core)
  ├── migration_plans.sql      ✓ (Internship plans)
  ├── fragranza_schema.sql     □ (TO CREATE)
  └── saas_schema.sql          □ (Future)

/api/auth
  ├── login.php                ✓ (Old - single system)
  └── login-multisystem.php    ✓ (NEW - multi-system)

/app/context
  ├── AuthContext.tsx          ✓ (Current - works with new login)
  ├── ClientProviders.tsx      ✓ (Already created)
  └── AuthContext-MultiSystem.tsx ✓ (NEW - for full multi-system)

/app/internship             ✓ (Complete)
/app/fragranza              □ (Update for multi-system)
/app/saas                   □ (Future)
/app/account                ✓ (Already works with shared auth)
```

---

## Next Steps

### Immediate (Required)
1. **Create shared_auth database**
   - Run: `database/shared_auth.sql` in phpMyAdmin

2. **Update Internal Systems**
   - Current internship system already in place
   - Account system already works with shared auth

3. **Test Multi-System Login**
   - Try logging in with different users
   - Verify roles/permissions returned

### Early Phase
4. **Create Fragranza System Database**
   - Products, orders, customers, inventory
   - Payment processing
   - Review system

5. **Update Fragranza Components**
   - Connect to shared auth
   - Implement Fragranza-specific roles
   - Add e-commerce features

### Later Phase
6. **Build SaaS Database**
   - Subscription management
   - Feature flags
   - Usage tracking
   - Billing system

7. **Implement System Switcher UI**
   - Allow users to switch systems
   - Dashboard showing all accessible systems
   - Unified user menu across systems

---

## Admin Control Panel (Future)

```
/admin/systems
  ├── /users - Manage all users
  ├── /roles - Manage roles per system
  ├── /permissions - Manage permissions
  ├── /audit - View security audit log
  └── /integration - Connect systems
```

---

## Security Considerations

✓ Token-based authentication (JWT could replace tokens)
✓ Session tracking with IP/user-agent
✓ Audit logging for compliance
✓ Permission-based access control (PBAC)
✓ Cross-system audit trail
✓ Rate limiting on login (TODO)
✓ 2FA support (TODO)
✓ OAuth integration (TODO)

---

## Summary

This architecture provides:
- ✅ **Unified Authentication** - One login for all systems
- ✅ **Flexible Roles** - Different roles per system
- ✅ **Granular Permissions** - Fine-grained access control
- ✅ **Audit Trail** - Security & compliance
- ✅ **Scalability** - Easy to add new systems
- ✅ **Separation of Data** - Each system has own database
- ✅ **User Management** - Central admin control
