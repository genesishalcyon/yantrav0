import { shallow } from "zustand/shallow";
import CheckoutSuccessIcon from "@/components/svg/CheckoutSuccessIcon";
import ConfirmButton from "@/components/ehasp/partials/confirm/ConfirmButton";
import orderStore from "@/lib/store/orderStore";
export default function OrderFulfillButton({}) {
  const [order, onUpdateStatus, refetchOrder] = orderStore(
    (state) => [state.order, state.onUpdateStatus, state.refetchOrder],
    shallow
  );
  const triggerOnUpdateStatus = async () => {
    const payload = {
      type: "status",
      status: "fulfilled",
    };
    onUpdateStatus(order.reference, payload)
      .then(() => {
        refetchOrder();
      })
      .catch(() => {});
  };

  const info = () => (
    <div className="flex flex-col justify-center items-center">
      <CheckoutSuccessIcon />
      <h1 className="text-[40px] leading-[60px] font-[600] my-4">
        Thank you for purchasing
      </h1>
      <p className="text-[16px] leading-[23px]">
        This is fill in text. It is here temporarily, and will be replaced with
        the proper text shortly.
      </p>
    </div>
  );
  return (
    <div>
      <ConfirmButton
        icon={<CheckoutSuccessIcon className="m-auto" />}
        title="Fulfill this order?"
        continueLabel="Yes"
        className={`
        w-full lg:min-w-[180px] px-6 py-3 rounded-[26px] text-center font-poppins text-[#FFFFFF] text-[16px] leading-[24px] font-[600]
        ${
          order.status.toLowerCase() === "fulfilled"
            ? "bg-[#D9D9D9]"
            : "bg-[#315589]"
        }
      `}
        onContinue={triggerOnUpdateStatus}
        info={info}
        disabled={order.status.toLowerCase() === "fulfilled"}
      >
        Order Fulfilled
      </ConfirmButton>
    </div>
  );
}
