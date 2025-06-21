import { PrismaService } from '../services/prisma/prisma.service';
import { GoogleBooksService } from '../services/google-books/google-books.service';
import { randomUUID } from 'crypto';

async function populateBookTemplates() {
  const prisma = new PrismaService();
  const googleBooksService = new GoogleBooksService();

  // Some popular Japanese books for testing
  const testISBNs = [
    '9784167158057', // ノルウェイの森 (村上春樹)
    '9784101001616', // こころ (夏目漱石)
    '9784062748476', // 君の名は。 (新海誠)
    '9784041026397', // 火花 (又吉直樹)
    '9784167110178', // 1Q84 (村上春樹)
  ];

  console.log('Starting to populate book templates...');

  for (const isbn of testISBNs) {
    try {
      // Check if already exists
      const existing = await prisma.bookTemplate.findUnique({
        where: { isbn },
      });

      if (existing) {
        console.log(`Book template already exists for ISBN: ${isbn}`);
        continue;
      }

      // Fetch book info from Google Books API
      const bookInfo = await googleBooksService.searchByIsbn(isbn);
      
      if (!bookInfo) {
        console.log(`Could not find book info for ISBN: ${isbn}`);
        continue;
      }

      // Create book template
      const bookTemplate = await prisma.bookTemplate.create({
        data: {
          id: randomUUID(),
          isbn: isbn,
          title: bookInfo.title,
          author: bookInfo.authors?.join(', ') || null,
          publisher: bookInfo.publisher || null,
          publishedDate: bookInfo.publishedDate || null,
          pageCount: bookInfo.pageCount || null,
          language: bookInfo.language || null,
          categories: bookInfo.categories || [],
          imageUrl: bookInfo.imageLinks?.thumbnail || null,
          infoLink: bookInfo.infoLink || null,
          description: bookInfo.description || '',
        },
      });

      console.log(`Created book template: ${bookTemplate.title} (${isbn})`);

      // Rate limiting to avoid hitting API limits
      await new Promise(resolve => setTimeout(resolve, 200));
    } catch (error) {
      console.error(`Error processing ISBN ${isbn}:`, error);
    }
  }

  console.log('Finished populating book templates.');
  await prisma.$disconnect();
}

populateBookTemplates().catch(console.error);