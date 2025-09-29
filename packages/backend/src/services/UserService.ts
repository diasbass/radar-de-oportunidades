import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class UserService {
  public async findOrCreate(walletAddress: string) {
    const user = await prisma.user.upsert({
      where: { walletAddress },
      update: {},
      create: { walletAddress },
    });
    return user;
  }

  // --- NOVO MÉTODO ADICIONADO ---
  public async updateEmail(walletAddress: string, email: string) {
    return prisma.user.update({
      where: { walletAddress },
      data: { email },
    });
  }
}

export default UserService;