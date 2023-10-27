const AddAddressIcon = ({ width = 18, height = 18, fill = "#F05769" }) => (
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
      d="M9 6.333v5.334M11.667 9H6.333M17 9A8 8 0 1 1 1 9a8 8 0 0 1 16 0Z"
    />
  </svg>
);

export default AddAddressIcon;
