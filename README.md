# Job Board — Modern Full-Stack Rewrite (Next.js 15)

A modern, high-performance job board built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**. This project re-imagines the classic *“Let’s Build: With Ruby on Rails”* Job Board series using today’s React ecosystem.

This project focuses on clean UX, type safety, testing, and Core Web Vitals, while intentionally removing payments to keep the core product simple, extensible, and deployment-friendly.

---

## 📖 Overview

* **Evolution:** Rewritten from a Rails monolith to a component-driven full-stack app.
* **Performance:** Optimized for SSR, SSG, and ISR for maximum speed and SEO.
* **Quality:** Emphasis on frontend excellence and production-grade patterns.
* **Purpose:** Designed as a portfolio-ready reference project for modern developers.

---

## 🔄 Rails → Next.js Evolution

| Feature | Original (Rails) | Modern Rewrite |
| --- | --- | --- |
| **Framework** | Ruby on Rails 5/6 | **Next.js 15 (App Router)** |
| **Styling** | Bulma CSS | **Tailwind CSS + Glassmorphism** |
| **Auth** | Devise | **NextAuth.js** |
| **ORM** | ActiveRecord | **Prisma** |
| **Payments** | Stripe | ❌ Removed |
| **State** | Server Views | **TanStack Query** |
| **Testing** | RSpec/Minitest | **Vitest + Playwright** |

---

## 🚀 Tech Stack

### Frontend

* **Next.js 15 & React 18**
* **TypeScript** for static typing
* **Tailwind CSS** for utility-first styling
* **Lucide Icons** for consistent iconography

### State & Data

* **React Hooks** for local state
* **TanStack Query** for server state management
* **Prisma ORM** for type-safe database access
* **Zod** for schema validation

### Auth & Security

* **NextAuth.js** for authentication
* **Bcrypt** for password hashing
* **Security:** Built-in protection against CSRF, XSS, and SQL Injection

### Testing & Quality

* **Vitest** for unit and integration testing
* **Playwright** for end-to-end (E2E) testing
* **ESLint 9** for linting
* Full type coverage across the application

### Performance

* **Hybrid rendering** (SSR / SSG / ISR)
* Next.js Image Optimization
* Optimized for **LCP** (Largest Contentful Paint) and **INP** (Interaction to Next Paint)

---

## 🎯 Features

### Job Seekers

* **Job type filtering:** Full-time, Part-time, Contract, and Freelance categories.
* **Remote-only toggle:** Filter specifically for remote opportunities.
* **Markdown descriptions:** Rich text rendering for job details.
* **Responsive UI:** Seamless experience across all device sizes.

### Employers

* **Secure authentication:** Login and registration for company accounts.
* **Listing Management:** Intuitive dashboard to post, edit, and delete jobs.
* **Company Branding:** Manage logos and metadata for professional profiles.

---

## 🛠️ Setup

### Prerequisites

* Node.js 18+
* npm, yarn, or pnpm

### Installation

```bash
git clone https://github.com/alwaysvivek/job_board.git
cd job_board
npm install

```

### Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

```

### Database

```bash
npx prisma generate
npx prisma db push

```

---

## 🚀 Running the App

```bash
npm run dev        # Development mode
npm run build      # Production build
npm run start      # Production server

```

## 🧪 Testing

```bash
npm run test        # Run Vitest suites
npx playwright install
npm run test:e2e    # Run Playwright E2E tests

```

---

## 📁 Project Structure (Simplified)

* `app/` — Next.js App Router (routes, layouts, APIs)
* `components/` — Reusable React UI components
* `lib/` — Shared logic (auth, prisma client, utils)
* `prisma/` — Database schema and migrations
* `tests/` — Combined unit and E2E test suites

---

## 🎨 UX & Design Philosophy

* **Clear CTAs:** Focused user paths for both seekers and employers.
* **Reduced Cognitive Load:** Minimalist layouts with high readability.
* **Accessibility:** ARIA labels and full keyboard navigation support.
* **Atomic Design:** Consistent component system applied to Tailwind.
* **Glassmorphism:** Subtle visual depth for a modern, premium aesthetic.

---

## 📝 License

This project is licensed under the **MIT License**.

## ✨ Why this project matters

This isn't just a CRUD app; it’s a modern frontend showcase demonstrating real-world architecture, testing discipline, performance awareness, and clean, maintainable code.
