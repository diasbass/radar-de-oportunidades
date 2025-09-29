import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import OpportunitiesController from './controllers/OpportunitiesController';
import UserController from './controllers/UserController';
import FavoriteController from './controllers/FavoriteController';
import AlertController from './controllers/AlertController'; // 1. Importar

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3333;

const opportunitiesController = new OpportunitiesController();
const userController = new UserController();
const favoriteController = new FavoriteController();
const alertController = new AlertController(); // 2. Instanciar

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('DeFi Yield Finder API Running!');
});

// --- ROTAS DE OPORTUNIDADES ---
app.get('/api/opportunities', opportunitiesController.handle);

// --- ROTAS DE USUÁRIOS ---
app.post('/api/users', userController.handle);
app.patch('/api/users/:walletAddress', userController.update);

// --- ROTAS DE FAVORITOS ---
app.post('/api/favorites', favoriteController.create);
app.delete('/api/favorites', favoriteController.delete);
app.get('/api/favorites/:walletAddress', favoriteController.list);

// --- 3. ROTAS DE ALERTAS ---
app.post('/api/alerts', alertController.create);
app.get('/api/alerts/:walletAddress', alertController.list);
app.delete('/api/alerts/:id', alertController.delete);


app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});