import OrderCancellationDetailsModal from "@/components/ehasp/profile/purchases/modal/OrderCancellationDetailsModal";
import ModalButton from "@/components/ehasp/partials/ModalButton";
export default function OrderCancelDetailsButton({}) {
  return (
    <div>
      <ModalButton
        id="cancellation-detail"
        className="w-full lg:min-w-[180px] bg-[#EE3424] px-6 py-3 rounded-[26px] text-center text-[#FFFFFF] text-[14px] leading-[24px] font-[600]"
      >
        View Cancellation Details
      </ModalButton>
      <OrderCancellationDetailsModal id="cancellation-detail" />
    </div>
  );
}
