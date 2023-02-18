import Express from 'express';

import taskRouter from './routes/tasks.js';
import notFound from './middleware/not-found.js';
import errorHandler from './middleware/error-handler.js';

const app = Express();

app.use(Express.json());
app.use(Express.static('public'));

app.use('/api/v1/tasks', taskRouter);
app.use(notFound);
app.use(errorHandler);

export default app;
