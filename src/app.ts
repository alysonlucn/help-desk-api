import express from 'express';
import userRoutes from './routes/user-routes';
import authRoutes from './routes/auth-routes';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/users', userRoutes);
app.use('/auth', authRoutes);

export default app;