import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cron from 'node-cron'; // 1. Importar o cron

import OpportunitiesController from './controllers/OpportunitiesController';
import UserController from './controllers/UserController';
import FavoriteController from './controllers/FavoriteController';
import AlertController from './controllers/AlertController';
import { checkAlerts } from './worker'; // 2. Importar nossa função do worker

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3333;

const opportunitiesController = new OpportunitiesController();
const userController = new UserController();
const favoriteController = new FavoriteController();
const alertController = new AlertController();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('DeFi Yield Finder API Running!');
});

// --- ROTAS ---
app.get('/api/opportunities', opportunitiesController.handle);
app.post('/api/users', userController.handle);
app.patch('/api/users/:walletAddress', userController.update);
app.post('/api/favorites', favoriteController.create);
app.delete('/api/favorites', favoriteController.delete);
app.get('/api/favorites/:walletAddress', favoriteController.list);
app.post('/api/alerts', alertController.create);
app.get('/api/alerts/:walletAddress', alertController.list);
app.delete('/api/alerts/:id', alertController.delete);


app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);

  // 3. AGENDAR A TAREFA
  // A expressão '0 * * * *' significa "no minuto 0 de toda hora" (de hora в hora).
  cron.schedule('0 * * * *', () => {
    console.log('Executando a verificação de alertas agendada...');
    checkAlerts();
  });
});