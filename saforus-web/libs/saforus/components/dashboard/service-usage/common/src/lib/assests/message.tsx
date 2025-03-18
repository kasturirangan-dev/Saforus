interface iconProp {
  width?: number;
}
const messageSvg = ({
  width = 46,
}: iconProp) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={46 + width}
      height="46"
      viewBox="0 0 46 46"
      fill="none"
    >
      <g filter="url(#filter0_d_9186_27116)">
        <mask id="path-1-inside-1_9186_27116" fill="white">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7 1C4.23858 1 2 3.23858 2 6V32C2 34.7614 4.23858 37 7 37H16.1716C16.702 37 17.2107 37.2107 17.5858 37.5858L21.5858 41.5858C22.3668 42.3668 23.6332 42.3668 24.4142 41.5858L28.4142 37.5858C28.7893 37.2107 29.298 37 29.8284 37H39C41.7614 37 44 34.7614 44 32V6C44 3.23858 41.7614 1 39 1H7Z"
          />
        </mask>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7 1C4.23858 1 2 3.23858 2 6V32C2 34.7614 4.23858 37 7 37H16.1716C16.702 37 17.2107 37.2107 17.5858 37.5858L21.5858 41.5858C22.3668 42.3668 23.6332 42.3668 24.4142 41.5858L28.4142 37.5858C28.7893 37.2107 29.298 37 29.8284 37H39C41.7614 37 44 34.7614 44 32V6C44 3.23858 41.7614 1 39 1H7Z"
          fill="white"
        />
        <path
          d="M21.5858 41.5858L20.8787 42.2929L21.5858 41.5858ZM17.5858 37.5858L18.2929 36.8787L17.5858 37.5858ZM3 6C3 3.79086 4.79086 2 7 2V0C3.68629 0 1 2.68629 1 6H3ZM3 32V6H1V32H3ZM7 36C4.79086 36 3 34.2091 3 32H1C1 35.3137 3.68629 38 7 38V36ZM16.1716 36H7V38H16.1716V36ZM22.2929 40.8787L18.2929 36.8787L16.8787 38.2929L20.8787 42.2929L22.2929 40.8787ZM27.7071 36.8787L23.7071 40.8787L25.1213 42.2929L29.1213 38.2929L27.7071 36.8787ZM39 36H29.8284V38H39V36ZM43 32C43 34.2091 41.2091 36 39 36V38C42.3137 38 45 35.3137 45 32H43ZM43 6V32H45V6H43ZM39 2C41.2091 2 43 3.79086 43 6H45C45 2.68629 42.3137 0 39 0V2ZM7 2H39V0H7V2ZM29.1213 38.2929C29.3089 38.1054 29.5632 38 29.8284 38V36C29.0328 36 28.2697 36.3161 27.7071 36.8787L29.1213 38.2929ZM20.8787 42.2929C22.0503 43.4645 23.9497 43.4645 25.1213 42.2929L23.7071 40.8787C23.3166 41.2692 22.6834 41.2692 22.2929 40.8787L20.8787 42.2929ZM16.1716 38C16.4368 38 16.6911 38.1054 16.8787 38.2929L18.2929 36.8787C17.7303 36.3161 16.9672 36 16.1716 36V38Z"
          fill="#DAE0E6"
          mask="url(#path-1-inside-1_9186_27116)"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_9186_27116"
          x="0"
          y="0"
          width="46"
          height="45.1716"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="1" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.04 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_9186_27116"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_9186_27116"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default messageSvg;
