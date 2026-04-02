<?php
/**
 * Internship Management System - Comprehensive API Endpoints
 * Location: api/
 *
 * Structure:
 * /api/
 *   ├── config/
 *   │   ├── Database.php
 *   │   └── responses.php
 *   ├── auth/
 *   │   └── login.php
 *   ├── account/
 *   │   ├── profile.php
 *   │   └── security.php
 *   ├── timesheet/
 *   │   ├── list.php
 *   │   ├── create.php
 *   │   ├── update.php
 *   │   ├── submit.php
 *   │   └── approve.php
 *   ├── attendance/
 *   │   ├── check-in.php
 *   │   ├── check-out.php
 *   │   ├── list.php
 *   │   ├── leave-request.php
 *   │   └── leave-approve.php
 *   ├── tasks/
 *   │   ├── list.php
 *   │   ├── create.php
 *   │   ├── update.php
 *   │   ├── comment.php
 *   │   └── delete.php
 *   ├── products/
 *   │   ├── list.php
 *   │   ├── get.php
 *   │   ├── create.php
 *   │   ├── update.php
 *   │   └── inventory.php
 *   ├── customers/
 *   │   ├── list.php
 *   │   ├── get.php
 *   │   ├── create.php
 *   │   └── update.php
 *   ├── sales/
 *   │   ├── quotation/
 *   │   │   ├── create.php
 *   │   │   ├── list.php
 *   │   │   └── update.php
 *   │   ├── order/
 *   │   │   ├── create.php
 *   │   │   ├── list.php
 *   │   │   └── update.php
 *   │   ├── invoice/
 *   │   │   ├── generate.php
 *   │   │   └── list.php
 *   │   └── payment/
 *   │       ├── record.php
 *   │       └── list.php
 *   ├── pos/
 *   │   ├── session/
 *   │   │   ├── start.php
 *   │   │   ├── end.php
 *   │   │   └── list.php
 *   │   ├── transaction/
 *   │   │   ├── create.php
 *   │   │   ├── list.php
 *   │   │   └── refund.php
 *   │   └── receipt/
 *   │       ├── generate.php
 *   │       └── email.php
 *   └── reports/
 *       ├── daily.php
 *       ├── monthly.php
 *       ├── sales.php
 *       └── attendance.php
 */

// ============================================
// API ENDPOINT SIGNATURES & DOCUMENTATION
// ============================================

/**
 * ============================================
 * TIMESHEET ENDPOINTS
 * ============================================
 */

// POST /api/timesheet/list.php
// Get timesheets for user (intern view own, supervisor view all assigned)
// Request: { user_id?, start_date?, end_date?, status? }
// Response: { success, data: [...] }

// POST /api/timesheet/create.php
// Create timesheet entry
// Request: { work_date, check_in_time, check_out_time, hours_worked, notes? }
// Response: { success, data: { id, ..., status: 'PENDING' } }

// POST /api/timesheet/update.php
// Update timesheet (can only edit PENDING entries)
// Request: { id, check_in_time?, check_out_time?, notes? }
// Response: { success, data: {...} }

// POST /api/timesheet/submit.php
// Submit timesheet for approval
// Request: { id }
// Response: { success, data: { id, status: 'SUBMITTED' } }

// POST /api/timesheet/approve.php (Supervisor only)
// Approve timesheets
// Request: { ids: [...], action: 'APPROVE'|'REJECT', notes? }
// Response: { success, data: { approved: N, rejected: N } }

/**
 * ============================================
 * ATTENDANCE ENDPOINTS
 * ============================================
 */

// POST /api/attendance/check-in.php
// Intern checks in
// Request: { location?, notes? }
// Response: { success, data: { id, check_in_time, status: 'PRESENT' } }

// POST /api/attendance/check-out.php
// Intern checks out
// Request: { notes? }
// Response: { success, data: { id, check_out_time, hours_worked } }

