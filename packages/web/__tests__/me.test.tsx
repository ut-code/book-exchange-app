import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import MyProfile from './me';

// Mock the useMyProfileQuery hook to avoid GraphQL errors
jest.mock('./query.generated', () => ({
  useMyProfileQuery: () => ({
    data: null,
    loading: true,
    error: null,
  }),
}));

const mocks = [];

describe('MyProfile', () => {
  it('renders without crashing', () => {
    render(
      <MockedProvider mocks={mocks}>
        <MyProfile />
      </MockedProvider>
    );
    // Test passes if component renders without errors
  });

  it('handles loading state', () => {
    render(
      <MockedProvider mocks={mocks}>
        <MyProfile />
      </MockedProvider>
    );
    // Test passes if component handles loading state without errors
  });
});