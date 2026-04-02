# Quick Start - Database Migration & API Setup

## 🚀 What Was Just Created

### Database Schema (Comprehensive)
- **File**: `database/comprehensive_schema.sql`
- **Tables**: 35+ tables with full relationships
- **Modules**:
  - Core Internship (existing tables)
  - Timesheet Tracking
  - Attendance Management
  - Task Management
  - Product Management
  - Sales Management (Quotations, Orders, Invoicing)
  - POS System
  - Intern Access Control

### API Endpoints (PHP)
- **Location**: `api/timesheet/manage.php`
- **Location**: `api/attendance/manage.php`
- **Location**: `api/tasks/manage.php`
- **Documentation**: `api/API_ENDPOINTS.php` (full endpoint specs)

### Documentation
- **File**: `MIGRATION_GUIDE.md` (complete setup instructions)
- **File**: `QUICK_START.md` (this file)

---

## 📋 Step 1: Migrate Databases (5 minutes)

### Using PhpMyAdmin (Easiest)

1. **Open**: `http://localhost/phpmyadmin`

2. **Import Shared Auth DB**:
   - Left sidebar → "New"
   - Database name: `shared_auth`
   - Collation: `utf8mb4_unicode_ci`
   - Click "Create"
   - Click "Import" tab
   - Select: `database/shared_auth.sql`
   - Click "Go"

3. **Import Internship System DB**:
   - Select `internship_system` from left sidebar
   - Click "Import" tab
   - Select: `database/comprehensive_schema.sql`
   - Click "Go"

4. **Verify**:
   ```sql
   USE internship_system;
   SHOW TABLES;
   -- Should show 35+ tables
   ```

### Using MySQL Command Line

```bash
# Login to MySQL
mysql -u root

# Import both databases
mysql -u root < database/shared_auth.sql
mysql -u root < database/comprehensive_schema.sql

# Verify
mysql -u root -e "USE internship_system; SHOW TABLES;" | wc -l
# Should show 36+ (including COUNT row)
```

---

## 🔑 Step 2: Test API Endpoints

After migration, test these endpoints using Postman/Thunder Client:

### Timesheet API
```bash
POST http://localhost:8000/api/timesheet/manage.php
Content-Type: application/json
Authorization: Bearer {token}

# Create timesheet
{
  "action": "create",
  "work_date": "2026-04-02",
  "check_in_time": "09:00:00",
  "check_out_time": "17:00:00",
  "hours_worked": 8
}

# List timesheets
{
  "action": "list"
}

# Submit for approval
{
  "action": "submit",
  "id": 1
}
```

### Attendance API
```bash
POST http://localhost:8000/api/attendance/manage.php

# Check in
{
  "action": "check-in",
  "location": "Office"
}

# Check out
{
  "action": "check-out"
}

# List attendance
{
  "action": "list"
}

# Request leave
{
  "action": "leave-request",
  "leave_type": "SICK",
  "start_date": "2026-04-05",
  "end_date": "2026-04-06",
  "reason": "Medical appointment"
}
```

### Tasks API
```bash
POST http://localhost:8000/api/tasks/manage.php

# Create task (supervisor only)
{
  "action": "create",
  "title": "Complete project documentation",
  "description": "Write comprehensive docs for Phase 5",
  "assigned_to": 5,
  "priority": "HIGH",
  "due_date": "2026-04-10",
  "estimated_hours": 8
}

# List my tasks
{
  "action": "list",
  "status": "TODO"
}

# Update status
{
  "action": "update",
  "id": 1,
  "status": "IN_PROGRESS",
  "completion_percentage": 50
}

# Add comment
{
  "action": "comment",
  "task_id": 1,
  "comment": "Started working on this task"
}
```

---

## 📚 Database Structure Overview

