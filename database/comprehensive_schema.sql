-- Internship Management System - Comprehensive Database
-- Includes: Positions, Applications, Timesheet, Attendance, Tasks, Products, Sales, POS
-- Date: April 2026
-- Note: Run shared_auth.sql FIRST, then this file

CREATE DATABASE IF NOT EXISTS internship_system;
USE internship_system;

-- ============================================
-- CORE INTERNSHIP TABLES (Already exist)
-- ============================================

-- Position Management
CREATE TABLE IF NOT EXISTS internship_positions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(150) NOT NULL,
  department VARCHAR(100) NOT NULL,
  description TEXT,
  requirements TEXT,
  duration_weeks INT,
  stipend_min DECIMAL(10, 2),
  stipend_max DECIMAL(10, 2),
  supervisor_id INT,
  status ENUM('ACTIVE', 'CLOSED', 'DRAFT') DEFAULT 'ACTIVE',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_supervisor (supervisor_id)
);

-- Applications
CREATE TABLE IF NOT EXISTS applications (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  position_id INT NOT NULL,
  status ENUM('PENDING', 'APPROVED', 'REJECTED', 'WITHDRAWN') DEFAULT 'PENDING',
  applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  reviewed_at TIMESTAMP NULL,
  reviewed_by INT,
  FOREIGN KEY (position_id) REFERENCES internship_positions(id),
  INDEX idx_user (user_id),
  INDEX idx_reviewed_by (reviewed_by)
);

-- Reports
CREATE TABLE IF NOT EXISTS reports (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  supervisor_id INT,
  week_number INT,
  content TEXT,
  submitted_at TIMESTAMP,
  reviewed_at TIMESTAMP NULL,
  status ENUM('DRAFT', 'SUBMITTED', 'APPROVED', 'REJECTED') DEFAULT 'DRAFT',
  INDEX idx_user (user_id),
  INDEX idx_supervisor (supervisor_id)
);

-- Evaluations
CREATE TABLE IF NOT EXISTS evaluations (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  supervisor_id INT NOT NULL,
  rating DECIMAL(3, 2),
  comments TEXT,
  evaluated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_user (user_id),
  INDEX idx_supervisor (supervisor_id)
);

-- Program Plans
CREATE TABLE IF NOT EXISTS program_plans (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  department VARCHAR(100),
  duration_weeks INT,
  mentor_id INT,
  status ENUM('ACTIVE', 'DRAFT', 'ARCHIVED') DEFAULT 'ACTIVE',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_mentor (mentor_id)
);

