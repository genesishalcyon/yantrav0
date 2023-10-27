import { useState } from "react";
import LoadingIcon from "@/components/svg/LoadingIcon";
import ChevronIcon from "@/components/svg/ChevronIcon";
import REVIEWAPI from "@/lib/api/review/request";
import ReactPaginate from "react-paginate";
import { deserialize, paramsToString } from "@/lib/services/globalService";
import ReviewSummary from "@/components/ehasp/product/review/ReviewSummary";
import ReviewList from "@/components/ehasp/product/review/ReviewList";
import ReviewFilter from "@/components/ehasp/product/review/ReviewFilter";
export default function ProductReviews({ product }) {
  const [sort, setSort] = useState("desc");
  const [pagination, setPagination] = useState({
    current_page: 1,
    per_page: 3,
  });
  const parameters = {
    "page[size]": pagination?.per_page,
    "page[number]": pagination?.current_page,
    include: "media,customer.media",
    "filter[rating]": sort,
  };
  const { data, isValidating: isReviewsLoading } = REVIEWAPI.listReviewsSwr(
    `${product?.id}?${paramsToString(parameters)}`,
    {
      render: product?.id,
      revalidateOnFocus: false,
    }
  );
  const reviews = data ? deserialize(data) : [];
  const meta = data?.meta || {};
  return (
    <div className="rounded-[8px]">
      <div className="flex flex-wrap justify-between items-center gap-y-4 px-4 md:px-10 pt-4 md:pt-8 pb-4 md:border-b-[2px] border-[#D9D9D9]">
        <p className="w-full md:w-auto text-[24px] leading-[24px] font-[700] md:text-[32px] md:leading-[48px] md:font-[600]">
          Customer Reviews
        </p>
        <ReviewFilter sort={sort} setSort={setSort} />
      </div>
      <ReviewSummary product={product} />
      {isReviewsLoading ? (
        <div className="h-[800px] flex justify-center items-center">
          <LoadingIcon className="mr-3 h-10 w-10" />
        </div>
      ) : (
        <ReviewList reviews={reviews} />
      )}
      <div className="flex justify-center pt-8 pb-12">
        {meta?.last_page !== 1 && (
          <ReactPaginate
            className="flex flex-nowrap justify-center sm:justify-end items-center col-span-2 sm:col-span-1 order-1 sm:order-3"
            breakLabel="..."
            nextLabel={<ChevronIcon />}
            nextClassName="px-[5px] w-[32px] h-[32px] flex justify-center items-center"
            onPageChange={(e) => {
              const pageNumber = e.selected + 1;
              setPagination((value) => {
                return {
                  ...value,
                  current_page: pageNumber,
                };
              });
            }}
            forcePage={(meta?.current_page || 1) - 1}
            pageRangeDisplayed={9}
            pageCount={meta?.last_page || 1}
            previousLabel={<ChevronIcon className="rotate-[-180deg]" />}
            previousClassName="px-[5px] w-[32px] h-[32px] flex justify-center items-center"
            renderOnZeroPageCount={null}
            disabledClassName="hidden"
            breakClassName="text-[#9E9E9E] text-[14px] leading-[20px] font-[500] flex justify-center items-center"
            activeClassName="text-[#D81B60] border-[2px] rounded-[8px] border-[#D81B60] bg-[#FFF3F7]"
            pageClassName="text-[#9E9E9E] text-[14px] leading-[20px] font-[500] w-[32px] h-[32px] flex justify-center items-center"
          />
        )}
      </div>
    </div>
  );
}
