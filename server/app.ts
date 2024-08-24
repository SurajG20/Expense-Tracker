import express, { Application } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import morgan from 'morgan';
import connectDb from './db/connect';

// router
import router from './routes/transaction.routes';
import authRoutes from './routes/auth.routes';

const app: Application = express();
config();

app.use(morgan('dev'));
// middleware
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World');
});
app.use('/api/v1', router);
app.use('/api/v1/auth', authRoutes);

const port: number = parseInt(process.env.PORT || '3000');

const start = async (): Promise<void> => {
  try {
    await connectDb(process.env.MONGO_URL || '');
    console.log('Database Connected');
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.error(error);
  }
};

start();
