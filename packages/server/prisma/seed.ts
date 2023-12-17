import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.create({
    data: {
      username: 'user1',
      password: 'password1',
      hashedPassword: 'hashedPassword1',
      books: {
        create: [
          {
            title: 'Book1',
            description: 'Description1',
          },
          {
            title: 'Book2',
            description: 'Description2',
          },
        ],
      },
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: 'user2',
      password: 'password2',
      hashedPassword: 'hashedPassword2',
      books: {
        create: [
          {
            title: 'Book3',
            description: 'Description3',
          },
          {
            title: 'Book4',
            description: 'Description4',
          },
        ],
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
