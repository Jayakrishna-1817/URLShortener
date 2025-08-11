# URL Shortener - Complete Deployment Guide

## 🚀 Deployment Overview

This URL Shortener project is configured for deployment on **Render** with separate services for frontend and backend.

### Architecture
- **Frontend**: React 19 + Vite (Static Site)
- **Backend**: Express.js (Web Service)
- **Communication**: Environment variable-based API URL configuration

---

## 📋 Pre-Deployment Checklist

### 1. Repository Setup
- [ ] Code pushed to GitHub repository
- [ ] All sensitive data removed from code
- [ ] Environment variables properly configured

### 2. File Structure Verification
```
URLshortenerrr/
├── src/                    # Frontend React app
├── server/                 # Backend Express server
├── public/                 # Static assets
├── .env.example           # Environment template
├── package.json           # Frontend dependencies
└── server/package.json    # Backend dependencies
```

---

## 🌐 Backend Deployment (Express API)

### Step 1: Create New Web Service on Render

1. **Go to Render Dashboard**
   - Visit [render.com](https://render.com)
   - Click "New +" → "Web Service"

2. **Connect Repository**
   - Connect your GitHub account
   - Select your URL shortener repository

3. **Configure Service**
   - **Name**: `url-shortener-api` (or your preferred name)
   - **Region**: Choose closest to your users
   - **Branch**: `main`
   - **Root Directory**: `server`
   - **Runtime**: `Node.js`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

4. **Environment Variables** (None required for basic setup)
   - The app will use `PORT` automatically provided by Render

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Note your backend URL: `https://your-app-name.onrender.com`

### Step 2: Test Backend Deployment

```bash
# Test health endpoint
curl https://your-app-name.onrender.com/api/health

# Expected response:
{
  "success": true,
  "message": "URL Shortener API is running",
  "stats": {
    "totalUrls": 0,
    "totalClicks": 0
  }
}
```

---

## 🎨 Frontend Deployment (React App)

### Step 1: Create New Static Site on Render

1. **Go to Render Dashboard**
   - Click "New +" → "Static Site"

2. **Connect Repository**
   - Select the same repository
   - **Name**: `url-shortener-frontend`
   - **Branch**: `main`
   - **Root Directory**: `/` (root of repository)

3. **Configure Build**
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

4. **Environment Variables**
   ```
   Key: VITE_API_URL
   Value: https://your-backend-app.onrender.com
   ```
   *(Replace with your actual backend URL from step 1)*

5. **Deploy**
   - Click "Create Static Site"
   - Wait for build and deployment

### Step 2: Test Frontend Deployment

1. Visit your frontend URL: `https://your-frontend-app.onrender.com`
2. Test URL shortening functionality
3. Verify that shortened URLs work correctly

---

## 🔧 Local Development with Deployed Backend

### Option 1: Use Local Environment Variables

Create `.env` file in root directory:
```bash
# For development with deployed backend
VITE_API_URL=https://your-backend-app.onrender.com

# For local development
# VITE_API_URL=http://localhost:3001
```

### Option 2: Run Full Local Stack

```bash
# Terminal 1: Start backend
cd server
npm install
npm start

# Terminal 2: Start frontend
npm install
npm run dev
```

---

## 📝 API Endpoints

Your deployed backend will have these endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Basic health check |
| `GET` | `/api/health` | Detailed health with stats |
| `POST` | `/api/shorten` | Create short URL |
| `GET` | `/api/urls` | List all URLs |
| `DELETE` | `/api/urls/:code` | Delete URL |
| `GET` | `/:shortCode` | Redirect to original URL |

---

## 🔧 Troubleshooting

### Common Issues

**1. CORS Errors**
- Backend is configured with CORS for all origins
- If issues persist, check browser console for exact error

**2. API Connection Issues**
- Verify `VITE_API_URL` environment variable
- Check network tab in browser developer tools
- Ensure backend is running and accessible

**3. Build Failures**
- Check build logs in Render dashboard
- Verify all dependencies are in `package.json`
- Ensure Node.js version compatibility

**4. Redirect Issues**
- Backend handles redirects with proper HTTP status codes
- Check browser network tab for redirect responses

### Debugging Commands

```bash
# Check environment variables (frontend)
echo $VITE_API_URL

# Test backend locally
curl http://localhost:3001/api/health

# Test deployed backend
curl https://your-app.onrender.com/api/health

# Build frontend locally
npm run build

# Preview built frontend
npm run preview
```

---

## 📊 Monitoring

### Backend Monitoring
- Check Render dashboard for service status
- Monitor logs in Render dashboard
- Use `/api/health` endpoint for uptime monitoring

### Frontend Monitoring
- Static sites have minimal monitoring needs
- Check Render dashboard for build status
- Monitor user experience for any errors

---

## 🚀 Next Steps

1. **Custom Domain** (Optional)
   - Configure custom domain in Render dashboard
   - Update CORS settings if needed

2. **Database Integration** (Future Enhancement)
   - Replace in-memory storage with PostgreSQL
   - Add database environment variables

3. **Analytics** (Future Enhancement)
   - Integrate with analytics service
   - Add user tracking and insights

4. **Rate Limiting** (Production Ready)
   - Add rate limiting middleware
   - Implement API key authentication

---

## 🔗 Useful Links

- [Render Documentation](https://render.com/docs)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Express.js Deployment](https://expressjs.com/en/advanced/best-practice-performance.html)

---

**Deployment Complete!** 🎉

Your URL shortener is now live and ready for users. Both frontend and backend are independently scalable and maintainable.
