import { render } from '@testing-library/react';
import HomePage from '../index';

describe('<HomePage />', () => {
  it('render text', () => {
    const result = render(<HomePage />);
    const renderText = result.getByText('hello');
    expect(renderText).toBeInTheDocument();
  });
});
