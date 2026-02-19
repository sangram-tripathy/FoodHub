import dotenv from 'dotenv';
import mongoose from 'mongoose';
import fs from 'fs/promises';
import Meal from './models/Meal.js';

dotenv.config();

const seedMeals = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');

    await Meal.deleteMany({});
    console.log('Cleared existing meals');

    const mealsData = await fs.readFile('./data/available-meals.json', 'utf8');
    const meals = JSON.parse(mealsData);

    await Meal.insertMany(meals);
    console.log('Meals seeded successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding meals:', error);
    process.exit(1);
  }
};

seedMeals();
