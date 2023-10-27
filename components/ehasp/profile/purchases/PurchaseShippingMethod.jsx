import Image from "next/image";
import BankTransferIcon from "@/components/svg/BankTransferIcon";
export default function PurchaseShippingMethod({ shippingMethod }) {
  const RenderIcon = (driver) => {
    switch (driver) {
      case "ups":
        return (
          <Image alt="" src="/images/ups_icon.png" width={86} height={48} />
        );
      case "usps":
        return (
          <Image alt="" src="/images/usps_icon.jpg" width={52} height={43} />
        );
      case "store-pickup":
        return <BankTransferIcon fill="#315589" />;
    }
  };

  return (
    <div className="flex justify-between items-center py-4 ">
      {RenderIcon(shippingMethod?.driver)}
      <div className="w-[50%] text-[#231F20] text-[14px] leading-[20px] font-[500]">
        {shippingMethod?.name}
      </div>
    </div>
  );
}
