export default function BarRating({ summary }) {
  const totalReviews = summary?.raviewcount;
  const barRatings = [5, 4, 3, 2, 1].map((br, i) => {
    let rating = summary?.rating_counts?.find((rc) => rc.rating === br);
    return {
      rating: br,
      rating_count: rating?.rating_count || 0,
    };
  });
  return (
    <div className="w-full md:w-auto hidden md:flex flex-col items-center md:items-start">
      {barRatings.map((d, i) => (
        <div key={i} className="flex flex-nowrap items-center gap-x-6">
          <div className="flex flex-nowrap items-center gap-x-2">
            <p className="w-[11px] text-right">{d.rating}</p>
            <svg
              width={16}
              height={16}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#555"
                d="M7.546.317a.483.483 0 0 1 .908 0l1.857 4.681c.071.179.231.3.415.316l4.821.405c.436.037.613.607.28.905l-3.673 3.298a.53.53 0 0 0-.158.51l1.122 4.932c.102.445-.361.798-.734.559L8.256 13.28a.472.472 0 0 0-.512 0l-4.128 2.643c-.373.239-.836-.114-.734-.56l1.122-4.93a.53.53 0 0 0-.158-.511L.172 6.624c-.332-.298-.155-.868.28-.905l4.822-.405a.494.494 0 0 0 .415-.316L7.546.318Z"
              />
            </svg>
          </div>
          <div className="relative w-[216px] h-[5px] bg-[#D9D9D9]">
            <div
              className="absolute h-[5px] bg-[#315589]"
              style={{
                width: `${Math.ceil((d.rating_count / totalReviews) * 100)}%`,
              }}
            ></div>
          </div>
          <p className="text-[#ADADAD] text-[12px] leading-[23px]">
            {d.rating_count}
          </p>
        </div>
      ))}
    </div>
  );
}
