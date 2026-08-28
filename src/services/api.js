const API_BASE = "/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("portfolio_token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const handleResponse = async (res) => {
  const json = await res.json().catch(() => ({}));
  if (!res.ok || json.success === false) {
    throw new Error(json.message || `Request failed with status ${res.status}`);
  }
  return json.data !== undefined ? json.data : json;
};

export const api = {
  // Auth
  login: async (credentials) => {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    return res.json();
  },

  getMe: async () => {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: getAuthHeaders(),
    });
    return res.json();
  },

  updatePassword: async (passwords) => {
    const res = await fetch(`${API_BASE}/auth/password`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(passwords),
    });
    return handleResponse(res);
  },

  // Profile
  getProfile: async () => {
    const res = await fetch(`${API_BASE}/profile`);
    return handleResponse(res);
  },

  updateProfile: async (data) => {
    const res = await fetch(`${API_BASE}/profile`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  // Skills
  getSkills: async () => {
    const res = await fetch(`${API_BASE}/skills`);
    const data = await handleResponse(res);
    return Array.isArray(data) ? data : (data?.data || []);
  },

  createSkill: async (data) => {
    const res = await fetch(`${API_BASE}/skills`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  updateSkill: async (id, data) => {
    const res = await fetch(`${API_BASE}/skills/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  deleteSkill: async (id) => {
    const res = await fetch(`${API_BASE}/skills/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    return handleResponse(res);
  },

  reorderSkills: async (order) => {
    const res = await fetch(`${API_BASE}/skills/reorder`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify({ order }),
    });
    return handleResponse(res);
  },

  // Projects
  getProjects: async () => {
    const res = await fetch(`${API_BASE}/projects`);
    const data = await handleResponse(res);
    return Array.isArray(data) ? data : (data?.data || []);
  },

  getProjectBySlug: async (slug) => {
    const res = await fetch(`${API_BASE}/projects/${slug}`);
    return handleResponse(res);
  },

  createProject: async (data) => {
    const res = await fetch(`${API_BASE}/projects`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  updateProject: async (id, data) => {
    const res = await fetch(`${API_BASE}/projects/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  deleteProject: async (id) => {
    const res = await fetch(`${API_BASE}/projects/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    return handleResponse(res);
  },

  // Experience (both singular and plural methods)
  getExperiences: async () => {
    const res = await fetch(`${API_BASE}/experience`);
    const data = await handleResponse(res);
    return Array.isArray(data) ? data : (data?.data || []);
  },

  getExperience: async () => {
    const res = await fetch(`${API_BASE}/experience`);
    const data = await handleResponse(res);
    return Array.isArray(data) ? data : (data?.data || []);
  },

  createExperience: async (data) => {
    const res = await fetch(`${API_BASE}/experience`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  updateExperience: async (id, data) => {
    const res = await fetch(`${API_BASE}/experience/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  deleteExperience: async (id) => {
    const res = await fetch(`${API_BASE}/experience/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    return handleResponse(res);
  },

  // Education (both singular and plural methods)
  getEducations: async () => {
    const res = await fetch(`${API_BASE}/education`);
    const data = await handleResponse(res);
    return Array.isArray(data) ? data : (data?.data || []);
  },

  getEducation: async () => {
    const res = await fetch(`${API_BASE}/education`);
    const data = await handleResponse(res);
    return Array.isArray(data) ? data : (data?.data || []);
  },

  createEducation: async (data) => {
    const res = await fetch(`${API_BASE}/education`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  updateEducation: async (id, data) => {
    const res = await fetch(`${API_BASE}/education/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  deleteEducation: async (id) => {
    const res = await fetch(`${API_BASE}/education/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    return handleResponse(res);
  },

  // Contact / Messages
  sendMessage: async (data) => {
    const res = await fetch(`${API_BASE}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  sendContactMessage: async (data) => {
    const res = await fetch(`${API_BASE}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  getMessages: async () => {
    const res = await fetch(`${API_BASE}/messages`, {
      headers: getAuthHeaders(),
    });
    const data = await handleResponse(res);
    return Array.isArray(data) ? data : (data?.data || []);
  },

  markMessageRead: async (id, read = true) => {
    const res = await fetch(`${API_BASE}/messages/${id}/read`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify({ read }),
    });
    return handleResponse(res);
  },

  updateMessageReadStatus: async (id, read = true) => {
    const res = await fetch(`${API_BASE}/messages/${id}/read`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify({ read }),
    });
    return handleResponse(res);
  },

  deleteMessage: async (id) => {
    const res = await fetch(`${API_BASE}/messages/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    return handleResponse(res);
  },

  // Admin Stats
  getStats: async () => {
    const res = await fetch(`${API_BASE}/admin/stats`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(res);
  },

  reseedData: async () => {
    const res = await fetch(`${API_BASE}/admin/reseed`, {
      method: "POST",
      headers: getAuthHeaders(),
    });
    return handleResponse(res);
  },
};
