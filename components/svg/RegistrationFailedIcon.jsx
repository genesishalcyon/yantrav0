const RegistrationFailedIcon = ({
  width = 110,
  height = 110,
  fill = "#D81B60",
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
      d="m42.5 42.5 25 25m0-25-25 25M105 55c0 27.614-22.386 50-50 50S5 82.614 5 55 27.386 5 55 5s50 22.386 50 50Z"
    />
  </svg>
);

export default RegistrationFailedIcon;