// POST /api/attendance/list.php
// Get attendance records
// Request: { user_id?, start_date?, end_date?, status? }
// Response: { success, data: [...] }

// POST /api/attendance/leave-request.php
// Submit leave request
// Request: { leave_type, start_date, end_date, reason, attachment_url? }
// Response: { success, data: { id, status: 'PENDING' } }

// POST /api/attendance/leave-approve.php (Supervisor/HR only)
// Approve/reject leave requests
// Request: { id, action: 'APPROVE'|'REJECT', notes? }
// Response: { success, data: { id, status } }

/**
 * ============================================
 * TASK MANAGEMENT ENDPOINTS
 * ============================================
 */

// POST /api/tasks/list.php
// Get tasks (intern: assigned to them, supervisor: created by them)
// Request: { status?, priority?, assigned_to?, due_date?, sort_by? }
// Response: { success, data: [...] }

// POST /api/tasks/create.php (Supervisor only)
// Create task
// Request: { title, description, assigned_to, priority, due_date, estimated_hours?, category? }
// Response: { success, data: { id, ..., status: 'TODO' } }

// POST /api/tasks/update.php
// Update task (intern: can update status/completion, supervisor: can update everything)
// Request: { id, title?, description?, status?, completion_percentage?, actual_hours? }
// Response: { success, data: {...} }

// POST /api/tasks/comment.php
// Add task comment
// Request: { task_id, comment, attachment_url? }
// Response: { success, data: { id, ..., created_at } }

/**
 * ============================================
 * PRODUCT MANAGEMENT ENDPOINTS
 * ============================================
 */

// POST /api/products/list.php
// Get all products (intern visibility based on role)
// Request: { category?, status?, search?, page?, limit? }
// Response: { success, data: [...], total, pages }

// POST /api/products/get.php
// Get single product details
// Request: { id OR sku }
// Response: { success, data: {..., quantity_in_stock, price, supplier_info} }

// POST /api/products/create.php (Admin/Supervisor only)
// Create product
// Request: { sku, name, description, category, unit_price, cost_price, supplier_id? }
// Response: { success, data: { id, sku, name, ... } }

// POST /api/products/update.php
// Update product
// Request: { id, name?, price?, quantity?, status?, ... }
// Response: { success, data: {...} }

// POST /api/products/inventory.php
// Get inventory status and transactions
// Request: { product_id }
// Response: { success, data: { quantity, reorder_level, transactions: [...] } }

/**
 * ============================================
 * CUSTOMER ENDPOINTS
 * ============================================
 */

// POST /api/customers/list.php
// Get customers (intern: assigned customers only, sales: all or assigned)
// Request: { type?, status?, search?, page? }
// Response: { success, data: [...], total }

// POST /api/customers/create.php
// Create customer
// Request: { name, email, phone, customer_type, address, tax_id?, credit_limit? }
// Response: { success, data: { id, name, ... } }

/**
 * ============================================
 * SALES - QUOTATION ENDPOINTS
 * ============================================
 */

// POST /api/sales/quotation/create.php
// Create quotation (intern: draft only, supervisor: send)
// Request: { customer_id, items: [{product_id, quantity, unit_price}], valid_until?, notes? }
// Response: { success, data: { id, quotation_number, status: 'DRAFT' } }

// POST /api/sales/quotation/list.php
// Get quotations
// Request: { status?, customer_id?, user_id?, date_from?, date_to? }
// Response: { success, data: [...] }

// POST /api/sales/quotation/update.php
// Update quotation
// Request: { id, items?, status?, ... }
// Response: { success, data: {...} }

/**
 * ============================================
 * SALES - ORDER ENDPOINTS
 * ============================================
 */

// POST /api/sales/order/create.php
// Create sales order
// Request: { customer_id, quotation_id?, items: [...], delivery_date, notes? }
// Response: { success, data: { id, order_number, status: 'PENDING' } }

