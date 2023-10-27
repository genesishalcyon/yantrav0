import persistentStore from "@/lib/store/persistentStore";
import SHIPPINGMETHODAPI from "@/lib/api/shippingMethod/request";
import addressStore from "@/lib/store/addressStore";
export default function ShippingRates() {
  const [shippingMethod, rateId] = persistentStore((state) => [
    state.shippingMethod,
    state.rateId,
  ]);
  const [defaultAddress, checkoutAddress] = addressStore((state) => [
    state.defaultAddress,
    state.checkoutAddress,
  ]);
  const shippingAddress = checkoutAddress.shipping || defaultAddress?.shipping;

  const { data: shippingMethods } = SHIPPINGMETHODAPI.getShippingMethodRatesSwr(
    shippingMethod,
    shippingAddress?.id,
    {
      render: shippingMethod && shippingAddress?.id,
      revalidateOnFocus: false,
    }
  );

  return (
    <div className="flex flex-col gap-y-4">
      To follow
      {[].map((rates, i) => (
        <div
          key={i}
          className="flex justify-between p-4 border-[1px] rounded-[8px] cursor-pointer"
          onClick={() => {
            persistentStore.setState({ rateId: method.id });
          }}
        >
          <div className="w-full flex flex-col gap-y-4 font-poppins text-[16px] leading-[23px]">
            <div className="flex justify-between">
              <p className="font-[600]">{method.name}</p>
              <div
                className={`w-[16px] h-[16px] rounded-full ${
                  method.id === rateId
                    ? "border-[5px] border-[#F05769]"
                    : "border-[1px] border-[#E0E0E0]"
                }`}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
