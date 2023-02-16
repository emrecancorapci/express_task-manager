import Express from 'express';
import dotenv from 'dotenv';

import taskRouter from './routes/tasks.js';
import connectDb from './db/connection.js';
import notFound from './middleware/not-found.js';

dotenv.config();

const app = Express();
const port = 3000;

app.use(Express.json());
app.use(Express.static('public'));


app.use('/api/v1/tasks', taskRouter);
app.use(notFound);

await connectDb(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
