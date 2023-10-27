const CheckoutSuccessIcon = ({ width = 120, height = 120, className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    width={width}
    height={height}
  >
    <circle cx={60} cy={60} r={58} stroke="#F05769" strokeWidth={3} />
    <path
      fill="#F05769"
      fillRule="evenodd"
      d="M45.04 42v2.5h-6.607a6.24 6.24 0 0 0-6.199 5.596l-4.2 40c-.386 3.69 2.5 6.904 6.2 6.904h51.532c3.7 0 6.587-3.214 6.2-6.904l-4.2-40a6.24 6.24 0 0 0-6.2-5.596H74.96V42c0-8.284-6.698-15-14.96-15-8.263 0-14.96 6.716-14.96 15ZM60 32c-5.508 0-9.974 4.477-9.974 10v2.5h19.947V42c0-5.523-4.465-10-9.973-10Z"
      clipRule="evenodd"
    />
    <path
      fill="#315589"
      fillRule="evenodd"
      d="M76.043 37.787c0-11.586 9.392-20.978 20.979-20.978C108.608 16.809 118 26.2 118 37.787c0 11.587-9.392 20.979-20.978 20.979-11.587 0-20.979-9.392-20.979-20.979Zm28.747-3.903a1.614 1.614 0 0 0-2.626-1.876l-6.962 9.746-3.494-3.494a1.614 1.614 0 0 0-2.282 2.282l4.84 4.841a1.614 1.614 0 0 0 2.455-.203l8.069-11.296Z"
      clipRule="evenodd"
    />
  </svg>
);

export default CheckoutSuccessIcon;
