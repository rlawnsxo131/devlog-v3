import { buttonBasicStyle } from '@/styles/basicStyle';
import { css } from '@/styles/_stitches.config';
import useGoHomeButton from './hooks/useGoHomeButton';

interface Props {
  children: React.ReactNode;
}

function ErrorGoHomeButton({ children }: Props) {
  const { handleClick } = useGoHomeButton();

  return (
    <div className={block()} onClick={handleClick}>
      {children}
    </div>
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

export default ErrorGoHomeButton;