CREATE TABLE IF NOT EXISTS plan_milestones (
  id INT PRIMARY KEY AUTO_INCREMENT,
  plan_id INT NOT NULL,
  week_number INT,
  title VARCHAR(200),
  description TEXT,
  deliverables TEXT,
  FOREIGN KEY (plan_id) REFERENCES program_plans(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS plan_assignments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  plan_id INT NOT NULL,
  user_id INT NOT NULL,
  assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  assigned_by INT,
  status ENUM('ACTIVE', 'COMPLETED', 'PAUSED') DEFAULT 'ACTIVE',
  FOREIGN KEY (plan_id) REFERENCES program_plans(id),
  INDEX idx_user (user_id),
  INDEX idx_assigned_by (assigned_by)
);

-- ============================================
-- TIMESHEET MODULE (NEW)
-- ============================================

CREATE TABLE IF NOT EXISTS timesheets (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  supervisor_id INT,
  work_date DATE NOT NULL,
  check_in_time TIME,
  check_out_time TIME,
  hours_worked DECIMAL(5, 2),
  overtime_hours DECIMAL(5, 2) DEFAULT 0,
  break_duration INT DEFAULT 0,
  status ENUM('PENDING', 'SUBMITTED', 'APPROVED', 'REJECTED') DEFAULT 'PENDING',
  notes TEXT,
  submitted_at TIMESTAMP NULL,
  approved_at TIMESTAMP NULL,
  approved_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_user_date (user_id, work_date),
  INDEX idx_status (status),
  INDEX idx_supervisor (supervisor_id),
  INDEX idx_approved_by (approved_by)
);

CREATE TABLE IF NOT EXISTS timesheet_summaries (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  year INT,
  month INT,
  total_hours DECIMAL(7, 2),
  overtime_hours DECIMAL(7, 2),
  days_worked INT,
  submitted_at TIMESTAMP NULL,
  approved_at TIMESTAMP NULL,
  status ENUM('PENDING', 'SUBMITTED', 'APPROVED') DEFAULT 'PENDING',
  INDEX idx_user (user_id),
  UNIQUE KEY unique_user_month (user_id, year, month)
);

-- ============================================
-- ATTENDANCE MODULE (NEW)
-- ============================================

CREATE TABLE IF NOT EXISTS attendance (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  attendance_date DATE NOT NULL,
  check_in_time TIME,
  check_out_time TIME,
  status ENUM('PRESENT', 'ABSENT', 'LATE', 'EARLY_LEAVE', 'ON_LEAVE') DEFAULT 'PRESENT',
  is_late BOOLEAN DEFAULT 0,
  minutes_late INT DEFAULT 0,
  leave_type VARCHAR(50),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_user_date (user_id, attendance_date)
);

CREATE TABLE IF NOT EXISTS leave_requests (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  leave_type ENUM('SICK', 'CASUAL', 'EMERGENCY', 'STUDY', 'OTHER') NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  reason TEXT,
  attachment_url VARCHAR(255),
  status ENUM('PENDING', 'APPROVED', 'REJECTED') DEFAULT 'PENDING',
  approved_by INT,
  approved_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_user (user_id),
  INDEX idx_approved_by (approved_by)
);

CREATE TABLE IF NOT EXISTS attendance_summary (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  year INT,
  month INT,
  total_present INT DEFAULT 0,
  total_absent INT DEFAULT 0,
  total_late INT DEFAULT 0,
  total_leave INT DEFAULT 0,
  attendance_percentage DECIMAL(5, 2),
  INDEX idx_user (user_id),
  UNIQUE KEY unique_user_month (user_id, year, month)
);

-- ============================================
-- TASK MANAGEMENT MODULE (NEW)
-- ============================================

CREATE TABLE IF NOT EXISTS tasks (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  assigned_by INT NOT NULL,
  assigned_to INT NOT NULL,
  priority ENUM('LOW', 'MEDIUM', 'HIGH', 'URGENT') DEFAULT 'MEDIUM',
  status ENUM('TODO', 'IN_PROGRESS', 'REVIEW', 'COMPLETED', 'BLOCKED') DEFAULT 'TODO',
  start_date DATE,
  due_date DATE NOT NULL,
  estimated_hours DECIMAL(5, 2),
  actual_hours DECIMAL(5, 2),
  completion_percentage INT DEFAULT 0,
  category VARCHAR(100),
  tags JSON,
  attachments JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_assigned_to (assigned_to),
  INDEX idx_assigned_by (assigned_by),
  INDEX idx_status (status),
  INDEX idx_due_date (due_date)
);

CREATE TABLE IF NOT EXISTS task_comments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  task_id INT NOT NULL,
  user_id INT NOT NULL,
  comment TEXT NOT NULL,
  attachments JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE,
  INDEX idx_user (user_id)
);

CREATE TABLE IF NOT EXISTS task_checklist (
  id INT PRIMARY KEY AUTO_INCREMENT,
  task_id INT NOT NULL,
  item TEXT NOT NULL,
  is_completed BOOLEAN DEFAULT 0,
  completed_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE
);

-- ============================================
-- PRODUCT MANAGEMENT MODULE (NEW)
-- ============================================

CREATE TABLE IF NOT EXISTS products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  sku VARCHAR(100) NOT NULL UNIQUE,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  subcategory VARCHAR(100),
  unit_price DECIMAL(10, 2) NOT NULL,
  cost_price DECIMAL(10, 2),
  quantity_in_stock INT DEFAULT 0,
  reorder_level INT DEFAULT 10,
  supplier_id INT,
  image_url VARCHAR(255),
  barcode VARCHAR(100),
  weight DECIMAL(8, 3),
  dimensions VARCHAR(100),
  status ENUM('ACTIVE', 'INACTIVE', 'DISCONTINUED') DEFAULT 'ACTIVE',
  created_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (supplier_id) REFERENCES suppliers(id),
  INDEX idx_created_by (created_by),
  INDEX idx_sku (sku),
  INDEX idx_category (category),
  INDEX idx_status (status)
);

