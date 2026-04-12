# TiDB Cloud Serverless - Environment Configuration Guide

**For GK Builders Deployment on Railway or Vercel**

---

## 📋 Overview

This guide explains how to configure environment variables for TiDB Cloud Serverless database with Drizzle ORM.

---

## 🔍 Getting Your TiDB Connection Details

### Step 1: Access TiDB Cloud Console

1. Go to https://tidbcloud.com/console/clusters
2. Click on your Serverless cluster
3. Click the "Connect" button

### Step 2: Copy Connection String

You'll see a connection string like:

```
mysql://root:password@gateway01.us-west-2.prod.aws.tidbcloud.com:4000/database_name
```

### Step 3: Extract Components

From the connection string above, extract:

| Component | Value | Example |
|-----------|-------|---------|
| **DATABASE_HOST** | Gateway hostname | `gateway01.us-west-2.prod.aws.tidbcloud.com` |
| **DATABASE_PORT** | Port number | `4000` |
| **DATABASE_USER** | Username | `root` |
| **DATABASE_PASSWORD** | Password | `your-password-here` |
| **DATABASE_NAME** | Database name | `gk_builders` |

---

## 🚀 Environment Configuration Methods

### Method 1: Using DATABASE_URL (Recommended)

**Best for**: Railway, Vercel, Docker deployments

Create `.env` file:

```bash
DATABASE_URL=mysql://root:password@gateway01.us-west-2.prod.aws.tidbcloud.com:4000/gk_builders
NODE_ENV=production
PORT=3000
JWT_SECRET=your-secure-32-character-random-string
VITE_APP_TITLE=GK Builders
```

**How it works**:
- Drizzle ORM automatically parses `DATABASE_URL`
- Connection string format: `mysql://user:password@host:port/database`
- TiDB Cloud Serverless always uses port `4000`

### Method 2: Using Individual Parameters

**Best for**: Advanced configurations, debugging

Create `.env` file:

```bash
DATABASE_HOST=gateway01.us-west-2.prod.aws.tidbcloud.com
DATABASE_PORT=4000
DATABASE_USER=root
DATABASE_PASSWORD=your-password-here
DATABASE_NAME=gk_builders
NODE_ENV=production
PORT=3000
JWT_SECRET=your-secure-32-character-random-string
VITE_APP_TITLE=GK Builders
```

**How to use with Drizzle**:

Update `drizzle.config.ts`:

```typescript
import { defineConfig } from "drizzle-kit";

const connectionString = process.env.DATABASE_URL || 
  `mysql://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`;

if (!connectionString) {
  throw new Error("Database connection parameters are required");
}

export default defineConfig({
  schema: "./drizzle/schema.ts",
  out: "./drizzle",
  dialect: "mysql",
  dbCredentials: {
    url: connectionString,
  },
});
```

---

## 🔐 Security Best Practices

### 1. Never Commit Secrets

```bash
# Add to .gitignore
echo ".env" >> .gitignore
echo ".env.local" >> .gitignore
git add .gitignore
git commit -m "Add .env to gitignore"
```

### 2. Use Strong Passwords

Generate a strong password:

```bash
# macOS/Linux
openssl rand -base64 32

# Windows PowerShell
[Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes((Get-Random -Count 32 | % {[char]$_})))
```

### 3. Rotate Credentials Regularly

- Change database password every 3 months
- Update environment variables in deployment platform
- Redeploy application

### 4. Use Different Credentials Per Environment

- **Development**: Local credentials
- **Staging**: Staging database credentials
- **Production**: Production database credentials

---

## 🚢 Deployment Platform Configuration

### Railway Deployment

1. Go to Railway dashboard → Project Settings → Variables
2. Add environment variables:

```
DATABASE_URL=mysql://root:password@gateway01.us-west-2.prod.aws.tidbcloud.com:4000/gk_builders
NODE_ENV=production
JWT_SECRET=your-secure-key
VITE_APP_TITLE=GK Builders
```

3. Deploy and run migrations:
```bash
railway run pnpm db:push
```

### Vercel Deployment

1. Go to Vercel dashboard → Project Settings → Environment Variables
2. Add environment variables:

```
DATABASE_URL=mysql://root:password@gateway01.us-west-2.prod.aws.tidbcloud.com:4000/gk_builders
NODE_ENV=production
JWT_SECRET=your-secure-key
VITE_APP_TITLE=GK Builders
```

3. Deploy and run migrations:
```bash
vercel env pull
pnpm db:push
```

---

## 🔧 Drizzle ORM Configuration

### Current Configuration

The project's `drizzle.config.ts` is already optimized for TiDB:

```typescript
import { defineConfig } from "drizzle-kit";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is required to run drizzle commands");
}

export default defineConfig({
  schema: "./drizzle/schema.ts",
  out: "./drizzle",
  dialect: "mysql",           // ← TiDB uses MySQL dialect
  dbCredentials: {
    url: connectionString,
  },
});
```

### Why MySQL Dialect for TiDB?

- TiDB is **MySQL-compatible**
- Supports all MySQL syntax
- Works with Drizzle's MySQL dialect
- No special configuration needed

### Supported TiDB Features

✅ All standard SQL operations  
✅ Transactions  
✅ Foreign keys  
✅ Indexes  
✅ Views  
✅ Stored procedures  
✅ Triggers  

---

## 🧪 Testing Connection

### Local Testing

```bash
# Test with mysql-cli
mysql -h gateway01.us-west-2.prod.aws.tidbcloud.com \
      -P 4000 \
      -u root \
      -p

