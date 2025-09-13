# Deploy URL Shortener to Render

## Prerequisites
- GitHub account with your code pushed to a repository
- Render account (free tier available)

## Step 1: Prepare Your Repository

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Prepare for Render deployment"
   git push origin main
   ```

## Step 2: Deploy Backend on Render

1. **Go to [Render Dashboard](https://dashboard.render.com/)**

2. **Click "New +" → "Web Service"**

3. **Connect Your GitHub Repository**
   - Choose your URL shortener repository
   - Click "Connect"

4. **Configure the Backend Service:**
   - **Name:** `url-shortener-backend`
   - **Environment:** `Node`
   - **Region:** Choose closest to your users
   - **Branch:** `main`
   - **Root Directory:** `server`
   - **Build Command:** `npm install`
   - **Start Command:** `node index.js`

5. **Set Environment Variables:**
   - Click "Advanced" → "Add Environment Variable"
   - Add: `PORT` = `10000` (Render's default)
   - Add: `BASE_URL` = `https://your-app-name.onrender.com` (update after deployment)

6. **Click "Create Web Service"**

7. **Wait for deployment** (first build takes 5-10 minutes)

8. **Copy your backend URL** (e.g., `https://url-shortener-backend-abc123.onrender.com`)

## Step 3: Deploy Frontend on Render

1. **Click "New +" → "Static Site"**

2. **Connect the same GitHub repository**

3. **Configure the Frontend:**
   - **Name:** `url-shortener-frontend`
   - **Branch:** `main`
   - **Root Directory:** Leave empty (root of repo)
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`

4. **Set Environment Variables:**
   - Add: `VITE_API_URL` = `https://your-backend-url.onrender.com/api`

5. **Click "Create Static Site"**

6. **Wait for deployment**

## Step 4: Update Backend BASE_URL

1. **Go back to your backend service on Render**
2. **Click "Environment"**
3. **Update `BASE_URL`** to your frontend URL (e.g., `https://url-shortener-frontend-xyz789.onrender.com`)
4. **Click "Save Changes"** (this will redeploy)

## Step 5: Test Your Deployment

1. **Visit your frontend URL**
2. **Test creating a short URL**
3. **Test the redirect functionality**
4. **Verify analytics are working**

## Important Notes

- **Free tier limitations:** Apps sleep after 15 minutes of inactivity
- **First request after sleep:** May take 30-60 seconds to wake up
- **Custom domains:** Available on paid plans
- **HTTPS:** Automatically provided by Render

## Troubleshooting

### Backend Issues:
- Check logs in Render dashboard
- Ensure `PORT` environment variable is set
- Verify `package.json` has correct start script

### Frontend Issues:
- Check build logs for errors
- Ensure `VITE_API_URL` points to correct backend
- Verify `dist` folder is being created

### CORS Issues:
- Backend already configured for CORS
- If issues persist, check browser console

## Environment Variables Summary

**Backend (.env):**
```
PORT=10000
BASE_URL=https://your-frontend-url.onrender.com
```

**Frontend (.env):**
```
VITE_API_URL=https://your-backend-url.onrender.com/api
```

## Success!

Your URL shortener is now live and accessible worldwide! 🚀

- **Frontend:** https://your-frontend-url.onrender.com
- **Backend API:** https://your-backend-url.onrender.com/api
- **Health Check:** https://your-backend-url.onrender.com/health