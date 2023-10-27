const MarkAllAsReadIcon = ({ width = 18, height = 18, fill = "#D81B60" }) => (
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
      strokeWidth={1.5}
      d="M17 6.372v.755a1.88 1.88 0 0 1-.97 1.652l-5.316 2.907M1 6.372v.755c0 .69.373 1.325.97 1.652l5.316 2.907m7.253 2.092-3.825-2.092m0 0-.839-.459a1.82 1.82 0 0 0-1.75 0l-.84.459m0 0-3.823 2.092M17 15.124C17 16.16 16.173 17 15.154 17H2.846C1.826 17 1 16.16 1 15.124V6.242c0-.69.373-1.324.97-1.651l6.155-3.367a1.82 1.82 0 0 1 1.75 0l6.154 3.367c.598.327.971.96.971 1.65v8.883Z"
    />
  </svg>
);

export default MarkAllAsReadIcon;
