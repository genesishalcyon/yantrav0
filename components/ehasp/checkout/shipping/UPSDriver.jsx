import Image from "next/image";
import checkoutStore from "@/lib/store/checkoutStore";
import { shallow } from "zustand/shallow";
import DriverLayout from "/components/ehasp/checkout/shipping/DriverLayout";
export default function UPSDriver({ method }) {
  const [shippingMethodHandler, ups, upsError] = checkoutStore(
    (state) => [state.shippingMethodHandler, state.ups, state.upsError],
    shallow
  );

  const UpsIcon = () => (
    <Image alt="" src="/images/ups_icon.png" width={86} height={48} />
  );
  return (
    <DriverLayout
      onClick={() => {
        if (ups) {
          checkoutStore.setState({
            shippingMethodHandler: method.id,
            serviceMethodHandler: {
              local: true,
              postage: ups?.package?.TotalCharges?.MonetaryValue,
            },
          });
        }
      }}
      error={upsError}
      active={method.id === shippingMethodHandler}
      name={method.name}
      driver={ups}
      amount={`$${ups?.package?.TotalCharges?.MonetaryValue}`}
      Icon={UpsIcon}
    ></DriverLayout>
  );
}
