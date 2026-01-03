# Job Board — Modern Full-Stack Application (Next.js 15)

> **Perfect for Portfolio:** A production-ready job board showcasing full-stack development skills with modern technologies. Ideal for freshers and entry-level developers.

A comprehensive job board application built with **Next.js 15**, **TypeScript**, **PostgreSQL**, and **Tailwind CSS**. This project demonstrates practical full-stack development skills including authentication, CRUD operations, search functionality, and user dashboards.

Originally inspired by the *"Let's Build: With Ruby on Rails"* tutorial series, this version has been completely rebuilt with modern technologies and **significantly extended with custom features** to showcase real-world development capabilities.

---

## 🎯 Why This Project?

### For Freshers & Entry-Level Developers

This is an excellent portfolio project because it demonstrates:

✅ **Full-Stack Capabilities** - Both frontend UI and backend API development  
✅ **Modern Tech Stack** - Industry-standard tools (Next.js, TypeScript, PostgreSQL)  
✅ **Real-World Features** - Not just a basic CRUD app, includes search, dashboards, auth  
✅ **Production Deployment** - Actually deployed and running on Vercel  
✅ **Best Practices** - Type safety, validation, error handling, security basics  
✅ **Clean Code** - Well-organized, documented, and maintainable  

---

## �� Overview

* **Full-Stack Application:** Complete frontend and backend implementation
* **Modern Architecture:** Next.js 15 App Router with Server and Client Components
* **Type-Safe Development:** TypeScript throughout for better code quality
* **Database Design:** PostgreSQL with Prisma ORM for type-safe database access
* **Comprehensive Features:** Authentication, CRUD operations, search, filtering, dashboards
* **Production Ready:** Deployed on Vercel with proper environment configuration

---

## 🔄 Technology Evolution

| Feature | Original (Rails) | This Project (Next.js) |
| --- | --- | --- |
| **Framework** | Ruby on Rails 5/6 | **Next.js 15 (App Router)** |
| **Language** | Ruby | **TypeScript** |
| **Styling** | Bulma CSS | **Tailwind CSS + Glassmorphism** |
| **Auth** | Devise | **NextAuth.js** |
| **Database** | SQLite/PostgreSQL | **PostgreSQL with Prisma ORM** |
| **ORM** | ActiveRecord | **Prisma** |
| **Payments** | Stripe | ❌ Removed (focus on core features) |
| **State Management** | Server Views | **React Hooks + Server Components** |
| **Testing** | RSpec/Minitest | **Vitest + Playwright** |

---

## 🚀 Tech Stack

### Frontend
* **Next.js 15** - React framework with App Router
* **React 18** - UI library with modern hooks
* **TypeScript** - Static typing for better code quality
* **Tailwind CSS** - Utility-first CSS framework
* **Responsive Design** - Mobile-first approach

### Backend
* **Next.js API Routes** - RESTful API endpoints
* **NextAuth.js** - Authentication and session management
* **Prisma ORM** - Type-safe database access
* **PostgreSQL** - Relational database
* **Zod** - Schema validation

### DevOps & Tools
* **Vercel** - Deployment platform
* **Git & GitHub** - Version control
* **ESLint** - Code linting
* **Vitest** - Unit testing
* **Playwright** - E2E testing

---

## 🎯 Features

### For Job Seekers
* 🔍 **Advanced Search** - Full-text search across titles, companies, locations
* 🏷️ **Job Type Filtering** - Full-time, Part-time, Contract, Freelance
* 🌐 **Remote Filter** - Find remote opportunities easily
* 📱 **Responsive Design** - Works seamlessly on all devices
* 📄 **Detailed Job Pages** - Complete job information with apply links

### For Employers
* 🔐 **Secure Authentication** - Sign up and sign in with NextAuth.js
* 📊 **Personal Dashboard** - Manage all your job postings in one place
* ✏️ **Create Jobs** - Post new job listings with rich details
* 🔧 **Edit Jobs** - Update your job postings anytime
* 🗑️ **Delete Jobs** - Remove old or filled positions
* 👤 **Profile Management** - Company branding and information

