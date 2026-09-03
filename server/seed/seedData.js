// import bcrypt from "bcryptjs";
// import { db } from "../config/db.js";

// export const seedDatabaseIfEmpty = async (force = false) => {
//   try {
//     const userCount = await db.countUsers();
//     const existingSkills = await db.getSkills();

//     if (!force && userCount > 0 && existingSkills.length > 0) {
//       console.log("[MySQL Seed] Database already contains records. Skipping seed.");
//       return;
//     }

//     if (force) {
//       console.log("[MySQL Seed] Force re-seed requested. Clearing existing tables...");
//       await db.clearAll();
//     }

//     console.log("[MySQL Seed] Seeding MySQL database with initial portfolio data...");

//     // 1. Seed Admin User
//     const adminEmail = (process.env.ADMIN_EMAIL || "karthi02.study@gmail.com").toLowerCase().trim();
//     const adminPassword = process.env.ADMIN_PASSWORD || "Admin@123456!";
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(adminPassword, salt);

//     await db.createUser({
//       email: adminEmail,
//       password: hashedPassword,
//       name: "Portfolio Administrator",
//       role: "admin",
//     });
//     console.log(`[MySQL Seed] Admin user created (${adminEmail})`);

//     // 2. Seed Profile
//     await db.updateProfile({
//       name: "Karthick R",
//       title: "Software Engineer",
//       tagline: "I build modern, scalable and resilient web architectures using clean systems and practical engineering.",
//       bio: "Software Engineer specializing in scalable full-stack web platforms, relational database modeling, and modern component architectures. Dedicated to building reliable, high-performance web products with clean code, intuitive micro-interactions, and robust backend engineering.",
//       philosophy: "Software craftsmanship requires balanced attention to detail: clean relational data modeling with MySQL, deterministic state handling, and delightful, accessible user experiences.",
//       approach: "I bridge deep backend architecture with thoughtful interface engineering. Every feature begins with architectural clarity, resilient API contracts, and performant data structures.",
//       interests: [
//         "Distributed Systems & Cloud Architecture",
//         "Reactive Component Systems & State Machines",
//         "MySQL Database Indexing & Query Optimization",
//         "REST API & Microservices Design",
//         "Web Performance & Core Web Vitals",
//       ],
//       email: "developer@portfolio.local",
//       phone: "+1 (555) 019-2834",
//       location: "Chennai",
//       github: "https://github.com",
//       linkedin: "https://linkedin.com",
//       website: "https://portfolio.dev",
//       resumeUrl: "#resume",
//       profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
//       statusText: "Available for opportunities",
//       isAvailable: true,
//     });

//     // 3. Seed Skills (Stored in MySQL, used for Skills section & Floating animation!)
//     const initialSkills = [
//       // Frontend
//       { name: "React", category: "Frontend", icon: "react", description: "Hooks, Fiber reconciliation, concurrent mode, custom state managers & design systems", displayOrder: 1, featured: true, animationEnabled: true, proficiency: 96 },
//       { name: "JavaScript", category: "Frontend", icon: "javascript", description: "ES6+, Event Loop, asynchronous concurrency, V8 engine optimizations", displayOrder: 2, featured: true, animationEnabled: true, proficiency: 98 },
//       { name: "HTML5", category: "Frontend", icon: "html", description: "Semantic markup, accessibility compliance (WCAG AA/AAA), web standards", displayOrder: 4, featured: false, animationEnabled: true, proficiency: 98 },
//       { name: "Next.js", category: "Frontend", icon: "nextjs", description: "Server components, streaming SSR, edge rendering, API routes", displayOrder: 6, featured: true, animationEnabled: true, proficiency: 88 },

//       // Backend
//       { name: "Node.js", category: "Backend", icon: "nodejs", description: "Event-driven runtime, worker threads, stream pipelines, high-throughput I/O", displayOrder: 7, featured: true, animationEnabled: true, proficiency: 95 },
//       { name: "Express.js", category: "Backend", icon: "express", description: "RESTful architecture, custom middleware chains, JWT security, error handling", displayOrder: 8, featured: true, animationEnabled: true, proficiency: 94 },
//       { name: "Python", category: "Backend", icon: "python", description: "FastAPI, asynchronous background services, data pipelines, automation scripts", displayOrder: 9, featured: false, animationEnabled: true, proficiency: 86 },
//       { name: "REST APIs", category: "Backend", icon: "code", description: "Idempotent HTTP verbs, rate limiting, OpenAPI specifications, payload validation", displayOrder: 11, featured: true, animationEnabled: true, proficiency: 96 },

