const CloseIcon = ({ width = 28, height = 28, fill = "#0F172A" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    width={width}
    height={height}
    viewBox="0 0 28 28"
  >
    <path
      fill={fill}
      d="M8.792 7.308a1.05 1.05 0 1 0-1.484 1.484L12.515 14l-5.207 5.207a1.05 1.05 0 0 0 1.484 1.485L14 15.485l5.207 5.207a1.05 1.05 0 0 0 1.485-1.485L15.485 14l5.207-5.208a1.05 1.05 0 0 0-1.485-1.484L14 12.515 8.792 7.308Z"
    />
  </svg>
);

export default CloseIcon;
