// Enterprise System API Services
// All modules with intern support

import {
  Employee, Timesheet, AttendanceLog, LeaveRequest, OvertimeRequest,
  Task, TaskComment, TaskHistory,
  Product, InventoryMovement, InventoryAdjustment,
  Customer, Quotation, SalesOrder, Payment, SalesCommission,
  POSSession, POSTransaction, POSRefund,
  InternProgressDashboard, AttendanceReport
} from '@/app/types/enterprises';

const API_BASE_URL = 'http://localhost/internship-system/api';

const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem('auth');
    if (data) {
      try {
        return JSON.parse(data).token;
      } catch {
        return null;
      }
    }
  }
  return null;
};

const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
};

// ============================================================================
// HR SERVICES (Employees, Timesheets, Attendance, Leave, Overtime)
// ============================================================================

export const hrService = {
  // EMPLOYEES
  getEmployees: async (filters?: any) => {
    const params = new URLSearchParams(filters || {});
    return fetchWithAuth(`${API_BASE_URL}/hr/employees?${params}`);
  },

  getEmployee: async (id: string) => {
    return fetchWithAuth(`${API_BASE_URL}/hr/employees/${id}`);
  },

  createEmployee: async (data: Partial<Employee>) => {
    return fetchWithAuth(`${API_BASE_URL}/hr/employees`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateEmployee: async (id: string, data: Partial<Employee>) => {
    return fetchWithAuth(`${API_BASE_URL}/hr/employees/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // TIMESHEETS (Employees & Interns)
  getTimesheets: async (filters?: { employee_id?: string; intern_id?: string; status?: string; date?: string }) => {
    const params = new URLSearchParams();
    if (filters?.employee_id) params.append('employee_id', filters.employee_id);
    if (filters?.intern_id) params.append('intern_id', filters.intern_id);
    if (filters?.status) params.append('status', filters.status);
    if (filters?.date) params.append('date', filters.date);

    return fetchWithAuth(`${API_BASE_URL}/hr/timesheets?${params}`);
  },

  submitTimesheet: async (data: Partial<Timesheet>) => {
    return fetchWithAuth(`${API_BASE_URL}/hr/timesheets`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  approveTimesheet: async (id: string, approve: boolean, feedback?: string) => {
    return fetchWithAuth(`${API_BASE_URL}/hr/timesheets/${id}/approve`, {
      method: 'PUT',
      body: JSON.stringify({ approve, feedback }),
    });
  },

  getInternTimesheetSummary: async (internId: string, weekStart: string) => {
    return fetchWithAuth(`${API_BASE_URL}/hr/interns/${internId}/timesheet-summary?week_start=${weekStart}`);
  },

  // ATTENDANCE (Employees & Interns)
  checkIn: async (data: { employee_id?: string; intern_id?: string; latitude?: string; longitude?: string; device_info?: string }) => {
    return fetchWithAuth(`${API_BASE_URL}/hr/attendance/check-in`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  checkOut: async (data: { employee_id?: string; intern_id?: string; latitude?: string; longitude?: string }) => {
    return fetchWithAuth(`${API_BASE_URL}/hr/attendance/check-out`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  getAttendanceHistory: async (filters?: { employee_id?: string; intern_id?: string; month?: string; year?: string }) => {
    const params = new URLSearchParams();
    if (filters?.employee_id) params.append('employee_id', filters.employee_id);
    if (filters?.intern_id) params.append('intern_id', filters.intern_id);
    if (filters?.month) params.append('month', filters.month);
    if (filters?.year) params.append('year', filters.year);

    return fetchWithAuth(`${API_BASE_URL}/hr/attendance?${params}`);
  },

  getAttendanceReport: async (employeeId: string, month: number, year: number) => {
    return fetchWithAuth(`${API_BASE_URL}/hr/attendance/report?employee_id=${employeeId}&month=${month}&year=${year}`);
  },

  // LEAVE REQUESTS
  requestLeave: async (data: Partial<LeaveRequest>) => {
    return fetchWithAuth(`${API_BASE_URL}/hr/leaves`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  getLeaveRequests: async (filters?: { employee_id?: string; intern_id?: string; status?: string }) => {
    const params = new URLSearchParams();
    if (filters?.employee_id) params.append('employee_id', filters.employee_id);
    if (filters?.intern_id) params.append('intern_id', filters.intern_id);
    if (filters?.status) params.append('status', filters.status);

    return fetchWithAuth(`${API_BASE_URL}/hr/leaves?${params}`);
  },

  approveLeave: async (id: string, approve: boolean, reason?: string) => {
    return fetchWithAuth(`${API_BASE_URL}/hr/leaves/${id}/approve`, {
      method: 'PUT',
      body: JSON.stringify({ approve, rejection_reason: reason }),
    });
  },

  // OVERTIME
  requestOvertime: async (data: Partial<OvertimeRequest>) => {
    return fetchWithAuth(`${API_BASE_URL}/hr/overtime`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  getOvertimeRequests: async (filters?: { employee_id?: string; intern_id?: string; status?: string }) => {
    const params = new URLSearchParams();
    if (filters?.employee_id) params.append('employee_id', filters.employee_id);
    if (filters?.intern_id) params.append('intern_id', filters.intern_id);
    if (filters?.status) params.append('status', filters.status);

    return fetchWithAuth(`${API_BASE_URL}/hr/overtime?${params}`);
  },

  approveOvertime: async (id: string, approve: boolean) => {
    return fetchWithAuth(`${API_BASE_URL}/hr/overtime/${id}/approve`, {
      method: 'PUT',
      body: JSON.stringify({ approve }),
    });
  },
};

// ============================================================================
// TASK MANAGEMENT SERVICES (with Intern Tasks)
// ============================================================================

export const taskService = {
  getTasks: async (filters?: { assigned_to?: string; assigned_to_intern_id?: string; status?: string; priority?: string }) => {
    const params = new URLSearchParams();
    if (filters?.assigned_to) params.append('assigned_to', filters.assigned_to);
    if (filters?.assigned_to_intern_id) params.append('assigned_to_intern_id', filters.assigned_to_intern_id);
    if (filters?.status) params.append('status', filters.status);
    if (filters?.priority) params.append('priority', filters.priority);

    return fetchWithAuth(`${API_BASE_URL}/tasks?${params}`);
  },

  getTask: async (id: string) => {
    return fetchWithAuth(`${API_BASE_URL}/tasks/${id}`);
  },

  createTask: async (data: Partial<Task>) => {
    return fetchWithAuth(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateTask: async (id: string, data: Partial<Task>) => {
    return fetchWithAuth(`${API_BASE_URL}/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  updateTaskStatus: async (id: string, status: string, progressPercentage?: number) => {
    return fetchWithAuth(`${API_BASE_URL}/tasks/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status, progress_percentage: progressPercentage }),
    });
  },

  logHours: async (id: string, hours: number, notes?: string) => {
    return fetchWithAuth(`${API_BASE_URL}/tasks/${id}/hours`, {
      method: 'POST',
      body: JSON.stringify({ actual_hours: hours, notes }),
    });
  },

  // Comments
  addComment: async (taskId: string, comment: string) => {
    return fetchWithAuth(`${API_BASE_URL}/tasks/${taskId}/comments`, {
      method: 'POST',
      body: JSON.stringify({ comment }),
    });
  },

  getComments: async (taskId: string) => {
    return fetchWithAuth(`${API_BASE_URL}/tasks/${taskId}/comments`);
  },

  // History
  getTaskHistory: async (taskId: string) => {
    return fetchWithAuth(`${API_BASE_URL}/tasks/${taskId}/history`);
  },

  // Intern-specific
  getInternTasks: async (internId: string) => {
    return fetchWithAuth(`${API_BASE_URL}/tasks?assigned_to_intern_id=${internId}`);
  },

  assignInternTask: async (internId: string, taskData: Partial<Task>) => {
    return fetchWithAuth(`${API_BASE_URL}/tasks/assign-intern`, {
      method: 'POST',
      body: JSON.stringify({ ...taskData, assigned_to_intern_id: internId, is_intern_task: true }),
    });
  },
};

// ============================================================================
// PRODUCT & INVENTORY SERVICES
// ============================================================================

export const inventoryService = {
  // Products
  getProducts: async (filters?: { category_id?: string; status?: string }) => {
    const params = new URLSearchParams();
    if (filters?.category_id) params.append('category_id', filters.category_id);
    if (filters?.status) params.append('status', filters.status);

    return fetchWithAuth(`${API_BASE_URL}/products?${params}`);
  },

  getProduct: async (id: string) => {
    return fetchWithAuth(`${API_BASE_URL}/products/${id}`);
  },

  createProduct: async (data: Partial<Product>) => {
    return fetchWithAuth(`${API_BASE_URL}/products`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateProduct: async (id: string, data: Partial<Product>) => {
    return fetchWithAuth(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // Inventory Movements
  recordMovement: async (data: {
    product_id: string;
    movement_type: string;
    quantity: number;
    reference_id?: string;
    notes?: string;
  }) => {
    return fetchWithAuth(`${API_BASE_URL}/inventory/movements`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  getMovementHistory: async (productId: string) => {
    return fetchWithAuth(`${API_BASE_URL}/inventory/movements?product_id=${productId}`);
  },

  // Stock Adjustments
  requestAdjustment: async (data: {
    product_id: string;
    old_quantity: number;
    new_quantity: number;
    reason: string;
  }) => {
    return fetchWithAuth(`${API_BASE_URL}/inventory/adjustments`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  approveAdjustment: async (id: string, approve: boolean) => {
    return fetchWithAuth(`${API_BASE_URL}/inventory/adjustments/${id}/approve`, {
      method: 'PUT',
      body: JSON.stringify({ approve }),
    });
  },

  // Reports
  getLowStockAlert: async () => {
    return fetchWithAuth(`${API_BASE_URL}/inventory/reports/low-stock`);
  },

  getInventoryReport: async (month?: number, year?: number) => {
    const params = new URLSearchParams();
    if (month) params.append('month', String(month));
    if (year) params.append('year', String(year));

    return fetchWithAuth(`${API_BASE_URL}/inventory/reports?${params}`);
  },
};

// ============================================================================
// SALES SERVICES (with Intern shadowing)
// ============================================================================

export const salesService = {
  // Customers
  getCustomers: async (filters?: { type?: string; status?: string }) => {
    const params = new URLSearchParams();
    if (filters?.type) params.append('customer_type', filters.type);
    if (filters?.status) params.append('status', filters.status);

    return fetchWithAuth(`${API_BASE_URL}/sales/customers?${params}`);
  },

  getCustomer: async (id: string) => {
    return fetchWithAuth(`${API_BASE_URL}/sales/customers/${id}`);
  },

  createCustomer: async (data: Partial<Customer>) => {
    return fetchWithAuth(`${API_BASE_URL}/sales/customers`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Quotations
  createQuotation: async (data: Partial<Quotation> & { items: any[] }) => {
    return fetchWithAuth(`${API_BASE_URL}/sales/quotations`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  getQuotations: async (filters?: { customer_id?: string; status?: string }) => {
    const params = new URLSearchParams();
    if (filters?.customer_id) params.append('customer_id', filters.customer_id);
    if (filters?.status) params.append('status', filters.status);

    return fetchWithAuth(`${API_BASE_URL}/sales/quotations?${params}`);
  },

  updateQuotationStatus: async (id: string, status: string) => {
    return fetchWithAuth(`${API_BASE_URL}/sales/quotations/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  },

  // Sales Orders
  createOrder: async (data: Partial<SalesOrder> & { items: any[] }) => {
    return fetchWithAuth(`${API_BASE_URL}/sales/orders`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  getOrders: async (filters?: { customer_id?: string; payment_status?: string; fulfillment_status?: string }) => {
    const params = new URLSearchParams();
    if (filters?.customer_id) params.append('customer_id', filters.customer_id);
    if (filters?.payment_status) params.append('payment_status', filters.payment_status);
    if (filters?.fulfillment_status) params.append('fulfillment_status', filters.fulfillment_status);

    return fetchWithAuth(`${API_BASE_URL}/sales/orders?${params}`);
  },

  updateOrderStatus: async (id: string, fulfillmentStatus: string) => {
    return fetchWithAuth(`${API_BASE_URL}/sales/orders/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ fulfillment_status: fulfillmentStatus }),
    });
  },

  // Payments
  recordPayment: async (data: Partial<Payment>) => {
    return fetchWithAuth(`${API_BASE_URL}/sales/payments`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  getPayments: async (orderId: string) => {
    return fetchWithAuth(`${API_BASE_URL}/sales/orders/${orderId}/payments`);
  },

  // Commissions
  getCommissions: async (month: number, year: number) => {
    return fetchWithAuth(`${API_BASE_URL}/sales/commissions?month=${month}&year=${year}`);
  },

  calculateCommissions: async (month: number, year: number) => {
    return fetchWithAuth(`${API_BASE_URL}/sales/commissions/calculate`, {
      method: 'POST',
      body: JSON.stringify({ month, year }),
    });
  },
};

// ============================================================================
// POS SERVICES
// ============================================================================

export const posService = {
  // Sessions
  openSession: async (data: { terminal_name: string; opening_balance: number }) => {
    return fetchWithAuth(`${API_BASE_URL}/pos/sessions/open`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  getOpenSession: async () => {
    return fetchWithAuth(`${API_BASE_URL}/pos/sessions/current`);
  },

  closeSession: async (sessionId: string, closingBalance: number) => {
    return fetchWithAuth(`${API_BASE_URL}/pos/sessions/${sessionId}/close`, {
      method: 'PUT',
      body: JSON.stringify({ closing_balance: closingBalance }),
    });
  },

  // Transactions
  createTransaction: async (data: {
    session_id: string;
    customer_name?: string;
    items: any[];
    payment_method: string;
    payment_amount: number;
  }) => {
    return fetchWithAuth(`${API_BASE_URL}/pos/transactions`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  getTransactions: async (sessionId: string) => {
    return fetchWithAuth(`${API_BASE_URL}/pos/transactions?session_id=${sessionId}`);
  },

  voidTransaction: async (id: string) => {
    return fetchWithAuth(`${API_BASE_URL}/pos/transactions/${id}/void`, {
      method: 'PUT',
    });
  },

  // Refunds
  createRefund: async (data: Partial<POSRefund>) => {
    return fetchWithAuth(`${API_BASE_URL}/pos/refunds`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  approveRefund: async (id: string) => {
    return fetchWithAuth(`${API_BASE_URL}/pos/refunds/${id}/approve`, {
      method: 'PUT',
    });
  },

  // Reports
  getDailyReport: async (sessionId: string) => {
    return fetchWithAuth(`${API_BASE_URL}/pos/reports/session/${sessionId}`);
  },
};

// ============================================================================
// INTERN-SPECIFIC AGGREGATED SERVICES
// ============================================================================

export const internService = {
  getInternProgressDashboard: async (internId: string): Promise<{ data: InternProgressDashboard }> => {
    return fetchWithAuth(`${API_BASE_URL}/interns/${internId}/progress-dashboard`);
  },

  getInternMetrics: async (internId: string) => {
    return fetchWithAuth(`${API_BASE_URL}/interns/${internId}/metrics`);
  },

  getInternActivities: async (internId: string, days: number = 7) => {
    return fetchWithAuth(`${API_BASE_URL}/interns/${internId}/activities?days=${days}`);
  },

  getInternPerformanceReport: async (internId: string) => {
    return fetchWithAuth(`${API_BASE_URL}/interns/${internId}/performance-report`);
  },

  // Mentor feedback
  submitMentorFeedback: async (internId: string, feedback: string, rating: number) => {
    return fetchWithAuth(`${API_BASE_URL}/interns/${internId}/mentor-feedback`, {
      method: 'POST',
      body: JSON.stringify({ feedback, rating }),
    });
  },

  // Learning tracking
  logLearning: async (internId: string, learningObjective: string, skillsDeveloped: string[]) => {
    return fetchWithAuth(`${API_BASE_URL}/interns/${internId}/learning`, {
      method: 'POST',
      body: JSON.stringify({ learning_objective: learningObjective, skills_developed: skillsDeveloped }),
    });
  },

  // Intern report
  submitInternReport: async (internId: string, weekNumber: number, reportText: string) => {
    return fetchWithAuth(`${API_BASE_URL}/interns/${internId}/report`, {
      method: 'POST',
      body: JSON.stringify({ week_number: weekNumber, report_text: reportText }),
    });
  },
};
