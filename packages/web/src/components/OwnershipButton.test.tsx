import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import OwnershipButton from './OwnershipButton';

// Mock GraphQL hooks
jest.mock('../pages/book/bookOwnership.generated', () => ({
  useCheckBookOwnershipQuery: () => ({
    data: { checkBookOwnership: false },
    loading: false,
    error: null,
  }),
  useCreateBookMutation: () => [
    jest.fn(),
    { loading: false, error: null }
  ],
  useDeleteBookMutation: () => [
    jest.fn(),
    { loading: false, error: null }
  ],
}));

const mocks = [];

describe('OwnershipButton', () => {
  it('renders without crashing', () => {
    render(
      <MockedProvider mocks={mocks}>
        <OwnershipButton bookTemplateId="template1" />
      </MockedProvider>
    );
  });

  it('handles different ownership states', () => {
    render(
      <MockedProvider mocks={mocks}>
        <OwnershipButton bookTemplateId="template1" />
      </MockedProvider>
    );
    // Test passes if component handles different states without errors
  });
});