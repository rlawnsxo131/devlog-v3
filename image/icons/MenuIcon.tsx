import {
  svgContentFillCss,
  svgBackgroundFillCss,
} from '@/styles/basicStyleCss';

interface Props extends React.SVGProps<SVGSVGElement> {}

function MenuIcon(props: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      enableBackground="new 0 0 24 24"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      className={svgContentFillCss()}
      {...props}
    >
      <g>
        <path d="M0,0h24v24H0V0z" className={svgBackgroundFillCss()} />
      </g>
      <g>
        <g>
          <g>
            <path
              className={svgContentFillCss()}
              d="M6,10c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2S7.1,10,6,10z M18,10c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2S19.1,10,18,10z M12,10c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2S13.1,10,12,10z"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}

export default MenuIcon;