//       // Database
//       { name: "MySQL", category: "Database", icon: "mysql", description: "Relational database schema modeling, connection pools, indexing, ACID transactions", displayOrder: 12, featured: true, animationEnabled: true, proficiency: 96 },
//       { name: "MongoDB", category: "Database", icon: "mongodb", description: "Distributed caching, pub/sub queues, session management, token bucket rate limits", displayOrder: 14, featured: true, animationEnabled: true, proficiency: 88 },
//       { name: "SQL", category: "Database", icon: "database", description: "Relational modeling, ACID transactions, complex joins, query profiling", displayOrder: 15, featured: false, animationEnabled: true, proficiency: 95 },

//       // DevOps & Tools
//       { name: "Docker", category: "DevOps & Tools", icon: "docker", description: "Multi-stage container builds, Compose orchestrations, minimal production images", displayOrder: 16, featured: true, animationEnabled: true, proficiency: 90 },
//       { name: "Git", category: "DevOps & Tools", icon: "git", description: "Trunk-based development, interactive rebase, semantic versioning", displayOrder: 17, featured: false, animationEnabled: true, proficiency: 95 },
//       { name: "GitHub Actions", category: "DevOps & Tools", icon: "github", description: "Automated test runners, security vulnerability audits, continuous deployment", displayOrder: 18, featured: true, animationEnabled: true, proficiency: 89 },
//       { name: "Linux", category: "DevOps & Tools", icon: "terminal", description: "Basic Linux Commands", displayOrder: 20, featured: false, animationEnabled: true, proficiency: 92 },
//     ];

//     for (const skill of initialSkills) {
//       await db.createSkill(skill);
//     }
//     console.log(`[MySQL Seed] ${initialSkills.length} skills seeded`);

//     // 4. Seed Projects
//     const initialProjects = [
//       {
//         title: "Enterprise Inventory & Order Management Platform",
//         slug: "enterprise-inventory-order-platform",
//         description: "High-throughput inventory tracking and order fulfillment engine with automated stock thresholds and multi-warehouse sync.",
//         fullDescription: "A full-scale enterprise resource management portal engineered to process high-concurrency order workflows. Features relational ACID data integrity, role-based access management, transactional inventory holds, automated PDF invoice dispatch, and live analytics telemetry dashboards.",
//         technologies: ["Node.js", "Express.js", "MySQL", "React", "Tailwind CSS", "Redis"],
//         liveUrl: "https://example.com/demo-inventory",
//         githubUrl: "https://github.com/example/inventory-platform",
//         imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
//         featured: true,
//         order: 1,
//         challenges: [
//           "Eliminating deadlocks during concurrent stock reservations across multiple checkouts.",
//           "Maintaining sub-50ms analytics rendering for 500k+ historical order transaction tables.",
//         ],
//         solutions: [
//           "Utilized MySQL row-level locking (SELECT FOR UPDATE) and Redis atomic decrement buckets.",
//           "Created compound B-tree indexes and partitioned historical order archives with caching.",
//         ],
//       },
//       {
//         title: "Real-Time Collaborative Code & Markdown Workspace",
//         slug: "realtime-collaborative-workspace",
//         description: "Browser-based distributed editing platform supporting real-time operational transformation, live previews, and version history.",
//         fullDescription: "A distributed developer productivity platform engineered for engineering squads. Integrates custom syntax tree parsing, diff algorithms, project folder trees, MySQL persistence for workspace schemas, and instant synchronized cursor state.",
//         technologies: ["React", "Node.js", "Express.js", "MySQL", "WebSockets", "Tailwind CSS"],
//         liveUrl: "https://example.com/demo-workspace",
//         githubUrl: "https://github.com/example/collaborative-workspace",
//         imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
//         featured: true,
//         order: 2,
//         challenges: [
//           "Resolving divergent document states across intermittent high-latency client connections.",
//           "Preventing unnecessary React component re-renders on every keystroke payload.",
//         ],
//         solutions: [
//           "Implemented conflict-free replicated data types (CRDTs) with snapshot debouncing.",
//           "Built memoized canvas viewports and decoupled local keystroke state from server broadcast queues.",
//         ],
//       },
//       {
//         title: "API Gateway & Security Analytics Hub",
//         slug: "api-gateway-analytics-hub",
//         description: "Unified reverse proxy gateway with dynamic rate limiting, token rotation, request sanitization, and metric aggregations.",
//         fullDescription: "Centralized backend gateway designed to shield microservices clusters. Handles authentication validation, token verification, dynamic sliding-window rate throttling, latency telemetry, and health monitoring.",
//         technologies: ["Node.js", "Express.js", "MySQL", "Redis", "Docker", "Chart.js"],
//         liveUrl: "https://example.com/demo-gateway",
//         githubUrl: "https://github.com/example/api-gateway-hub",
//         imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
//         featured: true,
//         order: 3,
//         challenges: [
//           "Handling sudden traffic spikes without degrading proxy latency over 15ms.",
//           "Safe token invalidation across multi-instance server clusters.",
//         ],
//         solutions: [
//           "Configured Redis token-bucket algorithms and non-blocking streaming I/O buffers.",
//           "Implemented JWT blacklisting using Redis in-memory sets with automatic TTL expiration.",
//         ],
//       },
//       {
//         title: "DevPulse - Automated Microservice Health Dashboard",
//         slug: "devpulse-health-dashboard",
//         description: "Continuous infrastructure monitor tracking service uptime, memory footprints, query latency, and error thresholds.",
//         fullDescription: "Comprehensive operational observability hub with automated health ping workers, threshold alert triggers, interactive timeline visualizers, and detailed error trace dumps.",
//         technologies: ["React", "Express.js", "MySQL", "Tailwind CSS", "Node.js"],
//         liveUrl: "https://example.com/demo-devpulse",
//         githubUrl: "https://github.com/example/devpulse",
//         imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
//         featured: false,
//         order: 4,
//         challenges: [
//           "Aggregating rolling time-series metric logs without exploding database storage.",
//         ],
//         solutions: [
//           "Built a nightly aggregation pipeline in MySQL that rolls minute-level logs into hourly and daily summary records.",
//         ],
//       },
//     ];

