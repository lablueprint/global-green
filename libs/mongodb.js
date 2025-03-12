import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI not found in env variable');
}

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectMongoDB = async () => {
  if (cached.conn) {
    console.log('using existing MongoDB connection');
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // disable command buffering
      serverSelectionTimeoutMS: 30000, // timeout after 30 seconds when selecting a server
      socketTimeoutMS: 60000, // close sockets after 60 seconds of inactivity
      maxPoolSize: 10, // maintain up to 10 socket connections
      connectTimeoutMS: 30000, // give up initial connection after 30 seconds
      retryWrites: true,
      family: 4, // use IPv4, skip trying IPv6
    };

    console.log('Connecting to MongoDB...');
    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log('MongoDB connected successfully');
        return mongoose;
      })
      .catch((err) => {
        console.log('MongoDB connection error:', err);
        cached.promise = null;
        throw err;
      });
  } else {
    console.log('waiting for existing MongoDB connection promise...');
  }

  try {
    // await the connection and store it
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    // reset the promise on error
    cached.promise = null;
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
};

// add event listeners to monitor connection state
mongoose.connection.on('connected', () => {
  console.log('MongoDB connection established');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
  cached.conn = null;
  cached.promise = null;
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB connection disconnected');
  cached.conn = null;
  cached.promise = null;
});

// handle app termination
process.on('SIGINT', async () => {
  if (mongoose.connection.readyState === 1) {
    console.log('Closing MongoDB connection due to app termination');
    await mongoose.connection.close();
  }
  process.exit(0);
});

export default connectMongoDB;
