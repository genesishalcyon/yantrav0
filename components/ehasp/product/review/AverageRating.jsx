import StarRating from "@/components/ehasp/partials/StarRating";
export default function AverageRating({ summary }) {
  const rating = Number(summary?.average_rating).toFixed(
    summary?.average_rating % 1 === 0 ? 0 : 1
  );
  return (
    <div className="w-auto flex flex-col gap-y-2">
      <p className="text-[14px] leading-[20px] font-[400] md:text-[16px] md:leading-[23px] md:font-[700]">
        Average Rating
      </p>
      <div className="flex flex-col md:flex-row justify-start md:items-center gap-x-4">
        <p className="text-[#F05769] text-[24px] leading-[20px] md:text-[32px] md:leading-[48px] md:font-[600]">
          {rating}
          <span className="ml-2 text-[14px] leading-[20px] md:text-[18px] md:leading-[30px] font-[400] text-[#555555]">
            out of 5
          </span>
        </p>
        <StarRating
          length={5}
          rating={Number(rating)}
          disabled
          color="#F05769"
        />
      </div>
    </div>
  );
}
