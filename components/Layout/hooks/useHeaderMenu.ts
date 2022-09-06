import { useState } from 'react';

export default function useHeaderMenu() {
  const [visible, setVisible] = useState(false);

  const onClick = () => {
    setVisible((prev) => !prev);
  };

  return {
    visible,
    onClick,
  };
}
