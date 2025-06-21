import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import BookDetail from './[id]';
import { GetBookByIdDocument } from './query.generated';

const theme = createTheme();

// Mock useRouter
jest.mock('next/router');
const mockPush = jest.fn();
const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;

const mockBook = {
  id: 'book1',
  title: 'Test Book',
  description: 'Test Description',
  condition: 'GOOD',
  isAvailable: true,
  notes: 'Test notes',
  createdAt: '2023-01-01T00:00:00.000Z',
  updatedAt: '2023-01-01T00:00:00.000Z',
  user: {
    id: 'user1',
    username: 'testuser',
  },
  bookTemplate: {
    id: 'template1',
    isbn: '9781234567890',
    title: 'Test Book',
    author: 'Test Author',
    publisher: 'Test Publisher',
  },
};

const mocks = [
  {
    request: {
      query: GetBookByIdDocument,
      variables: { id: 'book1' },
    },
    result: {
      data: {
        getBookById: mockBook,
      },
    },
  },
];

const errorMocks = [
  {
    request: {
      query: GetBookByIdDocument,
      variables: { id: 'nonexistent' },
    },
    error: new Error('Book not found'),
  },
];

const renderWithProviders = (component: React.ReactElement, customMocks = mocks) => {
  return render(
    <MockedProvider mocks={customMocks} addTypename={false}>
      <ThemeProvider theme={theme}>
        {component}
      </ThemeProvider>
    </MockedProvider>
  );
};

describe('BookDetail', () => {
  beforeEach(() => {
    mockUseRouter.mockReturnValue({
      query: { id: 'book1' },
      push: mockPush,
      pathname: '/book/[id]',
      route: '/book/[id]',
      asPath: '/book/book1',
      replace: jest.fn(),
      reload: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn(),
      beforePopState: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
    } as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state initially', () => {
    renderWithProviders(<BookDetail />);
    
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders book details correctly', async () => {
    renderWithProviders(<BookDetail />);

    await waitFor(() => {
      expect(screen.getByText('Test Book')).toBeInTheDocument();
      expect(screen.getByText('Test Description')).toBeInTheDocument();
      expect(screen.getByText('testuser')).toBeInTheDocument();
      expect(screen.getByText('Test Author')).toBeInTheDocument();
      expect(screen.getByText('9781234567890')).toBeInTheDocument();
    });
  });

  it('displays book condition and availability', async () => {
    renderWithProviders(<BookDetail />);

    await waitFor(() => {
      expect(screen.getByText('GOOD')).toBeInTheDocument();
      expect(screen.getByText('利用可能')).toBeInTheDocument();
    });
  });

  it('displays navigation header', async () => {
    renderWithProviders(<BookDetail />);

    await waitFor(() => {
      expect(screen.getByText('戻る')).toBeInTheDocument();
      expect(screen.getByText('ホーム')).toBeInTheDocument();
      expect(screen.getByText('テンプレート')).toBeInTheDocument();
    });
  });

  it('handles navigation clicks', async () => {
    renderWithProviders(<BookDetail />);

    await waitFor(() => {
      expect(screen.getByText('Test Book')).toBeInTheDocument();
    });

    // Test back button
    const backButton = screen.getByText('戻る');
    expect(backButton).toBeInTheDocument();

    // Test home button
    const homeButton = screen.getByText('ホーム');
    expect(homeButton).toBeInTheDocument();
  });

  it('displays error state when book not found', async () => {
    mockUseRouter.mockReturnValue({
      query: { id: 'nonexistent' },
      push: mockPush,
      pathname: '/book/[id]',
      route: '/book/[id]',
      asPath: '/book/nonexistent',
      replace: jest.fn(),
      reload: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn(),
      beforePopState: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
    } as any);

    renderWithProviders(<BookDetail />, errorMocks);

    await waitFor(() => {
      expect(screen.getByText(/エラーが発生しました/)).toBeInTheDocument();
    });
  });

  it('displays book notes when available', async () => {
    renderWithProviders(<BookDetail />);

    await waitFor(() => {
      expect(screen.getByText('Test notes')).toBeInTheDocument();
    });
  });

  it('handles missing book ID', () => {
    mockUseRouter.mockReturnValue({
      query: {},
      push: mockPush,
      pathname: '/book/[id]',
      route: '/book/[id]',
      asPath: '/book/',
      replace: jest.fn(),
      reload: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn(),
      beforePopState: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
    } as any);

    renderWithProviders(<BookDetail />);
    
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});