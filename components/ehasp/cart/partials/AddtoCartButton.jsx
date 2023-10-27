import { Fragment } from "react";
import { shallow } from "zustand/shallow";
import { removeEmptyAttribute } from "@/lib/services/globalService";
import { toast } from "react-toastify";
import LoadingButton from "@/components/ehasp/partials/LoadingButton";
import cartStore from "@/lib/store/cartStore";
import persistentStore from "@/lib/store/persistentStore";
import globalState from "@/lib/store/globalState";
import productStore from "@/lib/store/productStore";
const GUEST_FEATURE = process.env.NEXT_PUBLIC_GUEST_FEATURE;
export default function AddtoCartButton({ product, selectedVariant }) {
  const profile = persistentStore((state) => state.profile);
  const showAuthModal = globalState((state) => state.showAuthModal);
  const [addToCart, addingToCart, remarksForm] = cartStore(
    (state) => [state.addToCart, state.addingToCart, state.remarksForm],
    shallow
  );
  const quantity = productStore((state) => state.quantity);
  const triggerAddToCart = () => {
    if (
      (profile || GUEST_FEATURE === "true") &&
      (profile || product?.allow_guest_purchase === true)
    ) {
      const { notes, media } = remarksForm;
      const formattedMedia = media.map((n) => n.src);
      const remarks =
        product.allow_customer_remarks && (notes || formattedMedia.length)
          ? { notes, media: formattedMedia }
          : "";
      const payload = {
        purchasable_id: product.slug,
        variant_id: selectedVariant ? parseInt(selectedVariant.id) : null,
        purchasable_type: "Product",
        quantity,
        remarks,
      };
      removeEmptyAttribute(payload);
      addToCart(payload).catch((err) => {
        const { message = "Unable to add to cart." } = err?.data || {};
        toast.warning(message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
    } else {
      showAuthModal("login");
    }
  };

  const Findlabel = () => {
    if (
      selectedVariant?.stock === 0 ||
      (!selectedVariant && product.stock === 0) ||
      selectedVariant?.status === false
    ) {
      return "Out of Stock";
    } else {
      return "Add to Cart";
    }
  };

  return (
    <Fragment>
      <div className="flex-grow">
        {(selectedVariant &&
          selectedVariant?.status &&
          (selectedVariant?.stock > 0 || product?.allow_stocks === false)) ||
        (product.id &&
          (product.stock > 0 || product?.allow_stocks === false) &&
          product.productOptions.length === 0) ? (
          <LoadingButton
            onClick={triggerAddToCart}
            loading={addingToCart}
            loadingColor="bg-[#315589]"
            label={
              profile
                ? "Add to Cart"
                : GUEST_FEATURE === "true" &&
                  product?.allow_guest_purchase === false
                ? "Login to Purchase"
                : "Add to Cart"
            }
            labelLoading="Processing..."
            className={`w-full bg-[#315589] text-[#FFFFFF] text-[16px] leading-[24px] font-[600] py-4 px-2 rounded-[26px]`}
          />
        ) : (
          <button className="w-full bg-[#cecece] text-[#FFFFFF] text-[16px] leading-[24px] font-[600] py-4 px-2 rounded-[26px] cursor-not-allowed">
            <Findlabel />
          </button>
        )}
      </div>
    </Fragment>
  );
}
