import { useState } from "react";
import { useRouter } from "next/router";
import { shallow } from "zustand/shallow";
const { toast } = await import("react-toastify");
import { removeEmptyAttribute } from "@/lib/services/globalService";
import LoadingButton from "@/components/ehasp/partials/LoadingButton";
import persistentStore from "@/lib/store/persistentStore";
import checkoutStore from "@/lib/store/checkoutStore";
import ORDERAPI from "@/lib/api/order/request";
import addressStore from "@/lib/store/addressStore";
export default function CheckoutButtons() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [profile, reference, discountForm, guestShipping, guestBilling, guest] =
    persistentStore(
      (state) => [
        state.profile,
        state.reference,
        state.discountForm,
        state.shipping,
        state.billing,
        state.guest,
      ],
      shallow
    );
  const [paymentMethod, shippingMethod, serviceMethod] = checkoutStore(
    (state) => [state.paymentMethod, state.shippingMethod, state.serviceMethod]
  );
  const [defaultAddress, checkoutAddress, trimAddress] = addressStore(
    (state) => [state.defaultAddress, state.checkoutAddress, state.trimAddress]
  );

  const shipping = checkoutAddress.shipping || defaultAddress?.shipping;
  const billing = checkoutAddress.billing || defaultAddress?.billing;
  const isDisabled = () => {
    if (!profile) {
      // Guest
      return !(
        guestShipping &&
        guestBilling &&
        paymentMethod &&
        shippingMethod &&
        !loading &&
        reference &&
        guest.first_name &&
        guest.last_name &&
        guest.email &&
        guest.mobile
      );
    }

    return !(
      shipping?.id &&
      billing?.id &&
      reference &&
      paymentMethod &&
      shippingMethod &&
      !loading
    );
  };

  const triggerPlaceOrder = async () => {
    if (isDisabled()) return;
    setLoading(true);

    const addresses = profile
      ? {
          addresses: {
            shipping: shipping.id,
            billing: billing.id,
          },
        }
      : {
          addresses: {
            shipping: trimAddress(guestShipping),
            billing: trimAddress(guestBilling),
          },
        };

    const payload = {
      ...addresses,
      customer: profile ? "" : { ...guest },
      cart_reference: reference,
      payment_method: paymentMethod,
      shipping_method: shippingMethod,
      service_id: serviceMethod?.id || "",
      discount_code: discountForm?.discountCode || "",
    };
    removeEmptyAttribute(payload);
    await ORDERAPI.placedOrder(payload)
      .then((res) => {
        persistentStore.setState({ cartSelectedHandler: [] });
        const { order, payment } = res?.data;
        if (payment?.url) {
          window.location.href = payment.url;
        } else {
          router.replace(`/checkout/success?reference=${order.reference}`);
        }
      })
      .catch(() => {
        toast.error("Unable to proceed.", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setLoading(false);
      });

    // setLoading(false);
  };

  return (
    <div className="flex flex-col gap-y-4 text-center">
      <LoadingButton
        onClick={triggerPlaceOrder}
        loading={loading}
        loadingColor="bg-[#315589]"
        label="Place Order"
        labelLoading="Processing..."
        className={`inline-flex justify-center text-center w-full bg-[#315589] p-3.5 rounded-[26px] text-[#FFFFFF] text-[16px] leading-[24px] font-[600]
        ${isDisabled() && "cursor-not-allowed bg-[#315589] opacity-[0.5]"}`}
      />
      <button
        className="w-full bg-[#EE3424] p-3.5 rounded-[26px] text-[#FFFFFF] text-[16px] leading-[24px] font-[600]"
        onClick={() => router.push("/cart")}
      >
        Cancel
      </button>
    </div>
  );
}
