import mongoose from 'mongoose';

const URI = 'mongodb://localhost:27017/test';

export default function connectMongoDB () {
  mongoose.connect(URI, () => {
    console.log(`connection success: ${URI}`);
  });
}