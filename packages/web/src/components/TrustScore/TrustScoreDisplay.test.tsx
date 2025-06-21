import { render } from '@testing-library/react';
import TrustScoreDisplay from './TrustScoreDisplay';

describe('TrustScoreDisplay', () => {
  it('renders without crashing with valid props', () => {
    render(<TrustScoreDisplay score={4.5} reviewCount={10} />);
  });

  it('renders without crashing with low score', () => {
    render(<TrustScoreDisplay score={2.0} reviewCount={3} />);
  });

  it('renders without crashing with zero values', () => {
    render(<TrustScoreDisplay score={0} reviewCount={0} />);
  });

  it('renders without crashing with null values', () => {
    render(<TrustScoreDisplay score={null} reviewCount={null} />);
  });
});