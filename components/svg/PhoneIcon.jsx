const PhoneIcon = ({ width = 11, height = 10 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    width={width}
    height={height}
  >
    <path
      fill="#555"
      fillRule="evenodd"
      d="M0 1.429C0 .639.675 0 1.508 0h.69c.432 0 .809.279.914.676l.556 2.107a.868.868 0 0 1-.35.93l-.65.462c-.067.048-.082.119-.063.168.571 1.476 1.808 2.648 3.367 3.189a.162.162 0 0 0 .176-.06l.488-.616a.971.971 0 0 1 .982-.33l2.224.526c.42.1.714.457.714.866v.653c0 .79-.676 1.429-1.508 1.429H7.917C3.544 10 0 6.642 0 2.5V1.429Z"
      clipRule="evenodd"
    />
  </svg>
);

export default PhoneIcon;
