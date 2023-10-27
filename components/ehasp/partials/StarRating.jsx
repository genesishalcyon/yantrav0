export default function StarRating({
  length = 5,
  rating,
  onClick,
  color = "#de4523",
  disabled = false,
  className = "",
  ratingLabel = [
    "Extremely Bad",
    "Dissatisfied",
    "Fair",
    "Satisfied",
    "Delighted",
  ],
  withLabel = false,
}) {
  const Colored = () => {
    return (
      <svg
        width={29}
        height={28}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 29 28"
      >
        <path
          fill={color}
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M13.734 1.516a.826.826 0 0 1 1.532 0L18.4 9.122c.12.29.39.488.7.513l8.136.658c.735.06 1.033.986.473 1.47l-6.199 5.36a.842.842 0 0 0-.267.83l1.894 8.013c.171.724-.61 1.297-1.24.909l-6.965-4.294a.823.823 0 0 0-.864 0l-6.966 4.294c-.63.388-1.41-.185-1.239-.909l1.894-8.013a.842.842 0 0 0-.267-.83l-6.199-5.36c-.56-.484-.262-1.41.473-1.47L9.9 9.635a.83.83 0 0 0 .7-.513l3.134-7.606Z"
        />
      </svg>
    );
  };
  const HalfColored = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={29}
        height={28}
        fill="none"
        viewBox="0 0 29 28"
      >
        <path
          fill="url(#half-colored)"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M13.734 1.516a.826.826 0 0 1 1.532 0L18.4 9.122c.12.29.39.488.7.513l8.136.658c.735.06 1.033.986.473 1.47l-6.199 5.36a.842.842 0 0 0-.267.83l1.894 8.013c.171.724-.61 1.297-1.24.909l-6.965-4.294a.823.823 0 0 0-.864 0l-6.966 4.294c-.63.388-1.41-.185-1.239-.909l1.894-8.013a.842.842 0 0 0-.267-.83l-6.199-5.36c-.56-.484-.262-1.41.473-1.47L9.9 9.635a.83.83 0 0 0 .7-.513l3.134-7.606Z"
        />
        <defs>
          <linearGradient
            id="half-colored"
            x1={14.5}
            x2={15}
            y1={1}
            y2={1}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={color} />
            <stop stopColor={color} stopOpacity={0} />
            <stop stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
      </svg>
    );
  };
  const NotColored = () => {
    return (
      <svg
        width={29}
        height={28}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 29 28"
      >
        <path
          fill="#FFFFFF"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M13.734 1.516a.826.826 0 0 1 1.532 0L18.4 9.122c.12.29.39.488.7.513l8.136.658c.735.06 1.033.986.473 1.47l-6.199 5.36a.842.842 0 0 0-.267.83l1.894 8.013c.171.724-.61 1.297-1.24.909l-6.965-4.294a.823.823 0 0 0-.864 0l-6.966 4.294c-.63.388-1.41-.185-1.239-.909l1.894-8.013a.842.842 0 0 0-.267-.83l-6.199-5.36c-.56-.484-.262-1.41.473-1.47L9.9 9.635a.83.83 0 0 0 .7-.513l3.134-7.606Z"
        />
      </svg>
    );
  };

  const hasDecimal = rating % 1 != 0 ? 1 : 0;

  return (
    <div className="flex flex-col gap-y-2">
      <div className={`flex flex-nowrap gap-x-1 ${className}`}>
        {Array(Math.trunc(rating))
          .fill(0)
          .map((_, i) => (
            <button
              key={i}
              onClick={() => {
                if (!disabled) {
                  onClick(i + 1);
                }
              }}
              className={`${disabled ? "cursor-default" : "cursor-pointer"}`}
            >
              <Colored />
            </button>
          ))}
        {hasDecimal === 1 && (
          <button
            onClick={() => {
              if (!disabled) {
                onClick(Math.ceil(rating));
              }
            }}
            className={`${disabled ? "cursor-default" : "cursor-pointer"}`}
          >
            <HalfColored />
          </button>
        )}
        {Array(length - (Math.trunc(rating) + hasDecimal))
          .fill(0)
          .map((e, i) => (
            <button
              key={i}
              onClick={() => {
                if (!disabled) {
                  onClick(i + 1 + rating);
                }
              }}
              className={`${disabled ? "cursor-default" : "cursor-pointer"}`}
            >
              <NotColored />
            </button>
          ))}
      </div>
      {withLabel && (
        <p className="font-poppins text-[#231F20] text-[14px] md:text-[16px] leading-[23px] font-[600]">
          {ratingLabel[Math.ceil(rating) - 1]}
        </p>
      )}
    </div>
  );
}
