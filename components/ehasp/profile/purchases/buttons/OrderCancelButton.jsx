import OrderCancelModal from "@/components/ehasp/profile/purchases/modal/OrderCancelModal";
import ModalButton from "@/components/ehasp/partials/ModalButton";
export default function OrderCancelButton({}) {
  return (
    <div>
      <ModalButton
        id="order-cancel"
        className="w-full lg:min-w-[180px] bg-[#EE3424] px-6 py-3 rounded-[26px] text-center text-[#FFFFFF] text-[14px] leading-[24px] font-[600]"
      >
        Cancel Order
      </ModalButton>
      <OrderCancelModal id="order-cancel" />
    </div>
  );
}
