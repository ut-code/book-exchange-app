import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import WantToRead from './want-to-read';

// Mock GraphQL hooks
jest.mock('./wantToRead.generated', () => ({
  useGetWantToReadListQuery: () => ({
    data: { wantToReadList: [] },
    loading: false,
    error: null,
  }),
}));

const mocks = [];

describe('WantToRead', () => {
  it('renders without crashing', () => {
    render(
      <MockedProvider mocks={mocks}>
        <WantToRead />
      </MockedProvider>
    );
  });

  it('handles empty want to read list', () => {
    render(
      <MockedProvider mocks={mocks}>
        <WantToRead />
      </MockedProvider>
    );
    // Test passes if component handles empty list without errors
  });
});