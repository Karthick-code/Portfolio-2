# Karthick — Developer Portfolio

A full-stack, database-driven developer portfolio built with **React, Node.js, Express.js, and MySQL**.

The project is more than a static portfolio: portfolio content such as profile information, skills, projects, experience, education, and contact messages is served through a REST API and managed through a protected admin dashboard. The frontend is built as a responsive single-page application with interactive UI, theme support, responsive navigation, project/resume modals, and animated technology icons in the hero section.

## ✨ Highlights

- Full-stack React + Node.js + Express.js architecture
- MySQL-backed portfolio content management
- Protected admin dashboard
- JWT-based authentication
- Password hashing with bcrypt
- Dynamic profile, skills, projects, experience, and education sections
- Contact form backed by the API and database
- Admin message management
- Project filtering and detailed project modals
- Resume viewing/downloading flow
- Animated floating technology icons in the hero section
- Mouse-parallax interaction for hero technology elements on larger screens
- `prefers-reduced-motion` support for accessibility
- Responsive design for desktop, tablet, and mobile
- Light/dark theme support
- Scroll progress indicator
- Vite-powered development and production builds

---

## 🎯 Purpose

This portfolio was built to present professional experience and projects while also demonstrating practical full-stack development skills.

Instead of hard-coding all portfolio content into React components, the application separates the presentation layer from the data layer:

```text
React Frontend
      ↓
REST API
      ↓
Express / Node.js
      ↓
MySQL
```

This makes profile content, skills, projects, education, experience, and incoming contact messages manageable through the backend rather than being tied directly to the frontend source code.

---

## 🧩 Main Sections

The public portfolio is organized around the following areas:

### Hero

The landing section introduces the developer and provides the primary calls to action.

It also includes an animated technology visualization built specifically for the hero area.

The animation system includes:

- Floating technology icons
- Deterministic particle positioning
- Responsive icon sizing
- Desktop mouse-parallax interaction
- Ambient background effects
- Reduced-motion detection
- Responsive behavior based on viewport width

The floating technology implementation is separated into reusable animation components:

```text
src/animations/
├── FloatingSkills.jsx
├── TechIcon.jsx
└── animationUtils.js
```

The animation intentionally disables the desktop parallax interaction on smaller screens and when the user has enabled reduced motion. 

### About

Presents the developer profile, introduction, development philosophy, interests, and related information.

### Skills

Displays technical skills dynamically from the backend.

Skill records can contain:

- Skill name
- Category
- Icon
- Description
- Display order
- Featured state
- Animation state
- Proficiency
- Icon color

### Projects

Projects are loaded dynamically from the API and can include:

- Project title
- Description
- Full description
- Technologies
- GitHub repository
- Live project URL
- Preview image
- Category
- Featured status
- Challenges
- Solutions

Projects are generated with slugs for cleaner project identification and can be opened through detailed project modals.

### Experience

Displays professional experience including:

- Company
- Position
- Location
- Start date
- End date
- Description
- Responsibilities
- Technologies

### Education

Displays academic information including:

- Institution
- Degree
- Field
- Start date
- End date
- Description
- Location

### Contact

Visitors can submit contact information through the portfolio.

Submitted messages are processed through the Express API and stored in MySQL for administration.

### Resume

The portfolio includes a resume interaction through a dedicated modal component.

### Footer

Provides final navigation and portfolio/contact information.

---

## 🔐 Admin Dashboard

The application includes a separate administrative interface for managing portfolio content.

Admin functionality is organized into dedicated tabs/components for:

```text
Admin Dashboard
│
├── Overview
├── Profile
├── Skills
├── Projects
├── Experience
├── Education
└── Messages
```

The admin area is protected through authentication middleware.

Administrators can manage the portfolio's database-backed content without modifying React source files manually.

---

## 🔑 Authentication

Authentication is handled on the server.

The project includes:

- Login
- JWT authentication
- Protected admin routes
- Password hashing with bcrypt
- Authentication middleware
- Admin-only operations

The backend includes a dedicated authentication controller and middleware:

```text
server/
├── controllers/
│   └── authController.js
│
└── middleware/
    └── auth.js
```

---

## 🗄️ MySQL Database

MySQL is the primary persistent data store.

The backend uses `mysql2/promise` and maintains a connection pool for database operations.

The database layer initializes the required tables when the application connects successfully.

### Core Tables

```text
users
profiles
skills
projects
experiences
educations
messages
```

### Database Relationships / Data Flow

```text
                    ┌──────────────┐
                    │    MySQL     │
                    └──────┬───────┘
                           │
                    Database Layer
                           │
                    ┌──────▼───────┐
                    │   Express    │
                    │   REST API   │
                    └──────┬───────┘
                           │
                         Axios
                           │
                    ┌──────▼───────┐
                    │    React     │
                    │   Frontend   │
                    └──────────────┘
```

The database configuration supports either a complete connection URL or individual MySQL environment variables.

---

