# Food Order App - Deployment Guide

## Prerequisites
- GitHub account
- MongoDB Atlas account (free tier)
- Render account (free tier)
- Vercel account (free tier)

---

## STEP 1: Setup MongoDB Atlas (Database)

### 1.1 Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up with Google or Email
3. Complete the registration

### 1.2 Create Database Cluster
1. After login, click **"Create"** button (or "Build a Database")
2. Choose **FREE** tier (M0 Sandbox)
3. Select **AWS** as cloud provider
4. Choose region closest to you (e.g., Mumbai for India)
5. Cluster Name: `FoodOrderCluster` (or keep default)
6. Click **"Create Deployment"** or **"Create Cluster"**

### 1.3 Create Database User
1. You'll see "Security Quickstart" popup
2. Create database user:
   - Username: `foodorderuser` (remember this)
   - Password: Click "Autogenerate Secure Password" and COPY it (save in notepad)
   - Click **"Create Database User"**

### 1.4 Setup Network Access
1. In the same popup, under "Where would you like to connect from?"
2. Choose **"My Local Environment"**
3. Click **"Add My Current IP Address"**
4. Also add: `0.0.0.0/0` (allows access from anywhere - needed for Render)
5. Click **"Finish and Close"**

### 1.5 Get Connection String
1. Click **"Connect"** button on your cluster
2. Choose **"Connect your application"**
3. Driver: **Node.js**, Version: **5.5 or later**
4. Copy the connection string (looks like):
   ```
   mongodb+srv://foodorderuser:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<password>` with your actual password (from step 1.3)
6. Add database name before `?`: 
   ```
   mongodb+srv://foodorderuser:yourpassword@cluster0.xxxxx.mongodb.net/foodorder?retryWrites=true&w=majority
   ```
7. Save this complete connection string in notepad

---

## STEP 2: Deploy Backend to Render

### 2.1 Push Backend to GitHub
1. Open terminal in backend folder:
   ```bash
   cd backend
   ```

2. Initialize git (if not already):
   ```bash
   git init
   git add .
   git commit -m "Initial backend commit"
   ```

3. Create new GitHub repository:
   - Go to https://github.com/new
   - Repository name: `food-order-backend`
   - Keep it Public
   - Don't add README, .gitignore, or license
   - Click **"Create repository"**

4. Push code to GitHub:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/food-order-backend.git
   git branch -M main
   git push -u origin main
   ```

### 2.2 Deploy on Render
1. Go to https://render.com and sign up/login with GitHub
2. Click **"New +"** → **"Web Service"**
3. Click **"Connect GitHub"** and authorize Render
4. Find and select `food-order-backend` repository
5. Click **"Connect"**

### 2.3 Configure Web Service
Fill in the following:
- **Name**: `food-order-backend` (or any name)
- **Region**: Choose closest region
- **Branch**: `main`
- **Root Directory**: Leave empty
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Instance Type**: `Free`

### 2.4 Add Environment Variables
Scroll down to **"Environment Variables"** section:
1. Click **"Add Environment Variable"**
2. Add these variables:

   **Variable 1:**
   - Key: `MONGODB_URI`
   - Value: (paste your MongoDB connection string from Step 1.5)

   **Variable 2:**
   - Key: `PORT`
   - Value: `3000`

3. Click **"Create Web Service"**

### 2.5 Wait for Deployment
- Render will start building and deploying (takes 2-5 minutes)
- Watch the logs for any errors
- Once you see "Your service is live 🎉", copy the URL
- URL will look like: `https://food-order-backend.onrender.com`
- **SAVE THIS URL** - you'll need it for frontend

### 2.6 Seed the Database
1. In Render dashboard, go to your service
2. Click **"Shell"** tab on the left
3. Run this command:
   ```bash
   npm run seed
   ```
4. You should see "Meals seeded successfully"

### 2.7 Test Backend
Open in browser: `https://food-order-backend.onrender.com/meals`
You should see JSON data with meals.

---

## STEP 3: Deploy Frontend to Vercel

### 3.1 Create .env file for Frontend
1. In your project root (not backend folder), create `.env` file:
   ```
   VITE_API_URL=https://food-order-backend.onrender.com
   ```
   (Replace with your actual Render URL from Step 2.5)

### 3.2 Test Locally First
1. Open terminal in project root:
   ```bash
   npm install
   npm run dev
   ```
2. Open http://localhost:5173 and test if meals load
3. Try placing an order
4. If everything works, proceed to deployment

### 3.3 Push Frontend to GitHub
1. In project root folder:
   ```bash
   git init
   git add .
   git commit -m "Initial frontend commit"
   ```

2. Create new GitHub repository:
   - Go to https://github.com/new
   - Repository name: `food-order-frontend`
   - Keep it Public
   - Click **"Create repository"**

3. Push code:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/food-order-frontend.git
   git branch -M main
   git push -u origin main
   ```

### 3.4 Deploy on Vercel
1. Go to https://vercel.com and sign up/login with GitHub
2. Click **"Add New..."** → **"Project"**
3. Import `food-order-frontend` repository
4. Click **"Import"**

### 3.5 Configure Project
- **Framework Preset**: Vite (should auto-detect)
- **Root Directory**: `./` (leave as is)
- **Build Command**: `npm run build` (should be auto-filled)
- **Output Directory**: `dist` (should be auto-filled)

### 3.6 Add Environment Variable
1. Expand **"Environment Variables"** section
2. Add variable:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://food-order-backend.onrender.com` (your Render URL)
3. Click **"Deploy"**

### 3.7 Wait for Deployment
- Vercel will build and deploy (takes 1-2 minutes)
- Once done, you'll see "Congratulations!" with your live URL
- URL will look like: `https://food-order-frontend.vercel.app`

### 3.8 Update Backend CORS
1. Go back to Render dashboard
2. Open your backend service
3. Click **"Environment"** tab
4. Add new environment variable:
   - Key: `FRONTEND_URL`
   - Value: (your Vercel URL)
5. Click **"Save Changes"**
6. Service will auto-redeploy

---

## STEP 4: Final Testing

1. Open your Vercel URL in browser
2. Check if meals are loading
3. Add items to cart
4. Complete checkout with test data
5. Check MongoDB Atlas:
   - Go to Atlas dashboard
   - Click **"Browse Collections"**
   - Select `foodorder` database
   - Check `orders` collection for your test order

---

## Troubleshooting

### Backend Issues
- **Build fails**: Check if all dependencies are in package.json
- **Can't connect to MongoDB**: Verify connection string and network access (0.0.0.0/0)
- **Service crashes**: Check Render logs for errors

### Frontend Issues
- **Blank page**: Check browser console for errors
- **Can't fetch meals**: Verify VITE_API_URL is correct
- **CORS error**: Make sure backend CORS allows your frontend URL

### Database Issues
- **No meals showing**: Run seed command again in Render shell
- **Orders not saving**: Check MongoDB Atlas network access settings

---

## Important URLs to Save

1. **MongoDB Atlas**: https://cloud.mongodb.com
2. **Backend (Render)**: https://food-order-backend.onrender.com
3. **Frontend (Vercel)**: https://food-order-frontend.vercel.app
4. **GitHub Backend**: https://github.com/YOUR_USERNAME/food-order-backend
5. **GitHub Frontend**: https://github.com/YOUR_USERNAME/food-order-frontend

---

## Resume Points

After successful deployment, add these to your resume:

✅ Deployed full-stack MERN application with MongoDB Atlas, Render, and Vercel
✅ Implemented RESTful API with Express.js and deployed on cloud platform
✅ Configured environment variables and CORS for production deployment
✅ Set up CI/CD pipeline with GitHub integration
✅ Live Project: [Your Vercel URL]

---

## Next Steps

1. Add custom domain (optional)
2. Set up monitoring and analytics
3. Implement error tracking (Sentry)
4. Add more features (authentication, payment gateway)
5. Optimize performance (caching, lazy loading)

Good luck with your deployment! 🚀
