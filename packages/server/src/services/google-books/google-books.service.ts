import { Injectable } from '@nestjs/common';
import axios from 'axios';

export interface GoogleBookInfo {
  title: string;
  authors?: string[];
  publisher?: string;
  publishedDate?: string;
  description?: string;
  pageCount?: number;
  categories?: string[];
  imageLinks?: {
    thumbnail?: string;
  };
  language?: string;
  infoLink?: string;
  industryIdentifiers?: {
    type: string;
    identifier: string;
  }[];
}

export interface GoogleBooksApiResponse {
  kind: string;
  totalItems: number;
  items?: {
    kind: string;
    id: string;
    etag: string;
    selfLink: string;
    volumeInfo: GoogleBookInfo;
  }[];
}

@Injectable()
export class GoogleBooksService {
  private readonly baseUrl = 'https://www.googleapis.com/books/v1/volumes';

  async searchByIsbn(isbn: string): Promise<GoogleBookInfo | null> {
    try {
      if (!isbn || isbn.trim().length === 0) {
        throw new Error('ISBN is required');
      }

      const cleanIsbn = isbn.replace(/[-\s]/g, '');
      
      if (cleanIsbn.length !== 10 && cleanIsbn.length !== 13) {
        throw new Error('Invalid ISBN format. ISBN must be 10 or 13 digits');
      }

      const response = await axios.get<GoogleBooksApiResponse>(
        `${this.baseUrl}?q=isbn:${cleanIsbn}`,
        {
          timeout: 10000,
          headers: {
            'User-Agent': 'BookExchangeApp/1.0'
          }
        }
      );

      if (response.data.totalItems === 0 || !response.data.items) {
        return null;
      }

      const bookData = response.data.items[0].volumeInfo;
      return this.mapToBookInfo(bookData);
    } catch (error) {
      console.error('Google Books API error:', error);
      
      if (error.response?.status === 400) {
        throw new Error('Invalid ISBN format or request');
      } else if (error.response?.status === 403) {
        throw new Error('Google Books API quota exceeded');
      } else if (error.response?.status === 429) {
        throw new Error('Too many requests to Google Books API');
      } else if (error.code === 'ECONNABORTED') {
        throw new Error('Request timeout - Google Books API is slow');
      } else if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
        throw new Error('Network error - Cannot connect to Google Books API');
      }
      
      throw new Error('Failed to fetch book information from Google Books API');
    }
  }

  private mapToBookInfo(volumeInfo: GoogleBookInfo): GoogleBookInfo {
    return {
      title: volumeInfo.title || '',
      authors: volumeInfo.authors || [],
      publisher: volumeInfo.publisher,
      publishedDate: volumeInfo.publishedDate,
      description: volumeInfo.description,
      pageCount: volumeInfo.pageCount,
      categories: volumeInfo.categories,
      imageLinks: volumeInfo.imageLinks,
      language: volumeInfo.language,
      infoLink: volumeInfo.infoLink,
      industryIdentifiers: volumeInfo.industryIdentifiers,
    };
  }
}