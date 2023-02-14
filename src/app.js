import Express from 'express';
import taskRouter from './routes/tasks.js';
import connectDb from './db/connection.js';
import dotenv from 'dotenv';

dotenv.config();

const app = Express();
const port = 3000;

const startServer = async () => {
  try {
    await connectDb(process.env.MONGO_URI);

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

app.use(Express.json());

app.get('/hello', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/v1/tasks', taskRouter);

await startServer();
