# 📋 Deployment Checklist

Print this and check off each step as you complete it!

---

## PHASE 1: MongoDB Atlas Setup

- [ ] Created MongoDB Atlas account at https://www.mongodb.com/cloud/atlas/register
- [ ] Created FREE cluster (M0 Sandbox)
- [ ] Created database user with username: ________________
- [ ] Saved password in safe place: ________________
- [ ] Added IP address 0.0.0.0/0 to network access
- [ ] Got connection string and replaced <password>
- [ ] Added database name 'foodorder' to connection string
- [ ] Final connection string saved: ________________

**My MongoDB Connection String:**
```
mongodb+srv://username:password@cluster.xxxxx.mongodb.net/foodorder?retryWrites=true&w=majority
```

---

## PHASE 2: Backend Deployment (Render)

- [ ] Created GitHub account (if needed)
- [ ] Created new repository: `food-order-backend`
- [ ] Opened terminal in backend folder
- [ ] Ran: `git init`
- [ ] Ran: `git add .`
- [ ] Ran: `git commit -m "Initial backend commit"`
- [ ] Ran: `git remote add origin [YOUR_REPO_URL]`
- [ ] Ran: `git branch -M main`
- [ ] Ran: `git push -u origin main`
- [ ] Created Render account at https://render.com
- [ ] Connected GitHub to Render
- [ ] Created new Web Service
- [ ] Selected food-order-backend repository
- [ ] Set Build Command: `npm install`
- [ ] Set Start Command: `npm start`
- [ ] Added environment variable: MONGODB_URI
- [ ] Added environment variable: PORT = 3000
- [ ] Clicked "Create Web Service"
- [ ] Waited for deployment to complete
- [ ] Copied Render URL: ________________
- [ ] Opened Shell tab in Render
- [ ] Ran: `npm run seed`
- [ ] Verified seed was successful
- [ ] Tested URL in browser: https://your-backend.onrender.com/meals
- [ ] Saw JSON data with meals

**My Backend URL:** ________________

---

## PHASE 3: Frontend Deployment (Vercel)

- [ ] Created .env file in project root
- [ ] Added: VITE_API_URL=[YOUR_RENDER_URL]
- [ ] Tested locally with `npm run dev`
- [ ] Verified meals load at http://localhost:5173
- [ ] Tested placing an order
- [ ] Created new GitHub repository: `food-order-frontend`
- [ ] Opened terminal in project root
- [ ] Ran: `git init`
- [ ] Ran: `git add .`
- [ ] Ran: `git commit -m "Initial frontend commit"`
- [ ] Ran: `git remote add origin [YOUR_REPO_URL]`
- [ ] Ran: `git branch -M main`
- [ ] Ran: `git push -u origin main`
- [ ] Created Vercel account at https://vercel.com
- [ ] Connected GitHub to Vercel
- [ ] Imported food-order-frontend repository
- [ ] Verified Framework: Vite
- [ ] Verified Build Command: `npm run build`
- [ ] Verified Output Directory: `dist`
- [ ] Added environment variable: VITE_API_URL
- [ ] Clicked "Deploy"
- [ ] Waited for deployment to complete
- [ ] Copied Vercel URL: ________________

**My Frontend URL:** ________________

---

## PHASE 4: Final Testing

- [ ] Opened frontend URL in browser
- [ ] Meals are loading correctly
- [ ] Images are displaying
- [ ] Prices showing in INR (₹)
- [ ] Can add items to cart
- [ ] Cart total calculates correctly
- [ ] Can open checkout modal
- [ ] Filled test order form
- [ ] Submitted test order successfully
- [ ] Saw success message
- [ ] Checked MongoDB Atlas for order:
  - [ ] Logged into Atlas
  - [ ] Clicked "Browse Collections"
  - [ ] Found 'foodorder' database
  - [ ] Found 'orders' collection
  - [ ] Saw my test order

---

## PHASE 5: Documentation

- [ ] Updated README.md with live URLs
- [ ] Added screenshots to README
- [ ] Updated resume with project
- [ ] Added project to LinkedIn
- [ ] Shared project link with friends/family for testing

---

## 🎉 Success Criteria

✅ Backend URL works: https://your-backend.onrender.com/meals
✅ Frontend URL works: https://your-frontend.vercel.app
✅ Can browse meals
✅ Can add to cart
✅ Can place orders
✅ Orders save to MongoDB

---

## 📝 Important Information to Save

**MongoDB Atlas:**
- Email: ________________
- Password: ________________
- Connection String: ________________

**GitHub:**
- Backend Repo: https://github.com/________________/food-order-backend
- Frontend Repo: https://github.com/________________/food-order-frontend

**Render:**
- Backend URL: https://________________.onrender.com

**Vercel:**
- Frontend URL: https://________________.vercel.app

---

## 🐛 Troubleshooting

**If meals don't load:**
1. Check browser console (F12)
2. Verify VITE_API_URL in Vercel settings
3. Test backend URL directly
4. Check Render logs for errors

**If backend is slow:**
- Render free tier sleeps after 15 min inactivity
- First request takes 30-60 seconds to wake up
- This is normal!

**If orders don't save:**
1. Check MongoDB network access (0.0.0.0/0)
2. Verify connection string is correct
3. Check Render logs for database errors

---

## 🎯 Next Steps After Deployment

- [ ] Add project to resume
- [ ] Update LinkedIn profile
- [ ] Share on social media
- [ ] Ask friends to test
- [ ] Collect feedback
- [ ] Plan next features
- [ ] Start next project!

---

**Date Deployed:** ________________

**Time Taken:** ________________

**Challenges Faced:** 
_________________________________
_________________________________
_________________________________

**What I Learned:**
_________________________________
_________________________________
_________________________________

---

🎊 Congratulations on deploying your first full-stack application! 🎊
