# Deployment Guide for Vercel

This guide walks you through deploying the Job Board application to Vercel with all the new features working properly.

## Prerequisites

- GitHub account with this repository
- Vercel account (free tier works)
- PostgreSQL database (Neon or Supabase recommended for free tier)

## Step 1: Set Up Database

### Option A: Neon (Recommended)
1. Go to [Neon.tech](https://neon.tech)
2. Sign up for free
3. Create a new project
4. Copy the connection string (looks like: `postgresql://user:password@host.neon.tech/dbname?sslmode=require`)

### Option B: Supabase
1. Go to [Supabase.com](https://supabase.com)
2. Create a new project
3. Go to Settings → Database
4. Copy the connection string under "Connection pooling"

## Step 2: Prepare Environment Variables

You'll need these environment variables for Vercel:

```bash
DATABASE_URL="your_postgres_connection_string"
NEXTAUTH_URL="https://your-app-name.vercel.app"
NEXTAUTH_SECRET="generate-a-random-secret-here"
```

To generate `NEXTAUTH_SECRET`, run:
```bash
openssl rand -base64 32
```

Or use: https://generate-secret.vercel.app/32

## Step 3: Deploy to Vercel

### Using Vercel CLI (Recommended)
1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. Follow the prompts to:
   - Link to an existing project or create new one
   - Set up the project settings
   - Deploy

5. Set environment variables:
   ```bash
   vercel env add DATABASE_URL production
   vercel env add NEXTAUTH_URL production
   vercel env add NEXTAUTH_SECRET production
   ```

6. Redeploy with environment variables:
   ```bash
   vercel --prod
   ```

### Using Vercel Dashboard
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Configure Project:
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)

5. Add Environment Variables:
   - Click "Environment Variables"
   - Add all three variables listed above
   - Click "Deploy"

## Step 4: Initialize Database

After deployment, you need to set up your database schema:

### Option 1: Using Vercel CLI
```bash
# Set up Prisma with your production database
DATABASE_URL="your_production_db_url" npx prisma db push
```

### Option 2: Using Terminal
1. SSH into your local environment
2. Update `.env` with your production DATABASE_URL
3. Run:
   ```bash
   npx prisma db push
   ```

### Option 3: Using Prisma Data Platform (Recommended for production)
1. Create free account at [Prisma Data Platform](https://cloud.prisma.io)
2. Import your schema
3. Connect to your database
4. Run migrations through their UI

## Step 5: Verify Deployment

Visit your deployed app and test:
- ✅ Homepage loads with job listings
- ✅ Sign up/Sign in works
- ✅ Can create a new job
- ✅ Search functionality works
- ✅ Pagination works
- ✅ Sorting options work
- ✅ Bookmarking works (after signing in)
- ✅ View counts increment
- ✅ Job expiry dates work

## Step 6: Set Up Automatic Deployments

Vercel automatically deploys when you push to your main branch:

1. Go to your project settings on Vercel
2. Under "Git" tab, ensure:
   - Auto-deploy is enabled for your main branch
   - Preview deployments are enabled for pull requests

## New Features Database Schema

The following database schema changes are included in this deployment:

```prisma
model Job {
  viewCount   Int      @default(0)  // NEW: Track page views
  expiresAt   DateTime?             // NEW: Optional job expiry
  bookmarks   Bookmark[]            // NEW: Bookmark relation
  // ... existing fields
}

model Bookmark {                    // NEW: Bookmark model
  id        String   @id @default(cuid())
  userId    String
  jobId     String
  createdAt DateTime @default(now())
  user      User     @relation(...)
  job       Job      @relation(...)
  @@unique([userId, jobId])
}
```

## Performance Optimization

This deployment includes several optimizations:
- Non-blocking view count tracking
- Pagination (12 jobs per page)
- Indexed database queries
- Server-side rendering with 60-second revalidation
- Efficient bookmark queries

## Monitoring

After deployment, monitor your application:
1. Check Vercel Analytics (automatically enabled)
2. Monitor database usage in Neon/Supabase dashboard
3. Check error logs in Vercel dashboard under "Logs"

## Troubleshooting

### Build Fails
- Check environment variables are set correctly
- Ensure DATABASE_URL is accessible from Vercel
- Check build logs for specific errors

### Database Connection Issues
- Verify DATABASE_URL format includes `?sslmode=require`
- Check if database accepts connections from Vercel IPs
- For Neon: Ensure connection pooling is enabled

### Authentication Not Working
- Verify NEXTAUTH_URL matches your deployment URL
- Ensure NEXTAUTH_SECRET is set
- Check that it's a valid base64 string

### Features Not Working
- Run `npx prisma db push` to ensure schema is up to date
- Check that all environment variables are in production environment
- Verify database migrations completed successfully

## Updating the Application

To deploy updates:
1. Make changes locally
2. Test locally with `npm run dev`
3. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Your update message"
   git push origin main
   ```
4. Vercel automatically deploys the changes

## Cost Considerations

### Vercel (Free Tier Limits)
- 100 GB bandwidth/month
- Unlimited deployments
- Serverless function executions: Good for moderate traffic

### Database (Neon Free Tier)
- 3 GB storage
- 1 compute instance
- Good for development and small production apps

### Scaling
When you need to scale:
- Upgrade Vercel plan for more bandwidth
- Upgrade database for more storage/compute
- Consider adding Redis for caching
- Implement CDN for static assets

## Security Checklist

Before going live:
- ✅ All environment variables are set in Vercel
- ✅ Database credentials are not in code
- ✅ NEXTAUTH_SECRET is strong and unique
- ✅ Database accepts only SSL connections
- ✅ Rate limiting is considered (future enhancement)

## Support

If you encounter issues:
1. Check Vercel documentation: https://vercel.com/docs
2. Check Next.js documentation: https://nextjs.org/docs
3. Check Prisma documentation: https://www.prisma.io/docs
4. Create an issue in the GitHub repository

---

**Deployment Date**: January 3, 2026  
**Version**: 2.0 - Feature Update Release
