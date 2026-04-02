# Database Migration Guide - Internship Management System

## Overview
This guide will help you migrate the new comprehensive database schema with all modules to your XAMPP MySQL installation.

## What's New

### Core Modules (Already Exist)
- ✓ Internship Positions
- ✓ Applications
- ✓ Reports
- ✓ Evaluations
- ✓ Program Plans

### New Modules Being Added
1. **Timesheet Tracking** - Daily/weekly logs, overtime, approvals
2. **Attendance Management** - Check-in/out, late tracking, leave requests
3. **Task Management** - Supervisor task assignments with tracking
4. **Product Management** - Inventory, stock, suppliers
5. **Sales Management** - Quotations, orders, customers, invoicing
6. **POS System** - Point of Sale transactions
7. **Intern-Specific Access** - Module visibility based on intern roles

## Step-by-Step Migration

### Option 1: PhpMyAdmin (Easiest)

1. **Open PhpMyAdmin**
   ```
   http://localhost/phpmyadmin
   ```

2. **Create shared_auth database** (if not exists)
   - Click "New" in left sidebar
   - Database name: `shared_auth`
   - Click Create

3. **Import shared auth schema**
   - Select `shared_auth` database
   - Go to "Import" tab
   - Click "Choose File"
   - Select: `database/shared_auth.sql`
   - Click "Go"

4. **Import internship system schema**
   - Select `internship_system` database
   - Go to "Import" tab
   - Click "Choose File"
   - Select: `database/comprehensive_schema.sql`
   - Click "Go"

5. **Verify**
   - You should see all new tables in the left sidebar
   - Check for: timesheets, attendance, tasks, products, sales_orders, pos_transactions, etc.

### Option 2: MySQL Command Line

```bash
# Login to MySQL
mysql -u root -p

# If you haven't set a password (default XAMPP):
mysql -u root

# Create and import shared_auth
mysql -u root < database/shared_auth.sql

# Import internship system comprehensive schema
mysql -u root internship_system < database/comprehensive_schema.sql

# Verify tables
mysql -u root -e "USE internship_system; SHOW TABLES;"
```

### Option 3: XAMPP Control Panel

1. Start Apache + MySQL in XAMPP Control Panel
2. Open PhpMyAdmin (Admin button next to MySQL)
3. Follow Option 1 steps

## Database Structure

### Databases Created
```
shared_auth/                 ← Central authentication
├── users                    ← All system users
├── user_roles              ← Per-system role assignments
├── user_permissions        ← Granular permissions
├── systems                 ← System definitions
├── auth_sessions           ← Login tokens
└── audit_log               ← Auth events

internship_system/          ← All operational modules
├── Core Tables
│   ├── internship_positions
│   ├── applications
│   ├── reports
│   ├── evaluations
│   ├── program_plans
│   ├── plan_milestones
│   └── plan_assignments
│
├── Timesheet Module
│   ├── timesheets          ← Daily work logs
│   └── timesheet_summaries ← Monthly summaries
│
├── Attendance Module
│   ├── attendance          ← Daily attendance
│   ├── leave_requests      ← Leave applications
│   └── attendance_summary  ← Monthly summaries
│
├── Task Management Module
│   ├── tasks               ← Supervisor tasks
│   ├── task_comments       ← Task discussions
│   └── task_checklist      ← Task items
│
├── Product Management
│   ├── products            ← Product catalog
│   ├── suppliers           ← Supplier info
│   └── inventory_transactions ← Stock movements
│
├── Sales Management
│   ├── customers           ← Customer database
│   ├── quotations          ← Price quotes
│   ├── quotation_items
│   ├── sales_orders        ← Orders
│   ├── order_items
│   ├── invoice_data        ← Invoices
│   ├── payments            ← Payment records
│   └── sales_targets       ← Sales targets & commissions
│
├── POS System
│   ├── pos_sessions        ← Cashier sessions
│   ├── pos_transactions    ← Sales transactions
│   ├── pos_transaction_items
│   └── pos_receipts        ← Receipt records
│
└── Intern Access Control
    ├── intern_module_visibility ← Module permissions
    └── intern_access_logs       ← Access tracking
```

## Sample User Roles & Access

### By Intern Type

**INTERN** (Basic Access)
- ✓ View own timesheet, submit logs
- ✓ Check attendance, check-in/out
- ✓ View assigned tasks, update status
- ✓ Submit weekly reports
- ✓ View own evaluations
- ✓ View assigned program plans

**SALES_INTERN** (Sales-Specific)
- ✓ All INTERN access
- ✓ View all products
- ✓ View assigned customers
- ✓ Create draft quotations
- ✓ View assigned sales orders

**WAREHOUSE_INTERN** (Operations-Specific)
- ✓ All INTERN access
- ✓ Manage product inventory
- ✓ Record inventory transactions
- ✓ View stock levels

**CASHIER_INTERN** (POS-Specific)
- ✓ All INTERN access
- ✓ Process sales transactions
- ✓ View POS transactions
- ✓ Search products

**HR_INTERN** (HR-Specific)
- ✓ All INTERN access
- ✓ View all timesheets (no approval)
- ✓ View all attendance records
- ✓ View leave requests

## Verification Checklist

After migration, verify:

- [ ] `shared_auth` database exists with users table
- [ ] `internship_system` database has all 30+ tables
- [ ] Sample data inserted (users, roles, permissions)
- [ ] Relationships intact (foreign keys)
- [ ] Indexes created for performance

Run this to verify:
```sql
USE internship_system;
SHOW TABLES;
-- Should show 30+ tables including:
-- timesheets, attendance, tasks, products, sales_orders, pos_transactions, etc.
```

## Password Reset (If Needed)

Default credentials after migration:
```
superadmin@example.com / (hash in DB)
admin.internship@example.com / (hash in DB)
```

Use the login page to authenticate - backend will handle validation.

## Next Steps

After migration:
1. ✓ Database ready
2. → Create PHP API endpoints for all modules
3. → Create React components and pages
4. → Integrate with dashboards by role
5. → Test intern access controls

## Troubleshooting

**Import fails with foreign key error:**
→ Make sure `internship_system` database exists first

**Tables not showing:**
→ Refresh browser (F5)
→ Clear browser cache

**Permission denied error:**
→ Check MySQL user permissions in XAMPP
→ Default: user=root, password=(empty)

**Port already in use:**
→ Change MySQL port in XAMPP settings to 3307
→ Update config files accordingly
