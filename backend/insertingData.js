import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User, Committee } from './models.js';
dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("MongoDB connected");

    // 1. Create dummy user
    const dummyUser = await User.create({
      name: "Admin",
      email: "admin@example.com",
      passwordHash: "dummyhash"
    });

    // 2. Create committees
    await Committee.create([
      { name: "GDG", description: "Google Developer Group", createdBy: dummyUser._id },
      { name: "CSI", description: "Computer Society of India", createdBy: dummyUser._id }
    ]);

    console.log("Committees added");
    mongoose.disconnect();
  })
  .catch(err => console.error(err));
