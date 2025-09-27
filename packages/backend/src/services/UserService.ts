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
}
export default UserService;