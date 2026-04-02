-- Comprehensive Enterprise Management System
-- Shared Auth Database: shared_auth (already created)
-- Main System Database: enterprise_system

CREATE DATABASE IF NOT EXISTS enterprise_system;
USE enterprise_system;

-- ============================================================================
-- 1. CORE DEPARTMENTS & EMPLOYEES
-- ============================================================================

CREATE TABLE departments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  location VARCHAR(100),
  supervisor_id INT,
  budget DECIMAL(12, 2),
  is_active BOOLEAN DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_name (name)
);

CREATE TABLE employees (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL UNIQUE,
  department_id INT NOT NULL,
  employee_id VARCHAR(50) NOT NULL UNIQUE,
  position VARCHAR(100),
  hire_date DATE,
  salary DECIMAL(10, 2),
  phone VARCHAR(20),
  address TEXT,
  is_active BOOLEAN DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (department_id) REFERENCES departments(id),
  INDEX idx_employee_id (employee_id),
  INDEX idx_department (department_id)
);

-- ============================================================================
-- 2. INTERNSHIP MANAGEMENT
-- ============================================================================

CREATE TABLE internship_positions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(200) NOT NULL,
  department_id INT NOT NULL,
  description TEXT,
  location VARCHAR(100),
  duration_weeks INT,
  stipend_monthly DECIMAL(10, 2),
  requirements TEXT,
  is_active BOOLEAN DEFAULT 1,
  created_by INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (department_id) REFERENCES departments(id),
  FOREIGN KEY (created_by) REFERENCES shared_auth.users(id),
  INDEX idx_department (department_id)
);

CREATE TABLE applications (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  position_id INT NOT NULL,
  status ENUM('PENDING', 'APPROVED', 'REJECTED', 'ONGOING', 'COMPLETED') DEFAULT 'PENDING',
  resume_url VARCHAR(255),
  cover_letter TEXT,
  interview_date DATETIME,
  notes TEXT,
  applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  reviewed_by INT,
  reviewed_at TIMESTAMP NULL,
  FOREIGN KEY (user_id) REFERENCES shared_auth.users(id),
  FOREIGN KEY (position_id) REFERENCES internship_positions(id),
  FOREIGN KEY (reviewed_by) REFERENCES shared_auth.users(id),
  INDEX idx_status (status),
  INDEX idx_user (user_id)
);

CREATE TABLE internship_programs (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  department_id INT NOT NULL,
  duration_weeks INT NOT NULL,
  mentor_id INT,
  status ENUM('DRAFT', 'ACTIVE', 'COMPLETED', 'ARCHIVED') DEFAULT 'ACTIVE',
  learning_objectives TEXT,
  skills_to_develop TEXT,
  tools_technologies TEXT,
  expected_outcomes TEXT,
  assessment_criteria TEXT,
  created_by INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (department_id) REFERENCES departments(id),
  FOREIGN KEY (mentor_id) REFERENCES shared_auth.users(id),
  FOREIGN KEY (created_by) REFERENCES shared_auth.users(id),
  INDEX idx_status (status)
);

CREATE TABLE program_milestones (
  id INT PRIMARY KEY AUTO_INCREMENT,
  program_id INT NOT NULL,
  week_number INT NOT NULL,
  phase_name VARCHAR(100),
  description TEXT,
  objectives TEXT,
  tasks TEXT,
  deliverables TEXT,
  due_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (program_id) REFERENCES internship_programs(id) ON DELETE CASCADE,
  INDEX idx_program (program_id)
);

CREATE TABLE program_assignments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  program_id INT NOT NULL,
  intern_id INT NOT NULL,
  application_id INT,
  start_date DATE NOT NULL,
  end_date DATE,
  progress_percentage INT DEFAULT 0,
  status ENUM('ASSIGNED', 'IN_PROGRESS', 'COMPLETED', 'DROPPED') DEFAULT 'ASSIGNED',
  assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP NULL,
  FOREIGN KEY (program_id) REFERENCES internship_programs(id),
  FOREIGN KEY (intern_id) REFERENCES shared_auth.users(id),
  FOREIGN KEY (application_id) REFERENCES applications(id),
  INDEX idx_status (status),
  UNIQUE KEY unique_program_intern (program_id, intern_id)
);

CREATE TABLE internship_reports (
  id INT PRIMARY KEY AUTO_INCREMENT,
  intern_id INT NOT NULL,
  week_number INT,
  report_text TEXT,
  hours_worked INT,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  reviewed_by INT,
  feedback TEXT,
  FOREIGN KEY (intern_id) REFERENCES shared_auth.users(id),
  FOREIGN KEY (reviewed_by) REFERENCES shared_auth.users(id),
  INDEX idx_intern (intern_id)
);

