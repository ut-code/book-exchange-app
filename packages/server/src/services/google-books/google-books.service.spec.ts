import { Test, TestingModule } from '@nestjs/testing';
import { GoogleBooksService } from './google-books.service';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('GoogleBooksService', () => {
  let service: GoogleBooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoogleBooksService],
    }).compile();

    service = module.get<GoogleBooksService>(GoogleBooksService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('searchByIsbn', () => {
    it('should return book info for valid ISBN', async () => {
      const mockResponse = {
        data: {
          totalItems: 1,
          items: [
            {
              volumeInfo: {
                title: 'Test Book',
                authors: ['Test Author'],
                publisher: 'Test Publisher',
                publishedDate: '2023-01-01',
                description: 'Test Description',
                pageCount: 200,
                categories: ['Fiction'],
                imageLinks: { thumbnail: 'http://example.com/image.jpg' },
                language: 'ja',
                infoLink: 'http://example.com/info',
                industryIdentifiers: [{ type: 'ISBN_13', identifier: '9781234567890' }],
              },
            },
          ],
        },
      };

      mockedAxios.get.mockResolvedValue({
        ...mockResponse,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      } as any);

      const result = await service.searchByIsbn('9781234567890');

      expect(result).toEqual({
        title: 'Test Book',
        authors: ['Test Author'],
        publisher: 'Test Publisher',
        publishedDate: '2023-01-01',
        description: 'Test Description',
        pageCount: 200,
        categories: ['Fiction'],
        imageLinks: { thumbnail: 'http://example.com/image.jpg' },
        language: 'ja',
        infoLink: 'http://example.com/info',
        industryIdentifiers: [{ type: 'ISBN_13', identifier: '9781234567890' }],
      });

      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://www.googleapis.com/books/v1/volumes?q=isbn:9781234567890',
        {
          timeout: 10000,
          headers: {
            'User-Agent': 'BookExchangeApp/1.0'
          }
        }
      );
    });

    it('should return null when no books found', async () => {
      const mockResponse = {
        data: {
          totalItems: 0,
          items: null,
        },
      };

      mockedAxios.get.mockResolvedValue({
        ...mockResponse,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      } as any);

      const result = await service.searchByIsbn('9999999999999');

      expect(result).toBeNull();
    });

    it('should clean ISBN with hyphens and spaces', async () => {
      const mockResponse = {
        data: {
          totalItems: 1,
          items: [
            {
              volumeInfo: {
                title: 'Test Book',
                authors: ['Test Author'],
              },
            },
          ],
        },
      };

      mockedAxios.get.mockResolvedValue({
        ...mockResponse,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      } as any);

      await service.searchByIsbn('978-1-234-56789-0');

      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://www.googleapis.com/books/v1/volumes?q=isbn:9781234567890',
        expect.any(Object)
      );
    });

    it('should throw error for empty ISBN', async () => {
      await expect(service.searchByIsbn('')).rejects.toThrow('ISBN is required');
      await expect(service.searchByIsbn('   ')).rejects.toThrow('ISBN is required');
    });

    it('should throw error for invalid ISBN length', async () => {
      await expect(service.searchByIsbn('123')).rejects.toThrow(
        'Invalid ISBN format. ISBN must be 10 or 13 digits'
      );
      await expect(service.searchByIsbn('12345678901234')).rejects.toThrow(
        'Invalid ISBN format. ISBN must be 10 or 13 digits'
      );
    });

    it('should handle 400 error from API', async () => {
      mockedAxios.get.mockRejectedValue({
        response: { status: 400 },
      });

      await expect(service.searchByIsbn('9781234567890')).rejects.toThrow(
        'Invalid ISBN format or request'
      );
    });

    it('should handle 403 error from API', async () => {
      mockedAxios.get.mockRejectedValue({
        response: { status: 403 },
      });

      await expect(service.searchByIsbn('9781234567890')).rejects.toThrow(
        'Google Books API quota exceeded'
      );
    });

    it('should handle 429 error from API', async () => {
      mockedAxios.get.mockRejectedValue({
        response: { status: 429 },
      });

      await expect(service.searchByIsbn('9781234567890')).rejects.toThrow(
        'Too many requests to Google Books API'
      );
    });

    it('should handle timeout error', async () => {
      mockedAxios.get.mockRejectedValue({
        code: 'ECONNABORTED',
      });

      await expect(service.searchByIsbn('9781234567890')).rejects.toThrow(
        'Request timeout - Google Books API is slow'
      );
    });

    it('should handle network errors', async () => {
      mockedAxios.get.mockRejectedValue({
        code: 'ENOTFOUND',
      });

      await expect(service.searchByIsbn('9781234567890')).rejects.toThrow(
        'Network error - Cannot connect to Google Books API'
      );
    });

    it('should handle general API errors', async () => {
      mockedAxios.get.mockRejectedValue(new Error('Unknown error'));

      await expect(service.searchByIsbn('9781234567890')).rejects.toThrow(
        'Failed to fetch book information from Google Books API'
      );
    });

    it('should handle missing title in response', async () => {
      const mockResponse = {
        data: {
          totalItems: 1,
          items: [
            {
              volumeInfo: {
                authors: ['Test Author'],
              },
            },
          ],
        },
      };

      mockedAxios.get.mockResolvedValue({
        ...mockResponse,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      } as any);

      const result = await service.searchByIsbn('9781234567890');

      expect(result.title).toBe('');
    });

    it('should handle missing optional fields in response', async () => {
      const mockResponse = {
        data: {
          totalItems: 1,
          items: [
            {
              volumeInfo: {
                title: 'Test Book',
              },
            },
          ],
        },
      };

      mockedAxios.get.mockResolvedValue({
        ...mockResponse,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      } as any);

      const result = await service.searchByIsbn('9781234567890');

      expect(result).toEqual({
        title: 'Test Book',
        authors: [],
        publisher: undefined,
        publishedDate: undefined,
        description: undefined,
        pageCount: undefined,
        categories: undefined,
        imageLinks: undefined,
        language: undefined,
        infoLink: undefined,
        industryIdentifiers: undefined,
      });
    });

    it('should accept valid 10-digit ISBN', async () => {
      const mockResponse = {
        data: {
          totalItems: 1,
          items: [
            {
              volumeInfo: {
                title: 'Test Book',
              },
            },
          ],
        },
      };

      mockedAxios.get.mockResolvedValue({
        ...mockResponse,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      } as any);

      await service.searchByIsbn('1234567890');

      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://www.googleapis.com/books/v1/volumes?q=isbn:1234567890',
        expect.any(Object)
      );
    });

    it('should accept valid 13-digit ISBN', async () => {
      const mockResponse = {
        data: {
          totalItems: 1,
          items: [
            {
              volumeInfo: {
                title: 'Test Book',
              },
            },
          ],
        },
      };

      mockedAxios.get.mockResolvedValue({
        ...mockResponse,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      } as any);

      await service.searchByIsbn('9781234567890');

      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://www.googleapis.com/books/v1/volumes?q=isbn:9781234567890',
        expect.any(Object)
      );
    });
  });
});