const FbIcon = ({ width = 17, height = 16, fill = "#555" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    width={width}
    height={height}
    viewBox="0 0 28 28"
  >
    <path
      fill={fill}
      d="M12.55 0C5.648 0 0 5.635 0 12.575 0 18.85 4.593 24.06 10.592 25v-8.785H7.405v-3.64h3.187V9.802c0-3.15 1.87-4.882 4.744-4.882 1.368 0 2.799.238 2.799.238v3.1h-1.581c-1.556 0-2.046.966-2.046 1.958v2.36h3.489l-.565 3.639h-2.924V25A12.55 12.55 0 0 0 25.1 12.575C25.1 5.635 19.453 0 12.55 0Z"
    />
  </svg>
);

export default FbIcon;
