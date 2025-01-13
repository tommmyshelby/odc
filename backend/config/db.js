// Import dependencies
import mongoose from 'mongoose';

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error); // Log the entire error object for more details
    process.exit(1); // Exit the process with failure
  }
};
// Export the connection function
export default connectDB;
