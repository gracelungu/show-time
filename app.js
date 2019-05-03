import express from 'express';
import Database from './server/models';
import router from './server/routes';

const app = express();

app.use(express.json());

// Initialize the database
Database.connect();

// Api routes
app.use('/api', router);

// Capturing bad requests
app.use('*', (req, res) => {
  res.status(404).json({ status: 404, message: 'Bad request' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

export default app;
