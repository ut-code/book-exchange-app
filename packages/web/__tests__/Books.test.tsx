import { render, screen } from '@testing-library/react';
import Books from './Books';

const mockBooks = [
  {
    id: 'book1',
    title: 'Test Book 1',
    description: 'Test Description 1',
    condition: 'GOOD',
    isAvailable: true,
    user: { id: 'user1', username: 'testuser1' },
    bookTemplate: { id: 'template1', title: 'Test Book 1', author: 'Test Author 1' },
  },
  {
    id: 'book2',
    title: 'Test Book 2',
    description: 'Test Description 2',
    condition: 'VERY_GOOD',
    isAvailable: false,
    user: { id: 'user2', username: 'testuser2' },
    bookTemplate: { id: 'template2', title: 'Test Book 2', author: 'Test Author 2' },
  },
];

describe('Books', () => {
  it('renders without crashing with empty books', () => {
    render(<Books books={[]} />);
    expect(screen.getByText('No books')).toBeInTheDocument();
  });

  it('renders books when provided', () => {
    render(<Books books={mockBooks} />);
    expect(screen.getByText('Title: Test Book 1')).toBeInTheDocument();
    expect(screen.getByText('Title: Test Book 2')).toBeInTheDocument();
  });

  it('displays book details', () => {
    render(<Books books={mockBooks} />);
    expect(screen.getByText('Description: Test Description 1')).toBeInTheDocument();
    expect(screen.getByText('Description: Test Description 2')).toBeInTheDocument();
  });
});