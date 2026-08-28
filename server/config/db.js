import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";

// MySQL configuration extracted from environment variables
const getMysqlConfig = () => {
  const connectionUrl = process.env.MYSQL_URL || process.env.DATABASE_URL;
  if (connectionUrl) {
    return connectionUrl;
  }

  return {
    host: process.env.MYSQL_HOST || "localhost",
    port: parseInt(process.env.MYSQL_PORT || "3306", 10),
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "",
    database: process.env.MYSQL_DATABASE || "portfolio_db",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
  };
};

// In-memory relational storage layer fallback when live MySQL instance is connecting/offline
let memoryStore = {
  users: [],
  profiles: [],
  skills: [],
  projects: [],
  experiences: [],
  educations: [],
  messages: [],
};

let pool = null;
let isUsingRealMysql = false;

// Generate UUID-like unique IDs
export const generateId = () => {
  return "id_" + Date.now().toString(36) + "_" + Math.random().toString(36).substr(2, 9);
};

// Create tables if they do not exist
const initTables = async (connection) => {
  const tableDefinitions = [
    `CREATE TABLE IF NOT EXISTS users (
      id VARCHAR(64) PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      name VARCHAR(255) NOT NULL,
      role VARCHAR(50) DEFAULT 'admin',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,

    `CREATE TABLE IF NOT EXISTS profiles (
      id VARCHAR(64) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      title VARCHAR(255) NOT NULL,
      tagline TEXT,
      bio TEXT,
      philosophy TEXT,
      approach TEXT,
      interests JSON,
      email VARCHAR(255),
      phone VARCHAR(100),
      location VARCHAR(255),
      github VARCHAR(255),
      linkedin VARCHAR(255),
      website VARCHAR(255),
      resume_url TEXT,
      profile_image TEXT,
      status_text VARCHAR(100),
      is_available BOOLEAN DEFAULT TRUE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,

    `CREATE TABLE IF NOT EXISTS skills (
      id VARCHAR(64) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      category VARCHAR(100) NOT NULL,
      icon VARCHAR(100) NOT NULL,
      description TEXT,
      display_order INT DEFAULT 0,
      featured BOOLEAN DEFAULT FALSE,
      animation_enabled BOOLEAN DEFAULT TRUE,
      proficiency INT DEFAULT 90,
      color VARCHAR(50),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,

    `CREATE TABLE IF NOT EXISTS projects (
      id VARCHAR(64) PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      slug VARCHAR(255) UNIQUE NOT NULL,
      description TEXT,
      full_description TEXT,
      technologies JSON,
      live_url TEXT,
      github_url TEXT,
      image_url TEXT,
      featured BOOLEAN DEFAULT FALSE,
      order_num INT DEFAULT 0,
      challenges JSON,
      solutions JSON,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,

    `CREATE TABLE IF NOT EXISTS experiences (
      id VARCHAR(64) PRIMARY KEY,
      company VARCHAR(255) NOT NULL,
      position VARCHAR(255) NOT NULL,
      location VARCHAR(255),
      start_date VARCHAR(100) NOT NULL,
      end_date VARCHAR(100) DEFAULT 'Present',
      description TEXT,
      responsibilities JSON,
      technologies JSON,
      order_num INT DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,

    `CREATE TABLE IF NOT EXISTS educations (
      id VARCHAR(64) PRIMARY KEY,
      institution VARCHAR(255) NOT NULL,
      degree VARCHAR(255) NOT NULL,
      field VARCHAR(255),
      start_date VARCHAR(100) NOT NULL,
      end_date VARCHAR(100),
      description TEXT,
      location VARCHAR(255),
      order_num INT DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,

    `CREATE TABLE IF NOT EXISTS messages (
      id VARCHAR(64) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      subject VARCHAR(255),
      message TEXT NOT NULL,
      is_read BOOLEAN DEFAULT FALSE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,
  ];

  for (const sql of tableDefinitions) {
    await connection.query(sql);
  }
};

export const connectMySQL = async () => {
  const config = getMysqlConfig();
  console.log("[MySQL] Initializing MySQL connection adapter...");

  try {
    if (typeof config === "string") {
      pool = mysql.createPool(config);
    } else {
      pool = mysql.createPool(config);
    }

    // Test connection with a fast ping
    const connection = await pool.getConnection();
    console.log("[MySQL] Successfully connected to live MySQL database server!");
    await initTables(connection);
    connection.release();
    isUsingRealMysql = true;
    return pool;
  } catch (err) {
    console.warn(
      `[MySQL Notice] Direct MySQL connection to host was not reachable (${err.message}). ` +
      `Activating embedded relational memory store for development. MySQL schema and query builder are ready when environment variables are supplied.`
    );
    isUsingRealMysql = false;
    return null;
  }
};

// Safe JSON parser helper
const parseJSON = (val, defaultVal = []) => {
  if (!val) return defaultVal;
  if (typeof val === "object") return val;
  try {
    return JSON.parse(val);
  } catch {
    return defaultVal;
  }
};

// Unified Database API (MySQL Queries with in-memory relational fallback)
export const db = {
  get isConnectedToMySQL() {
    return isUsingRealMysql;
  },

  // USERS
  async findUserByEmail(email) {
    const cleanEmail = email.toLowerCase().trim();
    if (isUsingRealMysql && pool) {
      const [rows] = await pool.query("SELECT * FROM users WHERE email = ? LIMIT 1", [cleanEmail]);
      if (rows.length === 0) return null;
      const r = rows[0];
      return { _id: r.id, id: r.id, email: r.email, password: r.password, name: r.name, role: r.role, createdAt: r.created_at };
    }
    const u = memoryStore.users.find((user) => user.email.toLowerCase() === cleanEmail);
    return u ? { ...u } : null;
  },

  async findUserById(id) {
    if (isUsingRealMysql && pool) {
      const [rows] = await pool.query("SELECT * FROM users WHERE id = ? LIMIT 1", [id]);
      if (rows.length === 0) return null;
      const r = rows[0];
      return { _id: r.id, id: r.id, email: r.email, password: r.password, name: r.name, role: r.role, createdAt: r.created_at };
    }
    const u = memoryStore.users.find((user) => user._id === id || user.id === id);
    return u ? { ...u } : null;
  },

  async countUsers() {
    if (isUsingRealMysql && pool) {
      const [rows] = await pool.query("SELECT COUNT(*) as count FROM users");
      return rows[0].count;
    }
    return memoryStore.users.length;
  },

  async createUser(userData) {
    const id = userData._id || userData.id || generateId();
    const newUser = {
      _id: id,
      id,
      email: userData.email.toLowerCase().trim(),
      password: userData.password,
      name: userData.name || "Portfolio Admin",
      role: userData.role || "admin",
      createdAt: new Date().toISOString(),
    };

    if (isUsingRealMysql && pool) {
      await pool.query(
        "INSERT INTO users (id, email, password, name, role, created_at) VALUES (?, ?, ?, ?, ?, NOW())",
        [newUser.id, newUser.email, newUser.password, newUser.name, newUser.role]
      );
    }
    memoryStore.users.push(newUser);
    return newUser;
  },

  // PROFILES
  async getProfile() {
    if (isUsingRealMysql && pool) {
      const [rows] = await pool.query("SELECT * FROM profiles LIMIT 1");
      if (rows.length > 0) {
        const r = rows[0];
        return {
          _id: r.id,
          id: r.id,
          name: r.name,
          title: r.title,
          tagline: r.tagline,
          bio: r.bio,
          philosophy: r.philosophy,
          approach: r.approach,
          interests: parseJSON(r.interests, []),
          email: r.email,
          phone: r.phone,
          location: r.location,
          github: r.github,
          linkedin: r.linkedin,
          website: r.website,
          resumeUrl: r.resume_url,
          profileImage: r.profile_image,
          statusText: r.status_text,
          isAvailable: Boolean(r.is_available),
          createdAt: r.created_at,
          updatedAt: r.updated_at,
        };
      }
    }
    return memoryStore.profiles[0] || null;
  },

  async updateProfile(profileData) {
    const current = await this.getProfile();
    const id = current?._id || current?.id || generateId();
    const updated = {
      _id: id,
      id,
      name: profileData.name || current?.name || "[YOUR NAME]",
      title: profileData.title || current?.title || "Senior Full Stack Engineer",
      tagline: profileData.tagline ?? current?.tagline ?? "",
      bio: profileData.bio ?? current?.bio ?? "",
      philosophy: profileData.philosophy ?? current?.philosophy ?? "",
      approach: profileData.approach ?? current?.approach ?? "",
      interests: profileData.interests || current?.interests || [],
      email: profileData.email ?? current?.email ?? "",
      phone: profileData.phone ?? current?.phone ?? "",
      location: profileData.location ?? current?.location ?? "",
      github: profileData.github ?? current?.github ?? "",
      linkedin: profileData.linkedin ?? current?.linkedin ?? "",
      website: profileData.website ?? current?.website ?? "",
      resumeUrl: profileData.resumeUrl ?? current?.resumeUrl ?? "",
      profileImage: profileData.profileImage ?? current?.profileImage ?? "",
      statusText: profileData.statusText ?? current?.statusText ?? "Available for opportunities",
      isAvailable: profileData.isAvailable !== undefined ? profileData.isAvailable : (current?.isAvailable ?? true),
      updatedAt: new Date().toISOString(),
      createdAt: current?.createdAt || new Date().toISOString(),
    };

    if (isUsingRealMysql && pool) {
      await pool.query(
        `INSERT INTO profiles (id, name, title, tagline, bio, philosophy, approach, interests, email, phone, location, github, linkedin, website, resume_url, profile_image, status_text, is_available, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
         ON DUPLICATE KEY UPDATE
         name=VALUES(name), title=VALUES(title), tagline=VALUES(tagline), bio=VALUES(bio),
         philosophy=VALUES(philosophy), approach=VALUES(approach), interests=VALUES(interests),
         email=VALUES(email), phone=VALUES(phone), location=VALUES(location), github=VALUES(github),
         linkedin=VALUES(linkedin), website=VALUES(website), resume_url=VALUES(resume_url),
         profile_image=VALUES(profile_image), status_text=VALUES(status_text), is_available=VALUES(is_available), updated_at=NOW()`,
        [
          updated.id,
          updated.name,
          updated.title,
          updated.tagline,
          updated.bio,
          updated.philosophy,
          updated.approach,
          JSON.stringify(updated.interests),
          updated.email,
          updated.phone,
          updated.location,
          updated.github,
          updated.linkedin,
          updated.website,
          updated.resumeUrl,
          updated.profileImage,
          updated.statusText,
          updated.isAvailable ? 1 : 0,
        ]
      );
    }

    memoryStore.profiles = [updated];
    return updated;
  },

  // SKILLS
  async getSkills() {
    if (isUsingRealMysql && pool) {
      const [rows] = await pool.query("SELECT * FROM skills ORDER BY display_order ASC, name ASC");
      return rows.map((r) => ({
        _id: r.id,
        id: r.id,
        name: r.name,
        category: r.category,
        icon: r.icon,
        description: r.description,
        displayOrder: r.display_order,
        featured: Boolean(r.featured),
        animationEnabled: Boolean(r.animation_enabled),
        proficiency: r.proficiency,
        color: r.color,
        createdAt: r.created_at,
      }));
    }
    return [...memoryStore.skills].sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
  },

  async createSkill(data) {
    const id = generateId();
    const skill = {
      _id: id,
      id,
      name: data.name,
      category: data.category || "Frontend",
      icon: data.icon || "code",
      description: data.description || "",
      displayOrder: data.displayOrder ?? memoryStore.skills.length + 1,
      featured: data.featured ?? false,
      animationEnabled: data.animationEnabled ?? true,
      proficiency: data.proficiency ?? 90,
      color: data.color || "#06b6d4",
      createdAt: new Date().toISOString(),
    };

    if (isUsingRealMysql && pool) {
      await pool.query(
        `INSERT INTO skills (id, name, category, icon, description, display_order, featured, animation_enabled, proficiency, color, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
        [skill.id, skill.name, skill.category, skill.icon, skill.description, skill.displayOrder, skill.featured ? 1 : 0, skill.animationEnabled ? 1 : 0, skill.proficiency, skill.color]
      );
    }
    memoryStore.skills.push(skill);
    return skill;
  },

  async updateSkill(id, data) {
    const index = memoryStore.skills.findIndex((s) => s._id === id || s.id === id);
    const existing = index !== -1 ? memoryStore.skills[index] : {};
    const updated = {
      ...existing,
      ...data,
      _id: id,
      id,
      updatedAt: new Date().toISOString(),
    };

    if (isUsingRealMysql && pool) {
      await pool.query(
        `UPDATE skills SET
         name = COALESCE(?, name),
         category = COALESCE(?, category),
         icon = COALESCE(?, icon),
         description = COALESCE(?, description),
         display_order = COALESCE(?, display_order),
         featured = COALESCE(?, featured),
         animation_enabled = COALESCE(?, animation_enabled),
         proficiency = COALESCE(?, proficiency),
         color = COALESCE(?, color),
         updated_at = NOW()
         WHERE id = ?`,
        [
          data.name,
          data.category,
          data.icon,
          data.description,
          data.displayOrder,
          data.featured !== undefined ? (data.featured ? 1 : 0) : null,
          data.animationEnabled !== undefined ? (data.animationEnabled ? 1 : 0) : null,
          data.proficiency,
          data.color,
          id,
        ]
      );
    }

    if (index !== -1) {
      memoryStore.skills[index] = updated;
    } else {
      memoryStore.skills.push(updated);
    }
    return updated;
  },

  async deleteSkill(id) {
    if (isUsingRealMysql && pool) {
      await pool.query("DELETE FROM skills WHERE id = ?", [id]);
    }
    memoryStore.skills = memoryStore.skills.filter((s) => s._id !== id && s.id !== id);
    return true;
  },

  // PROJECTS
  async getProjects() {
    if (isUsingRealMysql && pool) {
      const [rows] = await pool.query("SELECT * FROM projects ORDER BY order_num ASC, created_at DESC");
      return rows.map((r) => ({
        _id: r.id,
        id: r.id,
        title: r.title,
        slug: r.slug,
        description: r.description,
        fullDescription: r.full_description,
        technologies: parseJSON(r.technologies, []),
        liveUrl: r.live_url,
        githubUrl: r.github_url,
        imageUrl: r.image_url,
        featured: Boolean(r.featured),
        order: r.order_num,
        challenges: parseJSON(r.challenges, []),
        solutions: parseJSON(r.solutions, []),
        createdAt: r.created_at,
      }));
    }
    return [...memoryStore.projects].sort((a, b) => (a.order || 0) - (b.order || 0));
  },

  async getProjectBySlug(slug) {
    if (isUsingRealMysql && pool) {
      const [rows] = await pool.query("SELECT * FROM projects WHERE slug = ? LIMIT 1", [slug]);
      if (rows.length === 0) return null;
      const r = rows[0];
      return {
        _id: r.id,
        id: r.id,
        title: r.title,
        slug: r.slug,
        description: r.description,
        fullDescription: r.full_description,
        technologies: parseJSON(r.technologies, []),
        liveUrl: r.live_url,
        githubUrl: r.github_url,
        imageUrl: r.image_url,
        featured: Boolean(r.featured),
        order: r.order_num,
        challenges: parseJSON(r.challenges, []),
        solutions: parseJSON(r.solutions, []),
        createdAt: r.created_at,
      };
    }
    return memoryStore.projects.find((p) => p.slug === slug) || null;
  },

  async createProject(data) {
    const id = generateId();
    const slug = data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const project = {
      _id: id,
      id,
      title: data.title,
      slug,
      description: data.description || "",
      fullDescription: data.fullDescription || "",
      technologies: data.technologies || [],
      liveUrl: data.liveUrl || "",
      githubUrl: data.githubUrl || "",
      imageUrl: data.imageUrl || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
      featured: data.featured ?? false,
      order: data.order ?? memoryStore.projects.length + 1,
      challenges: data.challenges || [],
      solutions: data.solutions || [],
      createdAt: new Date().toISOString(),
    };

    if (isUsingRealMysql && pool) {
      await pool.query(
        `INSERT INTO projects (id, title, slug, description, full_description, technologies, live_url, github_url, image_url, featured, order_num, challenges, solutions, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
        [
          project.id,
          project.title,
          project.slug,
          project.description,
          project.fullDescription,
          JSON.stringify(project.technologies),
          project.liveUrl,
          project.githubUrl,
          project.imageUrl,
          project.featured ? 1 : 0,
          project.order,
          JSON.stringify(project.challenges),
          JSON.stringify(project.solutions),
        ]
      );
    }

    memoryStore.projects.push(project);
    return project;
  },

  async updateProject(id, data) {
    const index = memoryStore.projects.findIndex((p) => p._id === id || p.id === id);
    const existing = index !== -1 ? memoryStore.projects[index] : {};
    const updated = { ...existing, ...data, _id: id, id, updatedAt: new Date().toISOString() };

    if (isUsingRealMysql && pool) {
      await pool.query(
        `UPDATE projects SET
         title = COALESCE(?, title),
         slug = COALESCE(?, slug),
         description = COALESCE(?, description),
         full_description = COALESCE(?, full_description),
         technologies = COALESCE(?, technologies),
         live_url = COALESCE(?, live_url),
         github_url = COALESCE(?, github_url),
         image_url = COALESCE(?, image_url),
         featured = COALESCE(?, featured),
         order_num = COALESCE(?, order_num),
         challenges = COALESCE(?, challenges),
         solutions = COALESCE(?, solutions),
         updated_at = NOW()
         WHERE id = ?`,
        [
          data.title,
          data.slug,
          data.description,
          data.fullDescription,
          data.technologies ? JSON.stringify(data.technologies) : null,
          data.liveUrl,
          data.githubUrl,
          data.imageUrl,
          data.featured !== undefined ? (data.featured ? 1 : 0) : null,
          data.order,
          data.challenges ? JSON.stringify(data.challenges) : null,
          data.solutions ? JSON.stringify(data.solutions) : null,
          id,
        ]
      );
    }

    if (index !== -1) memoryStore.projects[index] = updated;
    else memoryStore.projects.push(updated);
    return updated;
  },

  async deleteProject(id) {
    if (isUsingRealMysql && pool) {
      await pool.query("DELETE FROM projects WHERE id = ?", [id]);
    }
    memoryStore.projects = memoryStore.projects.filter((p) => p._id !== id && p.id !== id);
    return true;
  },

  // EXPERIENCES
  async getExperiences() {
    if (isUsingRealMysql && pool) {
      const [rows] = await pool.query("SELECT * FROM experiences ORDER BY order_num ASC, created_at DESC");
      return rows.map((r) => ({
        _id: r.id,
        id: r.id,
        company: r.company,
        position: r.position,
        location: r.location,
        startDate: r.start_date,
        endDate: r.end_date,
        description: r.description,
        responsibilities: parseJSON(r.responsibilities, []),
        technologies: parseJSON(r.technologies, []),
        order: r.order_num,
        createdAt: r.created_at,
      }));
    }
    return [...memoryStore.experiences].sort((a, b) => (a.order || 0) - (b.order || 0));
  },

  async createExperience(data) {
    const id = generateId();
    const exp = {
      _id: id,
      id,
      company: data.company,
      position: data.position,
      location: data.location || "",
      startDate: data.startDate,
      endDate: data.endDate || "Present",
      description: data.description || "",
      responsibilities: data.responsibilities || [],
      technologies: data.technologies || [],
      order: data.order ?? memoryStore.experiences.length + 1,
      createdAt: new Date().toISOString(),
    };

    if (isUsingRealMysql && pool) {
      await pool.query(
        `INSERT INTO experiences (id, company, position, location, start_date, end_date, description, responsibilities, technologies, order_num, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
        [
          exp.id,
          exp.company,
          exp.position,
          exp.location,
          exp.startDate,
          exp.endDate,
          exp.description,
          JSON.stringify(exp.responsibilities),
          JSON.stringify(exp.technologies),
          exp.order,
        ]
      );
    }
    memoryStore.experiences.push(exp);
    return exp;
  },

  async updateExperience(id, data) {
    const index = memoryStore.experiences.findIndex((e) => e._id === id || e.id === id);
    const existing = index !== -1 ? memoryStore.experiences[index] : {};
    const updated = { ...existing, ...data, _id: id, id };

    if (isUsingRealMysql && pool) {
      await pool.query(
        `UPDATE experiences SET
         company = COALESCE(?, company),
         position = COALESCE(?, position),
         location = COALESCE(?, location),
         start_date = COALESCE(?, start_date),
         end_date = COALESCE(?, end_date),
         description = COALESCE(?, description),
         responsibilities = COALESCE(?, responsibilities),
         technologies = COALESCE(?, technologies),
         order_num = COALESCE(?, order_num),
         updated_at = NOW()
         WHERE id = ?`,
        [
          data.company,
          data.position,
          data.location,
          data.startDate,
          data.endDate,
          data.description,
          data.responsibilities ? JSON.stringify(data.responsibilities) : null,
          data.technologies ? JSON.stringify(data.technologies) : null,
          data.order,
          id,
        ]
      );
    }
    if (index !== -1) memoryStore.experiences[index] = updated;
    else memoryStore.experiences.push(updated);
    return updated;
  },

  async deleteExperience(id) {
    if (isUsingRealMysql && pool) {
      await pool.query("DELETE FROM experiences WHERE id = ?", [id]);
    }
    memoryStore.experiences = memoryStore.experiences.filter((e) => e._id !== id && e.id !== id);
    return true;
  },

  // EDUCATIONS
  async getEducations() {
    if (isUsingRealMysql && pool) {
      const [rows] = await pool.query("SELECT * FROM educations ORDER BY order_num ASC, created_at DESC");
      return rows.map((r) => ({
        _id: r.id,
        id: r.id,
        institution: r.institution,
        degree: r.degree,
        field: r.field,
        startDate: r.start_date,
        endDate: r.end_date,
        description: r.description,
        location: r.location,
        order: r.order_num,
        createdAt: r.created_at,
      }));
    }
    return [...memoryStore.educations].sort((a, b) => (a.order || 0) - (b.order || 0));
  },

  async createEducation(data) {
    const id = generateId();
    const edu = {
      _id: id,
      id,
      institution: data.institution,
      degree: data.degree,
      field: data.field || "",
      startDate: data.startDate,
      endDate: data.endDate || "",
      description: data.description || "",
      location: data.location || "",
      order: data.order ?? memoryStore.educations.length + 1,
      createdAt: new Date().toISOString(),
    };

    if (isUsingRealMysql && pool) {
      await pool.query(
        `INSERT INTO educations (id, institution, degree, field, start_date, end_date, description, location, order_num, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
        [edu.id, edu.institution, edu.degree, edu.field, edu.startDate, edu.endDate, edu.description, edu.location, edu.order]
      );
    }
    memoryStore.educations.push(edu);
    return edu;
  },

  async updateEducation(id, data) {
    const index = memoryStore.educations.findIndex((e) => e._id === id || e.id === id);
    const existing = index !== -1 ? memoryStore.educations[index] : {};
    const updated = { ...existing, ...data, _id: id, id };

    if (isUsingRealMysql && pool) {
      await pool.query(
        `UPDATE educations SET
         institution = COALESCE(?, institution),
         degree = COALESCE(?, degree),
         field = COALESCE(?, field),
         start_date = COALESCE(?, start_date),
         end_date = COALESCE(?, end_date),
         description = COALESCE(?, description),
         location = COALESCE(?, location),
         order_num = COALESCE(?, order_num),
         updated_at = NOW()
         WHERE id = ?`,
        [
          data.institution,
          data.degree,
          data.field,
          data.startDate,
          data.endDate,
          data.description,
          data.location,
          data.order,
          id,
        ]
      );
    }
    if (index !== -1) memoryStore.educations[index] = updated;
    else memoryStore.educations.push(updated);
    return updated;
  },

  async deleteEducation(id) {
    if (isUsingRealMysql && pool) {
      await pool.query("DELETE FROM educations WHERE id = ?", [id]);
    }
    memoryStore.educations = memoryStore.educations.filter((e) => e._id !== id && e.id !== id);
    return true;
  },

  // MESSAGES
  async getMessages() {
    if (isUsingRealMysql && pool) {
      const [rows] = await pool.query("SELECT * FROM messages ORDER BY created_at DESC");
      return rows.map((r) => ({
        _id: r.id,
        id: r.id,
        name: r.name,
        email: r.email,
        subject: r.subject,
        message: r.message,
        read: Boolean(r.is_read),
        createdAt: r.created_at,
      }));
    }
    return [...memoryStore.messages].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  async createMessage(data) {
    const id = generateId();
    const msg = {
      _id: id,
      id,
      name: data.name,
      email: data.email,
      subject: data.subject || "Portfolio Inquiry",
      message: data.message,
      read: false,
      createdAt: new Date().toISOString(),
    };

    if (isUsingRealMysql && pool) {
      await pool.query(
        `INSERT INTO messages (id, name, email, subject, message, is_read, created_at)
         VALUES (?, ?, ?, ?, ?, 0, NOW())`,
        [msg.id, msg.name, msg.email, msg.subject, msg.message]
      );
    }
    memoryStore.messages.push(msg);
    return msg;
  },

  async updateMessageReadStatus(id, isRead = true) {
    if (isUsingRealMysql && pool) {
      await pool.query("UPDATE messages SET is_read = ?, updated_at = NOW() WHERE id = ?", [isRead ? 1 : 0, id]);
    }
    const msg = memoryStore.messages.find((m) => m._id === id || m.id === id);
    if (msg) msg.read = isRead;
    return msg;
  },

  async deleteMessage(id) {
    if (isUsingRealMysql && pool) {
      await pool.query("DELETE FROM messages WHERE id = ?", [id]);
    }
    memoryStore.messages = memoryStore.messages.filter((m) => m._id !== id && m.id !== id);
    return true;
  },

  // CLEAR ALL (FOR FORCE RESEED)
  async clearAll() {
    if (isUsingRealMysql && pool) {
      await pool.query("DELETE FROM messages");
      await pool.query("DELETE FROM educations");
      await pool.query("DELETE FROM experiences");
      await pool.query("DELETE FROM projects");
      await pool.query("DELETE FROM skills");
      await pool.query("DELETE FROM profiles");
      await pool.query("DELETE FROM users");
    }
    memoryStore = {
      users: [],
      profiles: [],
      skills: [],
      projects: [],
      experiences: [],
      educations: [],
      messages: [],
    };
  },
};
