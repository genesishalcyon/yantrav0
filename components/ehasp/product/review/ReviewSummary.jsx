import AverageRating from "@/components/ehasp/product/review/AverageRating";
import TotalReviews from "@/components/ehasp/product/review/TotalReviews";
import BarRating from "@/components/ehasp/product/review/BarRating";
import { Fragment } from "react";
import REVIEWAPI from "@/lib/api/review/request";
import productStore from "@/lib/store/productStore";
export default function ReviewSummary({ product }) {
  const { data: summary, isValidating } = REVIEWAPI.getSummaryReviewSwr(
    product?.id,
    {
      render: product?.id,
      revalidateOnFocus: false,
      onSuccess: (res) => {
        if (res) {
          productStore.setState({
            totalReviews: res.data.raviewcount,
          });
        }
      },
    }
  );
  return (
    <Fragment>
      {!isValidating && (
        <div className="flex flex-wrap justify-between items-start md:items-center gap-y-5 px-4 md:px-10 pt-2 md:pt-8 pb-0 md:pb-4 md:border-b-[2px] border-[#D9D9D9]">
          <AverageRating summary={summary} />
          <TotalReviews summary={summary} />
          <BarRating summary={summary} />
          <div className="md:hidden w-full h-[1px] border-b-[1px] border-[#D1D5DB]"></div>
        </div>
      )}
    </Fragment>
  );
}