CREATE TABLE evaluations (
  id INT PRIMARY KEY AUTO_INCREMENT,
  intern_id INT NOT NULL,
  supervisor_id INT NOT NULL,
  rating INT CHECK (rating >= 1 AND rating <= 5),
  technical_skills INT,
  soft_skills INT,
  communication INT,
  comments TEXT,
  evaluation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (intern_id) REFERENCES shared_auth.users(id),
  FOREIGN KEY (supervisor_id) REFERENCES shared_auth.users(id),
  INDEX idx_intern (intern_id)
);

-- ============================================================================
-- 3. TIMESHEET & ATTENDANCE
-- ============================================================================

CREATE TABLE timesheets (
  id INT PRIMARY KEY AUTO_INCREMENT,
  employee_id INT NOT NULL,
  date DATE NOT NULL,
  check_in_time TIME,
  check_out_time TIME,
  hours_worked DECIMAL(5, 2),
  notes TEXT,
  status ENUM('PENDING', 'APPROVED', 'REJECTED') DEFAULT 'PENDING',
  approved_by INT,
  approved_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (employee_id) REFERENCES employees(id),
  FOREIGN KEY (approved_by) REFERENCES employees(id),
  INDEX idx_employee_date (employee_id, date),
  UNIQUE KEY unique_employee_date (employee_id, date)
);

CREATE TABLE attendance_logs (
  id INT PRIMARY KEY AUTO_INCREMENT,
  employee_id INT NOT NULL,
  date DATE NOT NULL,
  check_in_time DATETIME,
  check_out_time DATETIME,
  status ENUM('PRESENT', 'ABSENT', 'LATE', 'EARLY_LEAVE', 'ON_LEAVE') DEFAULT 'PRESENT',
  reason TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(10, 8),
  device_info VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (employee_id) REFERENCES employees(id),
  INDEX idx_employee_date (employee_id, date),
  UNIQUE KEY unique_attendance (employee_id, date)
);

CREATE TABLE leave_requests (
  id INT PRIMARY KEY AUTO_INCREMENT,
  employee_id INT NOT NULL,
  leave_type ENUM('SICK', 'PERSONAL', 'VACATION', 'MATERNITY', 'PATERNITY', 'UNPAID') DEFAULT 'PERSONAL',
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  days_requested INT,
  reason TEXT,
  status ENUM('PENDING', 'APPROVED', 'REJECTED') DEFAULT 'PENDING',
  approved_by INT,
  approved_at TIMESTAMP NULL,
  rejection_reason TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (employee_id) REFERENCES employees(id),
  FOREIGN KEY (approved_by) REFERENCES employees(id),
  INDEX idx_status (status),
  INDEX idx_employee (employee_id)
);

CREATE TABLE overtime_requests (
  id INT PRIMARY KEY AUTO_INCREMENT,
  employee_id INT NOT NULL,
  date DATE NOT NULL,
  hours DECIMAL(5, 2) NOT NULL,
  reason TEXT,
  status ENUM('PENDING', 'APPROVED', 'REJECTED') DEFAULT 'PENDING',
  approved_by INT,
  approved_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (employee_id) REFERENCES employees(id),
  FOREIGN KEY (approved_by) REFERENCES employees(id),
  INDEX idx_status (status)
);

-- ============================================================================
-- 4. TASK MANAGEMENT
-- ============================================================================

CREATE TABLE tasks (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  department_id INT,
  assigned_by INT NOT NULL,
  assigned_to INT NOT NULL,
  priority ENUM('LOW', 'MEDIUM', 'HIGH', 'URGENT') DEFAULT 'MEDIUM',
  status ENUM('NEW', 'IN_PROGRESS', 'IN_REVIEW', 'COMPLETED', 'CANCELLED') DEFAULT 'NEW',
  due_date DATETIME,
  start_date DATETIME,
  completed_at TIMESTAMP NULL,
  estimated_hours DECIMAL(5, 2),
  actual_hours DECIMAL(5, 2),
  progress_percentage INT DEFAULT 0,
  attachments JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (department_id) REFERENCES departments(id),
  FOREIGN KEY (assigned_by) REFERENCES shared_auth.users(id),
  FOREIGN KEY (assigned_to) REFERENCES shared_auth.users(id),
  INDEX idx_status (status),
  INDEX idx_assigned_to (assigned_to),
  INDEX idx_due_date (due_date)
);

CREATE TABLE task_comments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  task_id INT NOT NULL,
  user_id INT NOT NULL,
  comment TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES shared_auth.users(id),
  INDEX idx_task (task_id)
);

CREATE TABLE task_history (
  id INT PRIMARY KEY AUTO_INCREMENT,
  task_id INT NOT NULL,
  changed_by INT NOT NULL,
  field_name VARCHAR(100),
  old_value TEXT,
  new_value TEXT,
  changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE,
  FOREIGN KEY (changed_by) REFERENCES shared_auth.users(id),
  INDEX idx_task (task_id)
);

-- ============================================================================
-- 5. PRODUCT MANAGEMENT & INVENTORY
-- ============================================================================

CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  sku VARCHAR(50) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category_id INT,
  unit_price DECIMAL(10, 2) NOT NULL,
  cost_price DECIMAL(10, 2),
  quantity_in_stock INT DEFAULT 0,
  reorder_level INT DEFAULT 10,
  status ENUM('ACTIVE', 'INACTIVE', 'DISCONTINUED') DEFAULT 'ACTIVE',
  image_url VARCHAR(255),
  specifications JSON,
  created_by INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES shared_auth.users(id),
  INDEX idx_sku (sku),
  INDEX idx_category (category_id),
  INDEX idx_status (status)
);

CREATE TABLE product_categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  parent_category_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (parent_category_id) REFERENCES product_categories(id),
  INDEX idx_name (name)
);

CREATE TABLE inventory_movements (
  id INT PRIMARY KEY AUTO_INCREMENT,
  product_id INT NOT NULL,
  movement_type ENUM('PURCHASE', 'SALE', 'RETURN', 'ADJUSTMENT', 'DAMAGE', 'LOSS') DEFAULT 'PURCHASE',
  quantity INT NOT NULL,
  reference_id VARCHAR(100),
  notes TEXT,
  recorded_by INT NOT NULL,
  movement_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id),
  FOREIGN KEY (recorded_by) REFERENCES shared_auth.users(id),
  INDEX idx_product (product_id),
  INDEX idx_date (movement_date)
);

CREATE TABLE inventory_adjustments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  product_id INT NOT NULL,
  old_quantity INT,
  new_quantity INT,
  reason TEXT,
  approved_by INT,
  status ENUM('PENDING', 'APPROVED', 'REJECTED') DEFAULT 'PENDING',
  created_by INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  approved_at TIMESTAMP NULL,
  FOREIGN KEY (product_id) REFERENCES products(id),
  FOREIGN KEY (approved_by) REFERENCES shared_auth.users(id),
  FOREIGN KEY (created_by) REFERENCES shared_auth.users(id),
  INDEX idx_status (status)
);

-- ============================================================================
-- 6. SALES MANAGEMENT
-- ============================================================================

CREATE TABLE customers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(20),
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(100),
  postal_code VARCHAR(20),
  country VARCHAR(100),
  company VARCHAR(255),
  customer_type ENUM('RETAIL', 'WHOLESALE', 'CORPORATE') DEFAULT 'RETAIL',
  credit_limit DECIMAL(12, 2),
  status ENUM('ACTIVE', 'INACTIVE', 'BLACKLISTED') DEFAULT 'ACTIVE',
  notes TEXT,
  created_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES shared_auth.users(id),
  INDEX idx_email (email),
  INDEX idx_phone (phone)
);

CREATE TABLE quotations (
  id INT PRIMARY KEY AUTO_INCREMENT,
  quote_number VARCHAR(50) NOT NULL UNIQUE,
  customer_id INT NOT NULL,
  quotation_date DATE NOT NULL,
  valid_until DATE,
  subtotal DECIMAL(12, 2),
  tax_amount DECIMAL(10, 2),
  discount_amount DECIMAL(10, 2),
  total DECIMAL(12, 2),
  notes TEXT,
  status ENUM('DRAFT', 'SENT', 'ACCEPTED', 'REJECTED', 'EXPIRED') DEFAULT 'DRAFT',
  created_by INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES customers(id),
  FOREIGN KEY (created_by) REFERENCES shared_auth.users(id),
  INDEX idx_status (status),
  INDEX idx_customer (customer_id)
);

CREATE TABLE quotation_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  quotation_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  unit_price DECIMAL(10, 2),
  discount_percentage DECIMAL(5, 2) DEFAULT 0,
  line_total DECIMAL(12, 2),
  FOREIGN KEY (quotation_id) REFERENCES quotations(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id),
  INDEX idx_quotation (quotation_id)
);

