const BankTransferIcon = ({
  width = 47,
  height = 47,
  fill = "#F05769",
  className,
}) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    width={width}
    height={height}
  >
    <path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="M23.185 40.574v-15.94m7.245 15.94v-15.94m-14.49 15.94v-15.94M5.796 17.39l17.39-11.593L40.573 17.39m-2.898 23.185v-20.61a93.441 93.441 0 0 0-14.49-1.126c-4.93 0-9.77.385-14.491 1.125v20.61m-2.899 0h34.778M23.185 13.043h.015v.014h-.015v-.014Z"
    />
  </svg>
);

export default BankTransferIcon;
