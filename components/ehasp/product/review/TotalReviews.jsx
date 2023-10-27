export default function TotalReviews({ summary }) {
  const totalReviews = summary?.raviewcount;
  return (
    <div className="w-auto flex flex-col gap-y-2">
      <p className="text-[14px] leading-[20px] font-[400] md:text-[16px] md:leading-[23px] md:font-[700]">
        Total Reviews
      </p>
      <div className="flex items-end">
        <p className="text-[#315589] text-[24px] leading-[20px] md:text-[32px] md:leading-[40px] md:font-[600] ">
          {totalReviews}
        </p>
        <span className="ml-2 text-[14px] leading-[20px] md:text-[18px] md:leading-[30px]">
          Customer Reviews
        </span>
      </div>
    </div>
  );
}
