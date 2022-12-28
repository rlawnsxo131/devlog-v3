import { keyframes } from './_stitches.config';

const scaleUp = keyframes({
  '0%': {
    opacity: '0',
    transform: 'scaleY(0)',
  },
  '100%': {
    opacity: '1',
    transform: 'scaleY(1)',
  },
});

const scaleDown = keyframes({
  '0%': {
    opacity: '1',
    transform: 'scaleY(1)',
  },
  '100%': {
    opacity: '0',
    transform: 'scaleY(0)',
  },
});

const shimmer = keyframes({
  '100%': {
    backgroundPosition: '120% 100%, 0 0',
  },
});

const transitions = {
  scaleUp,
  scaleDown,
  shimmer,
};

export default transitions;
