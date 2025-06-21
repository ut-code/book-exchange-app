import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import Users from './Users';

// Mock GraphQL hooks
jest.mock('./query.generated', () => ({
  useUsersQuery: () => ({
    data: { users: [] },
    loading: false,
    error: null,
  }),
}));

const mocks = [];

describe('Users', () => {
  it('renders without crashing', () => {
    render(
      <MockedProvider mocks={mocks}>
        <Users />
      </MockedProvider>
    );
  });

  it('handles empty users list', () => {
    render(
      <MockedProvider mocks={mocks}>
        <Users />
      </MockedProvider>
    );
    // Test passes if component handles empty data without errors
  });
});