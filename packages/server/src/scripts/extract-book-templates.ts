import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function extractBookTemplates() {
  try {
    const bookTemplates = await prisma.bookTemplate.findMany({
      orderBy: { createdAt: 'asc' }
    });
    
    console.log(`Found ${bookTemplates.length} book templates`);
    
    // Generate TypeScript seed data
    console.log('\n// TypeScript seed data for book templates:');
    console.log('const bookTemplatesData = [');
    
    bookTemplates.forEach(book => {
      console.log(`  {`);
      console.log(`    isbn: '${book.isbn}',`);
      console.log(`    title: ${JSON.stringify(book.title)},`);
      console.log(`    author: ${book.author ? JSON.stringify(book.author) : 'null'},`);
      console.log(`    publisher: ${book.publisher ? JSON.stringify(book.publisher) : 'null'},`);
      console.log(`    publishedDate: ${book.publishedDate ? JSON.stringify(book.publishedDate) : 'null'},`);
      console.log(`    pageCount: ${book.pageCount || 'null'},`);
      console.log(`    language: ${book.language ? JSON.stringify(book.language) : 'null'},`);
      console.log(`    categories: ${JSON.stringify(book.categories)},`);
      console.log(`    imageUrl: ${book.imageUrl ? JSON.stringify(book.imageUrl) : 'null'},`);
      console.log(`    infoLink: ${book.infoLink ? JSON.stringify(book.infoLink) : 'null'},`);
      console.log(`    description: ${book.description ? JSON.stringify(book.description) : 'null'},`);
      console.log(`  },`);
    });
    
    console.log('];');
    
    await prisma.$disconnect();
  } catch (error) {
    console.error('Error:', error);
    await prisma.$disconnect();
  }
}

extractBookTemplates();