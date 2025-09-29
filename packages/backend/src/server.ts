import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cron from 'node-cron';

import OpportunitiesController from './controllers/OpportunitiesController';
import UserController from './controllers/UserController';
import FavoriteController from './controllers/FavoriteController';
import AlertController from './controllers/AlertController';
import BillingController from './controllers/BillingController';
import { checkAlerts } from './worker';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3333;

const opportunitiesController = new OpportunitiesController();
const userController = new UserController();
const favoriteController = new FavoriteController();
const alertController = new AlertController();
const billingController = new BillingController();

app.use(cors());

// A rota de webhook é definida PRIMEIRO, com seu próprio leitor de corpo (raw).
app.post('/api/billing/webhook', express.raw({ type: 'application/json' }), billingController.handleWebhook);

// Agora definimos o leitor de JSON para TODAS as outras rotas.
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
app.post('/api/billing/create-checkout-session', billingController.createCheckoutSession);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  
  cron.schedule('0 * * * *', () => {
    console.log('Executando a verificação de alertas agendada...');
    checkAlerts();
  });
});