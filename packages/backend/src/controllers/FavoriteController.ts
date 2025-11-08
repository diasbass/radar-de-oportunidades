import { Request, Response } from 'express';
import { z } from 'zod';
import FavoriteService from '../services/FavoriteService';
import UserService from '../services/UserService';

const favoriteSchema = z.object({
  walletAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  opportunityId: z.string(),
});

class FavoriteController {
  
  // --- MÉTODO 'toggle' NOVO E ÚNICO ---
  public async toggle(req: Request, res: Response): Promise<Response> {
    try {
      const { walletAddress, opportunityId } = favoriteSchema.parse(req.body);
      
      const userService = new UserService();
      const user = await userService.findOrCreate(walletAddress);

      const favoriteService = new FavoriteService();
      // Verifica se o favorito já existe
      const existingFavorite = await favoriteService.find(user.id, opportunityId);

      if (existingFavorite) {
        // Se existe, deleta
        await favoriteService.delete(user.id, opportunityId);
        return res.status(200).json({ status: 'removed' });
      } else {
        // Se não existe, cria
        await favoriteService.create(user.id, opportunityId);
        return res.status(201).json({ status: 'created' });
      }
    } catch (error: any) {
      console.error("Error toggling favorite:", error);
      return res.status(500).json({ message: 'Failed to toggle favorite.' });
    }
  }

  public async list(req: Request, res: Response): Promise<Response> {
    const { walletAddress } = req.params;

    const favoriteService = new FavoriteService();
    const favoriteIds = await favoriteService.list(walletAddress);

    return res.status(200).json(favoriteIds);
  }
}

export default FavoriteController;