//     for (const proj of initialProjects) {
//       await db.createProject(proj);
//     }
//     console.log(`[MySQL Seed] ${initialProjects.length} projects seeded`);

//     // 5. Seed Experience
//     const initialExperience = [
//       {
//         company: "Apex Digital Systems",
//         position: "Senior Full Stack Engineer",
//         location: "San Francisco, CA (Remote)",
//         startDate: "2022",
//         endDate: "Present",
//         description: "Lead architecture for high-volume customer portals and core API services.",
//         responsibilities: [
//           "Architected and deployed microservices handling 2M+ daily requests with 99.98% uptime.",
//           "Migrated monolithic backend endpoints to decoupled Express.js services with optimized MySQL queries.",
//           "Mentored junior and mid-level engineers on testing, clean architecture, and performance profiling.",
//           "Reduced average endpoint response latency from 320ms to 68ms through database index tuning and Redis caching.",
//         ],
//         technologies: ["Node.js", "Express.js", "MySQL", "React", "Redis", "Docker"],
//         order: 1,
//       },
//       {
//         company: "Vanguard Web Labs",
//         position: "Full Stack Software Developer",
//         location: "Austin, TX",
//         startDate: "2020",
//         endDate: "2022",
//         description: "Designed, engineered, and maintained responsive customer-facing web applications and internal administrative tooling.",
//         responsibilities: [
//           "Built responsive single-page web applications from scratch with React and Tailwind CSS.",
//           "Implemented comprehensive JWT authentication and role-based permissions matrix for enterprise clients.",
//           "Created automated CI/CD deployment pipelines using GitHub Actions and Docker containerization.",
//         ],
//         technologies: ["JavaScript", "React", "Node.js", "Express.js", "MySQL", "Tailwind CSS"],
//         order: 2,
//       },
//       {
//         company: "Nexus Interactive",
//         position: "Frontend & Backend Engineer",
//         location: "Boston, MA",
//         startDate: "2018",
//         endDate: "2020",
//         description: "Developed interactive web interfaces, client onboarding dashboards, and custom REST API endpoints.",
//         responsibilities: [
//           "Engineered pixel-perfect, accessible component libraries and interactive dashboard visualizations.",
//           "Created RESTful endpoints and optimized database schemas for rapid client prototyping.",
//           "Collaborated with product designers to establish fluid UI micro-interactions.",
//         ],
//         technologies: ["JavaScript", "HTML5", "CSS3", "React", "Node.js", "MySQL"],
//         order: 3,
//       },
//     ];

