import Image from "next/image";
import BaseModal from "@/components/ehasp/partials/BaseModal";
import orderStore from "@/lib/store/orderStore";
export default function OrderCancellationDetailsModal({ id }) {
  const order = orderStore((state) => state.order);
  return (
    <BaseModal id={id} data={{ title: "Order Cancellation Details" }}>
      <div className="relative overflow-auto p-4 flex flex-col gap-y-6 text-[16px] leading-[23px]">
        <div className="flex flex-col gap-y-2">
          <p>Reason</p>
          <p className="border-[1px] border-[#555555] rounded-[8px] p-4">
            {order?.payments?.remarks === "declined"
              ? order?.payments?.admin_message
              : order?.cancelled_reason || "N/A"}
          </p>
        </div>
      </div>
    </BaseModal>
  );
}