## 🛠️ Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| React | UI development |
| Vite | Development server and build tooling |
| React Router | Client-side routing |
| Axios | API communication |
| Tailwind CSS | Utility-based styling |
| Lucide React | Interface icons |
| Motion | UI/interaction animation |
| html2pdf.js | PDF/resume-related browser functionality |

### Backend

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | REST API and server |
| mysql2 | MySQL database connectivity |
| JWT | Authentication |
| bcryptjs | Password hashing |
| CORS | Cross-origin API access |
| dotenv | Environment configuration |

### Database

**MySQL**

The database layer uses connection pooling and creates the application's required schema during initialization.

---

## 📁 Project Structure

```text
Portfolio-2/
│
├── server/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── educationController.js
│   │   ├── experienceController.js
│   │   ├── messageController.js
│   │   ├── profileController.js
│   │   ├── projectController.js
│   │   ├── skillController.js
│   │   └── statsController.js
│   │
│   ├── middleware/
│   │   └── auth.js
│   │
│   ├── models/
│   │   ├── Education.js
│   │   ├── Experience.js
│   │   ├── Message.js
│   │   ├── Profile.js
│   │   ├── Project.js
│   │   ├── Skill.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── adminRoutes.js
│   │   ├── authRoutes.js
│   │   ├── contactRoutes.js
│   │   ├── educationRoutes.js
│   │   ├── experienceRoutes.js
│   │   ├── messageRoutes.js
│   │   ├── profileRoutes.js
│   │   ├── projectRoutes.js
│   │   └── skillRoutes.js
│   │
│   └── seed/
│       └── seedData.js
│
├── src/
│   ├── animations/
│   │   ├── FloatingSkills.jsx
│   │   ├── TechIcon.jsx
│   │   └── animationUtils.js
│   │
│   ├── components/
│   │   ├── admin/
│   │   │   ├── AdminSidebar.jsx
│   │   │   ├── EducationTab.jsx
│   │   │   ├── ExperienceTab.jsx
│   │   │   ├── MessagesTab.jsx
│   │   │   ├── OverviewTab.jsx
│   │   │   ├── ProfileTab.jsx
│   │   │   ├── ProjectsTab.jsx
│   │   │   └── SkillsTab.jsx
│   │   │
│   │   └── public/
│   │       ├── About.jsx
│   │       ├── ContactSection.jsx
│   │       ├── EducationSection.jsx
│   │       ├── ExperienceSection.jsx
│   │       ├── Footer.jsx
│   │       ├── Hero.jsx
│   │       ├── Navbar.jsx
│   │       ├── ProjectModal.jsx
│   │       ├── ProjectsSection.jsx
│   │       ├── ResumeModal.jsx
│   │       ├── ScrollProgressBar.jsx
│   │       ├── SkillsSection.jsx
│   │       └── ThemeToggle.jsx
│   │
│   ├── context/
│   ├── pages/
│   │   ├── PublicPortfolio.jsx
│   │   └── admin/
│   │
│   ├── services/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── index.html
├── package.json
├── vite.config.js
└── server.js
```

---

## 🔌 REST API

The Express server exposes API groups for the main portfolio resources.

```text
/api/health

/api/auth

/api/profile

/api/skills

/api/projects

/api/experience

/api/education

/api/contact

/api/messages

/api/admin
```

The server registers these routes centrally and serves the React application through Vite during development and the generated `dist` directory in production.

---

## 🔄 API Architecture

The backend follows a controller/route separation:

```text
HTTP Request
     ↓
Express Route
     ↓
Authentication Middleware
     ↓
Controller
     ↓
Database Layer
     ↓
MySQL
     ↓
JSON Response
     ↓
React Frontend
```

For example, project operations are handled through a dedicated project controller and database abstraction rather than placing SQL logic directly inside React components.

---

## 🎨 UI & UX

The interface is designed around a clean developer-portfolio experience with responsive layouts and interactive elements.

### Included UI behavior

- Responsive navbar
- Mobile navigation
- Light/dark theme toggle
- Scroll progress bar
- Interactive project cards
- Project detail modal
- Resume modal
- Dynamic skill presentation
- Animated hero technologies
- Loading states
- Responsive layouts
- Hover and transition effects
- Reduced-motion support

---

## 🌀 Hero Animation System

One of the distinctive parts of this portfolio is the animated technology layer in the hero section.

The implementation is not simply a collection of CSS animations.

The `FloatingSkills` component:

1. Reads the available skills.
2. Generates deterministic positions for the technology items.
3. Adapts the layout to the viewport width.
4. Tracks the user's reduced-motion preference.
5. Adds subtle mouse-based parallax on desktop.
6. Uses `requestAnimationFrame` for the parallax transform.
7. Removes the interaction on smaller screens.

```text
Skills from API
      ↓
generateFloatingParticles()
      ↓
FloatingSkills
      ↓
TechIcon
      ↓
Animated technology layer
```

This keeps the animation logic separate from the main portfolio content.

