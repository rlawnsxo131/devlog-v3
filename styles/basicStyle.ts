export const buttonBasicStyle = {
  padding: '0',
  border: '0',
  boxSizing: 'border-box',
  lineHeight: 'normal',
  cursor: 'pointer',
};

export const buttonWithSVGBasicStyle = {
  background: 'inherit',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

export const layoutBasicResponsiveStyle = {
  '@xxxs': {
    width: '93%',
  },
  '@m1': {
    width: '768px',
  },
  '@m2': {
    width: '860px',
  },
  '@l1': {
    width: '1200px',
  },
};

export const textWrapBaseStyle = {
  overflow: 'hidden',
  display: '-webkit-box',
  '-webkit-box-orient': 'vertical',
  wordBreak: 'break-word',
  overflowWrap: 'break-word',
  textOverflow: 'ellipsis',
};

export const textUnderlineForHoverStyle = {
  color: '$text-underline',
  '&:hover': {
    color: '$text-underline-hover',
    textDecoration: 'underline',
  },
};
