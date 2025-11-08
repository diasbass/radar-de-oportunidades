// packages/backend/src/middleware/authMiddleware.ts

import { Request, Response, NextFunction } from 'express';
import { PrismaClient, SubscriptionStatus } from '@prisma/client';

const prisma = new PrismaClient();

export const isProSubscriber = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // O walletAddress pode vir do corpo (para POST) ou dos parâmetros (para GET)
  const walletAddress = (req.body.walletAddress ||
    req.params.walletAddress) as string;

  if (!walletAddress) {
    return res.status(400).json({ message: 'Wallet address is required.' });
  }

  try {
    //
    // --- A CORREÇÃO CRÍTICA ESTÁ AQUI ---
    // Sempre normalize o endereço para letras minúsculas antes de consultar o banco.
    //
    const user = await prisma.user.findUnique({
      where: { walletAddress: walletAddress.toLowerCase() },
    });

    // Se o usuário não for encontrado ou não for PRO, bloqueia o acesso.
    // (Sua lógica aqui usando o Enum 'SubscriptionStatus.PRO' está correta)
    if (!user || user.subscriptionStatus !== SubscriptionStatus.PRO) {
      return res
        .status(403)
        .json({ message: 'Forbidden: PRO subscription required.' });
    }

    // Boa prática: Anexe o objeto do usuário ao 'req' para que os próximos
    // controllers (de alertas, favoritos) possam usá-lo se precisarem.
    (req as any).user = user;

    // Se for PRO, deixa a requisição continuar para o controller.
    next();
  } catch (error) {
    // Adiciona um log de erro mais detalhado no servidor
    console.error('Erro no middleware isProSubscriber:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};