// POST /api/sales/order/list.php
// Get sales orders
// Request: { status?, customer_id?, date_from?, date_to? }
// Response: { success, data: [...], total_amount }

// POST /api/sales/order/update.php
// Update order status
// Request: { id, status, ... }
// Response: { success, data: {...} }

/**
 * ============================================
 * SALES - INVOICE ENDPOINTS
 * ============================================
 */

// POST /api/sales/invoice/generate.php
// Generate invoice from order
// Request: { order_id }
// Response: { success, data: { invoice_id, invoice_number, amount_due } }

/**
 * ============================================
 * SALES - PAYMENT ENDPOINTS
 * ============================================
 */

// POST /api/sales/payment/record.php
// Record payment
// Request: { invoice_id OR order_id, amount, payment_method, reference_number?, notes? }
// Response: { success, data: { id, amount, payment_status } }

/**
 * ============================================
 * POS ENDPOINTS
 * ============================================
 */

// POST /api/pos/session/start.php
// Start new POS session
// Request: { opening_balance }
// Response: { success, data: { session_id, status: 'OPEN', started_at } }

// POST /api/pos/session/end.php
// End POS session
// Request: { session_id, closing_balance }
// Response: { success, data: { session_id, status: 'CLOSED', total_sales } }

// POST /api/pos/transaction/create.php
// Create POS transaction (sale)
// Request: { session_id, customer_id?, items: [{product_id, quantity, unit_price}], payment_method, amount_paid }
// Response: { success, data: { transaction_id, receipt_number, change_amount } }

// POST /api/pos/transaction/refund.php
// Create refund transaction
// Request: { transaction_id, reason, items?: [{product_id, quantity}] }
// Response: { success, data: { refund_id, refund_amount } }

// POST /api/pos/receipt/generate.php
// Generate receipt
// Request: { transaction_id }
// Response: { success, data: { receipt_url, receipt_html } }

/**
 * ============================================
 * REPORTS ENDPOINTS
 * ============================================
 */

// POST /api/reports/daily.php
// Get daily sales report
// Request: { date, include_details?: true }
// Response: { success, data: { total_sales, transactions, items_sold, ... } }

// POST /api/reports/monthly.php
// Get monthly financial report
// Request: { year, month }
// Response: { success, data: { total_sales, total_expenses, profit, ... } }

// POST /api/reports/sales.php (Sales Intern/Supervisor)
// Get sales performance report
// Request: { user_id?, date_from, date_to }
// Response: { success, data: { orders_count, total_amount, commissions, ... } }

// POST /api/reports/attendance.php (HR Intern/Supervisor)
// Get attendance report
// Request: { user_id?, date_from, date_to }
// Response: { success, data: { days_present, days_absent, attendance_rate, ... } }

/**
 * ============================================
 * IMPLEMENTATION NOTES
 * ============================================
 *
 * 1. All endpoints require authentication token in header
 *    Authorization: Bearer {token}
 *
 * 2. All requests should use POST method for consistency
 *
 * 3. All responses follow standard format:
 *    {
 *      success: boolean,
 *      message?: string,
 *      data?: any,
 *      errors?: {field: "error message"}
 *    }
 *
 * 4. Intern access is controlled by:
 *    - intern_module_visibility table (what modules they can see)
 *    - user_roles table (what role they have)
 *    - Permission checks in each endpoint
 *
 * 5. All interns have access to core modules:
 *    - TIMESHEET (submit own only)
 *    - ATTENDANCE (check in/out, leave requests)
 *    - TASKS (view assigned, update status)
 *    - REPORTS (view own feedback)
 *    - EVALUATIONS (view own only)
 *
 * 6. Role-specific access:
 *    - SALES_INTERN: Can view/create quotations, view customers
 *    - WAREHOUSE_INTERN: Can manage inventory
 *    - CASHIER_INTERN: Can process POS transactions
 *    - HR_INTERN: Can view all timesheets/attendance (no approvals)
 */
?>
