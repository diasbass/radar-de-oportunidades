import { Request, Response, NextFunction } from 'express';
import { PrismaClient, SubscriptionStatus } from '@prisma/client';

const prisma = new PrismaClient();

export const isProSubscriber = async (req: Request, res: Response, next: NextFunction) => {
  // O walletAddress pode vir do corpo (para POST) ou dos parâmetros (para GET)
  const walletAddress = req.body.walletAddress || req.params.walletAddress;

  if (!walletAddress) {
    return res.status(400).json({ message: 'Wallet address is required.' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { walletAddress },
    });

    // Se o usuário não for encontrado ou não for PRO, bloqueia o acesso.
    if (!user || user.subscriptionStatus !== SubscriptionStatus.PRO) {
      return res.status(403).json({ message: 'Forbidden: PRO subscription required.' });
    }

    // Se for PRO, deixa a requisição continuar para o controller.
    next();
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error.' });
  }
};