---

## 📱 Responsive Behavior

The application adapts its presentation according to screen size.

The hero animation specifically distinguishes desktop and smaller viewport behavior:

```text
Desktop
├── Floating technology icons
├── Mouse parallax
└── Ambient effects

Tablet / Mobile
├── Responsive icon layout
├── Reduced visual density
└── No desktop mouse-parallax interaction
```

The animation also respects:

```text
prefers-reduced-motion: reduce
```

so users who request reduced motion are not forced to experience the interactive parallax behavior.

---

## ⚙️ Environment Configuration

Create a `.env` file for your local environment.

The MySQL connection supports:

```env
MYSQL_URL=
```

or individual connection variables:

```env
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=
MYSQL_DATABASE=portfolio_db
```

Optional application configuration can also be provided through environment variables where required by the deployment environment.

### Security

Do **not** commit your real `.env` file or database credentials to GitHub.

Use `.env.example` for shareable configuration templates.

---

## 🚀 Getting Started

### Prerequisites

Install:

- Node.js
- npm
- MySQL

Make sure your MySQL server is running before starting the application if you want persistent database storage.

### 1. Clone the repository

```bash
git clone https://github.com/Karthick-code/Portfolio-2.git
cd Portfolio-2
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure MySQL

Create the database:

```sql
CREATE DATABASE portfolio_db;
```

Then configure the connection in `.env`:

```env
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=portfolio_db
```

The backend initializes the required tables when a MySQL connection is established.

### 4. Start the application

```bash
npm run dev
```

The project starts the Node/Express server and integrates Vite for development.

Open:

```text
http://localhost:3000
```

### 5. Production build

```bash
npm run build
```

### 6. Start production server

```bash
npm start
```

---

## 🌱 Database Seeding

The project includes a database seeding layer:

```text
server/seed/seedData.js
```

The server runs the seed process during startup after initializing the MySQL connection.

This allows a new environment to be populated with the initial portfolio data required by the application.

---

## 🏗️ Production Architecture

In production, the application can be deployed as a single Node.js/Express application serving the built React frontend.

```text
                     Internet
                        │
                        ▼
                Node.js / Express
                   Port 3000
                        │
              ┌─────────┴─────────┐
              │                   │
              ▼                   ▼
        React static files      REST API
              │                   │
              └─────────┬─────────┘
                        ▼
                     MySQL
```

During development, Vite is integrated into the Express server. In production, the generated `dist` directory is served as static content.

---

## 🧠 Design Decisions

### Database-driven content

Portfolio content is stored in MySQL instead of being permanently hard-coded into React components.

This makes the portfolio easier to maintain and demonstrates real CRUD/API/database experience.

### Controller separation

Authentication, profile, skills, projects, experience, education, messages, and statistics are separated into dedicated controllers.

### Protected administration

Administrative operations are separated from the public portfolio and protected through authentication middleware.

### Reusable frontend components

Public and admin UI are divided into reusable components instead of keeping the entire portfolio in one large React component.

### Dedicated animation layer

Hero animations live in their own directory so visual effects do not become tightly coupled to the portfolio's content components.

---

## 📌 Current Repository Notes

The repository is currently organized around:

- `src/` for React frontend code
- `server/` for backend API/database code
- `server/config/db.js` for MySQL connectivity
- `server/controllers/` for API logic
- `server/routes/` for endpoint definitions
- `server/models/` for data structures
- `server/seed/` for initial database data
- `src/animations/` for the hero technology animation system
- `src/components/public/` for public portfolio UI
- `src/components/admin/` for administrative UI

The GitHub repository currently identifies the project as a portfolio using MySQL, Express, React, and Node. 

---

## 🔍 Technical Notes

The database implementation contains a development fallback memory store when a live MySQL connection cannot be established. This is useful for local resilience, but **production deployments should be configured with a real MySQL database** so portfolio data and contact messages persist across restarts.

The repository also contains some development/build dependencies that are not central to the primary architecture. The README therefore focuses on the technologies actually forming the application's core runtime: React, Vite, Node.js, Express.js, MySQL, JWT, bcrypt, Axios, Tailwind CSS, Lucide React, Motion, and related utilities.

---

## 📈 What This Project Demonstrates

This portfolio demonstrates practical experience with:

- React component architecture
- REST API development
- Express.js routing
- Node.js backend development
- MySQL database design
- SQL-based CRUD operations
- Authentication and authorization
- JWT
- Password hashing
- Environment configuration
- Admin dashboards
- API-driven content
- Responsive frontend development
- Animation and interaction design
- Accessibility-aware animation
- Full-stack application integration
- Production build configuration

---

## 👨‍💻 Author

**Karthick**

Full-Stack Developer

- React
- Node.js
- Express.js
- MySQL
- JavaScript
- Database Development

---

## 📄 License

This project is a personal developer portfolio.

If you plan to reuse or redistribute the source code, add an appropriate license to the repository.
