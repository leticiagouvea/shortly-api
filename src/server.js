import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import { PORT } from './configs/constants.js';
import authRoutes from './routes/authRoutes.js';

const app = express();

app
  .use(cors())
  .use(express.json())
  .use(authRoutes);

app.listen(PORT, () => console.log(`Server running in port: ${PORT}`));