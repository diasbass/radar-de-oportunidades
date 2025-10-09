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
import { isProSubscriber } from './middleware/authMiddleware'; // 1. Importar

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3333;

const opportunitiesController = new OpportunitiesController();
const userController = new UserController();
const favoriteController = new FavoriteController();
const alertController = new AlertController();
const billingController = new BillingController();

app.post('/api/billing/webhook', express.raw({ type: 'application/json' }), billingController.handleWebhook);

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => { res.send('DeFi Yield Finder API Running!'); });

// --- ROTAS PÚBLICAS ---
app.get('/api/opportunities', opportunitiesController.handle);
app.post('/api/users', userController.handle); // O login é público
app.post('/api/billing/create-checkout-session', billingController.createCheckoutSession);

// --- ROTAS PROTEGIDAS (PRO) ---
// 2. Adicionar o 'isProSubscriber' antes do controller
app.post('/api/favorites/toggle', isProSubscriber, favoriteController.toggle); // Rota atualizada
app.get('/api/favorites/:walletAddress', isProSubscriber, favoriteController.list);

app.post('/api/alerts', isProSubscriber, alertController.create);
app.get('/api/alerts/:walletAddress', isProSubscriber, alertController.list);
app.delete('/api/alerts/:id', isProSubscriber, alertController.delete);

// A rota para ATUALIZAR o email também deve ser PRO
app.patch('/api/users/:walletAddress', isProSubscriber, userController.update);


app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  cron.schedule('0 * * * *', () => { checkAlerts(); });
});