```
shared_auth (Authentication)
├── users
├── user_roles
├── user_permissions
├── auth_sessions
├── systems
└── audit_log

internship_system (All Operations)
├── Core
│   ├── internship_positions
│   ├── applications
│   ├── reports
│   ├── evaluations
│   ├── program_plans
│   └── plan_milestones
│
├── Timesheet & Attendance
│   ├── timesheets
│   ├── timesheet_summaries
│   ├── attendance
│   ├── leave_requests
│   └── attendance_summary
│
├── Tasks
│   ├── tasks
│   ├── task_comments
│   └── task_checklist
│
├── Products & Inventory
│   ├── products
│   ├── suppliers
│   └── inventory_transactions
│
├── Sales Management
│   ├── customers
│   ├── quotations
│   ├── quotation_items
│   ├── sales_orders
│   ├── order_items
│   ├── invoice_data
│   ├── payments
│   └── sales_targets
│
├── POS System
│   ├── pos_sessions
│   ├── pos_transactions
│   ├── pos_transaction_items
│   └── pos_receipts
│
└── Intern Access Control
    ├── intern_module_visibility
    └── intern_access_logs
```

---

## 👥 User Roles & Module Access

### All Interns
- ✓ Timesheet (submit own)
- ✓ Attendance (check-in/out)
- ✓ Tasks (view assigned)
- ✓ Reports (view own)
- ✓ Evaluations (view own)

### Sales Interns (Additional)
- ✓ View products
- ✓ View customers
- ✓ Create draft quotations

### Warehouse Interns (Additional)
- ✓ Manage inventory
- ✓ Record transactions

### Cashier Interns (Additional)
- ✓ Process POS sales
- ✓ View transactions

### HR Interns (Additional)
- ✓ View all timesheets
- ✓ View all attendance
- ✓ View leave requests

---

## 🔐 Sample Test Credentials

After migration, use these to test:

```
Email                      Role        System
─────────────────────────  ──────────  ──────────────
superadmin@example.com     SUPERADMIN  All Systems
admin.internship@example.com ADMIN     Internship
coordinator.hr@example.com  SUPERVISOR Internship
intern.sales@example.com    INTERN     Internship (Sales)
intern.warehouse@example.com INTERN    Internship (Warehouse)
```

---

## 🚨 Common Issues & Solutions

**Issue**: "Table already exists" error
**Solution**: Database already migrated - skip this step

**Issue**: "Foreign key constraint fails"
**Solution**:
- Make sure `internship_system` DB exists first
- Or temporarily disable FK checks:
  ```sql
  SET FOREIGN_KEY_CHECKS = 0;
  [Run migration]
  SET FOREIGN_KEY_CHECKS = 1;
  ```

**Issue**: "Access denied" for MySQL
**Solution**:
- XAMPP default: user=`root`, password=`(empty)`
- Update `api/config/Database.php` if different:
  ```php
  private $host = 'localhost';
  private $db = 'internship_system';
  private $user = 'root';      // Change if needed
  private $pass = '';           // Change if needed
  ```

---

## ✅ Next Steps

After successful migration:

1. **[x] Database Schema Created**
2. **[x] API Endpoints Documented**
3. **[ ] Test API endpoints with sample data**
4. **[ ] Create React components for modules**
5. **[ ] Integrate into role-specific dashboards**
6. **[ ] Set up intern access controls**

---

## 📞 Need Help?

Check:
- `MIGRATION_GUIDE.md` - Detailed step-by-step
- `api/API_ENDPOINTS.php` - Full endpoint specs
- `database/comprehensive_schema.sql` - Schema overview

**Files Created:**
- ✅ `database/shared_auth.sql` - Central auth DB
- ✅ `database/comprehensive_schema.sql` - All modules
- ✅ `api/timesheet/manage.php` - Timesheet API
- ✅ `api/attendance/manage.php` - Attendance API
- ✅ `api/tasks/manage.php` - Task API
- ✅ `MIGRATION_GUIDE.md` - Setup instructions
- ✅ `QUICK_START.md` - This file
