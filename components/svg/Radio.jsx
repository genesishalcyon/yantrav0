const Radio = ({ width = 22, height = 22 }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_d_1511_9523)">
      <rect x="3" y="2" width="16" height="16" rx="8" fill="white" />
      <rect x="3.5" y="2.5" width="15" height="15" rx="7.5" stroke="#D1D5DB" />
    </g>
    <defs>
      <filter
        id="filter0_d_1511_9523"
        x="0"
        y="0"
        width="22"
        height="22"
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
        <feGaussianBlur stdDeviation="1.5" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.07 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_1511_9523"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_1511_9523"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

export default Radio;
