import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import HomePage from './index';

const mocks = [];

describe('HomePage', () => {
  it('renders without crashing', () => {
    render(
      <MockedProvider mocks={mocks}>
        <HomePage />
      </MockedProvider>
    );
  });

  it('displays main navigation links', () => {
    render(
      <MockedProvider mocks={mocks}>
        <HomePage />
      </MockedProvider>
    );

    // Check for main navigation elements
    expect(screen.getByText('本交換アプリ') || screen.getByText('Book Exchange')).toBeInTheDocument();
  });
});