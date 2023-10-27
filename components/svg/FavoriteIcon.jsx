const FavoriteIcon = ({ width = 24, height = 22, fill = "#fff" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    width={width}
    height={height}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M23 6.455C23 3.442 20.435 1 17.27 1 14.906 1 12.875 2.365 12 4.313 11.126 2.365 9.095 1 6.73 1 3.564 1 1 3.442 1 6.455 1 15.207 12 21 12 21s11-5.793 11-14.545Z"
    />
  </svg>
);

export default FavoriteIcon;
