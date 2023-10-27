const EmptyProductsIcon = ({ width = 150, height = 130 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    width={width}
    height={height}
  >
    <path
      fill="#F8F8F9"
      stroke="#AAA"
      strokeDasharray="8 10"
      strokeWidth={2}
      d="M1 1h100v67H1z"
    />
    <path
      stroke="#AAA"
      strokeDasharray="8 10"
      strokeWidth={2}
      d="M82 34h67v67H82z"
    />
    <path
      fill="#AAA"
      stroke="#F8F8F9"
      strokeLinejoin="round"
      strokeWidth={4}
      d="M9.41 52.849a2 2 0 0 0 0 3.449l41.077 24.117a2 2 0 0 0 2.026 0L93.59 56.298a2 2 0 0 0 0-3.45L54.236 29.746a5.404 5.404 0 0 0-5.474 0L9.41 52.849ZM98 60.54a2 2 0 0 0-3.013-1.725L53.911 82.933a2 2 0 0 0-.988 1.724V126a2.001 2.001 0 0 0 3.013 1.725l39.378-23.12a5.448 5.448 0 0 0 2.686-4.7V60.54Zm-50.936 67.184A2.001 2.001 0 0 0 50.077 126V84.657a2 2 0 0 0-.987-1.724L8.013 58.816A2 2 0 0 0 5 60.54v39.364a5.448 5.448 0 0 0 2.686 4.7l39.378 23.12Z"
    />
  </svg>
);

export default EmptyProductsIcon;