CREATE TABLE IF NOT EXISTS inventory_transactions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  product_id INT NOT NULL,
  transaction_type ENUM('PURCHASE', 'SALE', 'RETURN', 'ADJUSTMENT', 'DAMAGE') NOT NULL,
  quantity INT NOT NULL,
  unit_price DECIMAL(10, 2),
  reference_id INT,
  reference_type VARCHAR(50),
  notes TEXT,
  recorded_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id),
  INDEX idx_product (product_id),
  INDEX idx_recorded_by (recorded_by),
  INDEX idx_created (created_at)
);

CREATE TABLE IF NOT EXISTS suppliers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(200) NOT NULL,
  contact_person VARCHAR(150),
  email VARCHAR(100),
  phone VARCHAR(20),
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(100),
  country VARCHAR(100),
  created_by INT,
  payment_terms VARCHAR(100),
  tax_id VARCHAR(50),
  status ENUM('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_created_by (created_by)
);

-- ============================================
-- SALES MANAGEMENT MODULE (NEW)
-- ============================================

CREATE TABLE IF NOT EXISTS customers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(100) UNIQUE,
  phone VARCHAR(20),
  customer_type ENUM('RETAIL', 'WHOLESALE', 'CORPORATE') DEFAULT 'RETAIL',
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(100),
  country VARCHAR(100),
  tax_id VARCHAR(50),
  credit_limit DECIMAL(12, 2),
  credit_used DECIMAL(12, 2) DEFAULT 0,
  contact_person VARCHAR(150),
  tags JSON,
  status ENUM('ACTIVE', 'INACTIVE', 'BLOCKED') DEFAULT 'ACTIVE',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_status (status)
);

CREATE TABLE IF NOT EXISTS quotations (
  id INT PRIMARY KEY AUTO_INCREMENT,
  quotation_number VARCHAR(50) NOT NULL UNIQUE,
  customer_id INT NOT NULL,
  created_by INT NOT NULL,
  quotation_date DATE,
  valid_until DATE,
  subtotal DECIMAL(12, 2),
  tax_amount DECIMAL(12, 2),
  discount_amount DECIMAL(12, 2),
  total_amount DECIMAL(12, 2),
  status ENUM('DRAFT', 'SENT', 'ACCEPTED', 'REJECTED', 'EXPIRED') DEFAULT 'DRAFT',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES customers(id),
  INDEX idx_created_by (created_by),
  INDEX idx_number (quotation_number),
  INDEX idx_status (status)
);

CREATE TABLE IF NOT EXISTS quotation_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  quotation_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  unit_price DECIMAL(10, 2),
  discount_percent DECIMAL(5, 2) DEFAULT 0,
  tax_percent DECIMAL(5, 2),
  line_total DECIMAL(12, 2),
  FOREIGN KEY (quotation_id) REFERENCES quotations(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE IF NOT EXISTS sales_orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_number VARCHAR(50) NOT NULL UNIQUE,
  customer_id INT NOT NULL,
  created_by INT NOT NULL,
  quotation_id INT,
  order_date DATE,
  delivery_date DATE,
  subtotal DECIMAL(12, 2),
  tax_amount DECIMAL(12, 2),
  shipping_cost DECIMAL(10, 2),
  discount_amount DECIMAL(12, 2),
  total_amount DECIMAL(12, 2),
  payment_status ENUM('UNPAID', 'PARTIAL', 'PAID') DEFAULT 'UNPAID',
  order_status ENUM('PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED') DEFAULT 'PENDING',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES customers(id),
  FOREIGN KEY (quotation_id) REFERENCES quotations(id),
  INDEX idx_created_by (created_by),
  INDEX idx_number (order_number),
  INDEX idx_status (order_status),
  INDEX idx_payment (payment_status)
);

CREATE TABLE IF NOT EXISTS order_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  unit_price DECIMAL(10, 2),
  discount_percent DECIMAL(5, 2) DEFAULT 0,
  tax_percent DECIMAL(5, 2),
  line_total DECIMAL(12, 2),
  FOREIGN KEY (order_id) REFERENCES sales_orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE IF NOT EXISTS invoice_data (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT NOT NULL UNIQUE,
  invoice_number VARCHAR(50) NOT NULL UNIQUE,
  invoice_date DATE,
  due_date DATE,
  payment_terms VARCHAR(100),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES sales_orders(id)
);

