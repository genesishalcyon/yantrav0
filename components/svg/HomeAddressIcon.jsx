const HomeAddressIcon = ({ width = 17, height = 16, fill = "#FFFFFF" }) => (
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
      d="m1.188 8 6.715-6.716a.844.844 0 0 1 1.194 0L15.813 8M2.874 6.313v7.593c0 .466.378.844.844.844h3.094v-3.656c0-.466.377-.844.843-.844h1.688c.466 0 .844.378.844.844v3.656h3.093a.844.844 0 0 0 .844-.844V6.313M5.687 14.75h6.188"
    />
  </svg>
);

export default HomeAddressIcon;
