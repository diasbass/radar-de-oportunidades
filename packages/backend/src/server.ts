// packages/backend/src/server.ts
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import OpportunitiesController from './controllers/OpportunitiesController';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3333;

const opportunitiesController = new OpportunitiesController();

app.use(cors()); // Habilita o CORS
app.use(express.json()); // Habilita o uso de JSON

app.get('/', (req, res) => {
  res.send('Radar de Oportunidades API rodando!');
});

// Nossa nova rota de verdade!
app.get('/api/opportunities', opportunitiesController.handle);

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});