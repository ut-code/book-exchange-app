START TRANSACTION;
-- ユーザーの挿入
INSERT INTO "User" (id, name, email, password)
VALUES (
    '9f334c9b-79bc-4137-aece-6eec3409bf9f',
    'Alice',
    'alice@prisma.io',
    'password'
  ),
  (
    '292f9785-32a0-4ca9-aa02-e568d75a6625',
    'Nilu',
    'nilu@prisma.io',
    'password'
  ),
  (
    '797cdbcb-cbf5-4d49-a40a-0f4ce8273e14',
    'Mahmoud',
    'mahmoud@prisma.io',
    'password'
  );
-- -- Alice の投稿の挿入
-- INSERT INTO posts (title, content, published, userId)
-- VALUES (
--     'Join the Prisma Slack',
--     'https://slack.prisma.io',
--     true,
--     1
--   );
-- -- Nilu の投稿の挿入
-- INSERT INTO posts (title, content, published, viewCount, userId)
-- VALUES (
--     'Follow Prisma on Twitter',
--     'https://www.twitter.com/prisma',
--     true,
--     42,
--     2
--   );
-- -- Mahmoud の投稿の挿入
-- INSERT INTO posts (title, content, published, viewCount, userId)
-- VALUES (
--     'Ask a question about Prisma on GitHub',
--     'https://www.github.com/prisma/prisma/discussions',
--     true,
--     128,
--     3
--   ),
--   (
--     'Prisma on YouTube',
--     'https://pris.ly/youtube',
--     false,
--     null,
--     3
--   );
COMMIT;