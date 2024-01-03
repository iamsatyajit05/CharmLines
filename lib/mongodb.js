import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db();
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

export { connectToDatabase };