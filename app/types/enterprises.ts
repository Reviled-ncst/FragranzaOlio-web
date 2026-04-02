// HR Management Types with Intern Support
import { User } from './user';

// HR Module
export interface Department {
  id: number;
  name: string;
  description: string;
  location: string;
  supervisor_id: number;
  budget: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Employee {
  id: number;
  user_id: number;
  department_id: number;
  employee_id: string;
  position: string;
  hire_date: string;
  salary: number;
  phone: string;
  address: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  user?: User;
  department?: Department;
}

export interface Timesheet {
  id: number;
  employee_id: number;
  intern_id?: number;
  date: string;
  check_in_time: string;
  check_out_time: string;
  hours_worked: number;
  notes: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  approved_by: number;
  approved_at: string;
  created_at: string;
  updated_at: string;
  is_intern: boolean;
}

export interface AttendanceLog {
  id: number;
  employee_id: number;
  intern_id?: number;
  date: string;
  check_in_time: string;
  check_out_time: string;
  status: 'PRESENT' | 'ABSENT' | 'LATE' | 'EARLY_LEAVE' | 'ON_LEAVE';
  reason: string;
  latitude: string;
  longitude: string;
  device_info: string;
  created_at: string;
  is_intern: boolean;
}

export interface LeaveRequest {
  id: number;
  employee_id: number;
  intern_id?: number;
  leave_type: 'SICK' | 'PERSONAL' | 'VACATION' | 'MATERNITY' | 'UNPAID';
  start_date: string;
  end_date: string;
  days_requested: number;
  reason: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  approved_by: number;
  approved_at: string;
  rejection_reason: string;
  created_at: string;
  is_intern: boolean;
}

export interface OvertimeRequest {
  id: number;
  employee_id: number;
  intern_id?: number;
  date: string;
  hours: number;
  reason: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  approved_by: number;
  approved_at: string;
  created_at: string;
  is_intern: boolean;
}

export interface InternTimesheetSummary {
  intern_id: number;
  week_start: string;
  week_end: string;
  total_hours: number;
  approved: number;
  pending: number;
  rejected: number;
  mentor_feedback: string;
  learning_notes: string;
}

export interface AttendanceReport {
  total_days: number;
  present: number;
  absent: number;
  late: number;
  early_leave: number;
  on_leave: number;
  attendance_percentage: number;
  late_days: number;
}

// Task Management Types
export interface Task {
  id: number;
  title: string;
  description: string;
  department_id: number;
  assigned_by: number;
  assigned_to: number;
  assigned_to_intern_id?: number;
  task_type: 'WORK' | 'LEARNING' | 'MENTORING' | 'PROJECT' | 'TRAINING';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  status: 'NEW' | 'IN_PROGRESS' | 'IN_REVIEW' | 'COMPLETED' | 'CANCELLED';
  due_date: string;
  start_date: string;
  completed_at: string;
  estimated_hours: number;
  actual_hours: number;
  progress_percentage: number;
  learning_objectives?: string;
  skills_targeted?: string;
  created_at: string;
  updated_at: string;
  is_intern_task: boolean;
}

export interface TaskComment {
  id: number;
  task_id: number;
  user_id: number;
  comment: string;
  created_at: string;
  updated_at: string;
  user?: User;
}

export interface TaskHistory {
  id: number;
  task_id: number;
  changed_by: number;
  field_name: string;
  old_value: string;
  new_value: string;
  changed_at: string;
}

// Product & Inventory Types
export interface ProductCategory {
  id: number;
  name: string;
  description: string;
  parent_category_id?: number;
  created_at: string;
}

export interface Product {
  id: number;
  sku: string;
  name: string;
  description: string;
  category_id: number;
  unit_price: number;
  cost_price: number;
  quantity_in_stock: number;
  reorder_level: number;
  status: 'ACTIVE' | 'INACTIVE' | 'DISCONTINUED';
  image_url: string;
  specifications?: any;
  created_by: number;
  created_at: string;
  updated_at: string;
}

export interface InventoryMovement {
  id: number;
  product_id: number;
  movement_type: 'PURCHASE' | 'SALE' | 'RETURN' | 'ADJUSTMENT' | 'DAMAGE' | 'LOSS';
  quantity: number;
  reference_id: string;
  notes: string;
  recorded_by: number;
  movement_date: string;
}

export interface InventoryAdjustment {
  id: number;
  product_id: number;
  old_quantity: number;
  new_quantity: number;
  reason: string;
  approved_by: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  created_by: number;
  created_at: string;
  approved_at: string;
}

// Sales Types
export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  company: string;
  customer_type: 'RETAIL' | 'WHOLESALE' | 'CORPORATE';
  credit_limit: number;
  status: 'ACTIVE' | 'INACTIVE' | 'BLACKLISTED';
  notes: string;
  created_by: number;
  created_at: string;
  updated_at: string;
}

