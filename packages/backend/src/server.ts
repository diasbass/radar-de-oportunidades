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
import { isProSubscriber } from './middleware/authMiddleware';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3333;

const opportunitiesController = new OpportunitiesController();
const userController = new UserController();
const favoriteController = new FavoriteController();
const alertController = new AlertController();
const billingController = new BillingController();

// --- CORREÇÃO DE CORS APLICADA ---
// Mantemos as opções detalhadas para o pre-flight
const corsOptions = {
  origin: 'https://www.defiyieldfinder.com',
  methods: 'GET,POST,PUT,DELETE,PATCH,OPTIONS', // Permite os métodos usados
  allowedHeaders: 'Content-Type,Authorization', // Permite os cabeçalhos
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// A linha 'app.options('*', ...)' foi REMOVIDA daqui, pois causou o crash.
// app.use(cors(corsOptions)) já lida com requisições OPTIONS.
// --- FIM DA CORREÇÃO ---


app.post(
  '/api/billing/webhook',
  express.raw({ type: 'application/json' }),
  billingController.handleWebhook
);

app.use(express.json());

app.get('/', (req, res) => {
  res.send('DeFi Yield Finder API Running!');
});

// --- ROTAS PÚBLICAS ---
app.get('/api/opportunities', opportunitiesController.handle);
app.post('/api/users', userController.handle);
app.post(
  '/api/billing/create-checkout-session',
  billingController.createCheckoutSession
);

// --- ROTAS PROTEGIDAS (PRO) ---
app.post('/api/favorites/toggle', isProSubscriber, favoriteController.toggle);
app.get(
  '/api/favorites/:walletAddress',
  isProSubscriber,
  favoriteController.list
);

app.post('/api/alerts', isProSubscriber, alertController.create);
app.get('/api/alerts/:walletAddress', isProSubscriber, alertController.list);
app.delete('/api/alerts/:id', isProSubscriber, alertController.delete);

app.patch('/api/users/:walletAddress', isProSubscriber, userController.update);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  cron.schedule('0 * * * *', () => {
    checkAlerts();
  });
});