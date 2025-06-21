/**
 * Quick Population Script for BookTemplate
 * 
 * 素早くテスト用の本データを追加するためのシンプルなスクリプト
 */

import { PrismaService } from '../services/prisma/prisma.service';
import { GoogleBooksService } from '../services/google-books/google-books.service';
import { randomUUID } from 'crypto';

// 最小限の人気書籍リスト（テスト用）
const QUICK_TEST_ISBNS = [
  '9784167158057', // ノルウェイの森（村上春樹）
  '9784062639378', // 容疑者Xの献身（東野圭吾）
  '9784041026397', // 火花（又吉直樹）
  '9784799107713', // 嫌われる勇気
  '9784297110895', // リーダブルコード
  '9784088771090', // ONE PIECE 1巻
  '9784004140610', // 哲学入門（岩波新書）
  '9784054066687', // 料理の基本
  '9784398144133', // 地球の歩き方 日本
  '9784062748476', // 君の名は。（新海誠）
];

async function quickPopulate() {
  console.log('🚀 Quick Book Population Script Started');
  console.log(`📚 Adding ${QUICK_TEST_ISBNS.length} popular books to database...`);

  const prisma = new PrismaService();
  const googleBooksService = new GoogleBooksService();

  let added = 0;
  let skipped = 0;
  let errors = 0;

  try {
    for (const isbn of QUICK_TEST_ISBNS) {
      try {
        console.log(`🔍 Processing: ${isbn}`);

        // 既存チェック
        const existing = await prisma.bookTemplate.findUnique({
          where: { isbn }
        });

        if (existing) {
          console.log(`  📚 Already exists: ${existing.title}`);
          skipped++;
          continue;
        }

        // Google Books APIで詳細取得
        const bookInfo = await googleBooksService.searchByIsbn(isbn);
        
        if (!bookInfo) {
          console.log(`  ⚠️ Not found: ${isbn}`);
          errors++;
          continue;
        }

        // BookTemplateを作成
        const bookTemplate = await prisma.bookTemplate.create({
          data: {
            id: randomUUID(),
            isbn: isbn,
            title: bookInfo.title,
            author: bookInfo.authors?.join(', ') || null,
            publisher: bookInfo.publisher || null,
            publishedDate: bookInfo.publishedDate || null,
            pageCount: bookInfo.pageCount || null,
            language: bookInfo.language || 'ja',
            categories: bookInfo.categories || [],
            imageUrl: bookInfo.imageLinks?.thumbnail || null,
            infoLink: bookInfo.infoLink || null,
            description: bookInfo.description || '',
          },
        });

        console.log(`  ✨ Added: ${bookTemplate.title}`);
        added++;

        // レート制限対応（短い間隔）
        await new Promise(resolve => setTimeout(resolve, 150));

      } catch (error) {
        console.error(`  ❌ Error processing ${isbn}:`, error.message);
        errors++;
      }
    }

    console.log('\n📊 Quick Population Results:');
    console.log(`✅ Successfully added: ${added} books`);
    console.log(`⏭️ Skipped (already exists): ${skipped} books`);
    console.log(`❌ Errors: ${errors} books`);
    console.log(`📈 Success rate: ${(added / QUICK_TEST_ISBNS.length * 100).toFixed(1)}%`);

    if (added > 0) {
      console.log('\n🎉 Books are now available in the BookTemplate database!');
      console.log('   You can view them at: http://localhost:3002/book/templates');
    }

  } catch (error) {
    console.error('💥 Fatal error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// 直接実行時にメイン関数を呼び出し
if (require.main === module) {
  quickPopulate().catch(console.error);
}

export { quickPopulate };