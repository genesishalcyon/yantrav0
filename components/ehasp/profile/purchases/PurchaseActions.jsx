import OrderFulfillButton from "@/components/ehasp/profile/purchases/buttons/OrderFulfillButton";
import OrderReceiptButton from "@/components/ehasp/profile/purchases/buttons/OrderReceiptButton";
import ContinuePayment from "@/components/ehasp/profile/purchases/buttons/ContinuePayment";
import OrderCancelButton from "@/components/ehasp/profile/purchases/buttons/OrderCancelButton";
import OrderCancelDetailsButton from "@/components/ehasp/profile/purchases/buttons/OrderCancelDetailsButton";
import OrderRefundDetailsButton from "@/components/ehasp/profile/purchases/buttons/OrderRefundDetailsButton";
import OrderUploadProofButton from "@/components/ehasp/profile/purchases/buttons/OrderUploadProofButton";
import OrderBankProofDetailsButton from "@/components/ehasp/profile/purchases/buttons/OrderBankProofDetailsButton";
import BankTransferInstructionButton from "@/components/ehasp/profile/purchases/buttons/BankTransferInstructionButton";
export default function PurchaseActions({ order, className }) {
  const adminCancelled =
    order.status === "cancelled" && order.payments.remarks === "declined";
  const customerCancelled =
    order.status === "cancelled" && order.payments.remarks === null;
  return (
    <>
      <div
        className={
          className
            ? className
            : "flex flex-wrap flex-col sm:flex-row justify-end gap-4 bg-[#FFFFFF] p-6"
        }
      >
        {order.is_paid && <OrderReceiptButton />}

        {["delivered"].includes(order.status) &&
          (order.is_paid ||
            order.payments.payment_method.data.gateway === "manual") && (
            <OrderFulfillButton />
          )}

        {["pending", "for_payment"].includes(order.status) && (
          <OrderCancelButton />
        )}
        {order.status === "cancelled" && <OrderCancelDetailsButton />}
        {order.status === "refunded" && <OrderRefundDetailsButton />}
        {order?.payments?.gateway === "bank-transfer" && (
          <div className="flex flex-col gap-y-4">
            {order.status === "for_payment" && <OrderUploadProofButton />}
            {order.status !== "for_payment" && !customerCancelled && (
              <OrderBankProofDetailsButton />
            )}
            {!customerCancelled && <BankTransferInstructionButton />}
            {adminCancelled && (
              <p className="w-full bg-[#FFE9E8] p-4 rounded-[8px] border-[1px] border-[#EE3424] font-poppins text-[#EE3424] text-[14px] leading-[23px] font-[500]">
                Admin declined your bank transfer
              </p>
            )}
          </div>
        )}
        <ContinuePayment order={order} />
      </div>
    </>
  );
}
