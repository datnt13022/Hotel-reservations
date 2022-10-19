import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt'

import { encodePassword } from '@src/utils/password';
const prisma = new PrismaClient();
async function main() {
  const salt: string = bcrypt.genSaltSync(10)
  const hash =   bcrypt.hashSync("123123", salt)
  await prisma.user.upsert({
    where: { email: 'datnt13022@gmail.com' },
    create: {
      email: 'datnt13022@gmail.com',
      role: 0,
      hash,
    },
    update: {},
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
