import Express from 'express';
import taskRouter from './routes/tasks.js';

const app = Express();
const port = 3000;

app.use(Express.json());

app.get('/hello', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/v1/tasks', taskRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