### Platform Features
* 🔒 **Role-Based Access** - User and admin roles with proper permissions
* ⚡ **Server-Side Rendering** - Fast page loads and SEO optimization
* 🎨 **Modern UI/UX** - Clean, intuitive interface with glassmorphism design
* ✅ **Input Validation** - Zod schemas for data integrity
* 🛡️ **Security** - Protected against common vulnerabilities (XSS, CSRF, SQL Injection)

---

## 🛠️ Setup & Installation

### Prerequisites
* Node.js 18+ installed
* PostgreSQL database (or use Neon/Supabase for free serverless PostgreSQL)
* npm or yarn

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/alwaysvivek/job_board.git
   cd job_board
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="postgresql://user:password@host:5432/database?sslmode=require"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open in browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🚀 Running the App

```bash
npm run dev        # Development mode
npm run build      # Production build
npm run start      # Production server
npm run lint       # Run ESLint
```

## 🧪 Testing

```bash
npm run test        # Run Vitest unit tests
npm run test:e2e    # Run Playwright E2E tests (after npx playwright install)
```

---

## 📁 Project Structure

```
job_board/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   │   └── jobs/         # Job CRUD endpoints
│   │       ├── route.ts       # GET all, POST new
│   │       ├── [id]/route.ts  # GET, PUT, DELETE by ID
│   │       └── search/route.ts # Search endpoint
│   ├── auth/             # Authentication pages
│   │   ├── signin/
│   │   └── signup/
│   ├── dashboard/        # User dashboard
│   ├── jobs/             # Job pages
│   │   ├── new/          # Create job page
│   │   └── [id]/         # Job detail and edit
│   ├── search/           # Search results page
│   └── page.tsx          # Home page
├── components/            # Reusable React components
│   ├── Header.tsx
│   ├── JobCard.tsx
│   ├── JobForm.tsx
│   ├── JobList.tsx
│   ├── FilterBar.tsx
│   ├── SearchBar.tsx
│   ├── JobActions.tsx
│   └── JobDashboardList.tsx
├── lib/                   # Utility functions
│   ├── auth.ts           # NextAuth configuration
│   └── prisma.ts         # Prisma client
├── prisma/               # Database
│   ├── schema.prisma     # Database schema
│   └── seed.ts           # Seed data
├── types/                # TypeScript types
└── __tests__/            # Test files
```

---

## 🔌 API Endpoints

### Jobs API

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/jobs` | Get all jobs | No |
| `POST` | `/api/jobs` | Create a new job | Yes |
| `GET` | `/api/jobs/[id]` | Get specific job | No |
| `PUT` | `/api/jobs/[id]` | Update a job | Yes (owner/admin) |
| `DELETE` | `/api/jobs/[id]` | Delete a job | Yes (owner/admin) |
| `GET` | `/api/jobs/search?q=query` | Search jobs | No |

### Authentication API

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/signup` | Register new user |
| `POST` | `/api/auth/signin` | Sign in user |
| `POST` | `/api/auth/signout` | Sign out user |

---

## 💼 Skills Demonstrated

### Frontend Development
* React 18 with modern hooks (useState, useEffect, useRouter)
* Next.js 15 App Router (Server Components, Client Components, Layouts)
* TypeScript for type-safe component development
* Tailwind CSS for responsive, mobile-first design
* Form handling with validation and error states
* Client-side routing and navigation
* Conditional rendering and list rendering

### Backend Development
* RESTful API design with proper HTTP methods
* CRUD operations (Create, Read, Update, Delete)
* Database schema design with relations
* Server-side data fetching and caching
* Authentication and authorization
* Input validation with Zod schemas
* Error handling and proper HTTP status codes
* Search and filtering logic

