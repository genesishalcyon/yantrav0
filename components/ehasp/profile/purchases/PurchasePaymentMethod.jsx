import BankTransferIcon from "@/components/svg/BankTransferIcon";
import Image from "next/image";
import CashOnDeliveryIcon from "@/components/svg/CashOnDeliveryIcon";
export default function PurchasePaymentMethod({ payments }) {
  const RenderIcon = (gateway) => {
    switch (gateway) {
      case "bank-transfer":
        return <BankTransferIcon fill="#315589" />;
      case "paypal":
        return (
          <Image alt="" src="/images/paypal_icon.png" width={88} height={34} />
        );
      case "stripe":
        return (
          <Image alt="" src="/images/stripe_icon.png" width={68} height={28} />
        );
      case "manual":
        return <CashOnDeliveryIcon fill="#315589" />;
    }
  };

  return (
    <div className="flex justify-between items-center py-4">
      {RenderIcon(payments?.gateway)}
      {/* {payments?.gateway === "paypal" ? (
        <div className="w-[50%]">
          <p className="text-[#231F20] text-[14px] leading-[20px] font-[500]">
            Card Info
          </p>
          <p className="text-[#111827] text-[16px] leading-[24px]">
            ***** ***** ****03
          </p>
        </div>
      ) : (
        <p className="w-[50%] text-[#374151] text-[14px] leading-[20px] font-[500]">
          {payments?.gateway === "manual"
            ? "Cash on Delivery"
            : payments?.gateway === "stripe"
            ? "test@ehasp.com"
            : payments?.payment_method?.data?.title}
        </p>
      )} */}
      <p className="w-[50%] text-[#374151] text-[14px] leading-[20px] font-[500]">
        {payments?.gateway === "manual"
          ? "Cash on Delivery"
          : payments?.gateway === "stripe"
          ? "test@ehasp.com"
          : payments?.payment_method?.data?.title}
      </p>
    </div>
  );
}
