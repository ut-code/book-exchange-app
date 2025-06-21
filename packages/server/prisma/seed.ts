import { PrismaClient, BadgeType } from '@prisma/client';
import { randomUUID } from 'crypto';
import { bookTemplatesData } from '../src/data/bookTemplatesData';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.userAchievement.deleteMany();
  await prisma.achievementBadge.deleteMany();
  await prisma.exchangeHistory.deleteMany();
  await prisma.book.deleteMany();
  await prisma.bookTemplate.deleteMany();
  await prisma.user.deleteMany();
  
  console.log('Deleted existing data');

  // Seed book templates
  console.log('Seeding book templates...');
  for (const bookData of bookTemplatesData) {
    await prisma.bookTemplate.create({
      data: {
        id: randomUUID(),
        ...bookData,
      },
    });
  }
  console.log(`Created ${bookTemplatesData.length} book templates`);

  const hashedPassword1 = await bcrypt.hash('password1', 10);
  const user1 = await prisma.user.create({
    data: {
      id: randomUUID(),
      username: 'user1',
      password: 'password1',
      hashedPassword: hashedPassword1,
      books: {
        create: [
          {
            id: randomUUID(),
            title: 'Book1',
            description: 'Description1',
          },
          {
            id: randomUUID(),
            title: 'Book2',
            description: 'Description2',
          },
        ],
      },
    },
  });

  console.log('Created user1 with books');

  const hashedPassword2 = await bcrypt.hash('password2', 10);
  const user2 = await prisma.user.create({
    data: {
      id: randomUUID(),
      username: 'user2',
      password: 'password2',
      hashedPassword: hashedPassword2,
      books: {
        create: [
          {
            id: randomUUID(),
            title: 'Book3',
            description: 'Description3',
          },
          {
            id: randomUUID(),
            title: 'Book4',
            description: 'Description4',
          },
        ],
      },
    },
  });

  console.log('Created user2 with books');

  // Seed achievement badges
  console.log('Seeding achievement badges...');
  const badges = [
    {
      type: BadgeType.FIRST_EXCHANGE,
      name: '初回交換',
      description: '最初の本交換を完了しました',
      iconUrl: '/badges/first-exchange.png',
    },
    {
      type: BadgeType.FIVE_EXCHANGES,
      name: '交換マスター',
      description: '5回の本交換を完了しました',
      iconUrl: '/badges/five-exchanges.png',
    },
    {
      type: BadgeType.TEN_EXCHANGES,
      name: '交換エキスパート',
      description: '10回の本交換を完了しました',
      iconUrl: '/badges/ten-exchanges.png',
    },
    {
      type: BadgeType.TWENTY_FIVE_EXCHANGES,
      name: '交換チャンピオン',
      description: '25回の本交換を完了しました',
      iconUrl: '/badges/twenty-five-exchanges.png',
    },
    {
      type: BadgeType.FIFTY_EXCHANGES,
      name: '交換ヒーロー',
      description: '50回の本交換を完了しました',
      iconUrl: '/badges/fifty-exchanges.png',
    },
    {
      type: BadgeType.HUNDRED_EXCHANGES,
      name: '交換レジェンド',
      description: '100回の本交換を完了しました',
      iconUrl: '/badges/hundred-exchanges.png',
    },
    {
      type: BadgeType.PERFECT_RATING,
      name: '完璧な評価',
      description: '5.0の信頼スコアを維持しています',
      iconUrl: '/badges/perfect-rating.png',
    },
    {
      type: BadgeType.HELPFUL_REVIEWER,
      name: '親切なレビュアー',
      description: '10件のレビューを投稿しました',
      iconUrl: '/badges/helpful-reviewer.png',
    },
    {
      type: BadgeType.BOOK_COLLECTOR,
      name: 'ブックコレクター',
      description: '20冊以上の本を登録しました',
      iconUrl: '/badges/book-collector.png',
    },
    {
      type: BadgeType.EARLY_ADOPTER,
      name: 'アーリーアダプター',
      description: 'サービス開始初期からのユーザーです',
      iconUrl: '/badges/early-adopter.png',
    },
    {
      type: BadgeType.COMMUNITY_HELPER,
      name: 'コミュニティヘルパー',
      description: 'コミュニティに積極的に貢献しています',
      iconUrl: '/badges/community-helper.png',
    },
  ];

  for (const badgeData of badges) {
    await prisma.achievementBadge.create({
      data: {
        id: randomUUID(),
        ...badgeData,
      },
    });
  }

  console.log(`Created ${badges.length} achievement badges`);

  // Award some sample achievements to user1
  const firstExchangeBadge = await prisma.achievementBadge.findFirst({
    where: { type: BadgeType.FIRST_EXCHANGE },
  });

  const bookCollectorBadge = await prisma.achievementBadge.findFirst({
    where: { type: BadgeType.BOOK_COLLECTOR },
  });

  if (firstExchangeBadge) {
    await prisma.userAchievement.create({
      data: {
        id: randomUUID(),
        userId: user1.id,
        badgeId: firstExchangeBadge.id,
      },
    });
  }

  if (bookCollectorBadge) {
    await prisma.userAchievement.create({
      data: {
        id: randomUUID(),
        userId: user2.id,
        badgeId: bookCollectorBadge.id,
      },
    });
  }

  console.log('Awarded sample achievements');
  console.log('Seed completed successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
