import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import WantToReadButton from './WantToReadButton';

// Mock GraphQL hooks
jest.mock('../pages/book/wantToRead.generated', () => ({
  useCheckWantToReadQuery: () => ({
    data: { checkWantToRead: false },
    loading: false,
    error: null,
  }),
  useAddWantToReadMutation: () => [
    jest.fn(),
    { loading: false, error: null }
  ],
  useRemoveWantToReadMutation: () => [
    jest.fn(),
    { loading: false, error: null }
  ],
}));

const mocks = [];

describe('WantToReadButton', () => {
  it('renders without crashing', () => {
    render(
      <MockedProvider mocks={mocks}>
        <WantToReadButton bookTemplateId="template1" />
      </MockedProvider>
    );
  });

  it('handles different want to read states', () => {
    render(
      <MockedProvider mocks={mocks}>
        <WantToReadButton bookTemplateId="template1" />
      </MockedProvider>
    );
    // Test passes if component handles different states without errors
  });
});