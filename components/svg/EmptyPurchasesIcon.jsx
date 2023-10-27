const EmptyPurchasesIcon = ({ width = 114, height = 111 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    width={width}
    height={height}
  >
    <path
      fill="#ADADAD"
      fillRule="evenodd"
      d="M20.485 18v3h-7.942a7.496 7.496 0 0 0-7.453 6.715l-5.048 48C-.424 80.143 3.046 84 7.495 84h61.951c4.45 0 7.919-3.857 7.453-8.285l-5.048-48A7.496 7.496 0 0 0 64.398 21h-7.942v-3c0-9.941-8.053-18-17.986-18S20.485 8.059 20.485 18ZM38.47 6c-6.622 0-11.99 5.373-11.99 12v3h23.98v-3c0-6.627-5.368-12-11.99-12ZM26.48 39c0 6.627 5.368 12 11.99 12s11.99-5.373 11.99-12v-3a2.999 2.999 0 1 1 5.995 0v3c0 9.941-8.052 18-17.985 18s-17.985-8.059-17.985-18v-3a2.999 2.999 0 1 1 5.995 0v3Z"
      clipRule="evenodd"
    />
    <circle cx={82} cy={79} r={28} fill="#fff" stroke="#fff" strokeWidth={8} />
    <circle cx={82} cy={79} r={26} fill="#fff" stroke="#AAA" strokeWidth={4} />
    <path
      fill="#AAA"
      fillRule="evenodd"
      d="M89.425 92.575c-4.1-4.1-10.75-4.1-14.85 0a2.25 2.25 0 1 1-3.182-3.182c5.858-5.858 15.356-5.858 21.214 0a2.25 2.25 0 1 1-3.182 3.182Z"
      clipRule="evenodd"
    />
    <path
      fill="#AAA"
      d="M77 74.5c0 2.485-1.343 4.5-3 4.5s-3-2.015-3-4.5 1.343-4.5 3-4.5 3 2.015 3 4.5ZM93 74.5c0 2.485-1.343 4.5-3 4.5s-3-2.015-3-4.5 1.343-4.5 3-4.5 3 2.015 3 4.5Z"
    />
  </svg>
);

export default EmptyPurchasesIcon;
