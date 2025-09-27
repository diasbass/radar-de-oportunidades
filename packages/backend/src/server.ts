import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import OpportunitiesController from './controllers/OpportunitiesController';
import UserController from './controllers/UserController';
import FavoriteController from './controllers/FavoriteController';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3333;

// --- INSTANCIANDO OS NOVOS CONTROLLERS ---
const opportunitiesController = new OpportunitiesController();
const userController = new UserController();
const favoriteController = new FavoriteController();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('DeFi Yield Finder API Running!');
});

// --- ROTAS ANTIGAS E NOVAS ---
app.get('/api/opportunities', opportunitiesController.handle);

app.post('/api/users', userController.handle);

app.post('/api/favorites', favoriteController.create);
app.get('/api/favorites/:walletAddress', favoriteController.list);


app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});