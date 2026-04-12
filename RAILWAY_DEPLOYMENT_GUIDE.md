# Railway Deployment Guide for GK Builders

## Overview

This guide will help you deploy the GK Builders website to Railway.app with a MySQL database.

---

## Prerequisites

1. **Railway Account** - Sign up at https://railway.app
2. **GitHub Repository** - Push this code to GitHub
3. **MySQL Database** - Railway will provision this

---

## Step 1: Prepare Your Code

### 1.1 Remove Manus Dependencies

The code has been cleaned of Manus-specific dependencies. However, if you need to customize:

- Remove any `@manus/*` imports
- Replace authentication with your preferred provider (Firebase, Auth0, etc.)
- Update API endpoints in `server/_core/` files

### 1.2 Update Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Edit `.env` with your actual values:
- `DATABASE_URL` - Your MySQL connection string
- `JWT_SECRET` - A secure random string (min 32 characters)
- `VITE_APP_ID` - Your application ID
- Other optional variables

---

## Step 2: Set Up Railway Project

### 2.1 Create a New Railway Project

1. Go to https://railway.app/dashboard
2. Click "New Project"
3. Select "Deploy from GitHub"
4. Connect your GitHub account and select this repository

### 2.2 Add MySQL Database

1. In your Railway project, click "Add Service"
2. Select "MySQL"
3. Railway will automatically provision a MySQL database
4. Copy the `DATABASE_URL` from the MySQL service

---

## Step 3: Configure Environment Variables

### 3.1 In Railway Dashboard

1. Go to your project settings
2. Click "Variables"
3. Add all variables from `.env.example`:

```
DATABASE_URL=mysql://user:password@host:port/database
NODE_ENV=production
PORT=3000
JWT_SECRET=your-secure-key-here
VITE_APP_ID=your-app-id
VITE_APP_TITLE=GK Builders
VITE_APP_LOGO=https://your-cdn.com/logo.png
VITE_FRONTEND_URL=https://your-domain.railway.app
VITE_API_URL=https://your-domain.railway.app/api
```

---

## Step 4: Configure Deployment

### 4.1 Dockerfile

The project includes a `Dockerfile` for containerized deployment. Railway will automatically use it.

### 4.2 Build Command

Railway will automatically run:
```bash
pnpm install
pnpm build
```

### 4.3 Start Command

Railway will automatically run:
```bash
node dist/index.js
```

---

## Step 5: Deploy

### 5.1 Deploy from GitHub

1. Push your code to GitHub
2. Railway will automatically detect changes
3. Click "Deploy" in the Railway dashboard
4. Wait for the build and deployment to complete

### 5.2 Monitor Deployment

1. Check the "Deployments" tab for status
2. View logs in the "Logs" tab
3. Access your application at the provided URL

---

## Step 6: Set Up Custom Domain

### 6.1 Add Custom Domain

1. In Railway project settings, click "Domain"
2. Add your custom domain (e.g., `www.gkbuilders.services`)
3. Railway will provide DNS records to add to your domain registrar

### 6.2 Update DNS Records

1. Go to your domain registrar (GoDaddy, Namecheap, etc.)
2. Add the DNS records provided by Railway
3. Wait for DNS propagation (5-30 minutes)

---

## Step 7: Database Setup

### 7.1 Run Migrations

After deployment, run database migrations:

```bash
pnpm db:push
```

This will:
- Create all necessary tables
- Set up relationships
- Initialize the database schema

### 7.2 Verify Database Connection

Check the logs to ensure the database connection is successful:

```bash
railway logs
```

---

## Troubleshooting

### Issue: Build Fails

**Solution:**
1. Check the build logs in Railway dashboard
2. Ensure all environment variables are set
3. Verify `package.json` has correct build scripts
4. Run `pnpm install` locally to verify dependencies

### Issue: Database Connection Error

**Solution:**
1. Verify `DATABASE_URL` is correct
2. Check MySQL service is running in Railway
3. Ensure firewall allows connections
4. Run `pnpm db:push` to initialize schema

### Issue: Application Won't Start

**Solution:**
1. Check application logs: `railway logs`
2. Verify all required environment variables are set
3. Ensure `NODE_ENV=production`
4. Check port is set to `3000`

### Issue: Custom Domain Not Working

**Solution:**
1. Verify DNS records are added correctly
2. Wait for DNS propagation (can take 24 hours)
3. Check domain settings in Railway dashboard
4. Clear browser cache and try again

---

## Production Checklist

- [ ] Environment variables are set correctly
- [ ] Database migrations have run successfully
- [ ] Custom domain is configured
- [ ] SSL certificate is active (Railway provides automatic HTTPS)
- [ ] Logs show no errors
- [ ] Website is accessible from custom domain
- [ ] All features are working (contact forms, buttons, etc.)
- [ ] Mobile responsiveness is verified
- [ ] Performance is acceptable

---

## Scaling & Optimization

### 1. Enable Horizontal Scaling

In Railway settings:
1. Go to "Deployment"
2. Set "Replica Count" to scale horizontally
3. Railway will load balance across instances

### 2. Database Optimization

```sql
-- Create indexes for frequently queried columns
CREATE INDEX idx_user_email ON users(email);
CREATE INDEX idx_contact_date ON contacts(created_at);
```

### 3. Caching

Consider adding Redis for session caching:
1. Add Redis service in Railway
2. Update connection strings
3. Configure session store

---

## Monitoring & Maintenance

### 1. Monitor Application Health

- Check Railway dashboard regularly
- Monitor CPU and memory usage
- Review application logs for errors

### 2. Database Backups

Railway automatically backs up your MySQL database. To restore:
1. Go to MySQL service in Railway
2. Click "Backups"
3. Select a backup to restore

### 3. Updates & Security

- Keep dependencies updated: `pnpm update`
- Review security advisories: `pnpm audit`
- Update Node.js version when needed

---

## Support & Resources

- **Railway Documentation:** https://docs.railway.app
- **Node.js Best Practices:** https://nodejs.org/en/docs/guides/
- **MySQL Documentation:** https://dev.mysql.com/doc/
- **Express.js Guide:** https://expressjs.com/

---

## Next Steps

1. Deploy to Railway
2. Set up custom domain
3. Configure email notifications (optional)
4. Set up monitoring and alerts
5. Plan for scaling and optimization

---

**Deployment Date:** April 9, 2026  
**Project:** GK Builders - Civil Contractor  
**Version:** 1.0.0
