import mongoose from 'mongoose';

mongoose.set('strictQuery', false);

export default async (url) =>
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('Error connecting to MongoDB', err));
