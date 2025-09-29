import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class AlertService {
  // Cria um novo alerta
  public async create(userId: string, opportunityId: string, targetApy: number) {
    return prisma.alert.create({
      data: {
        userId,
        opportunityId,
        targetApy,
      },
    });
  }

  // Lista todos os alertas de um usuário específico
  public async list(userId: string) {
    return prisma.alert.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  // Deleta um alerta
  // Garantimos que o usuário só pode deletar o próprio alerta
  public async delete(userId: string, alertId: string) {
    return prisma.alert.deleteMany({
      where: {
        id: alertId,
        userId: userId, // Condição de segurança
      },
    });
  }
}

export default AlertService;