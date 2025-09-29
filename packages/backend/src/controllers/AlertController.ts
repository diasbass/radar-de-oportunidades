import { Request, Response } from 'express';
import { z } from 'zod';
import AlertService from '../services/AlertService';
import UserService from '../services/UserService';

const createAlertSchema = z.object({
  walletAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  opportunityId: z.string(),
  targetApy: z.number().min(0).max(100),
});

const deleteAlertSchema = z.object({
  walletAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
});

class AlertController {
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { walletAddress, opportunityId, targetApy } = createAlertSchema.parse(req.body);

      const userService = new UserService();
      const user = await userService.findOrCreate(walletAddress);

      const alertService = new AlertService();
      const alert = await alertService.create(user.id, opportunityId, targetApy);

      return res.status(201).json(alert);
    } catch (error) {
      // Pode dar erro se o alerta já existir (chave única)
      return res.status(409).json({ message: 'Alert already exists or invalid data.' });
    }
  }

  public async list(req: Request, res: Response): Promise<Response> {
    try {
      const { walletAddress } = req.params;

      const userService = new UserService();
      const user = await userService.findOrCreate(walletAddress);

      const alertService = new AlertService();
      const alerts = await alertService.list(user.id);

      return res.status(200).json(alerts);
    } catch (error) {
       return res.status(400).json({ message: 'Invalid wallet address.' });
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id: alertId } = req.params;
      const { walletAddress } = deleteAlertSchema.parse(req.body);

      const userService = new UserService();
      const user = await userService.findOrCreate(walletAddress);

      const alertService = new AlertService();
      await alertService.delete(user.id, alertId);

      return res.status(204).send();
    } catch (error) {
      return res.status(400).json({ message: 'Invalid data or alert not found.' });
    }
  }
}

export default AlertController;