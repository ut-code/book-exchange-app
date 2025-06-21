import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import EditBook from './EditBook';

// Mock GraphQL hooks
jest.mock('./query.generated', () => ({
  useGetBookQuery: () => ({
    data: {
      book: {
        id: 'book1',
        title: 'Test Book',
        description: 'Test Description',
        condition: 'GOOD',
        isAvailable: true,
        notes: 'Test notes',
      },
    },
    loading: false,
    error: null,
  }),
  useUpdateBookMutation: () => [
    jest.fn(),
    { loading: false, error: null }
  ],
}));

const mocks = [];

describe('EditBook', () => {
  it('renders without crashing', () => {
    render(
      <MockedProvider mocks={mocks}>
        <EditBook />
      </MockedProvider>
    );
  });

  it('handles book data loading', () => {
    render(
      <MockedProvider mocks={mocks}>
        <EditBook />
      </MockedProvider>
    );
    // Test passes if component handles book data without errors
  });
});