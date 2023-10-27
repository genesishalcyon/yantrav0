const OfficeAddressIcon = ({ width = 17, height = 16, fill = "#0F172A" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    width={width}
    height={height}
  >
    <path
      fill={fill}
      d="M12.938 8.438h.005v.005h-.005v-.005ZM12.938 10.688h.005v.005h-.005v-.005ZM12.938 12.938h.005v.005h-.005v-.005Z"
    />
    <path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M1.688 15.75h14.624m-13.5-13.5v13.5m7.876-13.5v13.5m4.5-10.125V15.75M5.062 5.062h.563m-.563 2.25h.563m-.563 2.25h.563m2.25-4.5h.563m-.563 2.25h.563m-.563 2.25h.563M5.062 15.75v-2.531c0-.466.378-.844.844-.844h1.688c.466 0 .843.378.843.844v2.531M2.25 2.25h9m-.563 3.375h5.063m-2.813 2.813h.006v.005h-.005v-.005Zm0 2.25h.006v.005h-.005v-.005Zm0 2.25h.006v.005h-.005v-.005Z"
    />
  </svg>
);

export default OfficeAddressIcon;
