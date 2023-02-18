import dotenv from 'dotenv';

import connectDb from './db/connection.js';
import app from './app.js';

dotenv.config();

await connectDb(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });