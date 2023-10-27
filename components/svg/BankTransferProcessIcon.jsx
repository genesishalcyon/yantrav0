const BankTransferIcon = ({ width = 120, height = 124, className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    width={width}
    height={height}
  >
    <path
      stroke="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={4.5}
      d="M96.453 9.825v27.298m-6.824-6.41 2 1.499c2.664 1.999 6.985 1.999 9.65 0 2.665-2 2.665-5.24 0-7.239-1.332-1-3.08-1.5-4.826-1.5-1.649.001-3.298-.499-4.556-1.498-2.516-2-2.516-5.24 0-7.239 2.516-1.999 6.596-1.999 9.112 0l.944.75m14.974 7.988c0 11.307-9.166 20.474-20.474 20.474-11.307 0-20.474-9.167-20.474-20.474C75.98 12.166 85.147 3 96.454 3c11.308 0 20.474 9.166 20.474 20.474Z"
    />
    <path
      stroke="#F05769"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={9.5}
      d="M54.82 118.999V73.331m20.758 45.668V73.331m-41.516 45.668V73.331M5 52.573l49.82-33.214 49.82 33.214m-8.304 66.426v-59.05a267.703 267.703 0 0 0-41.516-3.225c-14.123 0-27.99 1.102-41.517 3.225v59.05m-8.303 0h99.64M54.82 40.118h.041v.041h-.041v-.041Z"
    />
  </svg>
);

export default BankTransferIcon;
