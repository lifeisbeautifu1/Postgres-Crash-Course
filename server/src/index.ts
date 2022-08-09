import express from 'express';
import restaurants from './routes/restaurants';
import morgan from 'morgan';
import 'dotenv/config';
import 'colors';

const app = express();

app.use(morgan('dev'));
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use('/api/restaurants', restaurants);

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`.green.bold)
);
