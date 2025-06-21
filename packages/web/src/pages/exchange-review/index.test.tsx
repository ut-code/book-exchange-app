import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import ExchangeReviews from './index';

const mockRouter = {
  push: jest.fn(),
  pathname: '/exchange-review',
  query: {},
  asPath: '/exchange-review',
};

jest.mock('next/router', () => ({
  useRouter: () => mockRouter,
}));

const mocks = [];

describe('ExchangeReviews', () => {
  it('renders exchange reviews page', () => {
    render(
      <MockedProvider mocks={mocks}>
        <ExchangeReviews />
      </MockedProvider>
    );

    expect(screen.getByText('交換レビュー') || screen.getByText('Exchange Reviews')).toBeInTheDocument();
  });

  it('displays navigation links', () => {
    render(
      <MockedProvider mocks={mocks}>
        <ExchangeReviews />
      </MockedProvider>
    );

    // Check for navigation elements
    const createLink = screen.queryByText('レビューを作成') || screen.queryByText('Create Review');
    const listLink = screen.queryByText('レビュー一覧') || screen.queryByText('Review List');
    
    // At least one navigation element should be present
    expect(createLink || listLink).toBeInTheDocument();
  });
});