CREATE TABLE IF NOT EXISTS payments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  invoice_id INT,
  order_id INT,
  payment_date DATE,
  amount DECIMAL(12, 2),
  payment_method ENUM('CASH', 'CHECK', 'BANK_TRANSFER', 'CREDIT_CARD', 'OTHER') DEFAULT 'CASH',
  reference_number VARCHAR(100),
  notes TEXT,
  recorded_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (invoice_id) REFERENCES invoice_data(id),
  FOREIGN KEY (order_id) REFERENCES sales_orders(id),
  INDEX idx_recorded_by (recorded_by)
);

CREATE TABLE IF NOT EXISTS sales_targets (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  year INT,
  month INT,
  target_amount DECIMAL(12, 2),
  commission_percent DECIMAL(5, 2),
  achieved_amount DECIMAL(12, 2) DEFAULT 0,
  commission_earned DECIMAL(12, 2) DEFAULT 0,
  status ENUM('PENDING', 'ACHIEVED', 'MISSED') DEFAULT 'PENDING',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_user (user_id),
  UNIQUE KEY unique_user_month (user_id, year, month)
);

-- ============================================
-- POS SYSTEM MODULE (NEW)
-- ============================================

CREATE TABLE IF NOT EXISTS pos_sessions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  cashier_id INT NOT NULL,
  session_start TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  session_end TIMESTAMP NULL,
  opening_balance DECIMAL(12, 2),
  closing_balance DECIMAL(12, 2),
  total_sales DECIMAL(12, 2),
  total_refunds DECIMAL(12, 2),
  status ENUM('OPEN', 'CLOSED') DEFAULT 'OPEN',
  INDEX idx_cashier (cashier_id),
  INDEX idx_status (status)
);

CREATE TABLE IF NOT EXISTS pos_transactions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  session_id INT NOT NULL,
  customer_id INT,
  transaction_type ENUM('SALE', 'REFUND', 'EXCHANGE') DEFAULT 'SALE',
  transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  subtotal DECIMAL(12, 2),
  tax_amount DECIMAL(12, 2),
  discount_amount DECIMAL(12, 2),
  total_amount DECIMAL(12, 2),
  payment_method ENUM('CASH', 'CARD', 'CHEQUE', 'DIGITAL_WALLET') DEFAULT 'CASH',
  amount_paid DECIMAL(12, 2),
  change_amount DECIMAL(12, 2),
  status ENUM('COMPLETED', 'PENDING', 'CANCELLED') DEFAULT 'COMPLETED',
  reference_number VARCHAR(100),
  notes TEXT,
  FOREIGN KEY (session_id) REFERENCES pos_sessions(id),
  FOREIGN KEY (customer_id) REFERENCES customers(id),
  INDEX idx_session (session_id),
  INDEX idx_date (transaction_date)
);

CREATE TABLE IF NOT EXISTS pos_transaction_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  transaction_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  unit_price DECIMAL(10, 2),
  discount_percent DECIMAL(5, 2) DEFAULT 0,
  tax_percent DECIMAL(5, 2),
  line_total DECIMAL(12, 2),
  FOREIGN KEY (transaction_id) REFERENCES pos_transactions(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE IF NOT EXISTS pos_receipts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  transaction_id INT NOT NULL UNIQUE,
  receipt_number VARCHAR(50) NOT NULL UNIQUE,
  receipt_date TIMESTAMP,
  receipt_html TEXT,
  is_printed BOOLEAN DEFAULT 0,
  is_emailed BOOLEAN DEFAULT 0,
  customer_email VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (transaction_id) REFERENCES pos_transactions(id)
);

-- ============================================
-- REPORTS & ANALYTICS TABLES (NEW)
-- ============================================

