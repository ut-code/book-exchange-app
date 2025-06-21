import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import AdminDashboard from './index';
import { GetAdminStatsDocument } from './query.generated';

const theme = createTheme();

const mockAdminStats = {
  totalUsers: 100,
  totalBooks: 250,
  totalBookTemplates: 50,
  totalExchanges: 30,
  totalReviews: 15,
  totalTrustReviews: 25,
  activeUsers: 80,
  recentUsers: [
    {
      id: 'user1',
      username: 'testuser1',
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z',
      trustScore: 4.5,
      bookCount: 5,
      reviewCount: 3,
    },
  ],
  recentBooks: [
    {
      id: 'book1',
      title: 'Test Book',
      description: 'Test Description',
      condition: 'GOOD',
      isAvailable: true,
      createdAt: '2023-01-01T00:00:00.000Z',
      user: {
        id: 'user1',
        username: 'testuser1',
      },
    },
  ],
  recentBookTemplates: [
    {
      id: 'template1',
      isbn: '9781234567890',
      title: 'Template Book',
      author: 'Test Author',
      publisher: 'Test Publisher',
      createdAt: '2023-01-01T00:00:00.000Z',
      bookCount: 2,
    },
  ],
};

const mocks = [
  {
    request: {
      query: GetAdminStatsDocument,
    },
    result: {
      data: {
        getAdminStats: mockAdminStats,
      },
    },
  },
];

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <ThemeProvider theme={theme}>
        {component}
      </ThemeProvider>
    </MockedProvider>
  );
};

describe('AdminDashboard', () => {
  it('renders admin dashboard correctly', async () => {
    renderWithProviders(<AdminDashboard />);

    expect(screen.getByText('管理画面')).toBeInTheDocument();
    expect(screen.getByText('本交換アプリケーションの管理コンソール')).toBeInTheDocument();
  });

  it('displays loading state initially', () => {
    renderWithProviders(<AdminDashboard />);
    
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('displays admin stats after loading', async () => {
    renderWithProviders(<AdminDashboard />);

    await waitFor(() => {
      expect(screen.getByText('100')).toBeInTheDocument(); // totalUsers
      expect(screen.getByText('250')).toBeInTheDocument(); // totalBooks
    });
  });

  it('switches between tabs correctly', async () => {
    renderWithProviders(<AdminDashboard />);

    await waitFor(() => {
      expect(screen.getByText('100')).toBeInTheDocument();
    });

    // Click on user management tab
    const userTab = screen.getByText('ユーザー管理');
    fireEvent.click(userTab);

    expect(screen.getByText('新規ユーザー作成')).toBeInTheDocument();

    // Click on book management tab
    const bookTab = screen.getByText('ユーザー本管理');
    fireEvent.click(bookTab);

    expect(screen.getByText('ユーザーが所有する本のインスタンスを管理します')).toBeInTheDocument();

    // Click on book template management tab
    const templateTab = screen.getByText('本マスター管理');
    fireEvent.click(templateTab);

    expect(screen.getByText('本のメタデータ（BookTemplate）を管理します')).toBeInTheDocument();
  });

  it('opens view dialog when view button is clicked', async () => {
    renderWithProviders(<AdminDashboard />);

    await waitFor(() => {
      expect(screen.getByText('testuser1')).toBeInTheDocument();
    });

    // Switch to book management tab
    const bookTab = screen.getByText('ユーザー本管理');
    fireEvent.click(bookTab);

    // Click view button
    const viewButtons = screen.getAllByTestId('VisibilityIcon');
    fireEvent.click(viewButtons[0]);

    await waitFor(() => {
      expect(screen.getByText('本の詳細')).toBeInTheDocument();
    });
  });

  it('opens edit dialog when edit button is clicked', async () => {
    renderWithProviders(<AdminDashboard />);

    await waitFor(() => {
      expect(screen.getByText('testuser1')).toBeInTheDocument();
    });

    // Switch to book management tab
    const bookTab = screen.getByText('ユーザー本管理');
    fireEvent.click(bookTab);

    // Click edit button
    const editButtons = screen.getAllByTestId('EditIcon');
    fireEvent.click(editButtons[0]);

    await waitFor(() => {
      expect(screen.getByText('本の編集')).toBeInTheDocument();
    });
  });

  it('opens delete confirmation dialog when delete button is clicked', async () => {
    renderWithProviders(<AdminDashboard />);

    await waitFor(() => {
      expect(screen.getByText('testuser1')).toBeInTheDocument();
    });

    // Switch to book management tab
    const bookTab = screen.getByText('ユーザー本管理');
    fireEvent.click(bookTab);

    // Click delete button
    const deleteButtons = screen.getAllByTestId('DeleteIcon');
    fireEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(screen.getByText('本の削除確認')).toBeInTheDocument();
      expect(screen.getByText(/本「Test Book」を削除しますか？/)).toBeInTheDocument();
    });
  });

  it('displays book template data correctly', async () => {
    renderWithProviders(<AdminDashboard />);

    await waitFor(() => {
      expect(screen.getByText('testuser1')).toBeInTheDocument();
    });

    // Switch to book template management tab
    const templateTab = screen.getByText('本マスター管理');
    fireEvent.click(templateTab);

    await waitFor(() => {
      expect(screen.getByText('Template Book')).toBeInTheDocument();
      expect(screen.getByText('Test Author')).toBeInTheDocument();
      expect(screen.getByText('9781234567890')).toBeInTheDocument();
    });
  });
});