CREATE TABLE sales_orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_number VARCHAR(50) NOT NULL UNIQUE,
  customer_id INT NOT NULL,
  quotation_id INT,
  order_date DATE NOT NULL,
  delivery_date DATE,
  subtotal DECIMAL(12, 2),
  tax_amount DECIMAL(10, 2),
  discount_amount DECIMAL(10, 2),
  total DECIMAL(12, 2),
  payment_status ENUM('UNPAID', 'PARTIALLY_PAID', 'PAID') DEFAULT 'UNPAID',
  fulfillment_status ENUM('PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED') DEFAULT 'PENDING',
  notes TEXT,
  created_by INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES customers(id),
  FOREIGN KEY (quotation_id) REFERENCES quotations(id),
  FOREIGN KEY (created_by) REFERENCES shared_auth.users(id),
  INDEX idx_status (fulfillment_status),
  INDEX idx_customer (customer_id),
  INDEX idx_order_date (order_date)
);

CREATE TABLE order_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  unit_price DECIMAL(10, 2),
  discount_percentage DECIMAL(5, 2) DEFAULT 0,
  line_total DECIMAL(12, 2),
  FOREIGN KEY (order_id) REFERENCES sales_orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id),
  INDEX idx_order (order_id)
);

CREATE TABLE payments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT NOT NULL,
  amount DECIMAL(12, 2) NOT NULL,
  payment_date DATETIME NOT NULL,
  payment_method ENUM('CASH', 'CHEQUE', 'BANK_TRANSFER', 'CREDIT_CARD', 'DIGITAL_WALLET') DEFAULT 'CASH',
  reference_number VARCHAR(100),
  notes TEXT,
  recorded_by INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES sales_orders(id),
  FOREIGN KEY (recorded_by) REFERENCES shared_auth.users(id),
  INDEX idx_order (order_id),
  INDEX idx_date (payment_date)
);

-- ============================================================================
-- 7. POS SYSTEM
-- ============================================================================

CREATE TABLE pos_sessions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  terminal_name VARCHAR(100),
  cashier_id INT NOT NULL,
  session_date DATE,
  open_time DATETIME,
  close_time DATETIME,
  opening_balance DECIMAL(12, 2),
  closing_balance DECIMAL(12, 2),
  total_sales DECIMAL(12, 2),
  total_discounts DECIMAL(10, 2),
  total_taxes DECIMAL(10, 2),
  status ENUM('OPEN', 'CLOSED') DEFAULT 'OPEN',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (cashier_id) REFERENCES shared_auth.users(id),
  INDEX idx_status (status),
  INDEX idx_date (session_date)
);

CREATE TABLE pos_transactions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  session_id INT NOT NULL,
  transaction_number VARCHAR(50) NOT NULL UNIQUE,
  customer_name VARCHAR(255),
  transaction_date DATETIME,
  subtotal DECIMAL(12, 2),
  tax_amount DECIMAL(10, 2),
  discount_amount DECIMAL(10, 2),
  payment_amount DECIMAL(12, 2),
  change_amount DECIMAL(12, 2),
  payment_method ENUM('CASH', 'CARD', 'CHEQUE', 'DIGITAL_WALLET') DEFAULT 'CASH',
  status ENUM('COMPLETED', 'CANCELLED', 'REFUNDED') DEFAULT 'COMPLETED',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (session_id) REFERENCES pos_sessions(id),
  INDEX idx_session (session_id),
  INDEX idx_date (transaction_date)
);

CREATE TABLE pos_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  transaction_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  unit_price DECIMAL(10, 2),
  discount_percentage DECIMAL(5, 2) DEFAULT 0,
  line_total DECIMAL(12, 2),
  FOREIGN KEY (transaction_id) REFERENCES pos_transactions(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id),
  INDEX idx_transaction (transaction_id)
);

CREATE TABLE pos_refunds (
  id INT PRIMARY KEY AUTO_INCREMENT,
  transaction_id INT NOT NULL,
  product_id INT,
  quantity INT,
  refund_amount DECIMAL(12, 2),
  reason TEXT,
  approved_by INT,
  refund_date DATETIME,
  status ENUM('PENDING', 'APPROVED', 'REJECTED') DEFAULT 'PENDING',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  approved_at TIMESTAMP NULL,
  FOREIGN KEY (transaction_id) REFERENCES pos_transactions(id),
  FOREIGN KEY (product_id) REFERENCES products(id),
  FOREIGN KEY (approved_by) REFERENCES shared_auth.users(id),
  INDEX idx_status (status)
);

-- ============================================================================
-- 8. SALES COMMISSION & INCENTIVES
-- ============================================================================

