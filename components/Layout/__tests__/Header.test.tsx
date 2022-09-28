import { render } from '@testing-library/react';
import Header from '../Header';

function renderHeader() {
  const result = render(
    <Header
      leftSideItems={<div>leftSideItems</div>}
      rightSideItems={<div>rightSideItems</div>}
    />,
  );

  const LeftSideItems = () =>
    result.getByText('leftSideItems', {
      selector: 'div',
    });

  const RightSideItems = () =>
    result.getByText('rightSideItems', {
      selector: 'div',
    });

  return {
    LeftSideItems,
    RightSideItems,
  };
}

describe('<Header />', () => {
  it('render', () => {
    const { LeftSideItems, RightSideItems } = renderHeader();

    expect(LeftSideItems()).toBeInTheDocument();
    expect(RightSideItems()).toBeInTheDocument();
  });
});
