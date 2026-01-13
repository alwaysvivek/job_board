# Jobs — Modern Full-Stack Rewrite (Next.js 15)

A modern, high-performance job board built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**. This project reimagines the classic *“Let’s Build: With Ruby on Rails”* Job Board series using today’s React ecosystem.

> **Live demo:** [job-board-sandy-seven.vercel.app](https://job-board-sandy-seven.vercel.app)

---

## 📖 Overview

**Jobs** transforms the original Rails monolith into a component-driven, full-stack app built for speed, clarity, and scalability. It is designed to be easy to extend, performance-oriented, and approachable for frontend and full-stack portfolios. Payment features have been intentionally removed for simplicity.

---

## 🔄 Rails → Next.js Evolution

| Feature     | Original (Rails) | Modern Rewrite        |
| ----------- | ---------------- | --------------------- |
| Framework   | Rails 5/6        | Next.js 15 (App Router)|
| Styling     | Bulma CSS        | Tailwind CSS + Glassmorphism |
| Auth        | Devise           | NextAuth.js           |
| ORM         | ActiveRecord     | Prisma                |
| Payments    | Stripe           | ❌ Removed            |
| State       | Server Views     | TanStack Query        |
| Testing     | RSpec/Minitest   | Vitest + Playwright   |

---

## 🚀 Tech Stack

- **Next.js 15 & React 18**
- **TypeScript** for static typing
- **Tailwind CSS** for utility-first styling
- **Lucide Icons** for iconography
- **React Hooks** for local state
- **TanStack Query** for server state management
- **Prisma ORM** for type-safe database access
- **Zod** for schema validation
- **NextAuth.js** for authentication
- **Bcrypt** for password hashing
- **Vitest** for unit/integration testing
- **Playwright** for E2E testing
- **ESLint 9** for linting

---

## 🏗️ Architecture Overview

```mermaid
graph LR
    subgraph Client["🌐 Client Layer"]
        Browser["Browser<br/>(React 18)"]
    end

    subgraph Frontend["📱 Frontend - app/ & components/"]
        Pages["Pages<br/>page.tsx<br/>jobs/[id]<br/>auth/signin"]
        Components["Components<br/>JobCard<br/>JobForm<br/>FilterBar"]
    end

    subgraph API["⚡ API Routes - app/api/"]
        Routes["Jobs API<br/>Auth API<br/>Signup API"]
    end

    subgraph Logic["🔧 Core - lib/"]
        Auth["NextAuth<br/>Config"]
        DB["Prisma<br/>Client"]
    end

    subgraph Database["🗄️ Database"]
        Postgres["Neon<br/>PostgreSQL"]
        Schema["Prisma Schema<br/>User, Job<br/>Account, Session"]
    end

    subgraph Stack["🛠️ Tech Stack"]
        Tech1["Next.js 15<br/>TypeScript 5"]
        Tech2["Tailwind CSS<br/>TanStack Query"]
        Tech3["Prisma ORM<br/>Zod Validation"]
    end

    %% Main Flow
    Browser -->|User Request| Pages
    Pages -->|Renders| Components
    Components -->|API Calls| Routes
    Routes -->|Validates & Auth| Auth
    Routes -->|CRUD Operations| DB
    Auth -->|Session Check| DB
    DB -->|Queries| Postgres
    Schema -.->|Defines| Postgres

    %% Tech Stack
    Tech1 -.->|Powers| Pages
    Tech2 -.->|Styles & State| Components
    Tech3 -.->|Validates & ORM| Routes

    classDef clientStyle fill:#e3f2fd,stroke:#1976d2,stroke-width:3px
    classDef frontendStyle fill:#f3e5f5,stroke:#7b1fa2,stroke-width:3px
    classDef apiStyle fill:#e8f5e9,stroke:#388e3c,stroke-width:3px
    classDef logicStyle fill:#fff3e0,stroke:#f57c00,stroke-width:3px
    classDef dbStyle fill:#fce4ec,stroke:#c2185b,stroke-width:3px
    classDef techStyle fill:#e0f2f1,stroke:#00796b,stroke-width:2px

    class Browser clientStyle
    class Pages,Components frontendStyle
    class Routes apiStyle
    class Auth,DB logicStyle
    class Postgres,Schema dbStyle
    class Tech1,Tech2,Tech3 techStyle
```

### 📊 Data Flow

1. **User Request** → Browser loads React components
2. **Page Rendering** → Next.js App Router (SSR/SSG) fetches data via Prisma
3. **User Actions** → Components call API routes with validation (Zod)
4. **Authentication** → NextAuth.js validates JWT sessions
5. **Database Operations** → Prisma ORM → Neon Adapter → PostgreSQL
6. **Response** → JSON data → TanStack Query cache → UI update

---

## 🎯 Features

### Job Seekers

- Job type filtering: Full-time, Part-time, Contract, Freelance
- Remote-only toggle
- Markdown job descriptions
- Responsive, accessible UI

### Employers

- Secure authentication (company accounts)
- Listing management: post, edit, delete jobs
- Company branding: logos and profile metadata

---

## 🛠️ Setup

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

```bash
git clone https://github.com/alwaysvivek/jobs.git
cd jobs
npm install
```

### Environment Variables

Create a `.env` file in the root:

```env
DATABASE_URL="postgresql://user:password@host:5432/database?sslmode=require"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
```

Generate a secure `NEXTAUTH_SECRET` with:  
`openssl rand -base64 32`

### Database Setup

```bash
npx prisma generate
npx prisma db push
```

---

## 🚀 Running the App

### Development

```bash
npm run dev        # http://localhost:3000
```

### Production

```bash
npm run build
npm run start
```

---

## 🧪 Testing

```bash
npm run test        # Run Vitest
npx playwright install
npm run test:e2e    # E2E tests with Playwright
```

---

## 📁 Project Structure (Simplified)

- `app/` — Next.js App Router (routes, layouts, APIs)
- `components/` — Reusable React components
- `lib/` — Shared logic (auth, prisma client, utils)
- `prisma/` — DB schema, migrations
- `tests/` — Unit & E2E test suites

---

## 🎨 UX & Design Philosophy

- **Clear CTAs:** Distinct paths for job seekers and employers
- **Minimalist layouts:** Readable, focused design
- **Accessibility:** ARIA labels, keyboard navigation
- **Atomic Design:** Consistent Tailwind components
- **Glassmorphism:** Subtle, modern visual depth

---

## 📝 License

Licensed under the **MIT License**.

---

## ✨ Why this project matters

This isn't just a CRUD app; it’s a showcase for modern frontend and full-stack practices, performance, testing, and maintainable code. Perfect for learning and as a portfolio reference.