CREATE TABLE sales_staff (
  id INT PRIMARY KEY AUTO_INCREMENT,
  employee_id INT NOT NULL UNIQUE,
  commission_percentage DECIMAL(5, 2) DEFAULT 0,
  target_monthly DECIMAL(12, 2),
  is_active BOOLEAN DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (employee_id) REFERENCES employees(id),
  INDEX idx_active (is_active)
);

CREATE TABLE sales_commissions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  sales_staff_id INT NOT NULL,
  month INT NOT NULL,
  year INT NOT NULL,
  total_sales DECIMAL(12, 2),
  commission_earned DECIMAL(10, 2),
  bonus_amount DECIMAL(10, 2),
  status ENUM('CALCULATED', 'APPROVED', 'PAID') DEFAULT 'CALCULATED',
  approved_by INT,
  paid_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (sales_staff_id) REFERENCES sales_staff(id),
  FOREIGN KEY (approved_by) REFERENCES shared_auth.users(id),
  INDEX idx_status (status),
  INDEX idx_period (year, month),
  UNIQUE KEY unique_period (sales_staff_id, month, year)
);

-- ============================================================================
-- 9. REPORTS & ANALYTICS
-- ============================================================================

CREATE TABLE report_templates (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  module_name VARCHAR(100),
  query TEXT,
  filters JSON,
  created_by INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES shared_auth.users(id),
  INDEX idx_module (module_name)
);

CREATE TABLE saved_reports (
  id INT PRIMARY KEY AUTO_INCREMENT,
  report_template_id INT,
  title VARCHAR(255) NOT NULL,
  generated_by INT NOT NULL,
  report_data LONGTEXT,
  generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (report_template_id) REFERENCES report_templates(id),
  FOREIGN KEY (generated_by) REFERENCES shared_auth.users(id),
  INDEX idx_generated (generated_at)
);

-- ============================================================================
-- CREATE INDEXES FOR COMMON QUERIES
-- ============================================================================

CREATE INDEX idx_employees_dept ON employees(department_id);
CREATE INDEX idx_tasks_priority ON tasks(priority, status);
CREATE INDEX idx_orders_payment ON sales_orders(payment_status);
CREATE INDEX idx_products_stock ON products(quantity_in_stock, reorder_level);
CREATE INDEX idx_attendance_month ON attendance_logs(employee_id, MONTH(date), YEAR(date));

-- ============================================================================
-- SAMPLE DATA
-- ============================================================================

-- Insert Departments
INSERT INTO departments (name, description, location, budget) VALUES
('IT Department', 'Information Technology and Development', 'Building A', 500000),
('Marketing Department', 'Digital and Brand Marketing', 'Building B', 300000),
('Sales Department', 'Sales and Customer Relations', 'Building C', 400000),
('Operations', 'Daily Operations and Logistics', 'Building D', 250000),
('HR Department', 'Human Resources', 'Building A', 150000);

-- Insert Product Categories
INSERT INTO product_categories (name, description) VALUES
('Electronics', 'Electronic devices and components'),
('Software', 'Software licenses and subscriptions'),
('Services', 'Professional services and consulting'),
('Hardware', 'Physical equipment and devices'),
('Accessories', 'Accessories and peripherals');

-- Insert Sample Products
INSERT INTO products (sku, name, category_id, unit_price, cost_price, quantity_in_stock, description) VALUES
('PROD-001', 'Laptop Computer', 1, 1299.99, 899.99, 15, 'High-performance laptop'),
('PROD-002', 'Software License', 2, 299.99, 50.00, 100, 'Annual software license'),
('PROD-003', 'Wireless Mouse', 5, 29.99, 8.00, 50, 'USB wireless mouse'),
('PROD-004', 'Keyboard', 5, 79.99, 25.00, 30, 'Mechanical gaming keyboard'),
('PROD-005', 'Monitor', 1, 399.99, 250.00, 20, '4K UltraHD Monitor'),
('PROD-006', 'Consulting Service', 3, 150.00, 50.00, 999, 'Per hour consulting');

-- Insert Customers
INSERT INTO customers (name, email, phone, address, city, customer_type) VALUES
('Acme Corporation', 'contact@acme.com', '+1-555-0101', '123 Business St', 'New York', 'CORPORATE'),
('Tech Startup Inc', 'sales@techstartup.com', '+1-555-0102', '456 Innovation Ave', 'San Francisco', 'CORPORATE'),
('John Smith', 'john@example.com', '+1-555-0103', '789 Retail Plaza', 'Los Angeles', 'RETAIL'),
('Global Services Ltd', 'info@globalservices.com', '+1-555-0104', '321 Commerce Blvd', 'Chicago', 'WHOLESALE');
