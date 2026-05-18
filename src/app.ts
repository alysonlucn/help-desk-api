import express from 'express';
import userRoutes from './routes/user-routes';
import authRoutes from './routes/auth-routes';
import profileRoutes from './routes/profile-routes';
import ticketRoutes from './routes/ticket-routes';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/tickets', ticketRoutes);

export default app;