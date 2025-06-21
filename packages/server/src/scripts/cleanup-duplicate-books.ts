import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function cleanupDuplicateBooks() {
  try {
    console.log('Looking for duplicate book ownership...');

    // Find all books with their userId and bookTemplateId
    const books = await prisma.book.findMany({
      select: {
        id: true,
        userId: true,
        bookTemplateId: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'asc', // Keep the oldest one
      },
    });

    console.log(`Found ${books.length} total books`);

    // Group by userId + bookTemplateId to find duplicates
    const bookGroups = new Map();
    
    for (const book of books) {
      if (!book.bookTemplateId) continue; // Skip books without template
      
      const key = `${book.userId}:${book.bookTemplateId}`;
      if (!bookGroups.has(key)) {
        bookGroups.set(key, []);
      }
      bookGroups.get(key).push(book);
    }

    // Find and delete duplicates (keep the first/oldest one)
    const toDelete = [];
    for (const [key, groupedBooks] of bookGroups) {
      if (groupedBooks.length > 1) {
        console.log(`Found ${groupedBooks.length} duplicates for key: ${key}`);
        // Keep the first (oldest), delete the rest
        for (let i = 1; i < groupedBooks.length; i++) {
          toDelete.push(groupedBooks[i].id);
        }
      }
    }

    console.log(`Will delete ${toDelete.length} duplicate books`);

    if (toDelete.length > 0) {
      const result = await prisma.book.deleteMany({
        where: {
          id: {
            in: toDelete,
          },
        },
      });
      console.log(`Deleted ${result.count} duplicate books`);
    } else {
      console.log('No duplicates found');
    }

  } catch (error) {
    console.error('Error cleaning up duplicates:', error);
  } finally {
    await prisma.$disconnect();
  }
}

cleanupDuplicateBooks();