# Database Migration Checklist

## Current Status
```
✓ shared_auth database          - Shared authentication (created earlier)
✓ internship_system database    - Internship management (created earlier)
□ enterprise_system database    - Main system (READY TO CREATE)
  ├─ HR Management tables
  ├─ Task Management tables
  ├─ Product/Inventory tables
  ├─ Sales Management tables
  ├─ POS System tables
  └─ Reports & Analytics tables
```

---

## 3-Database Setup

### Database 1: shared_auth
**Status**: ✅ Already Created
**Purpose**: Central authentication for all systems
**Tables**: users, user_roles, user_permissions, auth_sessions, audit_log, systems

**To verify**:
```sql
SHOW TABLES IN shared_auth;
-- Should show 6 tables
```

### Database 2: internship_system
**Status**: ✅ Already Created
**Purpose**: Internship program management
**Tables**: Users, Positions, Applications, Programs, Milestones, Assignments, Reports, Evaluations

**To verify**:
```sql
SHOW TABLES IN internship_system;
-- Should show 8+ tables
```

### Database 3: enterprise_system
**Status**: 📋 READY TO CREATE
**Purpose**: Core business operations (HR, Tasks, Inventory, Sales, POS)
**Tables**: 30+ tables covering all modules

**File**: `database/enterprise_system.sql`

---

## Migration Instructions

### Step 1: Open phpMyAdmin
```
URL: http://localhost/phpmyadmin
```

### Step 2: Create enterprise_system Database
1. Go to **SQL** tab at top
2. Open file: `database/enterprise_system.sql`
3. Copy ALL content
4. Paste in phpMyAdmin SQL editor
5. Click **Go** button
6. Wait for completion (should see "X queries executed successfully")

### Step 3: Verify All Databases
**In phpMyAdmin left sidebar, you should now see:**
```
✓ shared_auth
✓ internship_system
✓ enterprise_system
```

### Step 4: Verify Tables in enterprise_system
```sql
-- Run in phpMyAdmin SQL tab with enterprise_system selected
SHOW TABLES;

-- Should display 30+ tables:
Departments, Employees, Timesheets, Attendance_logs, Leave_requests, Overtime_requests
Tasks, Task_comments, Task_history
Internship_positions, Applications, Internship_programs, Program_milestones, Program_assignments
Products, Product_categories, Inventory_movements, Inventory_adjustments
Customers, Quotations, Quotation_items, Sales_orders, Order_items, Payments
Pos_sessions, Pos_transactions, Pos_items, Pos_refunds
Sales_staff, Sales_commissions
Report_templates, Saved_reports
```

### Step 5: Quick Data Check
```sql
-- Verify sample data was inserted

-- Check departments
SELECT COUNT(*) as departments FROM departments;
-- Should show: 5

-- Check products
SELECT COUNT(*) as products FROM products;
-- Should show: 6

-- Check customers
SELECT COUNT(*) as customers FROM customers;
-- Should show: 4

-- Check product categories
SELECT COUNT(*) as categories FROM product_categories;
-- Should show: 5
```

---

## What Was Created

### HR Management
- **Departments**: 5 sample departments (IT, Marketing, Sales, Operations, HR)
- **Employees**: Table ready for employee data
- **Timesheet System**: Daily tracking with approval
- **Attendance**: Check-in/out with GPS location
- **Leave Management**: Multiple leave types with approval
- **Overtime**: Overtime request and tracking

### Task Management
- **Tasks**: Create and assign tasks to team members
- **Comments**: Collaborative discussion on tasks
- **History**: Audit trail of task changes

### Product Management
- **Products**: 6 sample products with categories
- **Categories**: 5 product categories
- **Inventory**: Movement and adjustment tracking
- **Stock Levels**: Reorder point management

### Sales Management
- **Customers**: 4 sample customers (corporate, retail, wholesale)
- **Quotations**: Sales quotation with line items
- **Orders**: Sales orders with fulfillment tracking
- **Payments**: Payment recording with multiple methods
- **Commissions**: Sales staff commission calculation

### POS System
- **Sessions**: Daily POS session (open/close)
- **Transactions**: Sales transactions
- **Items**: Transaction line items
- **Refunds**: Refund management

### Internship Integration
- **Reused from internship_system**:
  - Internship positions
  - Applications
  - Programs
  - Milestones
  - Assignments
  - Reports
  - Evaluations

---

## After Migration

### Next: Build the Modules

Choose which module to build first:

**Option A: Start with HR Module** (Foundational)
- Employee management
- Timesheet entry and approval
- Attendance tracking
- Leave management
- Estimated time: 2-3 days

**Option B: Start with Task Management** (Supervisors need this)
- Task creation and assignment
- Status and progress tracking
- Comments and collaboration
- Supervisor dashboard
- Estimated time: 2 days

**Option C: Start with Products & Inventory** (Support for Sales)
- Product management
- Stock tracking
- Inventory movements
- Low stock alerts
- Estimated time: 2 days

**Option D: Start with Sales & POS** (Revenue generating)
- Sales orders and quotations
- POS system
- Payment tracking
- Commission calculation
- Estimated time: 3-4 days

---

## Verification Queries

Paste these in phpMyAdmin SQL tab (with enterprise_system selected) to verify setup:

```sql
-- Count all tables
SELECT COUNT(*) as total_tables FROM information_schema.tables
WHERE table_schema = 'enterprise_system';

-- List all table names
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'enterprise_system'
ORDER BY table_name;

-- Check relationships (foreign keys)
SELECT constraint_name, table_name
FROM information_schema.key_column_usage
WHERE referenced_table_schema = 'enterprise_system'
ORDER BY table_name;
```

---

## Database Diagram

```
SHARED_AUTH (Central)
├── users
├── user_roles
├── user_permissions
├── auth_sessions
├── audit_log
└── systems

ENTERPRISE_SYSTEM
├── HR Module
│   ├── departments
│   ├── employees
│   ├── timesheets
│   ├── attendance_logs
│   ├── leave_requests
│   └── overtime_requests
│
├── TASK Module
│   ├── tasks
│   ├── task_comments
│   └── task_history
│
├── INVENTORY Module
│   ├── products
│   ├── product_categories
│   ├── inventory_movements
│   └── inventory_adjustments
│
├── SALES Module
│   ├── customers
│   ├── quotations
│   ├── quotation_items
│   ├── sales_orders
│   ├── order_items
│   ├── payments
│   ├── sales_staff
│   └── sales_commissions
│
└── POS Module
    ├── pos_sessions
    ├── pos_transactions
    ├── pos_items
    └── pos_refunds

INTERNSHIP_SYSTEM (Existing)
├── internship_positions
├── applications
├── internship_programs
├── program_milestones
├── program_assignments
├── internship_reports
└── evaluations
```

---

## Ready to Migrate?

**When you're ready:**

1. **Copy content from**: `database/enterprise_system.sql`
2. **Paste in phpMyAdmin SQL tab**
3. **Click Go**
4. **Wait for "X queries executed successfully"**
5. **Verify tables appear in sidebar**
6. **Reply with "Done" or any errors**

Then I can proceed to build the modules! 🚀
