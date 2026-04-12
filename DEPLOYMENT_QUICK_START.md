# GK Builders - Multi-Platform Deployment Quick Start

**Choose Your Deployment Platform**

---

## 🚀 Platform Comparison

| Feature | Railway | Vercel |
|---------|---------|--------|
| **Setup Time** | 10 minutes | 10 minutes |
| **Cost** | Pay-as-you-go | Free tier available |
| **Scaling** | Automatic | Automatic |
| **Database** | MySQL/TiDB | TiDB Cloud Serverless |
| **Best For** | Full-stack apps | Frontend-heavy apps |
| **Deployment** | Git push | Git push |
| **SSL/HTTPS** | Automatic | Automatic |
| **Custom Domain** | ✅ Yes | ✅ Yes |
| **Environment Vars** | ✅ Yes | ✅ Yes |

---

## 📋 Before You Start

### Prerequisites (Both Platforms)

1. **GitHub Account** - https://github.com
2. **TiDB Cloud Account** - https://tidbcloud.com
3. **TiDB Serverless Cluster** - Already created by you ✅
4. **Connection String** - From TiDB Cloud console

### Get Your TiDB Connection String

1. Go to https://tidbcloud.com/console/clusters
2. Click your Serverless cluster
3. Click "Connect" button
4. Copy the MySQL connection string
5. Format: `mysql://root:password@gateway01.region.prod.aws.tidbcloud.com:4000/database`

---

## 🚂 Option 1: Railway Deployment (Recommended)

### Step 1: Push to GitHub (5 minutes)

```bash
cd gk-builders-railway
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/gk-builders.git
git push -u origin main
```

### Step 2: Deploy to Railway (5 minutes)

1. Go to https://railway.app/dashboard
2. Click "New Project"
3. Select "Deploy from GitHub"
4. Authorize and select your repository
5. Railway auto-detects Dockerfile and builds

### Step 3: Configure Database (2 minutes)

In Railway dashboard → Variables:

```
DATABASE_URL=mysql://root:password@gateway01.region.prod.aws.tidbcloud.com:4000/gk_builders
NODE_ENV=production
JWT_SECRET=your-secure-32-char-key
VITE_APP_TITLE=GK Builders
VITE_APP_LOGO=https://your-cdn.com/logo.png
```

### Step 4: Initialize Database (1 minute)

```bash
railway run pnpm db:push
```

### ✅ Done! Your site is live at Railway's provided URL

---

## 🔷 Option 2: Vercel Deployment

### Step 1: Push to GitHub (5 minutes)

```bash
cd gk-builders-railway
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/gk-builders.git
git push -u origin main
```

### Step 2: Deploy to Vercel (5 minutes)

1. Go to https://vercel.com/dashboard
2. Click "Add New" → "Project"
3. Select "Import Git Repository"
4. Authorize GitHub and select your repository
5. Vercel auto-detects configuration

### Step 3: Configure Environment (2 minutes)

In Vercel dashboard → Settings → Environment Variables:

```
DATABASE_URL=mysql://root:password@gateway01.region.prod.aws.tidbcloud.com:4000/gk_builders
NODE_ENV=production
JWT_SECRET=your-secure-32-char-key
VITE_APP_TITLE=GK Builders
VITE_APP_LOGO=https://your-cdn.com/logo.png
```

### Step 4: Initialize Database (1 minute)

```bash
vercel env pull
pnpm db:push
```

### ✅ Done! Your site is live at Vercel's provided URL

---

## 🌐 Set Up Custom Domain

### For Both Railway and Vercel

1. **Get your deployment URL** from the platform dashboard
2. **Go to your domain registrar** (GoDaddy, Namecheap, etc.)
3. **Add CNAME record**:
   - Name: `www`
   - Value: Provided by Railway/Vercel
4. **Wait for DNS propagation** (5-30 minutes)
5. **Verify in platform dashboard**

---

## 📊 Environment Variables Reference

### Required

```
DATABASE_URL=mysql://root:password@gateway01.region.prod.aws.tidbcloud.com:4000/gk_builders
NODE_ENV=production
JWT_SECRET=your-secure-32-character-random-string
```

### Application

```
VITE_APP_ID=gk-builders
VITE_APP_TITLE=GK Builders
VITE_APP_LOGO=https://your-cdn.com/logo.png
VITE_FRONTEND_URL=https://www.gkbuilders.services
VITE_API_URL=https://www.gkbuilders.services/api
```

### Optional

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

---

## 🔧 Generate Strong JWT_SECRET

```bash
# macOS/Linux
openssl rand -base64 32

# Windows PowerShell
[Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes((Get-Random -Count 32 | % {[char]$_})))
```

---

## 🆘 Quick Troubleshooting

### Build Fails

```bash
# Test locally first
pnpm install
pnpm build
```

### Database Connection Error

```bash
# Verify connection string
mysql -h gateway01.region.prod.aws.tidbcloud.com -P 4000 -u root -p
```

### Site Not Loading

1. Check deployment logs in platform dashboard
2. Verify environment variables are set
3. Check custom domain DNS records

### Migrations Failed

```bash
# Re-run migrations
railway run pnpm db:push  # Railway
vercel env pull && pnpm db:push  # Vercel
```

---

## 📚 Detailed Guides

For more information, see:

- **RAILWAY_DEPLOYMENT_GUIDE.md** - Complete Railway setup
- **VERCEL_DEPLOYMENT_GUIDE.md** - Complete Vercel setup
- **TIDB_ENVIRONMENT_SETUP.md** - TiDB configuration
- **DRIZZLE_TIDB_OPTIMIZATION.md** - Database optimization
- **.env.example** - All environment variables

---

## 🎯 Next Steps

1. ✅ Choose your platform (Railway or Vercel)
2. ✅ Push code to GitHub
3. ✅ Deploy to your chosen platform
4. ✅ Configure environment variables
5. ✅ Run database migrations
6. ✅ Set up custom domain
7. ✅ Monitor your site

---

## 📞 Support

- **Railway Docs**: https://docs.railway.app
- **Vercel Docs**: https://vercel.com/docs
- **TiDB Cloud Docs**: https://docs.tidbcloud.com

---

**Ready to deploy? Choose your platform above and follow the steps!**

---

**Generated:** April 9, 2026  
**Project:** GK Builders - Civil Contractor  
**Version:** 1.0.0  
**Status:** ✅ Production Ready
