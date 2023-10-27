import { useState } from "react";
import LoadingButton from "@/components/ehasp/partials/LoadingButton";
import ORDERAPI from "@/lib/api/order/request";
import orderStore from "@/lib/store/orderStore";
export default function ContinuePayment({}) {
  const order = orderStore((state) => state.order);
  const [loading, setLoading] = useState(false);
  return (
    <div>
      {order.status === "for_payment" &&
        !["bank-transfer", "manual"].includes(order?.payments?.gateway) && (
          <LoadingButton
            onClick={() => {
              if (order?.payments?.payment_method?.data?.slug) {
                setLoading(true);
                ORDERAPI.continuePayment(order.reference, {
                  type: order.payments.payment_method.data.slug,
                }).then((res) => {
                  window.location.href = res.url;
                });
              }
            }}
            loading={loading}
            loadingColor="bg-[#315589]"
            label="Continue Payment"
            labelLoading="Processing..."
            className={`justify-center inline-flex items-center w-full lg:min-w-[180px] bg-[#315589] px-6 py-3 rounded-[26px] text-center text-[#FFFFFF] text-[16px] leading-[24px] font-[600]`}
          />
        )}
    </div>
  );
}
