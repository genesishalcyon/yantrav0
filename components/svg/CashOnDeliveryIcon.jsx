const CashOnDeliveryIcon = ({
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
      strokeWidth={2.5}
      d="M4.347 36.228c10.564 0 20.797 1.413 30.522 4.06 1.405.383 2.808-.662 2.808-2.118v-1.942M7.245 8.695v1.449c0 .8-.648 1.45-1.449 1.45H4.347m0 0v-.726c0-1.2.973-2.173 2.174-2.173h32.605M4.347 11.593v17.39m34.78-20.288v1.449c0 .8.648 1.45 1.448 1.45h1.45m-2.899-2.9h.725c1.2 0 2.174.974 2.174 2.174v18.84c0 1.2-.974 2.173-2.174 2.173h-.725m2.899-2.898h-1.45c-.8 0-1.449.648-1.449 1.449v1.449m0 0H7.246m0 0H6.52c-1.2 0-2.174-.973-2.174-2.174v-.724m2.898 2.898v-1.45c0-.8-.648-1.448-1.449-1.448H4.347m24.635-8.695a5.797 5.797 0 1 1-11.593 0 5.797 5.797 0 0 1 11.593 0Zm5.797 0h.014v.014h-.014v-.014Zm-23.186 0h.014v.014h-.014v-.014Z"
    />
  </svg>
);

export default CashOnDeliveryIcon;