export interface Quotation {
  id: number;
  quote_number: string;
  customer_id: number;
  quotation_date: string;
  valid_until: string;
  subtotal: number;
  tax_amount: number;
  discount_amount: number;
  total: number;
  notes: string;
  status: 'DRAFT' | 'SENT' | 'ACCEPTED' | 'REJECTED' | 'EXPIRED';
  created_by: number;
  created_at: string;
  updated_at: string;
  customer?: Customer;
  items?: QuotationItem[];
}

export interface QuotationItem {
  id: number;
  quotation_id: number;
  product_id: number;
  quantity: number;
  unit_price: number;
  discount_percentage: number;
  line_total: number;
  product?: Product;
}

export interface SalesOrder {
  id: number;
  order_number: string;
  customer_id: number;
  quotation_id?: number;
  order_date: string;
  delivery_date: string;
  subtotal: number;
  tax_amount: number;
  discount_amount: number;
  total: number;
  payment_status: 'UNPAID' | 'PARTIALLY_PAID' | 'PAID';
  fulfillment_status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  notes: string;
  created_by: number;
  created_at: string;
  updated_at: string;
  customer?: Customer;
  items?: OrderItem[];
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  unit_price: number;
  discount_percentage: number;
  line_total: number;
}

export interface Payment {
  id: number;
  order_id: number;
  amount: number;
  payment_date: string;
  payment_method: 'CASH' | 'CHEQUE' | 'BANK_TRANSFER' | 'CREDIT_CARD' | 'DIGITAL_WALLET';
  reference_number: string;
  notes: string;
  recorded_by: number;
  created_at: string;
}

export interface SalesCommission {
  id: number;
  sales_staff_id: number;
  month: number;
  year: number;
  total_sales: number;
  commission_earned: number;
  bonus_amount: number;
  status: 'CALCULATED' | 'APPROVED' | 'PAID';
  approved_by: number;
  paid_date: string;
  created_at: string;
}

// POS Types
export interface POSSession {
  id: number;
  terminal_name: string;
  cashier_id: number;
  session_date: string;
  open_time: string;
  close_time: string;
  opening_balance: number;
  closing_balance: number;
  total_sales: number;
  total_discounts: number;
  total_taxes: number;
  status: 'OPEN' | 'CLOSED';
  created_at: string;
}

export interface POSTransaction {
  id: number;
  session_id: number;
  transaction_number: string;
  customer_name: string;
  transaction_date: string;
  subtotal: number;
  tax_amount: number;
  discount_amount: number;
  payment_amount: number;
  change_amount: number;
  payment_method: 'CASH' | 'CARD' | 'CHEQUE' | 'DIGITAL_WALLET';
  status: 'COMPLETED' | 'CANCELLED' | 'REFUNDED';
  notes: string;
  created_at: string;
  items?: POSItem[];
}

export interface POSItem {
  id: number;
  transaction_id: number;
  product_id: number;
  quantity: number;
  unit_price: number;
  discount_percentage: number;
  line_total: number;
  product?: Product;
}

export interface POSRefund {
  id: number;
  transaction_id: number;
  product_id?: number;
  quantity?: number;
  refund_amount: number;
  reason: string;
  approved_by: number;
  refund_date: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  created_at: string;
  approved_at: string;
}

// Intern-Specific Aggregated Types
export interface InternProgressDashboard {
  intern_id: number;
  intern_name: string;
  program: string;
  current_week: number;
  total_weeks: number;
  timesheet_hours: number;
  attendance_percentage: number;
  tasks_completed: number;
  tasks_in_progress: number;
  mentoring_sessions: number;
  learning_objectives_met: number;
  skills_developed: string[];
  evaluation_rating: number;
  mentor_feedback: string;
}
