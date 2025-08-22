import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`GG! MongoDB Connected: ${conn.connection.host}`);
    
    // Wait for connection to be fully established
    await mongoose.connection.asPromise();
    
    // Verify connection is working
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Available collections:', collections.map(c => c.name));
    
    // Test if we can query the database
    try {
      const testCount = await mongoose.connection.db.collection('users').countDocuments();
      console.log('Users collection document count:', testCount);
    } catch (err) {
      console.log('Users collection not found or error:', err.message);
    }
    
    console.log('Database connection fully established and ready!');
    
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};
