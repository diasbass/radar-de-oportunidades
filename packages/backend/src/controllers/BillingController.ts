import { Request, Response } from 'express';
import { z } from 'zod';
import BillingService from '../services/BillingService';

const checkoutSchema = z.object({
  walletAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
});

class BillingController {
  public async createCheckoutSession(req: Request, res: Response): Promise<Response> {
    try {
      const { walletAddress } = checkoutSchema.parse(req.body);
      
      const billingService = new BillingService();
      const frontendUrl = req.headers.origin || 'http://localhost:5173';
      const session = await billingService.createCheckoutSession(walletAddress, frontendUrl);

      return res.status(200).json({ url: session.url });

    } catch (error: any) {
      console.error("Error creating checkout session:", error.message);
      return res.status(400).json({ message: error.message || 'Failed to create checkout session.' });
    }
  }

  public async handleWebhook(req: Request, res: Response): Promise<Response> {
    const signature = req.headers['stripe-signature'] as string;
    const billingService = new BillingService();
    try {
      // req.body aqui será um Buffer, graças ao express.raw
      await billingService.handleWebhookEvent(signature, req.body);
      return res.status(200).json({ received: true });
    } catch (error: any) {
      return res.status(400).send(`Webhook Error: ${error.message}`);
    }
  }
}

export default BillingController;