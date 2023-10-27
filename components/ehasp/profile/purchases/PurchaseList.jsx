import { paramsToString, convertDate } from "@/lib/services/globalService";
import { Fragment, useRef } from "react";
import Link from "next/link";
import ORDERAPI from "@/lib/api/order/request";
import PurchaseStatus from "@/components/ehasp/profile/purchases/PurchaseStatus";
import ChevronIcon from "@/components/svg/ChevronIcon";
import EmptyPurchases from "@/components/ehasp/profile/purchases/EmptyPurchases";
import PurchaseFilter from "@/components/ehasp/profile/purchases/PurchaseFilter";
import PurchasePagination from "@/components/ehasp/profile/purchases/PurchasePagination";
import PurchaseListItem from "@/components/ehasp/profile/purchases/PurchaseListItem";
import { deserialize } from "@/lib/services/globalService";
import { shallow } from "zustand/shallow";
import purchaseStore from "@/lib/store/purchaseStore";
export default function PurchaseList({}) {
  const scrollIntoRef = useRef();
  const [sort, activeStatus, pagination] = purchaseStore(
    (state) => [state.sort, state.activeStatus, state.pagination],
    shallow
  );
  const parameters = {
    "page[size]": pagination?.per_page || 5,
    "page[number]": pagination?.current_page,
    sort,
    "filter[status]": activeStatus,
    include: "orderLines.review.media",
  };

  const { data, isValidating } = ORDERAPI.getOrdersSwr(
    `?${paramsToString(parameters)}`,
    {
      keepPreviousData: true,
      revalidateOnFocus: false,
    }
  );

  const orders = data ? deserialize(data) : [];

  return (
    <Fragment>
      <div className="flex flex-col gap-y-4">
        <div className="flex justify-end w-full mb-4" ref={scrollIntoRef}>
          <PurchaseFilter />
        </div>
        {orders.length === 0 && !isValidating ? (
          <EmptyPurchases />
        ) : (
          <div className="flex flex-col gap-y-8">
            {orders.map((order, i) => (
              <div
                key={i}
                className="flex flex-col border border-[#CBCBCB] rounded-lg"
              >
                <div className="flex flex-col gap-y-1 px-6 py-4 border-b-[1px] border-[#E5E7EB] rounded-t-[8px] bg-[#FFFFFF]">
                  <div className="flex flex-nowrap justify-between items-center gap-x-2">
                    <div className="w-[70%] flex flex-col justify-start">
                      <Link
                        href={`/account/purchases?reference=${order.reference}&index=1`}
                        className="w-full flex items-center 4sm:gap-x-4 text-[16px] leading-[21px] md:text-[18px] md:leading-[27px]"
                      >
                        <p className="hidden md:inline font-[600] whitespace-nowrap text-[#231F20]">
                          ORDER ID
                        </p>
                        <p className="max-w-[100px] 4sm:max-w-[100%] overflow-hidden text-ellipsis whitespace-nowrap">
                          #{order.reference}
                        </p>
                        <span className="w-[20px] bg-[#315589] rounded-full">
                          <ChevronIcon fill="#FFFFFF" />
                        </span>
                      </Link>
                      <p className="hidden md:inline text-[14px] text-[#555555] leading-[21px]">
                        {convertDate(order?.created_at, "MMM DD, YYYY hh:mm A")}
                      </p>
                    </div>
                    <div className="w-[30%] flex justify-end">
                      <PurchaseStatus status={order.status} />
                    </div>
                  </div>
                  <div className="md:hidden w-full flex justify-between text-[12px] leading-[18px]">
                    <p>Order ID</p>
                    <p>
                      {convertDate(order?.created_at, "MMM DD, YYYY hh:mm A")}
                    </p>
                  </div>
                </div>
                {order.orderLines?.map((item, i) => (
                  <PurchaseListItem key={i} order={order} item={item} />
                ))}
              </div>
            ))}
          </div>
        )}
        <PurchasePagination data={data} propRef={scrollIntoRef} />
      </div>
    </Fragment>
  );
}
