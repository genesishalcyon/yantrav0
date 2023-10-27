import { useEffect } from "react";
import { sortASC } from "@/lib/services/globalService";
import { shallow } from "zustand/shallow";
import checkoutStore from "@/lib/store/checkoutStore";
import globalState from "@/lib/store/globalState";
import UPSDriver from "@/components/ehasp/checkout/shipping/UPSDriver";
import USPSDriver from "@/components/ehasp/checkout/shipping/USPSDriver";
import PickupDriver from "@/components/ehasp/checkout/shipping/PickupDriver";
import AuspostDriver from "@/components/ehasp/checkout/shipping/AuspostDriver";
export default function ShippingMethod() {
  const closeSideBar = globalState((state) => state.closeSideBar);
  const [shippingMethods, shippingMethodHandler, serviceMethodHandler] =
    checkoutStore(
      (state) => [
        state.shippingMethods,
        state.shippingMethodHandler,
        state.serviceMethodHandler,
      ],
      shallow
    );

  useEffect(() => {
    document.body.style.overflowY = "hidden";
    document.body.style.paddingRight = "17px";
    return () => {
      document.body.style.overflowY = "auto";
      document.body.style.paddingRight = "0px";
    };
  }, []);

  const Method = ({ method }) => {
    switch (method.driver) {
      case "usps":
        return <USPSDriver method={method} />;
      case "ups":
        return <UPSDriver method={method} />;
      case "store-pickup":
        return <PickupDriver method={method} />;
      case "auspost":
        return <AuspostDriver method={method} />;
    }
  };

  return (
    <div className="flex flex-col justify-between h-full overflow-y-auto notification-scroll px-4 pb-4 pt-[41px]">
      <div className="flex flex-col gap-y-4 mb-4">
        {sortASC(shippingMethods, "name").map((method, i) => (
          <Method key={i} method={method} />
        ))}
      </div>

      <div>
        <div className="grid grid-cols-2 gap-x-2">
          <button
            className="inline-flex justify-center text-center bg-[#315589] px-[16px] py-[8px] rounded-[26px] text-[#FFFFFF] text-[16px] leading-[24px] font-[600]"
            onClick={() => {
              checkoutStore.setState({
                shippingMethod: shippingMethodHandler,
                serviceMethod: serviceMethodHandler,
              });
              closeSideBar();
            }}
          >
            Save
          </button>
          <button
            onClick={closeSideBar}
            className="flex justify-center items-center bg-[#EE3424] px-[16px] py-[8px] rounded-[26px] text-[#FFFFFF] text-[14px] leading-[20px] font-[500]"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
