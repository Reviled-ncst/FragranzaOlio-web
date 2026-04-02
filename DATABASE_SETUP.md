# Database Setup Instructions

## Overview
This project uses a **multi-database architecture** with 3 separate databases:

1. **shared_auth** - Centralized authentication system (users, roles, permissions)
2. **enterprise_system** - Main business system (HR, Tasks, Inventory, Sales, POS, Reports)
3. **internship_system** (Optional) - Internship-specific tables (positions, applications, etc.)

## Prerequisites
- XAMPP with MySQL running on localhost:3306
- MySQL credentials: root (username), no password (default)
- PhpMyAdmin access at http://localhost/phpmyadmin

## Setup Steps

### Step 1: Create shared_auth Database
This is the **authentication hub** - MUST be created first.

1. Open PhpMyAdmin: http://localhost/phpmyadmin
2. Click on "Import" tab
3. Select file: `database/shared_auth.sql`
4. Click "Go" to execute

**What's created:**
- `users` table - All system users
- `user_roles` table - Role assignments (SUPERADMIN, ADMIN, SUPERVISOR, INTERN)
- `user_permissions` table - Permission tracking
- `auth_sessions` table - Login sessions
- `systems` table - Multi-system registry

---

### Step 2: Create enterprise_system Database
This is the **main business system** with all operational modules.

1. In PhpMyAdmin, click "Import" tab
2. Select file: `database/enterprise_system.sql`
3. Click "Go" to execute

**What's created:**
- HR Module: departments, employees, timesheets, attendance_logs, leave_requests, overtime_requests
- Tasks Module: tasks, task_comments, task_history
- Inventory Module: products, product_categories, inventory_movements, inventory_adjustments
- Sales Module: customers, quotations, sales_orders, payments, sales_staff, sales_commissions
- POS Module: pos_sessions, pos_transactions, pos_refunds
- Reports Module: report_templates, saved_reports
- All tables include intern support (is_intern flags, intern_id foreign keys)

---

### Step 3: Create internship_system Database (Optional)
This adds internship-specific functionality.

1. In PhpMyAdmin, click "Import" tab
2. Select file: `database/comprehensive_schema.sql`
3. Click "Go" to execute

**What's created:**
- `internship_positions` - Job positions for internships
- `internship_applications` - Intern applications
- `internship_programs` - Program definitions
- `internship_assignments` - Intern-to-program assignments

---

### Step 4: Create Internship Plans (Optional)
Adds internship program planning features.

1. In PhpMyAdmin, click "Import" tab
2. Select file: `database/migration_plans.sql`
3. Click "Go" to execute

**What's created:**
- `plans` - Internship program plans
- `plan_milestones` - Weekly breakdown of activities
- `plan_assignments` - Assign interns to plans
- `milestone_progress` - Track completion

---

## Verification

### Verify All Databases Created
In PhpMyAdmin left sidebar, you should see:
```
+ shared_auth
+ enterprise_system
+ internship_system (if created)
```

### Verify Tables in enterprise_system
Expand `enterprise_system` and verify these table groups exist:

**HR Tables:**
- departments
- employees
- timesheets
- attendance_logs
- leave_requests
- overtime_requests

**Task Tables:**
- tasks
- task_comments
- task_history

**Inventory Tables:**
- products
- product_categories
- inventory_movements
- inventory_adjustments

**Sales Tables:**
- customers
- quotations
- quotation_items
- sales_orders
- order_items
- payments
- sales_staff
- sales_commissions

**POS Tables:**
- pos_sessions
- pos_transactions
- pos_items
- pos_refunds

**Reports Tables:**
- report_templates
- saved_reports

### Check Sample Data
Run this query in PhpMyAdmin to verify data was inserted:

**In shared_auth:**
```sql
SELECT COUNT(*) as user_count FROM users;
-- Should return: 5 (superadmin, admin, supervisor, intern, customer)
```

**In enterprise_system:**
```sql
SELECT COUNT(*) as employee_count FROM employees;
-- Should return: 5-6
SELECT COUNT(*) as product_count FROM products;
-- Should return: 6
```

---

## Connection Details for Application

Your Next.js app connects to these databases via PHP API endpoints:

