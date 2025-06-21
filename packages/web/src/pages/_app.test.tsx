import { render } from '@testing-library/react';
import MyApp from './_app';

// Mock Apollo Client
jest.mock('@apollo/client', () => ({
  ApolloProvider: ({ children }: { children: React.ReactNode }) => children,
  ApolloClient: jest.fn(),
  InMemoryCache: jest.fn(),
  createHttpLink: jest.fn(),
}));

// Mock Material-UI theme
jest.mock('@mui/material/styles', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => children,
  createTheme: jest.fn(() => ({})),
}));

const mockAppProps = {
  Component: () => <div>Test Component</div>,
  pageProps: {},
  router: {} as any,
};

describe('MyApp', () => {
  it('renders without crashing', () => {
    render(<MyApp {...mockAppProps} />);
  });

  it('wraps component with providers', () => {
    render(<MyApp {...mockAppProps} />);
    // Test passes if app renders with all providers without errors
  });
});