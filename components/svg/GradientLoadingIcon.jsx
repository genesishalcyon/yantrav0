const GradientLoadingIcon = ({ width = 76, height = 76 }) => (
  <svg
    className={`animate-spin `}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    width={width}
    height={height}
  >
    <path
      stroke="#D9D9D9"
      strokeWidth={3}
      d="M74 38c0 19.882-16.118 36-36 36S2 57.882 2 38 18.118 2 38 2c10.171 0 19.357 4.218 25.904 11C70.154 19.476 74 28.289 74 38Z"
    />
    <path
      stroke="url(#a)"
      strokeWidth={4}
      d="M38 74C18.118 74 2 57.882 2 38S18.118 2 38 2c10.171 0 19.357 4.218 25.904 11"
    />
    <defs>
      <linearGradient
        id="a"
        x1={32.952}
        x2={32.952}
        y1={2}
        y2={74}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#315589" />
        <stop offset={0.524} stopColor="#315589" />
        <stop offset={1} stopColor="#D9D9D9" />
      </linearGradient>
    </defs>
  </svg>
);

export default GradientLoadingIcon;