# Enter password when prompted
# Should see: mysql>
```

### Node.js Testing

Create `test-connection.mjs`:

```javascript
import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
  host: 'gateway01.us-west-2.prod.aws.tidbcloud.com',
  port: 4000,
  user: 'root',
  password: 'your-password',
  database: 'gk_builders'
});

const [rows] = await connection.execute('SELECT 1 as test');
console.log('Connection successful:', rows);
await connection.end();
```

Run:
```bash
node test-connection.mjs
```

---

## 📊 Environment Variables Reference

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | Full connection string | `mysql://root:pass@gateway01.us-west-2.prod.aws.tidbcloud.com:4000/gk_builders` |
| `NODE_ENV` | Environment mode | `production` |
| `JWT_SECRET` | Session encryption key | `random-32-char-string` |

### Application Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_APP_ID` | App identifier | `gk-builders` |
| `VITE_APP_TITLE` | Browser tab title | `GK Builders` |
| `VITE_APP_LOGO` | Logo URL | `https://cdn.example.com/logo.png` |
| `VITE_FRONTEND_URL` | Frontend domain | `https://www.gkbuilders.services` |
| `VITE_API_URL` | Backend API URL | `https://www.gkbuilders.services/api` |

### Optional Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `SMTP_HOST` | Email server | `smtp.gmail.com` |
| `SMTP_PORT` | Email port | `587` |
| `STRIPE_SECRET_KEY` | Stripe API key | `sk_test_xxx` |

---

## 🆘 Troubleshooting

### Connection Refused

**Error**: `ECONNREFUSED`

**Causes**:
- Wrong host/port
- TiDB cluster not running
- Firewall blocking connection

**Solution**:
1. Verify connection string from TiDB Cloud console
2. Check cluster status is "Available"
3. Test with mysql-cli first

### Access Denied

**Error**: `Access denied for user 'root'@'...'`

**Causes**:
- Wrong password
- Wrong username
- User doesn't exist

**Solution**:
1. Reset password in TiDB Cloud console
2. Verify username (usually `root`)
3. Copy password carefully (no spaces)

### Database Not Found

**Error**: `Unknown database 'gk_builders'`

**Causes**:
- Database doesn't exist
- Wrong database name in connection string
- Typo in DATABASE_NAME

**Solution**:
1. Create database in TiDB Cloud console
2. Verify database name matches exactly
3. Run migrations: `pnpm db:push`

### Timeout

**Error**: `Connection timeout`

**Causes**:
- Network connectivity issue
- TiDB cluster overloaded
- Query taking too long

**Solution**:
1. Check internet connection
2. Verify TiDB cluster resources
3. Optimize slow queries
4. Add database indexes

---

## 🔄 Migration Process

### Initial Setup

```bash
# 1. Install dependencies
pnpm install

# 2. Create .env file
cp .env.example .env

# 3. Fill in DATABASE_URL with your TiDB connection string
# DATABASE_URL=mysql://root:password@gateway01.us-west-2.prod.aws.tidbcloud.com:4000/gk_builders

# 4. Generate and run migrations
pnpm db:push

# 5. Verify tables created
# Check in TiDB Cloud console → SQL Editor
```

### Adding New Tables

```bash
# 1. Update drizzle/schema.ts with new table definition

# 2. Generate migration
pnpm db:push

# 3. Verify changes in database
```

---

## 📈 Performance Optimization

### Add Indexes

```sql
-- Connect to TiDB
mysql -h gateway01.us-west-2.prod.aws.tidbcloud.com -P 4000 -u root -p

-- Add indexes
CREATE INDEX idx_user_email ON users(email);
CREATE INDEX idx_contact_date ON contacts(created_at);
CREATE INDEX idx_service_name ON services(name);
```

### Monitor Performance

In TiDB Cloud console:
1. Go to Cluster → Monitoring
2. Check:
   - Query latency
   - Connection count
   - Storage usage
   - CPU/Memory usage

### Scale Resources

If experiencing performance issues:
1. Go to Cluster → Settings
2. Increase RU (Request Units)
3. TiDB auto-scales based on demand

---

## 🎯 Quick Reference

### Connection String Format

```
mysql://[username]:[password]@[host]:[port]/[database]
```

### TiDB Cloud Serverless Defaults

- **Dialect**: MySQL
- **Port**: 4000
- **Username**: root (default)
- **SSL**: Enabled by default
- **Connection Pooling**: Recommended

### Environment Variable Checklist

- [ ] DATABASE_URL set correctly
- [ ] No spaces in password
- [ ] Port is 4000 (not 3306)
- [ ] Database name matches
- [ ] .env file in .gitignore
- [ ] Credentials not committed to Git

---

## 📚 Additional Resources

- **TiDB Cloud Documentation**: https://docs.tidbcloud.com
- **TiDB MySQL Compatibility**: https://docs.pingcap.com/tidb/stable/mysql-compatibility
- **Drizzle ORM Documentation**: https://orm.drizzle.team
- **MySQL Connection Strings**: https://dev.mysql.com/doc/connector-python/en/connector-python-connectargs.html

---

## 🎉 Summary

You now understand how to:

✅ Get TiDB Cloud Serverless connection details  
✅ Configure environment variables  
✅ Set up Drizzle ORM for TiDB  
✅ Deploy to Railway or Vercel  
✅ Test database connections  
✅ Troubleshoot common issues  
✅ Optimize performance  

**Ready to deploy!**

---

**Generated:** April 9, 2026  
**Project:** GK Builders - Civil Contractor  
**Version:** 1.0.0  
**Status:** ✅ Production Ready
