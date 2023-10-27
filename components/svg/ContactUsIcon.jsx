const ContactUsIcon = ({ width = 19, height = 18, fill = "#8BC319" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    width={width}
    height={height}
  >
    <path
      fill={fill}
      fillRule="evenodd"
      d="M0 2.571C0 1.151 1.215 0 2.714 0h1.241c.779 0 1.457.502 1.646 1.217l1 3.792a1.563 1.563 0 0 1-.627 1.675l-1.17.832c-.122.086-.149.213-.115.3 1.028 2.658 3.255 4.768 6.06 5.741a.292.292 0 0 0 .318-.107l.877-1.11a1.748 1.748 0 0 1 1.77-.594l4.001.948c.755.179 1.285.821 1.285 1.559v1.176C19 16.849 17.785 18 16.286 18H14.25C6.38 18 0 11.956 0 4.5V2.571Z"
      clipRule="evenodd"
    />
  </svg>
);

export default ContactUsIcon;
