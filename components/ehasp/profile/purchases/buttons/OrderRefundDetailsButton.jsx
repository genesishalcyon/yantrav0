import OrderRefundDetailsModal from "@/components/ehasp/profile/purchases/modal/OrderRefundDetailsModal";
import ModalButton from "@/components/ehasp/partials/ModalButton";
export default function OrderRefundDetailsButton({}) {
  return (
    <div>
      <ModalButton
        id="refund-detail"
        className="w-full lg:min-w-[180px] bg-[#315589] px-6 py-3 rounded-[8px] text-[#FFFFFF] text-[14px] leading-[24px] font-[600]"
      >
        View Refund Details
      </ModalButton>
      <OrderRefundDetailsModal id="refund-detail" />
    </div>
  );
}
