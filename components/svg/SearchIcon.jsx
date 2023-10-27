const SearchIcon = ({ width = 18, height = 18, fill = "#555" }) => (
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
      strokeWidth={2}
      d="m17 17-4.62-4.62m0 0a6.667 6.667 0 1 0-9.428-9.428 6.667 6.667 0 0 0 9.429 9.429Z"
    />
  </svg>
);

export default SearchIcon;