CREATE TABLE IF NOT EXISTS daily_reports (
  id INT PRIMARY KEY AUTO_INCREMENT,
  report_date DATE,
  total_sales DECIMAL(12, 2),
  total_refunds DECIMAL(12, 2),
  net_sales DECIMAL(12, 2),
  total_transactions INT,
  total_customers INT,
  top_product_id INT,
  total_inventory_value DECIMAL(12, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (top_product_id) REFERENCES products(id)
);

CREATE TABLE IF NOT EXISTS monthly_reports (
  id INT PRIMARY KEY AUTO_INCREMENT,
  report_year INT,
  report_month INT,
  total_sales DECIMAL(12, 2),
  total_expenses DECIMAL(12, 2),
  profit DECIMAL(12, 2),
  total_transactions INT,
  total_customers INT,
  repeat_customers INT,
  top_seller_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_top_seller (top_seller_id)
);

-- ============================================
-- INTERN-SPECIFIC VISIBILITY MODULE (NEW)
-- ============================================

CREATE TABLE IF NOT EXISTS intern_access_logs (
  id INT PRIMARY KEY AUTO_INCREMENT,
  intern_id INT NOT NULL,
  module_name VARCHAR(100),
  action VARCHAR(100),
  accessed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_intern (intern_id),
  INDEX idx_accessed (accessed_at)
);

CREATE TABLE IF NOT EXISTS intern_module_visibility (
  id INT PRIMARY KEY AUTO_INCREMENT,
  intern_role VARCHAR(100),
  module_name VARCHAR(100),
  can_view BOOLEAN DEFAULT 0,
  can_edit BOOLEAN DEFAULT 0,
  can_delete BOOLEAN DEFAULT 0,
  metadata JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_role_module (intern_role, module_name)
);

-- Insert Intern Module Visibility Permissions
INSERT INTO intern_module_visibility (intern_role, module_name, can_view, can_edit, can_delete, metadata) VALUES
-- All Interns (BASIC)
('INTERN', 'TIMESHEET', 1, 1, 0, '{"can_submit": true, "can_view_own": true}'),
('INTERN', 'ATTENDANCE', 1, 0, 0, '{"can_view_own": true, "can_check_in": true}'),
('INTERN', 'TASKS', 1, 0, 0, '{"can_view_assigned": true, "can_update_status": true}'),
('INTERN', 'REPORTS', 1, 1, 0, '{"can_submit_weekly": true, "can_view_feedback": true}'),
('INTERN', 'EVALUATIONS', 1, 0, 0, '{"can_view_own": true}'),
('INTERN', 'PLANS', 1, 0, 0, '{"can_view_assigned": true}'),

-- Sales Interns - Sales Department
('SALES_INTERN', 'TIMESHEET', 1, 1, 0, '{"can_submit": true, "can_view_own": true}'),
('SALES_INTERN', 'ATTENDANCE', 1, 0, 0, '{"can_view_own": true, "can_check_in": true}'),
('SALES_INTERN', 'TASKS', 1, 0, 0, '{"can_view_assigned": true, "can_update_status": true}'),
('SALES_INTERN', 'REPORTS', 1, 1, 0, '{"can_submit_weekly": true, "can_view_feedback": true}'),
('SALES_INTERN', 'EVALUATIONS', 1, 0, 0, '{"can_view_own": true}'),
('SALES_INTERN', 'PLANS', 1, 0, 0, '{"can_view_assigned": true}'),
('SALES_INTERN', 'PRODUCTS', 1, 0, 0, '{"can_view_all": true, "can_search": true}'),
('SALES_INTERN', 'CUSTOMERS', 1, 1, 0, '{"can_view_assigned": true, "can_manage_contacts": true}'),
('SALES_INTERN', 'QUOTATIONS', 1, 1, 0, '{"can_create_draft": true, "can_submit": false}'),
('SALES_INTERN', 'SALES_ORDERS', 1, 0, 0, '{"can_view_assigned": true}'),
('SALES_INTERN', 'SALES_TARGETS', 1, 0, 0, '{"can_view_own": true}'),

-- POS / Cashier Interns - Retail Department
('POS_INTERN', 'TIMESHEET', 1, 1, 0, '{"can_submit": true, "can_view_own": true}'),
('POS_INTERN', 'ATTENDANCE', 1, 0, 0, '{"can_view_own": true, "can_check_in": true}'),
('POS_INTERN', 'TASKS', 1, 0, 0, '{"can_view_assigned": true, "can_update_status": true}'),
('POS_INTERN', 'REPORTS', 1, 1, 0, '{"can_submit_weekly": true, "can_view_feedback": true}'),
('POS_INTERN', 'EVALUATIONS', 1, 0, 0, '{"can_view_own": true}'),
('POS_INTERN', 'PLANS', 1, 0, 0, '{"can_view_assigned": true}'),
('POS_INTERN', 'POS', 1, 1, 0, '{"can_process_sales": true, "can_process_refunds": true, "can_view_transactions": true}'),
('POS_INTERN', 'POS_SESSIONS', 1, 0, 0, '{"can_view_own_session": true, "can_view_summary": true}'),
('POS_INTERN', 'PRODUCTS', 1, 0, 0, '{"can_search": true, "can_view_prices": true}'),
('POS_INTERN', 'CUSTOMERS', 1, 0, 0, '{"can_search": true}'),

-- IT / Computer Department Interns
('IT_INTERN', 'TIMESHEET', 1, 1, 0, '{"can_submit": true, "can_view_own": true}'),
('IT_INTERN', 'ATTENDANCE', 1, 0, 0, '{"can_view_own": true, "can_check_in": true}'),
('IT_INTERN', 'TASKS', 1, 0, 0, '{"can_view_assigned": true, "can_update_status": true, "can_add_subtasks": true}'),
('IT_INTERN', 'REPORTS', 1, 1, 0, '{"can_submit_weekly": true, "can_view_feedback": true}'),
('IT_INTERN', 'EVALUATIONS', 1, 0, 0, '{"can_view_own": true}'),
('IT_INTERN', 'PLANS', 1, 0, 0, '{"can_view_assigned": true}'),
('IT_INTERN', 'SYSTEM_LOGS', 1, 0, 0, '{"can_view_logs": true, "can_export": false}'),
('IT_INTERN', 'AUDIT_LOG', 1, 0, 0, '{"can_view_own_logs": true}'),
('IT_INTERN', 'DATABASE', 1, 0, 0, '{"can_view_status": true, "can_backup": false}'),
('IT_INTERN', 'USERS', 1, 0, 0, '{"can_view_all": true, "can_manage": false}'),

-- Warehouse/Operations Interns - Inventory Access
('WAREHOUSE_INTERN', 'TIMESHEET', 1, 1, 0, '{"can_submit": true, "can_view_own": true}'),
('WAREHOUSE_INTERN', 'ATTENDANCE', 1, 0, 0, '{"can_view_own": true, "can_check_in": true}'),
('WAREHOUSE_INTERN', 'TASKS', 1, 0, 0, '{"can_view_assigned": true, "can_update_status": true}'),
('WAREHOUSE_INTERN', 'REPORTS', 1, 1, 0, '{"can_submit_weekly": true, "can_view_feedback": true}'),
('WAREHOUSE_INTERN', 'EVALUATIONS', 1, 0, 0, '{"can_view_own": true}'),
('WAREHOUSE_INTERN', 'PLANS', 1, 0, 0, '{"can_view_assigned": true}'),
('WAREHOUSE_INTERN', 'PRODUCTS', 1, 1, 0, '{"can_manage_stock": true, "can_view_inventory": true}'),
('WAREHOUSE_INTERN', 'INVENTORY_TRANSACTIONS', 1, 1, 0, '{"can_record_transactions": true}'),
('WAREHOUSE_INTERN', 'SUPPLIERS', 1, 0, 0, '{"can_view": true}'),

-- Admin/HR Interns - Full HR Access
('HR_INTERN', 'TIMESHEET', 1, 1, 0, '{"can_approve": false, "can_view_all": true}'),
('HR_INTERN', 'ATTENDANCE', 1, 1, 0, '{"can_view_all": true}'),
('HR_INTERN', 'LEAVE_REQUESTS', 1, 1, 0, '{"can_view_all": true, "can_approve": false}'),
('HR_INTERN', 'TASKS', 1, 0, 0, '{"can_view_all": true}'),
('HR_INTERN', 'USERS', 1, 0, 0, '{"can_view_all": true}'),
('HR_INTERN', 'REPORTS', 1, 1, 0, '{"can_view_all": true, "can_generate": true}');
