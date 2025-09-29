import { Request, Response } from 'express';
import { z } from 'zod';
import UserService from '../services/UserService';

const userSchema = z.object({
  walletAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/), // Valida se é um endereço Ethereum
});

const updateEmailSchema = z.object({ email: z.string().email() });

class UserController {
  public async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { walletAddress } = userSchema.parse(req.body);
      const userService = new UserService();
      const user = await userService.findOrCreate(walletAddress);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({ message: 'Invalid request body' });
    }
  }

   public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { walletAddress } = req.params;
      const { email } = updateEmailSchema.parse(req.body);

      const userService = new UserService();
      const updatedUser = await userService.updateEmail(walletAddress, email);

      return res.status(200).json(updatedUser);
    } catch (error) {
      return res.status(400).json({ message: 'Invalid data' });
    }
  }
}
export default UserController;