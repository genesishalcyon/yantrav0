import { Fragment, useEffect } from "react";
import ChevronIcon from "@/components/svg/ChevronIcon";
import ReactPaginate from "react-paginate";
import { shallow } from "zustand/shallow";
import purchaseStore from "@/lib/store/purchaseStore";
import { useRouter } from "next/router";
import {
  paramsToString,
  removeEmptyAttribute,
} from "@/lib/services/globalService";
export default function PurchasePagination({ data, propRef }) {
  const router = useRouter();
  const [pages, activeStatus, pagination] = purchaseStore(
    (state) => [state.pages, state.activeStatus, state.pagination],
    shallow
  );
  const meta = data?.meta || {};
  const onPageChange = (e) => {
    propRef.current.scrollIntoView();
    const pageNumber = e.selected + 1;
    purchaseStore.setState({
      pagination: {
        ...pagination,
        current_page: pageNumber,
      },
    });
    const params = {
      status: activeStatus,
      page: pageNumber,
    };
    removeEmptyAttribute(params);
    router.replace(`/account/purchases?${paramsToString(params)}`, undefined, {
      shallow: true,
    });
  };
  useEffect(() => {
    const queryString = window?.location?.search;
    const urlParams = new URLSearchParams(queryString);
    const page = urlParams.get("page");
    purchaseStore.setState({
      pagination: {
        current_page: page,
      },
    });
  }, []);
  return (
    <Fragment>
      {meta?.total > 0 && (
        <div className="flex flex-wrap justify-center md:justify-between items-center gap-y-4 p-2 rounded-[8px] bg-[#FFFFFF]">
          <div className="w-auto flex items-center gap-x-2 text-sm font-medium text-[#111827]">
            <div className="relative">
              <select
                value={pagination.per_page}
                className="relative outline-none appearance-none bg-transparent border-[1px] border-[#D1D5DB] rounded-[26px] pl-[12px] pr-[28px] py-3 shadow-sm text-[#111827] z-20"
                onChange={(e) => {
                  if (e?.target?.value) {
                    propRef.current.scrollIntoView();
                    purchaseStore.setState({
                      pagination: {
                        ...pagination,
                        current_page: 1,
                        per_page: e?.target?.value,
                      },
                    });
                  }
                }}
              >
                {pages.map((e, i) => (
                  <option key={i} value={e}>
                    {e}
                  </option>
                ))}
              </select>
              <div className="absolute right-[8px] top-[50%] translate-y-[-50%] z-10">
                <ChevronIcon className="rotate-[90deg]" fill="#6B7280" />
              </div>
            </div>
            <p>per page</p>
          </div>
          {meta?.last_page !== 1 && (
            <ReactPaginate
              className="w-full md:w-auto flex flex-nowrap justify-center items-center col-span-2 sm:col-span-1"
              breakLabel="..."
              nextLabel={<ChevronIcon />}
              nextClassName="px-[5px] w-[32px] h-[32px] flex justify-center items-center border-y-[1px] border-r-[1px] border-[#D1D5DB] rounded-r-[8px]"
              onPageChange={onPageChange}
              forcePage={(meta?.current_page || 1) - 1}
              pageRangeDisplayed={5}
              pageCount={meta?.last_page || 1}
              previousLabel={<ChevronIcon className="rotate-[-180deg]" />}
              previousClassName="px-[5px] w-[32px] h-[32px] flex justify-center items-center border-y-[1px] border-l-[1px] border-[#D1D5DB] rounded-l-[8px]"
              renderOnZeroPageCount={null}
              disabledClassName="hidden"
              breakClassName="text-[#9E9E9E] text-[14px] leading-[20px] font-[500] flex justify-center items-center"
              activeClassName="text-[#D81B60] border-[2px] rounded-[8px] border-[#D81B60] bg-[#FFF3F7]"
              pageClassName="text-[#9E9E9E] text-[14px] leading-[20px] font-[500] w-[32px] h-[32px] flex justify-center items-center border-y-[1px] border-[#D1D5DB]"
            />
          )}
        </div>
      )}
    </Fragment>
  );
}
