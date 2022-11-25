import { css } from '@/styles/_stitches.config';
import { buttonBasicStyle } from '@/styles/basicStyle';

interface Props {
  children: React.ReactNode;
  onClick: () => void;
}

function ErrorResolveButton({ children, onClick }: Props) {
  return (
    <button className={block()} onClick={onClick}>
      {children}
    </button>
  );
}

const block = css({
  ...buttonBasicStyle,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '2.5rem',
  padding: '0 1.125rem',
  fontSize: '1.125rem',
  color: '$text-button',
  background: 'hsl(190deg 95% 39%)',
  fontWeight: '600',
  border: '1px solid hsl(190deg 95% 39%)',
  borderRadius: '4px',
});

export default ErrorResolveButton;
