# Deployment Guide

## Platform Overview

This project can be deployed to different platforms. Each has different configuration files:

| Platform | Config File | Runs Automatically? | Notes |
|----------|-------------|---------------------|-------|
| **Heroku** | `Procfile` | ✅ Yes | Uses `web: npm run deploy` command |
| **Vercel** | `vercel.json` | ✅ Yes | Serverless deployment |
| **AWS EB** | `.ebextensions/` | Manual setup | Traditional hosting |
| **Railway** | `Procfile` | ✅ Yes | Compatible with Heroku |

---

## 🚀 Vercel Deployment

### Setup:
```bash
npm install -g vercel
vercel login
vercel
```

### Configuration:
- ✅ **Config file**: `vercel.json` (created)
- ✅ **Build script**: `vercel-build` in package.json
- ✅ **Database**: SQLite stored in `/tmp/todo.db`

### ⚠️ Important Vercel Limitations:

1. **Serverless filesystem is ephemeral**
   - Database resets on each cold start
   - `/tmp` directory is cleared periodically
   - **Not suitable for persistent data**

2. **Better alternatives for Vercel:**
   - Use **Vercel Postgres** (serverless database)
   - Use **PlanetScale** (MySQL)
   - Use **Supabase** (PostgreSQL)

### Recommendation:
**❌ Vercel is NOT recommended for SQLite** because the database will be lost on each deployment and cold start.

---

## 🟣 Heroku Deployment (Recommended for SQLite)

### Setup:
```bash
heroku login
heroku create your-app-name
git push heroku main
```

### Configuration:
- ✅ **Config file**: `Procfile` (already exists)
- ✅ **Command**: `web: npm run deploy`
- ✅ **Database**: SQLite persists on dyno filesystem

### Benefits for Students:
- Persistent filesystem (SQLite works great)
- Free tier available
- Easy to deploy with Git
- Database persists between requests

### Set environment variables:
```bash
heroku config:set DB_PATH=/app/todo.db
```

---

## 🟢 Railway Deployment (Best for Students)

Railway is similar to Heroku but more modern:

### Setup:
```bash
npm install -g @railway/cli
railway login
railway init
railway up
```

### Configuration:
- ✅ **Config file**: Uses `Procfile` (already exists)
- ✅ **Database**: SQLite persists on volume
- ✅ **Free tier**: $5 credit per month

### Benefits:
- Persistent filesystem (SQLite works perfectly)
- Fast deployments
- Great free tier
- Easy to use

---

## 🟠 AWS Elastic Beanstalk (Production-Ready)

### Setup:
```bash
eb init
eb create production-env
eb deploy
```

### Configuration:
Create `.ebextensions/nodecommand.config`:
```yaml
option_settings:
  aws:elasticbeanstalk:container:nodejs:
    NodeCommand: "npm run start:prod"
```

### Benefits:
- Full EC2 instance (SQLite works perfectly)
- Scalable
- Enterprise-ready
- Persistent storage on EBS volume

---

## 📊 Comparison for Student Exercises

| Platform | SQLite Support | Persistence | Free Tier | Ease of Use |
|----------|----------------|-------------|-----------|-------------|
| **Railway** | ✅ Excellent | ✅ Yes | ✅ $5/mo | ⭐⭐⭐⭐⭐ |
| **Heroku** | ✅ Good | ✅ Yes | ⚠️ Limited | ⭐⭐⭐⭐ |
| **AWS EB** | ✅ Excellent | ✅ Yes | ⚠️ 750hrs/mo | ⭐⭐⭐ |
| **Vercel** | ❌ Poor | ❌ No | ✅ Yes | ⭐⭐ |

---

## 🎯 Recommendation

### For Student Exercises:
1. **Best**: Railway (persistent SQLite, easy deployment)
2. **Good**: Heroku (persistent SQLite, well-documented)
3. **Advanced**: AWS Elastic Beanstalk (production-grade)
4. **Avoid**: Vercel (SQLite doesn't persist)

### Current Configuration:
- ✅ `Procfile` → Works with Heroku & Railway
- ✅ `vercel.json` → Works with Vercel (but not recommended for SQLite)
- ✅ Anti-locking SQLite configuration → Works everywhere

---

## 🔧 Quick Deploy Commands

### Heroku:
```bash
git push heroku main
```

### Railway:
```bash
railway up
```

### Vercel:
```bash
vercel --prod
```

### AWS EB:
```bash
eb deploy
```

---

## 🗄️ Database Persistence

### Platforms with Persistent SQLite:
- ✅ Heroku (dyno filesystem)
- ✅ Railway (persistent volumes)
- ✅ AWS EC2/EB (EBS volumes)
- ✅ Docker containers with volumes

### Platforms WITHOUT Persistent SQLite:
- ❌ Vercel (serverless, ephemeral)
- ❌ AWS Lambda (use with EFS for persistence)
- ❌ Netlify Functions (serverless)

---

## 📝 Environment Variables

Set `DB_PATH` on your platform:

**Heroku:**
```bash
heroku config:set DB_PATH=/app/todo.db
```

**Railway:**
```bash
railway variables set DB_PATH=/app/todo.db
```

**Vercel:**
```bash
vercel env add DB_PATH
# Enter: /tmp/todo.db
```

---

## ✅ Summary

- **`Procfile`** runs automatically on **Heroku** and **Railway**
- **`vercel.json`** runs automatically on **Vercel**
- For student exercises with SQLite: Use **Railway** or **Heroku**
- Vercel works but requires external database (not SQLite)
