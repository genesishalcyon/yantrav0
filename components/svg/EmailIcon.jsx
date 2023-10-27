const EmailIcon = ({ width = 21, height = 17, fill = "#555" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    width={width}
    height={height}
    viewBox="0 0 21 17"
  >
    <path
      fill={fill}
      d="M0 4.92v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V4.92l-8.928 5.493a3 3 0 0 1-3.144 0L0 4.92Z"
    />
    <path
      fill={fill}
      d="M21 3.158V3a3 3 0 0 0-3-3H3a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L21 3.158Z"
    />
  </svg>
);

export default EmailIcon;
