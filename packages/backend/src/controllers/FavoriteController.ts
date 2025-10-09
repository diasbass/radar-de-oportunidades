import { Request, Response } from 'express';
import { z } from 'zod';
import FavoriteService from '../services/FavoriteService';
import UserService from '../services/UserService'; // Precisamos para encontrar o usuário

const createFavoriteSchema = z.object({
  walletAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  opportunityId: z.string(),
});

class FavoriteController {
  public async toggle(req: Request, res: Response): Promise<Response> {
    try {
      const { walletAddress, opportunityId } = favoriteSchema.parse(req.body);
      
      const userService = new UserService();
      const user = await userService.findOrCreate(walletAddress);

      const favoriteService = new FavoriteService();
      const existingFavorite = await favoriteService.find(user.id, opportunityId);

      if (existingFavorite) {
        await favoriteService.delete(user.id, opportunityId);
        return res.status(200).json({ status: 'removed' });
      } else {
        await favoriteService.create(user.id, opportunityId);
        return res.status(201).json({ status: 'created' });
      }
    } catch (error: any) {
      console.error("Error toggling favorite:", error);
      return res.status(500).json({ message: 'Failed to toggle favorite.' });
    }
  }
  
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { walletAddress, opportunityId } = createFavoriteSchema.parse(req.body);

      const userService = new UserService();
      const user = await userService.findOrCreate(walletAddress);

      const favoriteService = new FavoriteService();
      const favorite = await favoriteService.create(user.id, opportunityId);

      return res.status(201).json(favorite);
    } catch (error) {
      // Pode dar erro se o favorito já existir, o que é ok.
      return res.status(409).json({ message: 'Favorite already exists or invalid data.' });
    }
  }

  public async list(req: Request, res: Response): Promise<Response> {
    const { walletAddress } = req.params;

    const favoriteService = new FavoriteService();
    const favoriteIds = await favoriteService.list(walletAddress);

    return res.status(200).json(favoriteIds);
  }

  // reusamos o mesmo schema, pois os dados necessários são os mesmos
public async delete(req: Request, res: Response): Promise<Response> {
  try {
    const { walletAddress, opportunityId } = createFavoriteSchema.parse(req.body);

    const userService = new UserService();
    // Usamos findOrCreate aqui por segurança, caso o usuário não esteja logado no nosso DB ainda
    const user = await userService.findOrCreate(walletAddress);

    const favoriteService = new FavoriteService();
    await favoriteService.delete(user.id, opportunityId);

    // 204 No Content é a resposta padrão para um delete bem-sucedido
    return res.status(204).send();
  } catch (error) {
    return res.status(400).json({ message: 'Invalid data or favorite not found.' });
  }
}
}
export default FavoriteController;