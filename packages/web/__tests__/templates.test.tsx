import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import BookTemplates from './templates';

// Mock GraphQL hooks
jest.mock('./bookTemplate.generated', () => ({
  useGetBookTemplatesQuery: () => ({
    data: { bookTemplates: [] },
    loading: false,
    error: null,
  }),
}));

const mocks = [];

describe('BookTemplates', () => {
  it('renders without crashing', () => {
    render(
      <MockedProvider mocks={mocks}>
        <BookTemplates />
      </MockedProvider>
    );
  });

  it('handles empty book templates list', () => {
    render(
      <MockedProvider mocks={mocks}>
        <BookTemplates />
      </MockedProvider>
    );
    // Test passes if component handles empty data without errors
  });
});