### Database & ORM
* PostgreSQL relational database design
* Prisma ORM for type-safe database queries
* Database relations (one-to-many)
* Indexing for query performance
* Migrations and schema management

### Security
* Password hashing with bcrypt
* Session-based authentication
* Protected API routes
* Role-based access control (RBAC)
* Input sanitization and validation
* Environment variable management

### Development Practices
* Git version control
* Clean code organization
* Component-driven architecture
* Reusable components
* Error handling and user feedback
* TypeScript strict mode
* ESLint for code quality
* Environment-based configuration

---

## 🚀 Deployment to Vercel

### Step-by-Step Deployment

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Set up Database**
   * Sign up for [Neon](https://neon.tech/) or [Supabase](https://supabase.com/) (free tier)
   * Create a new PostgreSQL database
   * Copy the connection string

3. **Deploy to Vercel**
   * Go to [Vercel](https://vercel.com/)
   * Import your GitHub repository
   * Add environment variables:
     ```
     DATABASE_URL=your_postgres_connection_string
     NEXTAUTH_URL=https://your-app.vercel.app
     NEXTAUTH_SECRET=your_generated_secret
     ```
   * Deploy!

4. **Run Migrations**
   ```bash
   npx prisma db push
   ```

### Why Vercel?

* **Zero Configuration** - Works out of the box with Next.js
* **Free Tier** - Perfect for portfolio projects
* **Automatic Deployments** - Deploy on every git push
* **Global CDN** - Fast loading worldwide
* **Environment Variables** - Secure secret management

---

## 🎓 Learning Resources

### For Freshers Learning This Project

1. **Start Here:**
   * Explore the home page (`app/page.tsx`) - see how data is fetched
   * Check out `components/JobCard.tsx` - learn React component patterns
   * Read through `app/api/jobs/route.ts` - understand API creation

2. **Next Steps:**
   * Study the authentication flow in `lib/auth.ts`
   * Understand database schema in `prisma/schema.prisma`
   * Review the dashboard in `app/dashboard/page.tsx`

3. **Advanced:**
   * Implement new features (e.g., job bookmarking, email notifications)
   * Add pagination for job listings
   * Create company profile pages

### Technologies to Learn

1. **Next.js** - [Official Tutorial](https://nextjs.org/learn)
2. **TypeScript** - [TypeScript Handbook](https://www.typescriptlang.org/docs/)
3. **Prisma** - [Prisma Quickstart](https://www.prisma.io/docs/getting-started)
4. **Tailwind CSS** - [Tailwind Docs](https://tailwindcss.com/docs)

---

## 🎯 Resume Talking Points

When discussing this project in interviews:

1. **"Built a full-stack job board application"**
   * Implemented complete CRUD operations
   * Created RESTful API endpoints
   * Designed PostgreSQL database schema

2. **"Used modern web technologies"**
   * Next.js 15 for server-side rendering
   * TypeScript for type safety
   * Prisma ORM for database access

3. **"Implemented key features"**
   * User authentication with NextAuth.js
   * Advanced search functionality
   * Role-based access control
   * Responsive mobile design

4. **"Deployed to production"**
   * Live on Vercel with real database
   * Configured environment variables
   * Managed database migrations

5. **"Extended an existing project"**
   * Started from open-source Rails tutorial
   * Rebuilt with modern stack
   * Added custom features (dashboard, search, edit/delete)

---

## 📝 License

This project is licensed under the **MIT License**.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! This is a learning project, so feel free to:

* Report bugs
* Suggest new features
* Submit pull requests
* Ask questions

---

## 👨‍💻 Author

**Vivek**
* GitHub: [@alwaysvivek](https://github.com/alwaysvivek)

---

## ⭐ Acknowledgments

* Original inspiration from "Let's Build: With Ruby on Rails" tutorial series
* Next.js and Vercel teams for excellent documentation
* The open-source community

---

**Made with ❤️ by a fresher learning full-stack development**
