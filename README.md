# Job Board - Modern Full-Stack Application

A modern, full-featured job board built with Next.js 14, TypeScript, React, Tailwind CSS, and Stripe payments. This application demonstrates best practices in frontend development, UX design, testing, and performance optimization.

## 🚀 Tech Stack

### Frontend Development
- **Next.js 15** - React framework with App Router, SSR/SSG support
- **React 18** - UI library with modern hooks and patterns
- **TypeScript** - Type-safe JavaScript for better developer experience
- **Tailwind CSS** - Utility-first CSS framework for responsive design

### UI & Styling
- **Responsive Design** - Mobile-first approach with Tailwind breakpoints
- **Design System** - Consistent UI components and patterns
- **Accessibility (ARIA)** - Semantic HTML, ARIA labels, keyboard navigation
- **Custom Components** - Reusable, accessible UI components

### State & Data Management
- **React Hooks** - useState, useEffect, custom hooks
- **TanStack Query** - Server state management and caching
- **REST APIs** - Next.js API routes for backend functionality
- **Prisma** - Type-safe database ORM

### Authentication & Security
- **NextAuth.js** - Authentication for Next.js applications
- **Bcrypt** - Password hashing
- **Zod** - Schema validation

### Payment Integration
- **Stripe** - Payment processing for job postings
- **Stripe Elements** - Customizable payment forms

### Testing & Quality
- **Vitest** - Unit testing framework
- **Playwright** - End-to-end testing
- **TypeScript** - Type checking
- **ESLint 9** - Code linting with Next.js integration

### Performance & Optimization
- **SSR/SSG** - Server-side rendering and static site generation
- **Next.js Image Optimization** - Automatic image optimization
- **Core Web Vitals** - Performance monitoring (LCP, INP)
- **Revalidation** - ISR (Incremental Static Regeneration)

## 📋 Prerequisites

Before running this application, make sure you have:

- **Node.js** 18.x or higher ([Download](https://nodejs.org/))
- **npm** or **yarn** package manager
- **Stripe Account** for payment processing ([Sign up](https://stripe.com/))

## 🛠️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/alwaysvivek/job_board.git
cd job_board
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:

```env
# Database
DATABASE_URL="file:./dev.db"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-generate-with-openssl-rand-base64-32"

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

**Generate a secure NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### 4. Set up the database

Initialize Prisma and create the database:

```bash
npx prisma generate
npx prisma db push
```

### 5. (Optional) Seed the database

You can manually add test data through the UI after starting the app, or create a seed script.

## 🚀 Running the Application

### Development Mode

Start the development server with hot-reload:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

Build the application for production:

```bash
npm run build
npm run start
# or
yarn build
yarn start
```

### Type Checking

Run TypeScript type checking:

```bash
npm run type-check
# or
yarn type-check
```

### Linting

Run ESLint to check code quality:

```bash
npm run lint
# or
yarn lint
```

## 🧪 Testing

### Unit Tests (Vitest)

Run unit tests:

```bash
npm run test
# or
yarn test
```

Run tests in watch mode:

```bash
npm run test -- --watch
```

### E2E Tests (Playwright)

Install Playwright browsers (first time only):

```bash
npx playwright install
```

Run E2E tests:

```bash
npm run test:e2e
# or
yarn test:e2e
```

Run E2E tests with UI:

```bash
npm run test:e2e:ui
# or
yarn test:e2e:ui
```

## 📁 Project Structure

```
job_board/
├── app/                      # Next.js App Router
│   ├── api/                 # API routes
│   │   ├── auth/           # Authentication endpoints
│   │   └── jobs/           # Job CRUD endpoints
│   ├── auth/               # Auth pages (signin, signup)
│   ├── jobs/               # Job pages
│   │   ├── [id]/          # Job detail page
│   │   └── new/           # Create job page
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   ├── providers.tsx       # Client-side providers
│   └── globals.css         # Global styles
├── components/              # React components
│   ├── Header.tsx
│   ├── JobCard.tsx
│   ├── JobForm.tsx
│   ├── JobList.tsx
│   └── FilterBar.tsx
├── lib/                     # Utility functions
│   ├── auth.ts             # NextAuth configuration
│   ├── prisma.ts           # Prisma client
│   └── stripe.ts           # Stripe configuration
├── prisma/                  # Database schema
│   └── schema.prisma
├── types/                   # TypeScript types
│   ├── index.ts
│   └── next-auth.d.ts
├── __tests__/              # Unit tests
├── e2e/                    # E2E tests
├── public/                 # Static files
├── .env.example            # Environment variables template
├── next.config.js          # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── vitest.config.ts        # Vitest configuration
└── playwright.config.ts    # Playwright configuration
```

## 🎯 Features

### For Job Seekers
- Browse job listings with filtering by job type
- View detailed job information
- Search and filter jobs
- Apply to jobs with external links
- Responsive design for mobile and desktop

### For Employers
- User registration and authentication
- Post job listings with Stripe payment ($300)
- Secure payment processing
- Job management

### Technical Features
- **Server-Side Rendering (SSR)** - Fast initial page load
- **Static Site Generation (SSG)** - Pre-rendered pages
- **Incremental Static Regeneration (ISR)** - Auto-updates every 60s
- **Accessibility** - ARIA labels, semantic HTML, keyboard navigation
- **Responsive Design** - Mobile-first approach
- **Type Safety** - Full TypeScript coverage
- **Form Validation** - Client and server-side validation with Zod
- **Error Handling** - Graceful error messages
- **Performance Optimization** - Code splitting, lazy loading

## 🔒 Security

- Passwords hashed with bcrypt
- CSRF protection via NextAuth.js
- SQL injection prevention via Prisma
- XSS protection via React
- Secure payment processing via Stripe
- Environment variables for sensitive data

## 🎨 UX & Design Principles

- **Clear CTAs** - Prominent call-to-action buttons
- **Cognitive Load Reduction** - Simple, intuitive interfaces
- **Behavioral UX** - User-centered design patterns
- **Consistent Design System** - Reusable components
- **Feedback & Validation** - Real-time form feedback
- **Loading States** - Clear loading indicators

## 📊 Performance

The application is optimized for Core Web Vitals:

- **LCP (Largest Contentful Paint)** - Optimized with SSR and image optimization
- **INP (Interaction to Next Paint)** - Fast, responsive interactions
- **CLS (Cumulative Layout Shift)** - Stable layouts with proper sizing

## 🛠️ Development Tools

- **Git** - Version control
- **GitHub** - Code hosting and collaboration
- **Vercel** - Deployment platform (recommended)
- **AI-assisted Development** - GitHub Copilot / Cursor compatible

## 🚢 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Configure environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production

Make sure to set these in your Vercel dashboard:
- `DATABASE_URL`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

Built with modern web technologies and best practices for frontend development, demonstrating skills in:
- Frontend Development (HTML5, CSS3, JavaScript ES6+, TypeScript, React, Next.js)
- UI & Styling (Tailwind CSS, Responsive Design, Accessibility)
- State & Data Management (React Hooks, TanStack Query, REST APIs)
- Testing & Performance (Playwright, Vitest, Core Web Vitals)
- UX & Product Thinking (User Stories, Clear CTAs, Cognitive Load Reduction)

---

**Note:** This is a demonstration project showcasing modern frontend development practices. For production use, ensure proper security audits, testing, and compliance with relevant regulations.

