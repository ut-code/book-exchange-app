import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import CreateBook from './CreateBook';

// Mock GraphQL hooks to avoid query errors
jest.mock('./query.generated', () => ({
  useCreateBookMutation: () => [
    jest.fn(),
    { loading: false, error: null }
  ],
  useCreateBookFromIsbnMutation: () => [
    jest.fn(),
    { loading: false, error: null }
  ],
  useGetBookTemplatesQuery: () => ({
    data: { bookTemplates: [] },
    loading: false,
    error: null,
  }),
}));

const mocks = [];

describe('CreateBook', () => {
  it('renders without crashing', () => {
    render(
      <MockedProvider mocks={mocks}>
        <CreateBook />
      </MockedProvider>
    );
  });

  it('handles empty book templates', () => {
    render(
      <MockedProvider mocks={mocks}>
        <CreateBook />
      </MockedProvider>
    );
    // Test passes if component handles empty data without errors
  });
});