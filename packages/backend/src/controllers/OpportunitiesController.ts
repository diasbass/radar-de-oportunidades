// packages/backend/src/controllers/OpportunitiesController.ts
import { Request, Response } from 'express';
import OpportunitiesService from '../services/OpportunitiesService';

class OpportunitiesController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const opportunitiesService = new OpportunitiesService();

    try {
      const opportunities = await opportunitiesService.execute();
      return res.json(opportunities);
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default OpportunitiesController;