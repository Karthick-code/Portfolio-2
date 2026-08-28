const API_BASE = "/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("portfolio_token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
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
    return res.json();
  },

  // Profile
  getProfile: async () => {
    const res = await fetch(`${API_BASE}/profile`);
    return res.json();
  },

  updateProfile: async (data) => {
    const res = await fetch(`${API_BASE}/profile`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  // Skills
  getSkills: async () => {
    const res = await fetch(`${API_BASE}/skills`);
    return res.json();
  },

  createSkill: async (data) => {
    const res = await fetch(`${API_BASE}/skills`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  updateSkill: async (id, data) => {
    const res = await fetch(`${API_BASE}/skills/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  deleteSkill: async (id) => {
    const res = await fetch(`${API_BASE}/skills/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    return res.json();
  },

  reorderSkills: async (order) => {
    const res = await fetch(`${API_BASE}/skills/reorder`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify({ order }),
    });
    return res.json();
  },

  // Projects
  getProjects: async () => {
    const res = await fetch(`${API_BASE}/projects`);
    return res.json();
  },

  getProjectBySlug: async (slug) => {
    const res = await fetch(`${API_BASE}/projects/${slug}`);
    return res.json();
  },

  createProject: async (data) => {
    const res = await fetch(`${API_BASE}/projects`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  updateProject: async (id, data) => {
    const res = await fetch(`${API_BASE}/projects/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  deleteProject: async (id) => {
    const res = await fetch(`${API_BASE}/projects/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    return res.json();
  },

  // Experience
  getExperiences: async () => {
    const res = await fetch(`${API_BASE}/experience`);
    return res.json();
  },

  createExperience: async (data) => {
    const res = await fetch(`${API_BASE}/experience`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  updateExperience: async (id, data) => {
    const res = await fetch(`${API_BASE}/experience/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  deleteExperience: async (id) => {
    const res = await fetch(`${API_BASE}/experience/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    return res.json();
  },

  // Education
  getEducations: async () => {
    const res = await fetch(`${API_BASE}/education`);
    return res.json();
  },

  createEducation: async (data) => {
    const res = await fetch(`${API_BASE}/education`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  updateEducation: async (id, data) => {
    const res = await fetch(`${API_BASE}/education/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  deleteEducation: async (id) => {
    const res = await fetch(`${API_BASE}/education/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    return res.json();
  },

  // Contact / Messages
  sendMessage: async (data) => {
    const res = await fetch(`${API_BASE}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  getMessages: async () => {
    const res = await fetch(`${API_BASE}/messages`, {
      headers: getAuthHeaders(),
    });
    return res.json();
  },

  markMessageRead: async (id, read = true) => {
    const res = await fetch(`${API_BASE}/messages/${id}/read`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify({ read }),
    });
    return res.json();
  },

  deleteMessage: async (id) => {
    const res = await fetch(`${API_BASE}/messages/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    return res.json();
  },

  // Admin Stats
  getStats: async () => {
    const res = await fetch(`${API_BASE}/admin/stats`, {
      headers: getAuthHeaders(),
    });
    return res.json();
  },

  reseedData: async () => {
    const res = await fetch(`${API_BASE}/admin/reseed`, {
      method: "POST",
      headers: getAuthHeaders(),
    });
    return res.json();
  },
};