//     for (const exp of initialExperience) {
//       await db.createExperience(exp);
//     }
//     console.log(`[MySQL Seed] ${initialExperience.length} experiences seeded`);

//     // 6. Seed Education
//     const initialEducation = [
//       {
//         institution: "University of Technology",
//         degree: "Bachelor of Science in Computer Science",
//         field: "Software Engineering & Distributed Systems",
//         startDate: "2014",
//         endDate: "2018",
//         description: "Coursework focused on Data Structures, Relational Database Systems, Operating Systems, Computer Networks, and Software Engineering Methodology.",
//         location: "California, USA",
//         order: 1,
//       },
//       {
//         institution: "Advanced Web Architecture Institute",
//         degree: "Professional Certificate",
//         field: "Full Stack Web Engineering & Cloud Systems",
//         startDate: "2019",
//         endDate: "2019",
//         description: "Specialized intensive certification covering advanced Node.js microservices, relational database tuning, containerization, and modern frontend design systems.",
//         location: "Online",
//         order: 2,
//       },
//     ];

//     for (const edu of initialEducation) {
//       await db.createEducation(edu);
//     }
//     console.log(`[MySQL Seed] ${initialEducation.length} educations seeded`);

//     // 7. Seed Initial Contact Message
//     await db.createMessage({
//       name: "Sarah Jenkins (Technical Recruiter)",
//       email: "sarah.jenkins@techrecruiting.example",
//       subject: "Staff Full Stack Engineer Opportunity",
//       message: "Hi! I was very impressed by your full-stack projects and clean engineering architecture. We're looking for a Senior / Staff Engineer to lead backend & frontend initiatives. Would love to connect!",
//     });

//     console.log("[MySQL Seed] Database initialization and seed completed successfully!");
//   } catch (err) {
//     console.error("[MySQL Seed] Error seeding database:", err);
//   }
// };

import bcrypt from "bcryptjs";
import { db } from "../config/db.js";

