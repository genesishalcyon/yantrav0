import checkoutStore from "@/lib/store/checkoutStore";
import { shallow } from "zustand/shallow";
import DriverLayout from "/components/ehasp/checkout/shipping/DriverLayout";
import Image from "next/image";
export default function PickupDriver({ method }) {
  const [shippingMethodHandler, storepickup, storepickupError] = checkoutStore(
    (state) => [
      state.shippingMethodHandler,
      state.storepickup,
      state.storepickupError,
    ],
    shallow
  );

  const StorePickupIcon = () => (
    <Image alt="" src="/images/store_pickup_icon.png" width={48} height={48} />
  );

  return (
    <DriverLayout
      onClick={() => {
        checkoutStore.setState({
          shippingMethodHandler: method.id,
        });
      }}
      error={storepickupError}
      active={method.id === shippingMethodHandler}
      name={method.name}
      driver={storepickup}
      amount="No Fee"
      Icon={StorePickupIcon}
    ></DriverLayout>
  );
}
