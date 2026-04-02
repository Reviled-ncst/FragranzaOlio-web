# Database Verification Checklist

## Quick Verification in PhpMyAdmin

Run these SQL queries in PhpMyAdmin to verify your databases are set up correctly.

### Query 1: Check if all databases exist
```sql
SHOW DATABASES LIKE 'shared_auth' OR SHOW DATABASES LIKE 'enterprise_system' OR SHOW DATABASES LIKE 'internship_system';
```

**Expected Result:** Should show:
- shared_auth
- enterprise_system
- (internship_system - optional, only if you created it)

---

### Query 2: Count tables in shared_auth
```sql
USE shared_auth;
SHOW TABLES;
```

**Expected Tables (minimum 5):**
- users ✓
- user_roles ✓
- user_permissions ✓
- auth_sessions ✓
- systems ✓

**Verify:** Run this count query:
```sql
SELECT COUNT(*) as table_count FROM information_schema.tables WHERE table_schema = 'shared_auth';
```

**Expected:** Should return `5` (or more if additional tables were added)

---

### Query 3: Count tables in enterprise_system
```sql
USE enterprise_system;
SHOW TABLES;
```

**Expected Tables (30+ tables across 6 modules):**

**HR Module:**
- departments ✓
- employees ✓
- timesheets ✓
- attendance_logs ✓
- leave_requests ✓
- overtime_requests ✓

**Task Module:**
- tasks ✓
- task_comments ✓
- task_history ✓

**Inventory Module:**
- products ✓
- product_categories ✓
- inventory_movements ✓
- inventory_adjustments ✓

**Sales Module:**
- customers ✓
- quotations ✓
- quotation_items ✓
- sales_orders ✓
- order_items ✓
- payments ✓
- sales_staff ✓
- sales_commissions ✓

**POS Module:**
- pos_sessions ✓
- pos_transactions ✓
- pos_items ✓
- pos_refunds ✓

**Reports Module:**
- report_templates ✓
- saved_reports ✓

**Verify:** Run this count query:
```sql
SELECT COUNT(*) as table_count FROM information_schema.tables WHERE table_schema = 'enterprise_system';
```

**Expected:** Should return `30` or more

---

### Query 4: Verify sample data in shared_auth
```sql
USE shared_auth;
SELECT COUNT(*) as user_count FROM users;
```

**Expected:** Should return `5+` (superadmin, admin, supervisor, intern, customer)

**Check user roles:**
```sql
SELECT id, email, role FROM users LIMIT 5;
```

**Expected Output:**
```
id  | email                    | role
----|--------------------------|----------
1   | superadmin@company.com   | SUPERADMIN
2   | admin@company.com        | ADMIN
3   | supervisor@company.com   | SUPERVISOR
4   | intern@university.edu    | INTERN
5   | customer@email.com       | (N/A)
```

---

### Query 5: Verify sample data in enterprise_system
```sql
USE enterprise_system;

-- Check departments
SELECT COUNT(*) as dept_count FROM departments;

-- Check employees
SELECT COUNT(*) as emp_count FROM employees;

-- Check products
SELECT COUNT(*) as prod_count FROM products;
```

**Expected:**
- Departments: 5+
- Employees: 5+
- Products: 6+

---

### Query 6: Verify Intern Integration
```sql
USE enterprise_system;

-- Check if timesheets has intern support
SHOW COLUMNS FROM timesheets LIKE 'is_intern';

-- Check if tasks has intern fields
SHOW COLUMNS FROM tasks LIKE 'assigned_to_intern_id';

-- Check if employees has intern flag
SHOW COLUMNS FROM employees LIKE 'is_intern';
```

**Expected:** Each query should return at least one row showing the column exists

---

## Step-by-Step Verification Process

### Step 1: Verify shared_auth database
1. Open PhpMyAdmin: http://localhost/phpmyadmin
2. In the left sidebar, look for `shared_auth` database
3. Click to expand it
4. Count the visible tables - should see 5 tables minimum
5. Run the count query above to confirm

### Step 2: Verify enterprise_system database
1. In the left sidebar, look for `enterprise_system` database
2. Click to expand it
3. Count visible tables - should see 30+ tables
4. Verify the 6 modules have their tables (HR, Tasks, Inventory, Sales, POS, Reports)

### Step 3: Check sample data loads correctly
1. Go to shared_auth → users table
2. Click "Browse"
3. Verify at least 5 users exist with different roles

### Step 4: Verify internship_system (if created)
1. Look for `internship_system` database in left sidebar
2. If it exists, expand and verify these tables:
   - internship_positions
   - applications
   - program_plans
   - plan_milestones
   - plan_assignments
   - intern_access_logs
   - intern_module_visibility

---

## Troubleshooting

### Problem: Database doesn't exist
**Solution:** Re-run the SQL import for that database in PhpMyAdmin

### Problem: Some tables are missing
**Solution:**
1. Check for SQL errors in the import output
2. Expand the database and verify table count
3. Re-import the SQL file to add missing tables

### Problem: No sample data showing
**Solution:**
1. Check if the SQL file has INSERT statements
2. Run: `SELECT COUNT(*) FROM table_name;`
3. If count is 0, manually insert sample data or re-import

### Problem: Foreign key constraint errors
**Solution:**
- This is expected with cross-database FKs
- We use INDEX instead of FOREIGN KEY for cross-database references
- Application logic handles relationships instead

---

## What to Do Next After Verification

Once all databases are verified:

1. **Create PHP API endpoints** - Add authentication and CRUD endpoints
2. **Start Next.js dev server** - `npm run dev`
3. **Test the application** - Login with sample credentials
4. **Verify module access** - Check HR, Tasks, Sales, POS modules

---

## Sample Login Credentials

After databases are created:

### Admin Account
- Email: `admin@company.com`
- Password: `admin123`
- Role: ADMIN
- Access: All modules

### Supervisor Account
- Email: `supervisor@company.com`
- Password: `supervisor123`
- Role: SUPERVISOR
- Access: HR, Tasks, limited Sales

### Intern Account
- Email: `intern@university.edu`
- Password: `intern123`
- Role: INTERN
- Access: Own profile, assigned tasks, timesheet submission

---

## Quick Verification Script

You can also run this single SQL query to get a complete verification report:

```sql
SELECT
    SCHEMA_NAME as 'Database Name',
    COUNT(*) as 'Table Count',
    CONCAT(ROUND(SUM(DATA_LENGTH + INDEX_LENGTH) / 1024 / 1024, 2), ' MB') as 'Size'
FROM information_schema.TABLES
WHERE SCHEMA_NAME IN ('shared_auth', 'enterprise_system', 'internship_system')
GROUP BY SCHEMA_NAME
ORDER BY SCHEMA_NAME;
```

This will show you:
- All databases that exist
- Number of tables in each
- Total size of each database

---
