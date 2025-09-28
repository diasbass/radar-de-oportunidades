import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class FavoriteService {
  // Adiciona um favorito
  public async create(userId: string, opportunityId: string) {
    return prisma.favorite.create({
      data: { userId, opportunityId },
    });
  }

  // Lista os favoritos de um usuário
  public async list(walletAddress: string) {
    const favorites = await prisma.favorite.findMany({
      where: { user: { walletAddress } },
      select: { opportunityId: true }, // Só precisamos dos IDs
    });
    return favorites.map(f => f.opportunityId);
  }

  // Deleta um favorito
  public async delete(userId: string, opportunityId: string) {
    return prisma.favorite.delete({
      where: {
        // Esta é a forma do Prisma de encontrar um registro por uma chave única composta
        userId_opportunityId: {
          userId,
          opportunityId,
        },
      },
    });
  }
}
export default FavoriteService;