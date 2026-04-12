# GK Builders - Vercel Deployment Guide

**Professional Construction Company Website**  
Owner: Gautam Kumar | Civil Contractor | Rishikesh, Uttarakhand

---

## 📋 Overview

This guide will help you deploy the GK Builders website to Vercel with a TiDB Cloud Serverless database.

### Why Vercel?

✅ **Zero-config deployment** - Automatic builds and deployments from GitHub  
✅ **Serverless functions** - Auto-scaling without managing servers  
✅ **Global CDN** - Fast content delivery worldwide  
✅ **Automatic SSL** - HTTPS enabled by default  
✅ **Preview deployments** - Test changes before production  
✅ **Unlimited deployments** - Deploy as often as you need  

---

## 🚀 Prerequisites

1. **Vercel Account** - Sign up at https://vercel.com
2. **GitHub Repository** - Push this code to GitHub
3. **TiDB Cloud Account** - Create at https://tidbcloud.com
4. **TiDB Cloud Serverless Database** - Already created by you

---

## Step 1: Prepare TiDB Cloud Database

### 1.1 Get Connection String

1. Go to https://tidbcloud.com/console/clusters
2. Click on your Serverless cluster
3. Click "Connect" button
4. Select "MySQL" tab
5. Copy the connection string (format: `mysql://user:password@gateway01.region.prod.aws.tidbcloud.com:4000/database`)

### 1.2 Extract Connection Parameters

From your connection string, extract:
- **DATABASE_HOST**: `gateway01.us-west-2.prod.aws.tidbcloud.com` (example)
- **DATABASE_PORT**: `4000` (TiDB Serverless standard)
- **DATABASE_USER**: Your username (usually `root`)
- **DATABASE_PASSWORD**: Your password
- **DATABASE_NAME**: Your database name

---

## Step 2: Push Code to GitHub

### 2.1 Initialize Git Repository

```bash
cd gk-builders-railway
git init
git add .
git commit -m "Initial GK Builders deployment"
```

### 2.2 Create GitHub Repository

1. Go to https://github.com/new
2. Create a new repository (e.g., `gk-builders`)
3. Don't initialize with README (we already have one)

### 2.3 Push to GitHub

```bash
git remote add origin https://github.com/yourusername/gk-builders.git
git branch -M main
git push -u origin main
```

---

## Step 3: Deploy to Vercel

### 3.1 Connect GitHub to Vercel

1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Click "Continue with GitHub"
4. Authorize Vercel to access your GitHub account
5. Select your `gk-builders` repository

### 3.2 Configure Project Settings

1. **Project Name**: `gk-builders` (or your preferred name)
2. **Framework Preset**: Select "Other" (we have custom config)
3. **Root Directory**: Leave blank (default)
4. **Build Command**: `pnpm build`
5. **Output Directory**: `dist`
6. **Install Command**: `pnpm install --frozen-lockfile`

### 3.3 Add Environment Variables

In Vercel dashboard → Project Settings → Environment Variables, add:

```
DATABASE_URL=mysql://user:password@gateway01.region.prod.aws.tidbcloud.com:4000/database
NODE_ENV=production
PORT=3000
JWT_SECRET=your-secure-32-character-random-string
VITE_APP_ID=gk-builders
VITE_APP_TITLE=GK Builders
VITE_APP_LOGO=https://your-cdn.com/logo.png
VITE_FRONTEND_URL=https://your-vercel-url.vercel.app
VITE_API_URL=https://your-vercel-url.vercel.app/api
```

**Important**: Replace `your-vercel-url` with your actual Vercel deployment URL.

### 3.4 Deploy

1. Click "Deploy" button
2. Wait for build to complete (usually 2-5 minutes)
3. Vercel will provide your deployment URL

---

## Step 4: Initialize Database

### 4.1 Run Migrations

After deployment, you need to initialize the database schema.

