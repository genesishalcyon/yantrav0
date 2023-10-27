import PurchaseStatus from "@/components/ehasp/profile/purchases/PurchaseStatus";
import { convertDate } from "@/lib/services/globalService";
export default function PurchaseSummary({ order }) {
  return (
    <div className="flex flex-col rounded-[8px] mb-8 border border-[#CBCBCB]">
      <div className="bg-[#F3F4F6]">
        <p className="text-[#111827] text-[20px] leading-[28px font-[700] p-4">
          Summary
        </p>
      </div>
      <div className="flex flex-col gap-y-4 p-4 text-[#374151] text-[14px] leading-[20px] font-[500] bg-[#FFFFFF]">
        <div className="hidden lg:flex items-center justify-between">
          Status <PurchaseStatus status={order.status} />
        </div>
        <div className="flex flex-nowrap justify-between">
          <p>Order Date</p>
          <p>{convertDate(order.created_at, "MMM DD, YYYY hh:mm A")}</p>
        </div>
        <div className="h-[1px] w-full bg-[#CBCBCB]"></div>
        <div className="flex flex-nowrap justify-between">
          <p>Subtotal {order?.tax_display === "inclusive" && "(tax incl.)"}</p>
          <p>
            {order?.currency?.symbol} {order.sub_total}
          </p>
        </div>
        <div className="flex flex-nowrap justify-between">
          <p>Shipping Fee</p>
          <p>
            {order?.currency?.symbol} {order.shipping_total}
          </p>
        </div>

        {order?.tax_display === "exclusive" && (
          <div className="flex flex-nowrap justify-between">
            <p>Tax ({order?.tax_percentage}%)</p>
            <p>
              {order?.currency?.symbol} {order.tax_total}
            </p>
          </div>
        )}

        {!!Number(order.discount_total) && (
          <div className="flex flex-nowrap justify-between">
            <p>Discount</p>
            <p>
              -{order?.currency?.symbol} {order.discount_total}
            </p>
          </div>
        )}
        <div className="flex flex-nowrap justify-between text-[#315589]">
          <p>Grand Total</p>
          <p>
            {order?.currency?.symbol} {order.total}
          </p>
        </div>
      </div>
    </div>
  );
}