```
MySQL Host: localhost
MySQL Port: 3306
MySQL User: root
MySQL Password: (none/empty)

API Base URL: http://localhost/internship-system/api

Endpoints Pattern:
- GET /api/hr/employees
- POST /api/hr/timesheets
- GET /api/tasks
- GET /api/products
- POST /api/sales/orders
- POST /api/pos/transactions
```

---

## Troubleshooting

### Error: "Unknown database 'shared_auth'"
- Solution: Run `database/shared_auth.sql` FIRST
- This is the parent database that other systems reference

### Error: "Unknown database 'enterprise_system'"
- Solution: Run `database/enterprise_system.sql` AFTER shared_auth
- Make sure shared_auth was created successfully first

### Error: "Table doesn't exist"
- Solution: Check the database was fully imported
- In PhpMyAdmin, expand the database and verify tables exist
- Count should match ~30 tables in enterprise_system

### No sample data showing
- Solution: The SQL files include INSERT statements for sample data
- If no rows appear, verify the import completed (check for success message)
- You can manually insert sample data if needed

---

## Database Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     AUTHENTICATION                          │
│                    (shared_auth DB)                         │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐ │
│  │ users        │  │ user_roles   │  │ user_permissions │ │
│  └──────────────┘  └──────────────┘  └──────────────────┘ │
│  ┌──────────────┐  ┌──────────────┐                       │
│  │ auth_sessions│  │ systems      │                       │
│  └──────────────┘  └──────────────┘                       │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                      ENTERPRISE SYSTEM                      │
│                  (enterprise_system DB)                     │
│                                                             │
│  ┌────────────┐  ┌────────────┐  ┌─────────────────────┐  │
│  │ HR MODULE  │  │ TASK MODULE│  │ INVENTORY MODULE    │  │
│  ├─employees  │  ├─tasks      │  ├─products            │  │
│  ├─timesheets │  ├─task_*     │  ├─inventory_*         │  │
│  ├─attendance │  └────────────┘  └─────────────────────┘  │
│  │            │                                            │
│  └────────────┘                                            │
│                                                             │
│  ┌────────────┐  ┌────────────┐  ┌─────────────────────┐  │
│  │ SALES      │  │ POS MODULE │  │ REPORTS MODULE      │  │
│  ├─customers  │  ├─pos_*      │  ├─report_templates    │  │
│  ├─quotations │  └────────────┘  └─────────────────────┘  │
│  ├─orders     │                                            │
│  │            │                                            │
│  └────────────┘                                            │
│                                                             │
│ ALL TABLES have intern support (is_intern flags)          │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│              INTERNSHIP SYSTEM (Optional)                   │
│                (internship_system DB)                       │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐ │
│  │ positions    │  │ applications │  │ programs         │ │
│  └──────────────┘  └──────────────┘  └──────────────────┘ │
│  ┌──────────────┐                                          │
│  │ assignments  │                                          │
│  └──────────────┘                                          │
└─────────────────────────────────────────────────────────────┘
```

---

## Next Steps After Database Setup

Once all databases are created and verified:

1. **Test API Endpoints** - Try accessing http://localhost/internship-system/api/auth/login.php
2. **Login to Dashboard** - Use credentials from sample data
3. **Run Next.js Dev Server** - `npm run dev` at http://localhost:3000
4. **Test the Application** - Navigate through HR, Tasks, Sales, and other modules

---

## Database Backup

To backup your databases in PhpMyAdmin:

1. Select database (e.g., `enterprise_system`)
2. Click "Export" tab
3. Choose format: SQL
4. Click "Go" to download

To restore:
1. Click "Import" tab
2. Select the backup SQL file
3. Click "Go"

---

## Admin Credentials (from sample data)

**Login:**
- Email: admin@company.com
- Password: admin123
- Role: ADMIN
- Access: All modules

**Alternative Users:**
- Supervisor: supervisor@company.com / supervisor123
- Intern: intern@university.edu / intern123

---

## Support

If you encounter issues:
1. Check error message matches a troubleshooting section above
2. Verify all prerequisites are met (XAMPP running, MySQL active)
3. Ensure you're running SQL files in the correct order (shared_auth → enterprise_system)
4. Check that PhpMyAdmin shows the database was created (check table count)
