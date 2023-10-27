const OurLocationIcon = ({ width = 15, height = 18, fill = "#18ACBA" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    width={width}
    height={height}
  >
    <path
      fill={fill}
      fillRule="evenodd"
      d="m6.925 17.869.063.036.024.014a.676.676 0 0 0 .643 0l.025-.014a10.445 10.445 0 0 0 .29-.172 17.401 17.401 0 0 0 3.174-2.552c1.729-1.77 3.524-4.428 3.524-7.847A7.334 7.334 0 0 0 0 7.334c0 3.419 1.795 6.078 3.523 7.847a17.403 17.403 0 0 0 3.175 2.552c.096.06.173.105.227.136ZM7.334 10a2.667 2.667 0 1 0 0-5.334 2.667 2.667 0 0 0 0 5.334Z"
      clipRule="evenodd"
    />
  </svg>
);

export default OurLocationIcon;
