import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class FavoriteService {
  // NOVO MÉTODO para encontrar um favorito específico
  public async find(userId: string, opportunityId: string) {
    return prisma.favorite.findUnique({
      where: {
        userId_opportunityId: {
          userId,
          opportunityId,
        },
      },
    });
  }

  public async create(userId: string, opportunityId: string) {
    return prisma.favorite.create({
      data: { userId, opportunityId },
    });
  }

  public async list(walletAddress: string) {
    const favorites = await prisma.favorite.findMany({
      where: { user: { walletAddress } },
      select: { opportunityId: true },
    });
    return favorites.map(f => f.opportunityId);
  }

  public async delete(userId: string, opportunityId: string) {
    return prisma.favorite.delete({
      where: {
        userId_opportunityId: {
          userId,
          opportunityId,
        },
      },
    });
  }
}
export default FavoriteService;