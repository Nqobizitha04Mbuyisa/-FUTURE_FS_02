import api from './api.js';

export const leadService = {
  list: (params = {}) => api.get('/leads', { params }).then((r) => r.data),
  get: (id) => api.get(`/leads/${id}`).then((r) => r.data),
  create: (payload) => api.post('/leads', payload).then((r) => r.data),
  update: (id, payload) => api.put(`/leads/${id}`, payload).then((r) => r.data),
  remove: (id) => api.delete(`/leads/${id}`).then((r) => r.data),
  updateStatus: (id, status) =>
    api.put(`/leads/${id}/status`, { status }).then((r) => r.data),
  addNote: (id, noteText) =>
    api.post(`/leads/${id}/notes`, { noteText }).then((r) => r.data),

  // Public form submission (no auth)
  submitPublic: (payload) =>
    api.post('/public/leads', payload).then((r) => r.data),
};
