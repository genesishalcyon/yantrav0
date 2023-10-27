import Image from "next/image";
import CashOnDeliveryIcon from "@/components/svg/CashOnDeliveryIcon";
import BankTransferIcon from "@/components/svg/BankTransferIcon";
export default function PurchasePaymentAndShippingMethod({ order }) {
  const RenderPaymentIcon = (gateway) => {
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

  const RenderShippingIcon = (driver) => {
    switch (driver) {
      case "ups":
        return (
          <Image alt="" src="/images/ups_icon.png" width={86} height={48} />
        );
      case "usps":
        return (
          <Image alt="" src="/images/usps_icon.jpg" width={52} height={43} />
        );
      case "auspost":
        return (
          <Image
            alt=""
            src="/images/australia_post_icon.png"
            width={55}
            height={48}
          />
        );
      case "store-pickup":
        return (
          <Image
            alt=""
            src="/images/store_pickup_icon.png"
            width={48}
            height={48}
          />
        );
    }
  };

  return (
    <div className="flex flex-col 2sm:flex-row justify-between items-center py-4 gap-y-5 2sm:gap-y-0 text-[#374151] text-[14px] leading-[20px]">
      <div className="flex items-center gap-x-2 w-full 2sm:w-[50%]">
        {RenderPaymentIcon(order?.payments?.gateway)}
        <div className="flex flex-col gap-y-1">
          <p className="text-[#555555]">Payment Method</p>
          <p className="font-[500] text-[#0A0903]">
            {order?.payments?.payment_method?.data?.title}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-x-2 w-full 2sm:w-[50%]">
        {RenderShippingIcon(order?.shippingMethod?.driver)}
        <div className="flex flex-col gap-y-1">
          <p className="text-[#555555]">Shipping Method</p>
          <p className="font-[500] text-[#0A0903]">
            {order?.shippingMethod?.name}
          </p>
        </div>
      </div>
    </div>
  );
}
