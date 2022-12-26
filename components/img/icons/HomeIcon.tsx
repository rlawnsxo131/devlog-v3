import { css } from '@/styles/_stitches.config';

interface Props {}

function HomeIcon(props: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      width="24"
      viewBox="0 0 24 24"
    >
      <path d="M3.8 21.2V8.9L12 2.75l8.2 6.15v12.3h-6.15v-7.25h-4.1v7.25Z" />
    </svg>
  );
}

const block = css({});

export default HomeIcon;
