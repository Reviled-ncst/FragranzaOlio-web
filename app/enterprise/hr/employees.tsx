'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/app/context/AuthContext';
import { ProtectRoute } from '@/app/components/ProtectedRoute';

function EmployeesContent() {
  const { user } = useAuth();
  const [employees, setEmployees] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    department_id: 1,
    position: '',
    salary: '',
    hire_date: new Date().toISOString().split('T')[0],
    status: 'ACTIVE',
  });

  const departments = [
    { id: 1, name: 'HR' },
    { id: 2, name: 'IT' },
    { id: 3, name: 'Marketing' },
    { id: 4, name: 'Sales' },
    { id: 5, name: 'Operations' },
  ];

  // Mock data
  const mockEmployees = [
    {
      id: 1,
      first_name: 'John',
      last_name: 'Smith',
      email: 'john@company.com',
      phone: '123-456-7890',
      department_id: 2,
      department_name: 'IT',
      position: 'Senior Developer',
      salary: 85000,
      hire_date: '2020-01-15',
      status: 'ACTIVE',
    },
    {
      id: 2,
      first_name: 'Sarah',
      last_name: 'Johnson',
      email: 'sarah@company.com',
      phone: '123-456-7891',
      department_id: 3,
      department_name: 'Marketing',
      position: 'Marketing Manager',
      salary: 72000,
      hire_date: '2021-03-20',
      status: 'ACTIVE',
    },
    {
      id: 3,
      first_name: 'Emma',
      last_name: 'Davis',
      email: 'emma@company.com',
      phone: '123-456-7892',
      department_id: 4,
      department_name: 'Sales',
      position: 'Sales Executive',
      salary: 65000,
      hire_date: '2022-06-10',
      status: 'ACTIVE',
    },
    {
      id: 4,
      first_name: 'Michael',
      last_name: 'Brown',
      email: 'michael@company.com',
      phone: '123-456-7893',
      department_id: 1,
      department_name: 'HR',
      position: 'HR Specialist',
      salary: 58000,
      hire_date: '2021-09-05',
      status: 'INACTIVE',
    },
    {
      id: 5,
      first_name: 'Grace',
      last_name: 'Wilson',
      email: 'grace@company.com',
      phone: '123-456-7894',
      department_id: 2,
      department_name: 'IT',
      position: 'Junior Developer',
      salary: 55000,
      hire_date: '2023-01-20',
      status: 'ACTIVE',
    },
  ];

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        setIsLoading(true);
        const filtered =
          filter === 'all'
            ? mockEmployees
            : mockEmployees.filter((e) => e.status === filter.toUpperCase());
        setEmployees(filtered);
      } catch (err) {
        console.error('Failed to load employees', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadEmployees();
  }, [filter]);

  const handleSubmit = async () => {
    try {
      if (editingId) {
        alert('Employee updated successfully');
      } else {
        alert('Employee created successfully');
      }
      setShowForm(false);
      setEditingId(null);
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        department_id: 1,
        position: '',
        salary: '',
        hire_date: new Date().toISOString().split('T')[0],
        status: 'ACTIVE',
      });
    } catch (err) {
      console.error('Failed to save employee', err);
    }
  };

  const handleEdit = (emp: any) => {
    setFormData({
      first_name: emp.first_name,
      last_name: emp.last_name,
      email: emp.email,
      phone: emp.phone,
      department_id: emp.department_id,
      position: emp.position,
      salary: emp.salary.toString(),
      hire_date: emp.hire_date,
      status: emp.status,
    });
    setEditingId(emp.id);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this employee?')) {
      setEmployees(employees.filter((e) => e.id !== id));
      alert('Employee deleted');
    }
  };

  return (
    <motion.div className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* Header */}
      <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white">Employee Management</h1>
            <p className="text-gray-400">Manage employee information, profiles, and assignments</p>
          </div>
          <motion.button
            onClick={() => {
              setEditingId(null);
              setFormData({
                first_name: '',
                last_name: '',
                email: '',
                phone: '',
                department_id: 1,
                position: '',
                salary: '',
                hire_date: new Date().toISOString().split('T')[0],
                status: 'ACTIVE',
              });
              setShowForm(!showForm);
            }}
            className="px-6 py-3 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30 rounded-lg font-medium transition-all"
            whileHover={{ scale: 1.05 }}
          >
            {showForm ? '✕ Cancel' : '+ New Employee'}
          </motion.button>
        </div>
      </motion.div>

      {/* Key Stats */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {[
          { label: 'Total Active', value: employees.filter((e) => e.status === 'ACTIVE').length, icon: '✓' },
          { label: 'Total Inactive', value: employees.filter((e) => e.status === 'INACTIVE').length, icon: '✕' },
          { label: 'Avg Salary', value: '$' + (employees.reduce((sum, e) => sum + e.salary, 0) / employees.length).toFixed(0), icon: '💰' },
          { label: 'Total Departments', value: departments.length, icon: '🏢' },
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            className="bg-gradient-to-br from-slate-900/50 to-black/50 border border-yellow-500/20 rounded-xl p-4"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 + idx * 0.05 }}
          >
            <div className="text-2xl mb-2">{stat.icon}</div>
            <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-yellow-400">{stat.value}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Employee Form */}
      {showForm && (
        <motion.div
          className="bg-gradient-to-br from-slate-900/50 to-black/50 border border-yellow-500/30 rounded-2xl p-6"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h2 className="text-xl font-bold text-white mb-4">{editingId ? 'Edit Employee' : 'Add New Employee'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">First Name</label>
              <input
                type="text"
                value={formData.first_name}
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-yellow-500/20 text-white focus:border-yellow-400 focus:outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Last Name</label>
              <input
                type="text"
                value={formData.last_name}
                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-yellow-500/20 text-white focus:border-yellow-400 focus:outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-yellow-500/20 text-white focus:border-yellow-400 focus:outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-yellow-500/20 text-white focus:border-yellow-400 focus:outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Department</label>
              <select
                value={formData.department_id}
                onChange={(e) => setFormData({ ...formData, department_id: parseInt(e.target.value) })}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-yellow-500/20 text-white focus:border-yellow-400 focus:outline-none transition"
              >
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Position</label>
              <input
                type="text"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-yellow-500/20 text-white focus:border-yellow-400 focus:outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Salary</label>
              <input
                type="number"
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-yellow-500/20 text-white focus:border-yellow-400 focus:outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Hire Date</label>
              <input
                type="date"
                value={formData.hire_date}
                onChange={(e) => setFormData({ ...formData, hire_date: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-yellow-500/20 text-white focus:border-yellow-400 focus:outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-yellow-500/20 text-white focus:border-yellow-400 focus:outline-none transition"
              >
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
              </select>
            </div>
          </div>
          <motion.button
            onClick={handleSubmit}
            className="w-full mt-4 px-4 py-3 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 border border-yellow-500/30 rounded-lg font-medium transition-all"
            whileHover={{ scale: 1.01 }}
          >
            {editingId ? 'Update Employee' : 'Add Employee'}
          </motion.button>
        </motion.div>
      )}

      {/* Filters */}
      <motion.div className="flex gap-3" initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
        {(['all', 'active', 'inactive'] as const).map((status) => (
          <motion.button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg font-medium transition-all capitalize ${
              filter === status
                ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                : 'bg-white/5 text-gray-400 border border-yellow-500/10 hover:border-yellow-500/30'
            }`}
            whileHover={{ scale: 1.05 }}
          >
            {status}
          </motion.button>
        ))}
      </motion.div>

      {/* Employee List */}
      {isLoading ? (
        <div className="text-center py-12">
          <div className="inline-block w-8 h-8 border-4 border-yellow-500/30 border-t-yellow-400 rounded-full animate-spin mb-4"></div>
          <p className="text-gray-400">Loading employees...</p>
        </div>
      ) : (
        <motion.div className="space-y-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          {employees.map((emp, idx) => (
            <motion.div
              key={emp.id}
              className="bg-gradient-to-br from-slate-900/50 to-black/50 border border-yellow-500/20 rounded-xl p-4 hover:border-yellow-500/40 transition-all"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + idx * 0.05 }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-white font-bold">
                    {emp.first_name} {emp.last_name}
                  </h3>
                  <p className="text-gray-400 text-sm">{emp.position}</p>
                </div>

                <div className="text-right">
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${
                      emp.status === 'ACTIVE'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {emp.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs mb-3">
                <div>
                  <p className="text-gray-500">Department</p>
                  <p className="text-yellow-400 font-semibold">{emp.department_name}</p>
                </div>
                <div>
                  <p className="text-gray-500">Salary</p>
                  <p className="text-yellow-400 font-semibold">${emp.salary.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-500">Email</p>
                  <p className="text-gray-400">{emp.email}</p>
                </div>
                <div>
                  <p className="text-gray-500">Hired</p>
                  <p className="text-gray-400">{emp.hire_date}</p>
                </div>
              </div>

              {/* Actions */}
              {user?.role === 'ADMIN' && (
                <div className="flex gap-2 mt-4 pt-4 border-t border-yellow-500/10">
                  <motion.button
                    onClick={() => handleEdit(emp)}
                    className="flex-1 px-3 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30 rounded text-xs font-medium transition-all"
                    whileHover={{ scale: 1.02 }}
                  >
                    ✎ Edit
                  </motion.button>
                  <motion.button
                    onClick={() => handleDelete(emp.id)}
                    className="flex-1 px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 rounded text-xs font-medium transition-all"
                    whileHover={{ scale: 1.02 }}
                  >
                    🗑 Delete
                  </motion.button>
                </div>
              )}
            </motion.div>
          ))}

          {employees.length === 0 && (
            <div className="text-center py-12 bg-white/5 rounded-lg border border-yellow-500/10">
              <p className="text-gray-400">No employees found</p>
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}

export default function EmployeesPage() {
  return (
    <ProtectRoute requiredRoles={['ADMIN', 'SUPERVISOR']}>
      <EmployeesContent />
    </ProtectRoute>
  );
}
