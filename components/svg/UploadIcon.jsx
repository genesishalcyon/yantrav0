const UploadIcon = ({ width = 20, height = 20, fill = "#D81B60" }) => (
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
      d="M1 14.5v2.25A2.25 2.25 0 0 0 3.25 19h13.5A2.25 2.25 0 0 0 19 16.75V14.5m-13.5-9L10 1m0 0 4.5 4.5M10 1v13.5"
    />
  </svg>
);

export default UploadIcon;
