import checkoutStore from "@/lib/store/checkoutStore";
import { shallow } from "zustand/shallow";
import DriverLayout from "/components/ehasp/checkout/shipping/DriverLayout";
import Image from "next/image";
export default function AuspostDriver({ method }) {
  const [shippingMethodHandler, auspost, auspostError, serviceMethodHandler] =
    checkoutStore(
      (state) => [
        state.shippingMethodHandler,
        state.auspost,
        state.auspostError,
        state.serviceMethodHandler,
      ],
      shallow
    );

  const AustraliaPostIcon = () => (
    <Image
      alt=""
      src="/images/australia_post_icon.png"
      width={55}
      height={48}
    />
  );
  return (
    <DriverLayout
      error={auspostError}
      active={method.id === shippingMethodHandler}
      name={method.name}
      driver={auspost}
      multipleRate={true}
      Icon={AustraliaPostIcon}
    >
      {auspost?.package?.service?.map((service, i) => (
        <div
          key={i}
          className="w-full flex justify-between items-center pt-3 border-t-[1px] border-[#D9D9D9] font-poppins text-[#555555] text-[14px] leading-[23px]"
          onClick={() => {
            checkoutStore.setState({
              shippingMethodHandler: method.id,
              serviceMethodHandler: { ...service, id: service.code },
            });
          }}
        >
          <div>
            <p>{service.name}</p>
          </div>

          <div className="flex flex-col items-end gap-y-2">
            <div
              className={`w-[16px] h-[16px] rounded-full ${
                service.code === serviceMethodHandler?.code
                  ? "border-[5px] border-[#315589]"
                  : "border-[1px] border-[#E0E0E0]"
              }`}
            ></div>
            <p>${service.price}</p>
          </div>
        </div>
      ))}
    </DriverLayout>
  );
}
