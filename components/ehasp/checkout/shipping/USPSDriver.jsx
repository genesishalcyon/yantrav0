import { convertOrdinal } from "@/lib/services/globalService";
import Image from "next/image";
import checkoutStore from "@/lib/store/checkoutStore";
import { shallow } from "zustand/shallow";
import DriverLayout from "/components/ehasp/checkout/shipping/DriverLayout";
export default function USPSDriver({ method }) {
  const [shippingMethodHandler, usps, serviceMethodHandler, uspsError] =
    checkoutStore(
      (state) => [
        state.shippingMethodHandler,
        state.usps,
        state.serviceMethodHandler,
        state.uspsError,
      ],
      shallow
    );

  const UspsIcon = () => (
    <Image alt="" src="/images/usps_icon.jpg" width={52} height={43} />
  );

  return (
    <DriverLayout
      onClick={() => {
        if (usps?.is_united_state_domestic) {
          checkoutStore.setState({
            shippingMethodHandler: method.id,
            serviceMethodHandler: {
              local: true,
              postage: usps?.package?.postage?.rate,
            },
          });
        }
      }}
      error={uspsError}
      active={method.id === shippingMethodHandler}
      name={method.name}
      driver={usps}
      amount={`$${usps?.package?.postage?.rate}`}
      multipleRate={!usps?.is_united_state_domestic}
      Icon={UspsIcon}
    >
      {usps?.package?.services?.map((service, i) => (
        <div
          key={i}
          className="w-full flex justify-between items-center pt-3 border-t-[1px] border-[#D9D9D9] text-[14px] leading-[23px]"
          onClick={() => {
            checkoutStore.setState({
              shippingMethodHandler: method.id,
              serviceMethodHandler: { ...service, order: i + 1 },
            });
          }}
        >
          <div>
            <p className="text-[#F05769]">
              {`${i + 1}${convertOrdinal(i + 1)} Rate`}
            </p>
            <p>{service.svc_commitment}</p>
          </div>

          <div className="flex flex-col items-end gap-y-2">
            <div
              className={`w-[16px] h-[16px] rounded-full ${
                service.id === serviceMethodHandler?.id
                  ? "border-[5px] border-[#F05769]"
                  : "border-[1px] border-[#E0E0E0]"
              }`}
            ></div>
            <p>${service.postage}</p>
          </div>
        </div>
      ))}
    </DriverLayout>
  );
}
