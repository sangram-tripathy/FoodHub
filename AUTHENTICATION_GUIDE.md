# Authentication Setup Guide

## What Was Added:

### Backend:
- ✅ User model with password hashing (bcrypt)
- ✅ JWT authentication middleware
- ✅ Auth routes: /auth/signup, /auth/login, /auth/me
- ✅ Protected routes capability

### Frontend:
- ✅ AuthContext for managing user state
- ✅ Login component with modal
- ✅ Signup component with modal
- ✅ Updated Header with Login/Logout buttons
- ✅ User greeting when logged in

## Setup Instructions:

### Step 1: Add JWT_SECRET to Backend

1. Open `backend/.env` file
2. Add these lines:
```
JWT_SECRET=your_super_secret_jwt_key_make_it_long_and_random_12345
JWT_EXPIRE=7d
```

### Step 2: Test Locally

1. Start backend:
```bash
cd backend
npm start
```

2. Start frontend:
```bash
npm run dev
```

3. Open http://localhost:5173
4. Click "Login" button
5. Click "Sign up" link
6. Create an account
7. You should be logged in automatically!

### Step 3: Push to GitHub

Use GitHub Desktop:
1. Commit message: "Add authentication system"
2. Push to GitHub

### Step 4: Update Render Environment Variables

1. Go to https://dashboard.render.com
2. Click on your backend service
3. Go to "Environment" tab
4. Add new variable:
   - Key: `JWT_SECRET`
   - Value: `your_super_secret_jwt_key_make_it_long_and_random_12345`
5. Add new variable:
   - Key: `JWT_EXPIRE`
   - Value: `7d`
6. Click "Save Changes"
7. Service will auto-redeploy

### Step 5: Redeploy Frontend on Vercel

Vercel will auto-deploy when you push to GitHub!

## Features:

✅ User Registration (Signup)
✅ User Login
✅ JWT Token Authentication
✅ Persistent Login (localStorage)
✅ User Profile Display in Header
✅ Logout Functionality
✅ Password Validation (min 6 characters)
✅ Email Validation
✅ Error Handling

## API Endpoints:

- POST /auth/signup - Create new user
- POST /auth/login - Login user
- GET /auth/me - Get current user (requires token)

## Security Features:

- Passwords hashed with bcrypt (12 rounds)
- JWT tokens for authentication
- Token stored in localStorage
- Protected routes with middleware
- Password validation
- Email uniqueness check

## Future Enhancements (Optional):

- [ ] Require login to place orders
- [ ] User order history
- [ ] Email verification
- [ ] Password reset
- [ ] User profile page
- [ ] Admin panel

## Resume Points:

Add to your project description:
- "Implemented JWT-based authentication system"
- "Secured user passwords with bcrypt hashing"
- "Built login/signup functionality with form validation"
- "Managed authentication state with React Context API"
