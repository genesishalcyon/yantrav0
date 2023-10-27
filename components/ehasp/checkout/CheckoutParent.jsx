import Checkout from "@/components/ehasp/checkout/Checkout";
import Summary from "@/components/ehasp/checkout/partials/Summary";
import CARTAPI from "@/lib/api/cart/request";
import { auth, deserialize } from "@/lib/services/globalService";
import persistentStore from "@/lib/store/persistentStore";
import CheckoutButtons from "@/components/ehasp/checkout/partials/CheckoutButtons";
import PaymentMethodButton from "@/components/ehasp/checkout/payment/PaymentMethodButton";
import ShippingMethodButton from "@/components/ehasp/checkout/shipping/ShippingMethodButton";
import { useRouter } from "next/router";
export default function CheckoutParent() {
  const router = useRouter();
  const reference = persistentStore((state) => [state.reference]);
  const { data: products, isValidating } = CARTAPI.getCheckoutItemsSwr(
    `?include=purchasable&reference=${reference}`,
    {
      render: reference,
      onError: (err) => {
        if (err.status === 400) {
          router.replace("/cart");
        }
      },
    }
  );
  const items = products ? deserialize(products) : [];
  return (
    <div className="max-w-xl mx-auto pt-6 pb-12 bg-[#F8F8F9] px-4 xl:px-0">
      <p className="text-[24px] md:text-[30px] font-[600]">Checkout</p>
      <div className="flex flex-wrap md:flex-nowrap gap-x-4 gap-y-8 mt-6">
        <div className="w-full md:w-2/3 flex flex-col gap-y-4">
          <Checkout items={items} loading={isValidating} />
        </div>
        <div className="w-full md:w-1/3 flex flex-col gap-y-8">
          <div className="flex flex-col py-5 gap-y-4 rounded-[8px] bg-[#FFFFFF] border border-[#CBCBCB] ">
            <p className="text-[16px] leading-[27px] font-[600] px-4">
              Payment Method
            </p>
            <PaymentMethodButton />
            <p className="text-[16px] leading-[27px] font-[600] px-4">
              Shipping Method
            </p>
            <ShippingMethodButton items={items} />
            <div className="px-4">
              <div className="w-full h-[1px] bg-[#D9D9D9]"></div>
            </div>
            <Summary items={items} type="checkout" />
          </div>
          <CheckoutButtons />
        </div>
      </div>
    </div>
  );
}
