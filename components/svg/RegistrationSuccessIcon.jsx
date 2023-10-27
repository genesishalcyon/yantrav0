const RegistrationSuccessIcon = ({
  width = 110,
  height = 110,
  fill = "#315589",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    width={width}
    height={height}
  >
    <path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={9.5}
      d="m38.333 59.167 12.5 12.5L71.667 42.5M105 55c0 27.614-22.386 50-50 50S5 82.614 5 55 27.386 5 55 5s50 22.386 50 50Z"
    />
  </svg>
);

export default RegistrationSuccessIcon;
