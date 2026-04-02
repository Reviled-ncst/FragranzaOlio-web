-- Internship Management System Database Schema
-- Created for XAMPP (MySQL)
-- Default credentials: root user with no password

-- Create Database
CREATE DATABASE IF NOT EXISTS internship_system;
USE internship_system;

-- Users Table
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  role ENUM('SUPERADMIN', 'ADMIN', 'INTERN', 'SUPERVISOR') NOT NULL,
  department VARCHAR(100),
  course VARCHAR(100),
  phone VARCHAR(20),
  is_active BOOLEAN DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_role (role)
);

-- Departments Table
CREATE TABLE departments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  supervisor_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (supervisor_id) REFERENCES users(id)
);

-- Internship Positions Table
CREATE TABLE internship_positions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(200) NOT NULL,
  department_id INT NOT NULL,
  description TEXT,
  location VARCHAR(100),
  duration_months INT,
  stipend_monthly DECIMAL(10, 2),
  requirements TEXT,
  is_active BOOLEAN DEFAULT 1,
  created_by INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (department_id) REFERENCES departments(id),
  FOREIGN KEY (created_by) REFERENCES users(id),
  INDEX idx_department (department_id),
  INDEX idx_active (is_active)
);

-- Applications Table
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
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (position_id) REFERENCES internship_positions(id),
  FOREIGN KEY (reviewed_by) REFERENCES users(id),
  INDEX idx_user (user_id),
  INDEX idx_position (position_id),
  INDEX idx_status (status)
);

-- Reports Table (for interns to submit progress)
CREATE TABLE reports (
  id INT PRIMARY KEY AUTO_INCREMENT,
  intern_id INT NOT NULL,
  week_number INT,
  report_text TEXT,
  hours_worked INT,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  reviewed_by INT,
  feedback TEXT,
  FOREIGN KEY (intern_id) REFERENCES users(id),
  FOREIGN KEY (reviewed_by) REFERENCES users(id),
  INDEX idx_intern (intern_id)
);

-- Evaluations Table
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
  FOREIGN KEY (intern_id) REFERENCES users(id),
  FOREIGN KEY (supervisor_id) REFERENCES users(id),
  INDEX idx_intern (intern_id),
  INDEX idx_supervisor (supervisor_id)
);

-- Insert Default Departments
INSERT INTO departments (name, description) VALUES
('IT Department', 'Information Technology and Computer Science'),
('Marketing Department', 'Digital and Brand Marketing'),
('HR Department', 'Human Resources'),
('Administration', 'Administrative Operations');

-- Insert Sample Users (passwords are hashed with bcrypt, here showing plaintext for reference)
-- SUPERADMIN: password = superadmin123
INSERT INTO users (email, first_name, last_name, role, department, is_active, password) VALUES
('superadmin@internship.com', 'Super', 'Admin', 'SUPERADMIN', NULL, 1, '$2y$10$abcdefghijklmnopqrstuvwxyz1234567890'),
('admin@internship.com', 'John', 'Admin', 'ADMIN', NULL, 1, '$2y$10$abcdefghijklmnopqrstuvwxyz1234567890'),
('supervisor.it@internship.com', 'Alice', 'Johnson', 'SUPERVISOR', 'IT Department', 1, '$2y$10$abcdefghijklmnopqrstuvwxyz1234567890'),
('supervisor.marketing@internship.com', 'Bob', 'Smith', 'SUPERVISOR', 'Marketing Department', 1, '$2y$10$abcdefghijklmnopqrstuvwxyz1234567890'),
('supervisor.hr@internship.com', 'Carol', 'Williams', 'SUPERVISOR', 'HR Department', 1, '$2y$10$abcdefghijklmnopqrstuvwxyz1234567890'),
('supervisor.admin@internship.com', 'David', 'Brown', 'SUPERVISOR', 'Administration', 1, '$2y$10$abcdefghijklmnopqrstuvwxyz1234567890'),
('intern1@student.com', 'Emma', 'Davis', 'INTERN', 'IT Department', 1, '$2y$10$abcdefghijklmnopqrstuvwxyz1234567890'),
('intern2@student.com', 'Frank', 'Miller', 'INTERN', 'Marketing Department', 1, '$2y$10$abcdefghijklmnopqrstuvwxyz1234567890'),
('intern3@student.com', 'Grace', 'Wilson', 'INTERN', 'HR Department', 1, '$2y$10$abcdefghijklmnopqrstuvwxyz1234567890');

-- Insert Sample Internship Positions
INSERT INTO internship_positions (title, department_id, description, location, duration_months, stipend_monthly, is_active, created_by) VALUES
('Software Development Intern', 1, 'Work on full-stack web applications', 'Remote', 4, 2500, 1, 1),
('Data Analytics Intern', 1, 'Analyze business data and create reports', 'San Francisco', 3, 2200, 1, 1),
('Digital Marketing Intern', 2, 'Create and manage marketing campaigns', 'New York', 4, 1800, 1, 1),
('Content Writer Intern', 2, 'Create engaging content for blogs and social media', 'Remote', 3, 1700, 1, 1),
('HR Coordinator Intern', 3, 'Support HR operations and recruitment', 'Chicago', 4, 1600, 1, 1),
('Administrative Assistant Intern', 4, 'Provide administrative support', 'Remote', 3, 1500, 1, 1);

-- Create Index
CREATE INDEX idx_created_at ON internship_positions(created_at);

-- Notes for import:
-- 1. Open phpMyAdmin: http://localhost/phpmyadmin
-- 2. Create new database or use existing one
-- 3. Go to SQL tab and paste this entire script
-- 4. Click Go/Execute
--
-- Note: Password hashes above are example placeholders
-- In actual implementation, use proper bcrypt hashing from PHP
