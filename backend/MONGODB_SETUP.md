# MongoDB Setup Instructions

## Prerequisites
- Install MongoDB locally or use MongoDB Atlas (cloud)

## Local MongoDB Installation
1. Download MongoDB from: https://www.mongodb.com/try/download/community
2. Install and start MongoDB service

## Setup Steps

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment Variables
Update `.env` file with your MongoDB connection string:

**For Local MongoDB:**
```
MONGODB_URI=mongodb://localhost:27017/foodorder
PORT=3000
```

**For MongoDB Atlas (Cloud):**
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/foodorder
PORT=3000
```

### 3. Seed Database with Meal Data
```bash
npm run seed
```

### 4. Start Server
```bash
npm start
```

## MongoDB Atlas Setup (Free Cloud Option)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a cluster (free tier)
4. Create database user
5. Whitelist your IP (or use 0.0.0.0/0 for development)
6. Get connection string and update `.env`

## Verify Setup
- Server should log: "MongoDB connected successfully"
- Server should log: "Server running on port 3000"
- Test: http://localhost:3000/meals

## Features Added
✅ MongoDB database integration
✅ Mongoose ODM for data modeling
✅ Environment variables for configuration
✅ Meal and Order models
✅ Database seeding script
✅ Error handling for database operations