export const seedDatabaseIfEmpty = async (force = false) => {
  try {
    const userCount = await db.countUsers();
    const existingSkills = await db.getSkills();

    if (!force && userCount > 0 && existingSkills.length > 0) {
      console.log("[MySQL Seed] Database already contains records. Skipping seed.");
      return;
    }

    if (force) {
      console.log("[MySQL Seed] Force re-seed requested. Clearing existing tables...");
      await db.clearAll();
    }

    console.log("[MySQL Seed] Seeding MySQL database with initial portfolio data...");

    // 1. Seed Admin User
    const adminEmail = (process.env.ADMIN_EMAIL || "admin@portfolio.local").toLowerCase().trim();
    const adminPassword = process.env.ADMIN_PASSWORD || "Admin@123456";
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);

    await db.createUser({
      email: adminEmail,
      password: hashedPassword,
      name: "Portfolio Administrator",
      role: "admin",
    });
    console.log(`[MySQL Seed] Admin user created (${adminEmail})`);

    // 2. Seed Profile
    await db.updateProfile({
      name: "[YOUR NAME]",
      title: "Senior Full Stack Engineer",
      tagline: "I build modern, scalable and resilient web architectures using clean systems and practical engineering.",
      bio: "Software Engineer specializing in scalable full-stack web platforms, relational database modeling, and modern component architectures. Dedicated to building reliable, high-performance web products with clean code, intuitive micro-interactions, and robust backend engineering.",
      philosophy: "Software craftsmanship requires balanced attention to detail: clean relational data modeling with MySQL, deterministic state handling, and delightful, accessible user experiences.",
      approach: "I bridge deep backend architecture with thoughtful interface engineering. Every feature begins with architectural clarity, resilient API contracts, and performant data structures.",
      interests: [
        "Distributed Systems & Cloud Architecture",
        "Reactive Component Systems & State Machines",
        "MySQL Database Indexing & Query Optimization",
        "REST API & Microservices Design",
        "Web Performance & Core Web Vitals",
      ],
      email: "developer@portfolio.local",
      phone: "+1 (555) 019-2834",
      location: "[YOUR LOCATION]",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      website: "https://portfolio.dev",
      resumeUrl: "#resume",
      profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
      statusText: "Available for opportunities",
      isAvailable: true,
    });

    // 3. Seed Skills (Stored in MySQL, used for Skills section & Floating animation!)
    const initialSkills = [
      // Frontend
      { name: "React", category: "Frontend", icon: "react", description: "Hooks, Fiber reconciliation, concurrent mode, custom state managers & design systems", displayOrder: 1, featured: true, animationEnabled: true, proficiency: 96 },
      { name: "JavaScript", category: "Frontend", icon: "javascript", description: "ES6+, Event Loop, asynchronous concurrency, V8 engine optimizations", displayOrder: 2, featured: true, animationEnabled: true, proficiency: 98 },
      { name: "Tailwind CSS", category: "Frontend", icon: "tailwind", description: "Utility-first design tokens, responsive typography, custom design system configuration", displayOrder: 3, featured: true, animationEnabled: true, proficiency: 95 },
      { name: "HTML5", category: "Frontend", icon: "html", description: "Semantic markup, accessibility compliance (WCAG AA/AAA), web standards", displayOrder: 4, featured: false, animationEnabled: true, proficiency: 98 },
      { name: "CSS3", category: "Frontend", icon: "css", description: "Modern CSS Grid, Flexbox, GPU-accelerated transforms & keyframe animations", displayOrder: 5, featured: false, animationEnabled: true, proficiency: 92 },
      { name: "Next.js", category: "Frontend", icon: "nextjs", description: "Server components, streaming SSR, edge rendering, API routes", displayOrder: 6, featured: true, animationEnabled: true, proficiency: 88 },

      // Backend
      { name: "Node.js", category: "Backend", icon: "nodejs", description: "Event-driven runtime, worker threads, stream pipelines, high-throughput I/O", displayOrder: 7, featured: true, animationEnabled: true, proficiency: 95 },
      { name: "Express.js", category: "Backend", icon: "express", description: "RESTful architecture, custom middleware chains, JWT security, error handling", displayOrder: 8, featured: true, animationEnabled: true, proficiency: 94 },
      { name: "Python", category: "Backend", icon: "python", description: "FastAPI, asynchronous background services, data pipelines, automation scripts", displayOrder: 9, featured: false, animationEnabled: true, proficiency: 86 },
      { name: "GraphQL", category: "Backend", icon: "graphql", description: "Schema-first API design, resolver optimization, dataloader query batching", displayOrder: 10, featured: false, animationEnabled: true, proficiency: 84 },
      { name: "REST APIs", category: "Backend", icon: "code", description: "Idempotent HTTP verbs, rate limiting, OpenAPI specifications, payload validation", displayOrder: 11, featured: true, animationEnabled: true, proficiency: 96 },

      // Database
      { name: "MySQL", category: "Database", icon: "mysql", description: "Relational database schema modeling, connection pools, indexing, ACID transactions", displayOrder: 12, featured: true, animationEnabled: true, proficiency: 96 },
      { name: "PostgreSQL", category: "Database", icon: "database", description: "Complex relational queries, foreign keys, JSONB storage, views", displayOrder: 13, featured: false, animationEnabled: true, proficiency: 90 },
      { name: "Redis", category: "Database", icon: "redis", description: "Distributed caching, pub/sub queues, session management, token bucket rate limits", displayOrder: 14, featured: true, animationEnabled: true, proficiency: 88 },
      { name: "SQL", category: "Database", icon: "database", description: "Relational modeling, ACID transactions, complex joins, query profiling", displayOrder: 15, featured: false, animationEnabled: true, proficiency: 95 },

      // DevOps & Tools
      { name: "Docker", category: "DevOps & Tools", icon: "docker", description: "Multi-stage container builds, Compose orchestrations, minimal production images", displayOrder: 16, featured: true, animationEnabled: true, proficiency: 90 },
      { name: "Git", category: "DevOps & Tools", icon: "git", description: "Trunk-based development, interactive rebase, semantic versioning", displayOrder: 17, featured: false, animationEnabled: true, proficiency: 95 },
      { name: "GitHub Actions", category: "DevOps & Tools", icon: "github", description: "Automated test runners, security vulnerability audits, continuous deployment", displayOrder: 18, featured: true, animationEnabled: true, proficiency: 89 },
      { name: "AWS", category: "DevOps & Tools", icon: "cloud", description: "EC2, S3, RDS MySQL, CloudFront CDN, Lambda microservices", displayOrder: 19, featured: false, animationEnabled: true, proficiency: 84 },
      { name: "Linux", category: "DevOps & Tools", icon: "terminal", description: "Nginx reverse proxy, systemd services, SSH hardening, shell automation", displayOrder: 20, featured: false, animationEnabled: true, proficiency: 92 },
    ];

    for (const skill of initialSkills) {
      await db.createSkill(skill);
    }
    console.log(`[MySQL Seed] ${initialSkills.length} skills seeded`);

    // 4. Seed Projects
    const initialProjects = [
      {
        title: "Enterprise Inventory & Order Management Platform",
        slug: "enterprise-inventory-order-platform",
        description: "High-throughput inventory tracking and order fulfillment engine with automated stock thresholds and multi-warehouse sync.",
        fullDescription: "A full-scale enterprise resource management portal engineered to process high-concurrency order workflows. Features relational ACID data integrity, role-based access management, transactional inventory holds, automated PDF invoice dispatch, and live analytics telemetry dashboards.",
        technologies: ["Node.js", "Express.js", "MySQL", "React", "Tailwind CSS", "Redis"],
        liveUrl: "https://example.com/demo-inventory",
        githubUrl: "https://github.com/example/inventory-platform",
        imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
        featured: true,
        order: 1,
        catgry: "Full Stack",
        challenges: [
          "Eliminating deadlocks during concurrent stock reservations across multiple checkouts.",
          "Maintaining sub-50ms analytics rendering for 500k+ historical order transaction tables.",
        ],
        solutions: [
          "Utilized MySQL row-level locking (SELECT FOR UPDATE) and Redis atomic decrement buckets.",
          "Created compound B-tree indexes and partitioned historical order archives with caching.",
        ],
      },
      {
        title: "Real-Time Collaborative Code & Markdown Workspace",
        slug: "realtime-collaborative-workspace",
        description: "Browser-based distributed editing platform supporting real-time operational transformation, live previews, and version history.",
        fullDescription: "A distributed developer productivity platform engineered for engineering squads. Integrates custom syntax tree parsing, diff algorithms, project folder trees, MySQL persistence for workspace schemas, and instant synchronized cursor state.",
        technologies: ["React", "Node.js", "Express.js", "MySQL", "WebSockets", "Tailwind CSS"],
        liveUrl: "https://example.com/demo-workspace",
        githubUrl: "https://github.com/example/collaborative-workspace",
        imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
        featured: true,
        order: 2,
        catgry: "Frontend & Realtime",
        challenges: [
          "Resolving divergent document states across intermittent high-latency client connections.",
          "Preventing unnecessary React component re-renders on every keystroke payload.",
        ],
        solutions: [
          "Implemented conflict-free replicated data types (CRDTs) with snapshot debouncing.",
          "Built memoized canvas viewports and decoupled local keystroke state from server broadcast queues.",
        ],
      },
      {
        title: "API Gateway & Security Analytics Hub",
        slug: "api-gateway-analytics-hub",
        description: "Unified reverse proxy gateway with dynamic rate limiting, token rotation, request sanitization, and metric aggregations.",
        fullDescription: "Centralized backend gateway designed to shield microservices clusters. Handles authentication validation, token verification, dynamic sliding-window rate throttling, latency telemetry, and health monitoring.",
        technologies: ["Node.js", "Express.js", "MySQL", "Redis", "Docker", "Chart.js"],
        liveUrl: "https://example.com/demo-gateway",
        githubUrl: "https://github.com/example/api-gateway-hub",
        imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
        featured: true,
        order: 3,
        catgry: "Backend & Systems",
        challenges: [
          "Handling sudden traffic spikes without degrading proxy latency over 15ms.",
          "Safe token invalidation across multi-instance server clusters.",
        ],
        solutions: [
          "Configured Redis token-bucket algorithms and non-blocking streaming I/O buffers.",
          "Implemented JWT blacklisting using Redis in-memory sets with automatic TTL expiration.",
        ],
      },
      {
        title: "DevPulse - Automated Microservice Health Dashboard",
        slug: "devpulse-health-dashboard",
        description: "Continuous infrastructure monitor tracking service uptime, memory footprints, query latency, and error thresholds.",
        fullDescription: "Comprehensive operational observability hub with automated health ping workers, threshold alert triggers, interactive timeline visualizers, and detailed error trace dumps.",
        technologies: ["React", "Express.js", "MySQL", "Tailwind CSS", "Node.js"],
        liveUrl: "https://example.com/demo-devpulse",
        githubUrl: "https://github.com/example/devpulse",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
        featured: false,
        order: 4,
        catgry: "DevOps & Cloud",
        challenges: [
          "Aggregating rolling time-series metric logs without exploding database storage.",
        ],
        solutions: [
          "Built a nightly aggregation pipeline in MySQL that rolls minute-level logs into hourly and daily summary records.",
        ],
      },
    ];

    for (const proj of initialProjects) {
      await db.createProject(proj);
    }
    console.log(`[MySQL Seed] ${initialProjects.length} projects seeded`);

    // 5. Seed Experience
    const initialExperience = [
      {
        company: "Apex Digital Systems",
        position: "Senior Full Stack Engineer",
        location: "San Francisco, CA (Remote)",
        startDate: "2022",
        endDate: "Present",
        description: "Lead architecture for high-volume customer portals and core API services.",
        responsibilities: [
          "Architected and deployed microservices handling 2M+ daily requests with 99.98% uptime.",
          "Migrated monolithic backend endpoints to decoupled Express.js services with optimized MySQL queries.",
          "Mentored junior and mid-level engineers on testing, clean architecture, and performance profiling.",
          "Reduced average endpoint response latency from 320ms to 68ms through database index tuning and Redis caching.",
        ],
        technologies: ["Node.js", "Express.js", "MySQL", "React", "Redis", "Docker"],
        order: 1,
      },
      {
        company: "Vanguard Web Labs",
        position: "Full Stack Software Developer",
        location: "Austin, TX",
        startDate: "2020",
        endDate: "2022",
        description: "Designed, engineered, and maintained responsive customer-facing web applications and internal administrative tooling.",
        responsibilities: [
          "Built responsive single-page web applications from scratch with React and Tailwind CSS.",
          "Implemented comprehensive JWT authentication and role-based permissions matrix for enterprise clients.",
          "Created automated CI/CD deployment pipelines using GitHub Actions and Docker containerization.",
        ],
        technologies: ["JavaScript", "React", "Node.js", "Express.js", "MySQL", "Tailwind CSS"],
        order: 2,
      },
      {
        company: "Nexus Interactive",
        position: "Frontend & Backend Engineer",
        location: "Boston, MA",
        startDate: "2018",
        endDate: "2020",
        description: "Developed interactive web interfaces, client onboarding dashboards, and custom REST API endpoints.",
        responsibilities: [
          "Engineered pixel-perfect, accessible component libraries and interactive dashboard visualizations.",
          "Created RESTful endpoints and optimized database schemas for rapid client prototyping.",
          "Collaborated with product designers to establish fluid UI micro-interactions.",
        ],
        technologies: ["JavaScript", "HTML5", "CSS3", "React", "Node.js", "MySQL"],
        order: 3,
      },
    ];

    for (const exp of initialExperience) {
      await db.createExperience(exp);
    }
    console.log(`[MySQL Seed] ${initialExperience.length} experiences seeded`);

    // 6. Seed Education
    const initialEducation = [
      {
        institution: "University of Technology",
        degree: "Bachelor of Science in Computer Science",
        field: "Software Engineering & Distributed Systems",
        startDate: "2014",
        endDate: "2018",
        description: "Coursework focused on Data Structures, Relational Database Systems, Operating Systems, Computer Networks, and Software Engineering Methodology.",
        location: "California, USA",
        order: 1,
      },
      {
        institution: "Advanced Web Architecture Institute",
        degree: "Professional Certificate",
        field: "Full Stack Web Engineering & Cloud Systems",
        startDate: "2019",
        endDate: "2019",
        description: "Specialized intensive certification covering advanced Node.js microservices, relational database tuning, containerization, and modern frontend design systems.",
        location: "Online",
        order: 2,
      },
    ];

    for (const edu of initialEducation) {
      await db.createEducation(edu);
    }
    console.log(`[MySQL Seed] ${initialEducation.length} educations seeded`);

    // 7. Seed Initial Contact Message
    await db.createMessage({
      name: "Sarah Jenkins (Technical Recruiter)",
      email: "sarah.jenkins@techrecruiting.example",
      subject: "Staff Full Stack Engineer Opportunity",
      message: "Hi! I was very impressed by your full-stack projects and clean engineering architecture. We're looking for a Senior / Staff Engineer to lead backend & frontend initiatives. Would love to connect!",
    });

    console.log("[MySQL Seed] Database initialization and seed completed successfully!");
  } catch (err) {
    console.error("[MySQL Seed] Error seeding database:", err);
  }
};
