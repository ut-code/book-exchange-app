import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    username: 'kokhayas',
    password: 'password',
    hashedPassword:
      '$2b$10$ZycpRV/qvfUg5DHbqSGN.O.LFrNGJ6N.onK7NAZraKQjMjtctMAV.',
    posts: {
      create: [
        {
          title: 'Join us for Prisma Day 2020',
          content: 'https://www.prisma.io/day/',
          published: true,
          viewCount: 100,
        },
        {
          title: 'Subscribe to GraphQL Weekly for community news',
          content: 'https://graphqlweekly.com/',
          published: true,
          viewCount: 200,
        },
      ],
    },
  },
  {
    username: 'sato',
    password: 'password1234',
    hashedPassword:
      '$2b$10$Jo4A2GxN/OEQIlSq3bUIjuAkU1y8lo4Mm2Ur4vepq2HZMhzp4qDMG',
    posts: {
      create: [
        {
          title: 'Join us for GraphQL Conf 2019 in Berlin',
          content: 'https://www.graphqlconf.org/',
          published: true,
          viewCount: 100,
        },
      ],
    },
  },
  {
    username: 'satoshi nakamoto',
    password: '1234',
    hashedPassword:
      '$2b$10$99Xd63PX2llHQDi4rxio4uYEnss8yYfkfW.6UsetiUBFXRS0BOSxC',
    posts: {
      create: [
        {
          title: 'Subscribe to GraphQL Weekly for community news',
          content: 'https://graphqlweekly.com/',
          published: true,
          viewCount: 200,
        },
        {
          title: 'Follow DigitalOcean on Twitter',
          content: 'https://twitter.com/digitalocean',
          published: false,
          viewCount: 300,
        },
      ],
    },
  },
  {
    username: 'richard',
    password: 'qwerty',
    hashedPassword:
      '$2b$10$NOqfCymbLX0FbMAkYuZn2u58A0k8WK2BoH.6za4D6nQeV3O.dqJHy',
    posts: {
      create: [
        {
          title: 'Follow me on Twitter (kokhong)',
          content: 'https://twitter.com/kokhongw',
          published: true,
          viewCount: 400,
        },
      ],
    },
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Created user with id: ${user.id}`);
  }
  console.log(`Seeding finished.`);
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
