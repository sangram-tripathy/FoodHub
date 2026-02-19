# Quick Deployment Reference Card

## 🚀 Deployment Order
1. MongoDB Atlas (Database)
2. Render (Backend)
3. Vercel (Frontend)

## 📝 Essential Commands

### Backend Deployment
```bash
cd backend
git init
git add .
git commit -m "Initial backend commit"
git remote add origin https://github.com/YOUR_USERNAME/food-order-backend.git
git branch -M main
git push -u origin main
```

### Frontend Deployment
```bash
# In project root
git init
git add .
git commit -m "Initial frontend commit"
git remote add origin https://github.com/YOUR_USERNAME/food-order-frontend.git
git branch -M main
git push -u origin main
```

### Seed Database (in Render Shell)
```bash
npm run seed
```

## 🔑 Environment Variables

### Backend (.env on Render)
```
MONGODB_URI=mongodb+srv://username:password@cluster.xxxxx.mongodb.net/foodorder?retryWrites=true&w=majority
PORT=3000
```

### Frontend (.env on Vercel)
```
VITE_API_URL=https://your-backend.onrender.com
```

## 🌐 Important URLs

- **MongoDB Atlas**: https://cloud.mongodb.com
- **Render**: https://render.com
- **Vercel**: https://vercel.com
- **GitHub**: https://github.com

## ✅ Deployment Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Database user created with password saved
- [ ] Network access set to 0.0.0.0/0
- [ ] Connection string copied and password replaced
- [ ] Backend pushed to GitHub
- [ ] Backend deployed on Render
- [ ] Environment variables added on Render
- [ ] Database seeded via Render shell
- [ ] Backend URL tested (/meals endpoint)
- [ ] Frontend .env file created with backend URL
- [ ] Frontend tested locally
- [ ] Frontend pushed to GitHub
- [ ] Frontend deployed on Vercel
- [ ] Environment variable added on Vercel
- [ ] Full app tested on live URL

## 🐛 Quick Fixes

**Meals not loading?**
- Check VITE_API_URL in Vercel
- Test backend URL directly: `https://your-backend.onrender.com/meals`

**CORS error?**
- Verify backend CORS settings in app.js
- Check if frontend URL is correct

**No data in database?**
- Run `npm run seed` in Render shell

**Backend sleeping (Render free tier)?**
- First request takes 30-60 seconds to wake up
- This is normal for free tier

## 📞 Support

If stuck, check:
1. Browser console for frontend errors
2. Render logs for backend errors
3. MongoDB Atlas monitoring for database issues

---

**Remember**: Free tier services may sleep after inactivity. First load might be slow!