**Option 1: Using Vercel CLI** (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Run migrations
vercel env pull
pnpm db:push
```

**Option 2: Manual Database Setup**

If you prefer to set up the database manually:

1. Connect to TiDB Cloud using MySQL client:
```bash
mysql -h gateway01.region.prod.aws.tidbcloud.com -P 4000 -u root -p
```

2. Create database:
```sql
CREATE DATABASE IF NOT EXISTS gk_builders;
USE gk_builders;
```

3. Run migration scripts from `drizzle/` directory:
```bash
# Copy SQL from drizzle/0000_*.sql, 0001_*.sql, 0002_*.sql
# Execute each in your MySQL client
```

### 4.2 Verify Database Connection

Check Vercel logs to ensure database connection is successful:

1. Go to Vercel dashboard → Your project
2. Click "Deployments" tab
3. Click latest deployment
4. Click "Functions" tab
5. Check logs for any database errors

---

## Step 5: Set Up Custom Domain (Optional)

### 5.1 Add Domain in Vercel

1. Go to Vercel dashboard → Project Settings → Domains
2. Enter your domain (e.g., `www.gkbuilders.services`)
3. Vercel will show DNS records to add

### 5.2 Configure DNS Records

In your domain registrar (GoDaddy, Namecheap, etc.):

1. Add CNAME record:
   - **Name**: `www`
   - **Value**: `cname.vercel-dns.com.`

2. Or add A record:
   - **Name**: `@`
   - **Value**: `76.76.19.165`

### 5.3 Verify Domain

1. Wait for DNS propagation (5-30 minutes)
2. Vercel will automatically verify and enable HTTPS
3. Your site will be accessible at `www.gkbuilders.services`

---

## 🔧 Architecture Overview

### Frontend (React)
- Deployed to Vercel CDN
- Automatically optimized and cached
- Served from edge locations worldwide

### Backend (Express + tRPC)
- Runs as Vercel Serverless Functions
- Auto-scales based on traffic
- No server management needed

### Database (TiDB Cloud Serverless)
- MySQL-compatible database
- Automatic scaling
- Managed backups
- Pay-as-you-go pricing

### Connection Flow
```
Browser → Vercel CDN (Frontend)
              ↓
         Vercel Serverless Function (Backend)
              ↓
         TiDB Cloud Serverless (Database)
```

---

## 📊 Environment Variables Explained

| Variable | Purpose | Example |
|----------|---------|---------|
| `DATABASE_URL` | Database connection string | `mysql://root:pass@gateway01.us-west-2.prod.aws.tidbcloud.com:4000/gk_builders` |
| `NODE_ENV` | Environment mode | `production` |
| `PORT` | Server port (Vercel sets this) | `3000` |
| `JWT_SECRET` | Session encryption key | `your-random-32-char-string` |
| `VITE_APP_ID` | Application identifier | `gk-builders` |
| `VITE_APP_TITLE` | Browser tab title | `GK Builders` |
| `VITE_APP_LOGO` | Logo URL | `https://cdn.example.com/logo.png` |
| `VITE_FRONTEND_URL` | Frontend domain | `https://www.gkbuilders.services` |
| `VITE_API_URL` | Backend API endpoint | `https://www.gkbuilders.services/api` |

---

## 🆘 Troubleshooting

### Build Fails

**Error**: `Command failed: pnpm build`

**Solution**:
1. Check build logs in Vercel dashboard
2. Verify all environment variables are set
3. Ensure `pnpm-lock.yaml` is committed to Git
4. Run `pnpm install` locally to verify dependencies

### Database Connection Error

**Error**: `ECONNREFUSED` or `Access denied`

**Solution**:
1. Verify `DATABASE_URL` is correct in Vercel environment variables
2. Check TiDB Cloud cluster is running
3. Verify firewall allows connections (TiDB Cloud allows all by default)
4. Test connection locally: `mysql -h gateway01... -P 4000 -u root -p`

### Serverless Function Timeout

**Error**: `Function execution timeout`

**Solution**:
1. Increase timeout in `vercel.json` (max 60 seconds)
2. Optimize database queries
3. Add indexes to frequently queried columns
4. Consider upgrading TiDB cluster

### CORS Errors

**Error**: `Access to XMLHttpRequest blocked by CORS policy`

**Solution**:
1. Verify `VITE_API_URL` matches your Vercel domain
2. Check CORS headers in `server/_core/index.ts`
3. Ensure credentials are included in fetch requests

### Custom Domain Not Working

**Error**: `Domain not found` or `DNS not resolving`

**Solution**:
1. Wait for DNS propagation (up to 24 hours)
2. Verify DNS records are correct in your registrar
3. Use DNS checker: https://mxtoolbox.com/
4. Check Vercel domain settings are correct

---

## 📈 Performance Optimization

### 1. Enable Caching

In `vercel.json`, caching is already configured:
```json
"headers": [
  {
    "source": "/static/(.*)",
    "headers": [
      {
        "key": "Cache-Control",
        "value": "public, max-age=31536000, immutable"
      }
    ]
  }
]
```

### 2. Optimize Images

- Use modern formats (WebP, AVIF)
- Compress images before uploading
- Use CDN for image hosting

### 3. Database Optimization

```sql
-- Add indexes for frequently queried columns
CREATE INDEX idx_user_email ON users(email);
CREATE INDEX idx_contact_date ON contacts(created_at);
CREATE INDEX idx_service_name ON services(name);
```

### 4. Monitor Performance

1. Go to Vercel dashboard → Analytics
2. Monitor:
   - Response times
   - Error rates
   - Traffic patterns
   - Function duration

---

## 🔐 Security Best Practices

### 1. Environment Variables
- Never commit `.env` files
- Use Vercel's environment variable management
- Rotate secrets regularly

### 2. Database Security
- Use strong passwords
- Enable SSL connections (TiDB Cloud does by default)
- Restrict database access to Vercel IPs
- Regular backups

### 3. HTTPS
- Vercel provides automatic HTTPS
- Redirects HTTP to HTTPS
- Automatic certificate renewal

### 4. Rate Limiting
- Already configured in Express
- Prevents abuse and DDoS attacks

---

## 📚 Useful Resources

- **Vercel Documentation**: https://vercel.com/docs
- **TiDB Cloud Documentation**: https://docs.tidbcloud.com
- **Express.js Guide**: https://expressjs.com
- **React Documentation**: https://react.dev
- **tRPC Documentation**: https://trpc.io

---

## 🎯 Deployment Checklist

Before deploying:
- [ ] GitHub repository created and code pushed
- [ ] TiDB Cloud Serverless cluster created
- [ ] Connection string obtained from TiDB
- [ ] Vercel account created
- [ ] Environment variables prepared

During deployment:
- [ ] Project connected to GitHub in Vercel
- [ ] Build command configured correctly
- [ ] Environment variables added to Vercel
- [ ] Deployment completes successfully

After deployment:
- [ ] Database migrations run successfully
- [ ] Website loads without errors
- [ ] Contact form works
- [ ] Email notifications sent
- [ ] Mobile responsive design verified
- [ ] Custom domain configured (if needed)
- [ ] SSL certificate active

---

## 📞 Support

For issues:
1. Check Vercel logs: Dashboard → Deployments → Functions
2. Check TiDB Cloud status: https://tidbcloud.com/console
3. Review error messages carefully
4. Test locally with `pnpm dev`

---

## 🎉 Summary

You now have a **production-ready** GK Builders website deployed on:

✅ **Frontend**: Vercel CDN (global, fast, auto-scaling)  
✅ **Backend**: Vercel Serverless Functions (auto-scaling, no server management)  
✅ **Database**: TiDB Cloud Serverless (MySQL-compatible, managed, pay-as-you-go)  
✅ **Domain**: Custom domain with automatic HTTPS  
✅ **Monitoring**: Built-in analytics and logging  

**Ready to go live!**

---

**Generated:** April 9, 2026  
**Project:** GK Builders - Civil Contractor  
**Version:** 1.0.0 (Vercel-Ready)  
**Status:** ✅ Production Ready
