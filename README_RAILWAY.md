# GK Builders - Railway Deployment Guide

**Professional Construction Company Website**  
Owner: Gautam Kumar | Civil Contractor | Rishikesh, Uttarakhand

---

## 📋 Quick Start

This is a **100% self-contained, Manus-independent** version of the GK Builders website ready for Railway deployment.

### What's Included

✅ Complete React 19 + Node.js + Express + tRPC stack  
✅ MySQL database with Drizzle ORM  
✅ Dockerfile for containerized deployment  
✅ All source code (no Manus dependencies)  
✅ Environment configuration template  
✅ Database schema and migrations  
✅ Production-ready build scripts  

### What's Removed

❌ All Manus OAuth references  
❌ Manus SDK imports  
❌ Manus platform-specific code  
❌ Hardcoded Manus URLs  

---

## 🚀 Deployment Steps

### 1. Prerequisites

- Railway account (https://railway.app)
- GitHub repository with this code
- MySQL database (Railway will provision)
- Custom domain (optional, but recommended)

### 2. Deploy to Railway

```bash
# 1. Push code to GitHub
git push origin main

# 2. Go to https://railway.app/dashboard
# 3. Click "New Project" → "Deploy from GitHub"
# 4. Select this repository
# 5. Railway will auto-detect Dockerfile and build
```

### 3. Configure Environment Variables

In Railway dashboard → Project Settings → Variables:

```
DATABASE_URL=mysql://user:password@host:port/database
NODE_ENV=production
PORT=3000
JWT_SECRET=your-secure-32-char-key
VITE_APP_ID=gk-builders
VITE_APP_TITLE=GK Builders
VITE_APP_LOGO=https://your-cdn.com/logo.png
VITE_FRONTEND_URL=https://www.gkbuilders.services
VITE_API_URL=https://www.gkbuilders.services/api
```

### 4. Add MySQL Database

In Railway dashboard:
- Click "Add Service" → "MySQL"
- Copy the `DATABASE_URL` from MySQL service
- Paste into environment variables

### 5. Run Database Migrations

After deployment:
```bash
railway run pnpm db:push
```

This creates all tables and initializes the schema.

### 6. Set Up Custom Domain

1. In Railway → Domain settings
2. Add your domain (e.g., www.gkbuilders.services)
3. Add DNS records to your registrar
4. Wait for DNS propagation (5-30 minutes)

---

## 📁 Project Structure

```
gk-builders-railway/
├── client/                 # React frontend
│   ├── src/
│   │   ├── pages/         # Page components
│   │   ├── components/    # Reusable UI components
│   │   ├── App.tsx        # Main routing
│   │   └── main.tsx       # React entry point
│   ├── public/            # Static assets
│   └── index.html         # HTML template
├── server/                # Express backend
│   ├── routers.ts         # tRPC procedures
│   ├── db.ts              # Database queries
│   ├── storage.ts         # File storage helpers
│   └── _core/             # Core infrastructure
├── drizzle/               # Database schema
│   ├── schema.ts          # Table definitions
│   └── migrations/        # Migration files
├── shared/                # Shared types
├── Dockerfile             # Docker configuration
├── .env.example           # Environment template
├── package.json           # Dependencies
├── vite.config.ts         # Vite configuration
└── RAILWAY_DEPLOYMENT_GUIDE.md  # Detailed guide
```

---

## 🔧 Key Files

| File | Purpose |
|------|---------|
| `Dockerfile` | Multi-stage Docker build for production |
| `.env.example` | Environment variables template |
| `package.json` | Dependencies and build scripts |
| `vite.config.ts` | Vite bundler configuration |
| `drizzle.config.ts` | Database migration configuration |
| `server/_core/index.ts` | Express server entry point |
| `client/src/App.tsx` | React routing and layout |

---

## 🛠️ Build & Run Locally

### Install Dependencies

```bash
npm install -g pnpm
pnpm install
```

### Development

```bash
pnpm dev
```

Starts dev server at http://localhost:3000

### Production Build

```bash
pnpm build
```

Creates optimized build in `dist/` directory

### Run Production Build

```bash
NODE_ENV=production node dist/index.js
```

---

## 📊 Database Setup

### Initialize Database

```bash
# Generate migrations and push schema
pnpm db:push
```

### View Database Schema

See `drizzle/schema.ts` for table definitions:
- `users` - User accounts
- `contacts` - Contact form submissions
- `services` - Construction services
- Other business tables

### Run Migrations

Migrations are automatically applied on deployment.

---

## 🌐 Features

### Homepage
- Hero banner with tagline
- Service showcase with icons
- "Contact Now" CTA button
- Floating "Call Now" button

### About
- Company information
- Owner details (Gautam Kumar)
- Professional description

### Services
- House Construction
- Renovation Work
- Tiles & Marble Work
- Painting & Plaster
- Electrical Work

### Contact
- Contact form (Name, Phone, Message)
- Phone: 9675429092
- Address: Rishikesh, Uttarakhand, India
- WhatsApp integration
- Email notifications

### Design
- Red (#DC2626), Black (#1F2937), White (#FFFFFF) theme
- Modern, premium aesthetic
- Mobile-responsive
- Smooth animations
- SEO optimized

---

## 🔐 Security

### Environment Variables
- Never commit `.env` files
- Use `.env.example` as template
- Keep secrets secure in Railway dashboard

### Database
- Use strong passwords
- Enable SSL for database connections
- Regular backups (Railway handles automatically)

### CORS
- Configure allowed origins in `server/_core/index.ts`
- Restrict API access to your domain

---

## 📈 Monitoring

### View Logs

```bash
railway logs
```

### Monitor Performance
- CPU usage
- Memory usage
- Request latency
- Error rates

### Alerts
Set up notifications in Railway dashboard for:
- Deployment failures
- High resource usage
- Application crashes

---

## 🆘 Troubleshooting

### Build Fails
1. Check build logs in Railway
2. Verify all env vars are set
3. Run `pnpm install` locally to test
4. Check Node.js version compatibility

### Database Connection Error
1. Verify `DATABASE_URL` is correct
2. Check MySQL service is running
3. Ensure firewall allows connections
4. Test connection locally

### Application Won't Start
1. Check application logs
2. Verify `NODE_ENV=production`
3. Check `PORT=3000`
4. Ensure all required env vars are set

### Custom Domain Not Working
1. Verify DNS records are added
2. Wait for DNS propagation (up to 24 hours)
3. Clear browser cache
4. Check domain settings in Railway

---

## 📚 Documentation

- **Railway Docs:** https://docs.railway.app
- **Express.js:** https://expressjs.com
- **React:** https://react.dev
- **tRPC:** https://trpc.io
- **Drizzle ORM:** https://orm.drizzle.team
- **MySQL:** https://dev.mysql.com/doc/

---

## 📞 Support

For deployment issues:
1. Check Railway documentation
2. Review application logs
3. Verify environment variables
4. Test locally with `pnpm dev`

For code issues:
1. Check the GitHub repository
2. Review error messages in logs
3. Test locally before deploying

---

## 📝 License

This project is provided as-is for GK Builders.

---

## 🎯 Next Steps

1. ✅ Deploy to Railway
2. ✅ Set up MySQL database
3. ✅ Configure environment variables
4. ✅ Run database migrations
5. ✅ Set up custom domain
6. ✅ Configure email notifications
7. ✅ Monitor application health
8. ✅ Plan scaling strategy

---

**Deployment Date:** April 9, 2026  
**Project:** GK Builders - Civil Contractor  
**Version:** 1.0.0 (Railway-Ready)  
**Status:** Ready for Production
