import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import CARTAPI from "@/lib/api/cart/request";
import LoadingButton from "@/components/ehasp/partials/LoadingButton";
import persistentStore from "@/lib/store/persistentStore";
import globalState from "@/lib/store/globalState";
import accountStore from "@/lib/store/accountStore";
import cartStore from "@/lib/store/cartStore";
const GUEST_FEATURE = process.env.NEXT_PUBLIC_GUEST_FEATURE;
import { shallow } from "zustand/shallow";
export default function CartButtons({}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const showAuthModal = globalState((state) => state.showAuthModal);
  const account = accountStore((state) => state.account);
  const [profile, cartSelectedHandler] = persistentStore(
    (state) => [state.profile, state.cartSelectedHandler],
    shallow
  );
  const filteredSelectedItems = cartStore(
    (state) => state.filteredSelectedItems
  );
  const selectedItems = filteredSelectedItems(cartSelectedHandler) || [];
  const checkout = async () => {
    if (
      account?.is_verified === true ||
      (GUEST_FEATURE === "true" && !profile)
    ) {
      if (selectedItems.length) {
        setLoading(true);
        await CARTAPI.checkout({
          cart_line_ids: selectedItems.map((n) => n.id),
        })
          .then((res) => {
            persistentStore.setState({
              reference: res.reference,
            });
            const redirect = profile ? "/checkout" : "/guest/checkout";
            router.push(redirect);
          })
          .catch(() => {
            toast.error("Unable to proceed.", {
              position: toast.POSITION.TOP_RIGHT,
            });
            setLoading(false);
          });
      }
    } else {
      showAuthModal("not-verified");
    }
  };

  const buttonLabel =
    account?.is_verified === true || (GUEST_FEATURE === "true" && !profile)
      ? "Checkout"
      : "Verify Your Account to Checkout";

  // const buttonClass = profile
  //   ? account?.is_verified && selectedItems.length
  //     ? "bg-[#315589]"
  //     : "cursor-not-allowed bg-[#315589] opacity-[0.5]"
  //   : selectedItems.length
  //   ? "bg-[#315589]"
  //   : "cursor-not-allowed bg-[#315589] opacity-[0.5]";
  // const buttonClass = profile
  //   ? account?.is_verified && selectedItems.length
  //     ? "bg-submit"
  //     : "cursor-not-allowed bg-submit-disable"
  //   : selectedItems.length
  //   ? "bg-submit"
  //   : "cursor-not-allowed bg-submit-disable";

  const buttonClass =
    account?.is_verified === true || (GUEST_FEATURE === "true" && !profile)
      ? selectedItems.length
        ? "bg-[#315589]"
        : "cursor-not-allowed bg-[#315589] opacity-[0.5]"
      : "bg-[#315589]";

  return (
    <div className="flex flex-col gap-y-4 text-center">
      <LoadingButton
        onClick={checkout}
        loading={loading}
        loadingColor="bg-[#315589]"
        label={buttonLabel}
        labelLoading="Processing..."
        className={`inline-flex justify-center text-center w-full p-3.5 rounded-[26px] text-[#FFFFFF] text-[16px] leading-[24px] font-[600] ${buttonClass}`}
      />
      <Link
        className="w-full bg-[#EE3424] p-3.5 rounded-[26px] text-[#FFFFFF] text-[16px] leading-[24px] font-[600]"
        href="/products"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
