import StarRating from "@/components/ehasp/partials/StarRating";
import Image from "next/image";
import { convertDate } from "@/lib/services/globalService";
import ReviewMedia from "@/components/ehasp/product/review/ReviewMedia";
export default function ReviewList({ reviews }) {
  const ratingLabel = [
    "Extremely Bad",
    "Dissatisfied",
    "Fair",
    "Satisfied",
    "Superb Quality!",
  ];

  return (
    <div className="flex flex-col px-4 md:px-10 ">
      {reviews?.map((review, i) => (
        <div
          key={i}
          className="flex flex-wrap md:flex-nowrap justify-between gap-y-4 py-5 md:py-8 border-b-[2px] border-[#D9D9D9]"
        >
          <div className="w-full md:w-[30%] flex flex-col text-[12px] md:text-[16px] leading-[23px]">
            <div className="flex flex-nowrap items-center gap-x-2 mb-2">
              <div className="relative w-[50px] h-[50px]">
                <Image
                  alt="user"
                  src={
                    review?.customer?.media[0]?.original_url ||
                    "/images/placeholder.webp"
                  }
                  fill
                  priority
                  className="object-cover object-center rounded-[8px]"
                />
              </div>
              <p className="text-[#315589] text-[14px] leading-[18px] md:text-[20px] md:leading-[23px] font-[600]">
                {review?.customer_name}
              </p>
            </div>
            <p className="font-[600] text-[#231F20]">Order Specifications</p>
            {review?.data?.map((c, i) => (
              <p key={i} className="capitalize">
                {`${c.option}: ${c.option_value}`}
              </p>
            ))}
          </div>
          <div className="w-full md:w-[70%] flex flex-col gap-y-3">
            <div className="flex justify-between">
              <StarRating
                length={5}
                rating={review?.rating}
                disabled
                color="#F05769"
                withLabel
                ratingLabel={ratingLabel}
              />
              <p className="hidden md:inline text-[#ADADAD] text-[16px] leading-[23px]">
                {convertDate(review?.order_line?.reviewed_at, "DD-MMM-YYYY")}
              </p>
            </div>
            <div className="text-[14px] leading-[20px] md:text-[16px] md:leading-[23px] line-clamp-2">
              {review?.comment}
            </div>

            <ReviewMedia media={review.media} />
          </div>
        </div>
      ))}
    </div>
  );
}
