import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Registration API
export const registrationApi = {
  create: async (data: any) => {
    // Transform frontend data to match backend API
    const backendData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      organization: data.organization,
      location: `${data.city}, ${data.country}`, // Combine city and country
      participant_type: data.participant_type,
      area_of_interest: data.area_of_interest.join(', '), // Convert array to comma-separated string
      experience_level: data.experience_level,
      qiskit_experience: data.qiskit_experience, // Send as string
      expectations: data.expectations,
      referral_source: data.referral_source,
      consent_terms: data.consent_data_processing, // Map to backend field name
      consent_updates: data.consent_communications, // Map to backend field name
    };
    
    const response = await api.post('/api/v1/registrations', backendData);
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get(`/api/v1/registrations/${id}`);
    return response.data;
  },
};

// Admin API
export const adminApi = {
  login: async (username: string, password: string) => {
    const response = await api.post('/api/v1/admin/login', { username, password });
    return response.data;
  },
  getRegistrations: async (params?: any) => {
    const response = await api.get('/api/v1/admin/registrations', { params });
    return response.data;
  },
  updateRegistration: async (id: string, data: any) => {
    const response = await api.patch(`/api/v1/admin/registrations/${id}`, data);
    return response.data;
  },
  exportRegistrations: async () => {
    const response = await api.get('/api/v1/admin/registrations/export', {
      responseType: 'blob',
    });
    return response.data;
  },
};