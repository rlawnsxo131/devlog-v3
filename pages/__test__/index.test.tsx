import { render } from '@testing-library/react';
import HomePage from '../index';

describe('Home', () => {
  it('renders a heading', () => {
    const result = render(<HomePage />);
    const renderText = result.getByText('hello');
    expect(renderText).toBeInTheDocument();
  });
});
