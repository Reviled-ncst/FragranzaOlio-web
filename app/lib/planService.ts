import { ActivityLog, ApiResponse } from '@/app/types/account';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost/internship-system/api';

// Type definitions for plans
export interface Plan {
  id: string;
  title: string;
  description: string;
  department_id: number;
  duration_weeks: number;
  mentor_id?: number;
  mentor_name?: string;
  status: 'DRAFT' | 'ACTIVE' | 'COMPLETED' | 'ARCHIVED';
  learning_objectives: string;
  skills_to_develop: string;
  tools_technologies: string;
  expected_outcomes: string;
  assessment_criteria: string;
  created_at: string;
  updated_at: string;
}

export interface PlanMilestone {
  id: string;
  plan_id: string;
  week_number: number;
  phase_name: string;
  description: string;
  objectives: string;
  tasks: string;
  deliverables: string;
  due_date: string;
}

export interface PlanAssignment {
  id: string;
  plan_id: string;
  intern_id: string;
  intern_name: string;
  start_date: string;
  end_date?: string;
  progress_percentage: number;
  status: 'ASSIGNED' | 'IN_PROGRESS' | 'COMPLETED' | 'DROPPED';
  assigned_at: string;
  completed_at?: string;
}

export interface CreatePlanRequest {
  title: string;
  description: string;
  department_id: number;
  duration_weeks: number;
  mentor_id?: number;
  learning_objectives: string;
  skills_to_develop: string;
  tools_technologies: string;
  expected_outcomes: string;
  assessment_criteria: string;
}

export interface UpdatePlanRequest extends Partial<CreatePlanRequest> {
  status?: 'DRAFT' | 'ACTIVE' | 'COMPLETED' | 'ARCHIVED';
}

// Get auth token from localStorage
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

// Generic fetch wrapper with auth
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

// Plan Service
export const planService = {
  // List all plans
  listPlans: async (filter?: { status?: string; department_id?: number }): Promise<ApiResponse<Plan[]>> => {
    let url = `${API_BASE_URL}/plans/list.php`;
    if (filter) {
      const params = new URLSearchParams();
      if (filter.status) params.append('status', filter.status);
      if (filter.department_id) params.append('department_id', String(filter.department_id));
      if (params.toString()) url += `?${params.toString()}`;
    }

    return fetchWithAuth(url, {
      method: 'GET',
    });
  },

  // Get specific plan with milestones
  getPlan: async (id: string): Promise<ApiResponse<Plan & { milestones: PlanMilestone[] }>> => {
    return fetchWithAuth(`${API_BASE_URL}/plans/get.php?id=${id}`, {
      method: 'GET',
    });
  },

  // Create new plan
  createPlan: async (data: CreatePlanRequest): Promise<ApiResponse<Plan>> => {
    return fetchWithAuth(`${API_BASE_URL}/plans/create.php`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Update plan
  updatePlan: async (id: string, data: UpdatePlanRequest): Promise<ApiResponse<Plan>> => {
    return fetchWithAuth(`${API_BASE_URL}/plans/update.php?id=${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // Delete plan
  deletePlan: async (id: string): Promise<ApiResponse<{ message: string }>> => {
    return fetchWithAuth(`${API_BASE_URL}/plans/delete.php?id=${id}`, {
      method: 'DELETE',
    });
  },

  // Get plan assignments
  getAssignments: async (planId: string): Promise<ApiResponse<PlanAssignment[]>> => {
    return fetchWithAuth(`${API_BASE_URL}/plans/assignments.php?plan_id=${planId}`, {
      method: 'GET',
    });
  },

  // Assign intern to plan
  assignIntern: async (planId: string, internId: string, startDate: string): Promise<ApiResponse<PlanAssignment>> => {
    return fetchWithAuth(`${API_BASE_URL}/plans/assign.php`, {
      method: 'POST',
      body: JSON.stringify({
        plan_id: planId,
        intern_id: internId,
        start_date: startDate,
      }),
    });
  },

  // Get milestone progress
  getMilestoneProgress: async (assignmentId: string): Promise<ApiResponse<any>> => {
    return fetchWithAuth(`${API_BASE_URL}/plans/progress.php?assignment_id=${assignmentId}`, {
      method: 'GET',
    });
  },

  // Update milestone progress
  updateMilestoneProgress: async (progressId: string, status: string, notes?: string): Promise<ApiResponse<any>> => {
    return fetchWithAuth(`${API_BASE_URL}/plans/progress.php?id=${progressId}`, {
      method: 'PUT',
      body: JSON.stringify({
        status,
        notes,
      }),
    });
  },
};
