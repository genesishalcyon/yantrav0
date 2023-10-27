import BaseModal from "@/components/ehasp/partials/BaseModal";
import LoadingButton from "@/components/ehasp/partials/LoadingButton";
import orderStore from "@/lib/store/orderStore";
import { useRef } from "react";
import { toast } from "react-toastify";
export default function OrderCancelModal({ id }) {
  const ref = useRef("");
  const [
    order,
    orderStatusForm,
    orderStatusFormOnChanged,
    onUpdateStatus,
    refetchOrder,
  ] = orderStore((state) => [
    state.order,
    state.orderStatusForm,
    state.orderStatusFormOnChanged,
    state.onUpdateStatus,
    state.refetchOrder,
  ]);
  const triggerOnUpdateStatus = () => {
    const payload = {
      ...orderStatusForm,
      status: "cancelled",
    };
    onUpdateStatus(order.reference, payload).then(() => {
      refetchOrder();
      ref.current.click();
      toast.success("Order Cancelled!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    });
  };
  return (
    <BaseModal id={id} data={{ title: "Order Cancellation" }}>
      <div className="relative overflow-auto p-4">
        <div className="mb-4">
          <label className="text-[#555555] text-[14px] font-[500]">
            Enter cancellation reason <span className="text-[#EE3424]">*</span>
          </label>
          <textarea
            className="p-4 w-full h-[200px] border-[1px] border-[cecece] rounded-lg"
            value={orderStatusForm?.notes || ""}
            placeholder="Enter cancellation reason"
            onChange={(e) =>
              orderStatusFormOnChanged({ notes: e?.target?.value })
            }
          ></textarea>
        </div>
      </div>
      <div className="px-4 py-5 mt-auto flex justify-center md:justify-start gap-x-4 text-[#FFFFFF] text-[14px] leading-[20px] font-[500]">
        <LoadingButton
          onClick={triggerOnUpdateStatus}
          loadingColor="bg-[#C1DD8A]"
          label="Save"
          labelLoading="Processing..."
          className="flex justify-center items-center bg-[#315589] py-[14px] md:py-[8px] px-[16px] rounded-[26px] w-full max-w-[190px] md:w-auto md:max-w-auto"
        />

        <button
          className="flex justify-center items-center bg-[#EE3424] py-[14px] md:py-[8px] px-[16px] rounded-[26px] w-full max-w-[190px] md:w-auto md:max-w-auto"
          ref={ref}
          data-te-modal-dismiss
          aria-label="Close"
        >
          Close
        </button>
      </div>
    </BaseModal>
  );
}
