-- Shared Authentication Database
-- Central auth system for all applications
-- Created: April 2026

CREATE DATABASE IF NOT EXISTS shared_auth;
USE shared_auth;

-- Users Table (Unified across all systems)
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  avatar_url VARCHAR(255),
  is_active BOOLEAN DEFAULT 1,
  is_verified BOOLEAN DEFAULT 0,
  email_verified_at TIMESTAMP NULL,
  last_login TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_active (is_active)
);

-- User Roles (per-system role assignments)
-- A user can have different roles in different systems
CREATE TABLE user_roles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  system_name VARCHAR(50) NOT NULL,
  role_name VARCHAR(50) NOT NULL,
  assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  assigned_by INT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (assigned_by) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_user_system (user_id, system_name),
  UNIQUE KEY unique_user_system_role (user_id, system_name, role_name)
);

-- User Permissions (granular permissions within each system)
CREATE TABLE user_permissions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  system_name VARCHAR(50) NOT NULL,
  permission_name VARCHAR(100) NOT NULL,
  granted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  granted_by INT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (granted_by) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_user_system (user_id, system_name),
  UNIQUE KEY unique_user_permission (user_id, system_name, permission_name)
);

-- System Definitions
CREATE TABLE systems (
  id INT PRIMARY KEY AUTO_INCREMENT,
  system_name VARCHAR(50) NOT NULL UNIQUE,
  display_name VARCHAR(100) NOT NULL,
  description TEXT,
  database_name VARCHAR(100) NOT NULL,
  is_active BOOLEAN DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Authentication Sessions/Tokens
CREATE TABLE auth_sessions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  token VARCHAR(500) NOT NULL UNIQUE,
  refresh_token VARCHAR(500),
  system_name VARCHAR(50),
  ip_address VARCHAR(45),
  user_agent TEXT,
  expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_token (token),
  INDEX idx_user_system (user_id, system_name)
);

-- Audit Log (track auth events across all systems)
CREATE TABLE audit_log (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  system_name VARCHAR(50),
  action VARCHAR(100),
  details JSON,
  ip_address VARCHAR(45),
  user_agent TEXT,
  status ENUM('SUCCESS', 'FAILED', 'PENDING') DEFAULT 'SUCCESS',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_user (user_id),
  INDEX idx_system (system_name),
  INDEX idx_created (created_at)
);

-- Insert Systems
INSERT INTO systems (system_name, display_name, description, database_name) VALUES
('internship', 'Internship Management', 'Role-based internship program management', 'internship_system'),
('fragranza', 'Fragranza Olio', 'Premium fragrance e-commerce platform', 'fragranza_system'),
('saas', 'SaaS Platform', 'Software-as-Service application', 'saas_system');

-- Insert Sample Users
INSERT INTO users (email, first_name, last_name, password, is_active, is_verified) VALUES
('superadmin@example.com', 'Super', 'Admin', '$2y$10$superadmin123', 1, 1),
('admin.internship@example.com', 'John', 'Admin', '$2y$10$admin123', 1, 1),
('supervisor.sales@example.com', 'Robert', 'Sales Manager', '$2y$10$supervisor123', 1, 1),
('supervisor.it@example.com', 'Alice', 'IT Manager', '$2y$10$supervisor123', 1, 1),
('supervisor.warehouse@example.com', 'James', 'Warehouse Manager', '$2y$10$supervisor123', 1, 1),
('supervisor.hr@example.com', 'Sarah', 'HR Manager', '$2y$10$supervisor123', 1, 1),
('intern.sales@example.com', 'Emma', 'Sales Intern', '$2y$10$intern123', 1, 1),
('intern.pos@example.com', 'Michael', 'POS Intern', '$2y$10$intern123', 1, 1),
('intern.it@example.com', 'David', 'IT Intern', '$2y$10$intern123', 1, 1),
('intern.warehouse@example.com', 'Lisa', 'Warehouse Intern', '$2y$10$intern123', 1, 1),
('intern.hr@example.com', 'Jessica', 'HR Intern', '$2y$10$intern123', 1, 1),
('intern.general@example.com', 'Tom', 'General Intern', '$2y$10$intern123', 1, 1);

-- Assign Roles
INSERT INTO user_roles (user_id, system_name, role_name, assigned_by) VALUES
-- Super Admin (all systems)
(1, 'internship', 'SUPERADMIN', 1),
(1, 'fragranza', 'SUPERADMIN', 1),
(1, 'saas', 'SUPERADMIN', 1),

-- Internship Admin
(2, 'internship', 'ADMIN', 1),

-- Supervisors (Department Managers)
(3, 'internship', 'SUPERVISOR', 1),  -- Sales Manager
(4, 'internship', 'SUPERVISOR', 1),  -- IT Manager
(5, 'internship', 'SUPERVISOR', 1),  -- Warehouse Manager
(6, 'internship', 'SUPERVISOR', 1),  -- HR Manager

-- Interns (Department Specific)
(7, 'internship', 'INTERN', 1),   -- Sales Intern
(8, 'internship', 'INTERN', 1),   -- POS Intern
(9, 'internship', 'INTERN', 1),   -- IT Intern
(10, 'internship', 'INTERN', 1),  -- Warehouse Intern
(11, 'internship', 'INTERN', 1),  -- HR Intern
(12, 'internship', 'INTERN', 1);  -- General Intern

-- Assign Permissions (example)
INSERT INTO user_permissions (user_id, system_name, permission_name, granted_by) VALUES
(1, 'internship', 'manage_all', 1),
(2, 'internship', 'manage_applications', 1),
(2, 'internship', 'manage_positions', 1),
(3, 'internship', 'manage_sales', 1),
(4, 'internship', 'manage_systems', 1),
(5, 'internship', 'manage_inventory', 1),
(6, 'internship', 'manage_hr', 1),
(7, 'internship', 'submit_reports', 1),   -- Sales Intern
(8, 'internship', 'process_sales', 1),    -- POS Intern
(9, 'internship', 'view_systems', 1),     -- IT Intern
(10, 'internship', 'manage_stock', 1),    -- Warehouse Intern
(11, 'internship', 'view_hr_data', 1),    -- HR Intern
(12, 'internship', 'submit_reports', 1);  -- General Intern
