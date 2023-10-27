const FavoriteFilledIcon = ({ width = 28, height = 26, fill = "#fff" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    width={width}
    height={height}
  >
    <g filter="url(#a)">
      <path
        fill={fill}
        d="M25 8.455C25 5.442 22.435 3 19.27 3 16.906 3 14.875 4.365 14 6.313 13.126 4.365 11.095 3 8.73 3 5.564 3 3 5.442 3 8.455 3 17.207 14 23 14 23s11-5.793 11-14.545Z"
      />
    </g>
    <defs>
      <filter
        id="a"
        width={width}
        height={height}
        x={0}
        y={0}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset />
        <feGaussianBlur stdDeviation={1.5} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_313_1037"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_313_1037"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

export default FavoriteFilledIcon;
