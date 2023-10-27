import BankTransferIcon from "@/components/svg/BankTransferIcon";
import Image from "next/image";
import CashOnDeliveryIcon from "@/components/svg/CashOnDeliveryIcon";
import ChevronIcon from "@/components/svg/ChevronIcon";
import SideBarButton from "@/components/ehasp/partials/SideBar/SideBarButton";
import globalState from "@/lib/store/globalState";
import checkoutStore from "@/lib/store/checkoutStore";
import PAYMENTAPI from "@/lib/api/payment/request";
import { deserialize } from "@/lib/services/globalService";
import { useMemo } from "react";
import { shallow } from "zustand/shallow";
export default function PaymentMethodButton() {
  // const paymentMethod = persistentStore((state) => state.paymentMethod);
  const [paymentMethods, paymentMethod] = checkoutStore(
    (state) => [state.paymentMethods, state.paymentMethod],
    shallow
  );
  PAYMENTAPI.getMethodsSwr("", {
    revalidateOnFocus: false,
    onSuccess: (res) => {
      const methods = deserialize(res.data);
      checkoutStore.setState({
        paymentMethods: methods,
      });
    },
  });

  const selectedMethod = useMemo(() => {
    return paymentMethods.find((e) => e.id === paymentMethod);
  }, [paymentMethod, paymentMethods]);

  const RenderIcon = (gateway) => {
    switch (gateway) {
      case "bank-transfer":
        return <BankTransferIcon />;
      case "paypal":
        return (
          <Image alt="" src="/images/paypal_icon.png" width={88} height={34} />
        );
      case "stripe":
        return (
          <Image alt="" src="/images/stripe_icon.png" width={68} height={28} />
        );
      case "manual":
        return <CashOnDeliveryIcon />;
    }
  };

  return (
    <SideBarButton
      className="px-4"
      onClick={() => {
        checkoutStore.setState({ paymentMethodHandler: paymentMethod });
        globalState.setState({
          sidebar: {
            open: true,
            type: "payment",
            title: "Select Payment Method",
          },
        });
      }}
    >
      <div className="flex justify-between items-center max-h-[80px] px-4 py-10 border-[1px] border-[#D9D9D9] rounded-[8px] text-[14px] leading-[23px]">
        {selectedMethod ? (
          <div className="flex items-center gap-x-4 font-[500]">
            {RenderIcon(selectedMethod.gateway)}{" "}
            {selectedMethod.gateway === "manual"
              ? "Cash on Delivery"
              : selectedMethod.name}
          </div>
        ) : (
          <p className="text-[#315589]">Select Payment Method</p>
        )}
        <ChevronIcon />
      </div>
    </SideBarButton>
  );
}
