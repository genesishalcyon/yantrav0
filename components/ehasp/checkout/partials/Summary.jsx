import {
  paramsToString,
  removeEmptyAttribute,
} from "@/lib/services/globalService";
import { currency } from "@/lib/services/currencyService";
import CARTAPI from "@/lib/api/cart/request";
import cartStore from "@/lib/store/cartStore";
import checkoutStore from "@/lib/store/checkoutStore";
import persistentStore from "@/lib/store/persistentStore";
import addressStore from "@/lib/store/addressStore";
import DiscountForm from "@/components/ehasp/checkout/partials/DiscountForm";
import { shallow } from "zustand/shallow";
import { Fragment } from "react";
export default function Summary({ items = [], type }) {
  const [shippingMethod, serviceMethod] = checkoutStore((state) => [
    state.shippingMethod,
    state.serviceMethod,
    state.discountForm,
  ]);
  const [profile, discountForm, shipping, billing] = persistentStore(
    (state) => [
      state.profile,
      state.discountForm,
      state.shipping,
      state.billing,
    ],
    shallow
  );
  const [defaultAddress, checkoutAddress, trimAddress] = addressStore(
    (state) => [state.defaultAddress, state.checkoutAddress, state.trimAddress]
  );

  const cart_line_ids = items?.map((e) => e.id) || [];
  const billingAddress = checkoutAddress.billing || defaultAddress?.billing;
  const shippingAddress = checkoutAddress.shipping || defaultAddress?.shipping;
  const params = {
    cart_line_ids: profile ? cart_line_ids.join(",") : cart_line_ids,
    discount_code: discountForm?.discountCode || "",
    shipping_method_id: shippingMethod,
    service_id: serviceMethod?.id || "",
    shipping_address_id: type === "checkout" ? shippingAddress?.id : "",
    billing_address_id: type === "checkout" ? billingAddress?.id : "",
    shipping_address: shipping,
    billing_address: billing,
    customer: profile
      ? ""
      : {
          first_name: "Halcyon",
          last_name: "Developer",
        },
  };

  removeEmptyAttribute(params);
  const {
    data: summary,
    mutate: refetchSummary,
    isValidating: getSummaryLoading,
  } = CARTAPI.getSummarySwr(`?${paramsToString(params)}`, {
    render: profile && cart_line_ids.length,
    revalidateOnFocus: false,
    onSuccess: () => {
      cartStore.setState({ refetchSummary });
    },
  });

  const key = {
    discount: discountForm?.discountCode || "",
    address: paramsToString(shipping || {}),
    shippingMethod,
    serviceMethod: serviceMethod?.id || "",
    length: cart_line_ids.length,
  };
  removeEmptyAttribute(key);
  const {
    data: guestSummary,
    mutate: refetchGuestSummary,
    isValidating: postSummaryLoading,
  } = CARTAPI.postSummarySwr(paramsToString(key), params, {
    render: !profile && cart_line_ids.length,
    revalidateOnFocus: false,
    onSuccess: () => {
      cartStore.setState({ refetchSummary: refetchGuestSummary });
    },
  });

  const { discount, total, shipping_fee, sub_total, tax } =
    summary || guestSummary || {};

  const RenderDiscountValue = () => {
    const { discount_type, type, amount, total_savings } = discount || {};
    return (
      <div
        className={`flex justify-between font-poppins text-[16px] leading-[23px] border-y-[1px] p-4 ${
          discount_type === "order_sub_total"
            ? "text-[#8BC319] border-[#8BC319] bg-lime-50"
            : "text-[#18ACBA] border-[#18ACBA] bg-cyan-50"
        }`}
      >
        <p>
          {discountForm?.discountCode}
          {type === "percentage" && (
            <span className="ml-1 text-sm">({amount}% OFF)</span>
          )}
        </p>
        {type === "percentage" &&
        !shippingMethod &&
        discount_type === "delivery_fee" ? (
          "--"
        ) : (
          <p>{`- ${currency}${total_savings}`}</p>
        )}
      </div>
    );
  };

  const DisplayValue = ({ value }) => {
    return (
      <Fragment>
        {cart_line_ids?.length ? (
          <Fragment>
            {getSummaryLoading || postSummaryLoading
              ? "--"
              : `${currency} ${value || 0}`}
          </Fragment>
        ) : (
          "--"
        )}
      </Fragment>
    );
  };

  return (
    <div className="flex flex-col gap-y-5">
      <DiscountForm summary={summary || guestSummary} />
      <div className="flex flex-col gap-y-4">
        <p className="text-[#231F20] text-[16px] leading-[27px] font-[600] px-4">
          Summary
        </p>
        <div className="flex md:flex-col lg:flex-row justify-between text-[14px] md:text-[16px] leading-[23px] px-4">
          <p>Subtotal {tax?.display === "inclusive" && "(tax incl.)"}</p>
          <p>
            <DisplayValue value={sub_total?.initial_amount} />
          </p>
        </div>
        {discount?.discount_type === "order_sub_total" && (
          <RenderDiscountValue />
        )}
        <div className="flex md:flex-col lg:flex-row justify-between text-[14px] md:text-[16px] leading-[23px] px-4">
          <p>Shipping Fee</p>
          {type === "checkout" ? (
            <p>
              {shippingMethod ? (
                <DisplayValue value={shipping_fee?.initial_amount} />
              ) : (
                "--"
              )}
            </p>
          ) : (
            <p className="text-[#F05769] text-[12px] leading-[23px]">
              calculated at next step
            </p>
          )}
        </div>
        {discount?.discount_type === "delivery_fee" && <RenderDiscountValue />}
        {tax?.display !== "inclusive" && (
          <div className="flex md:flex-col lg:flex-row justify-between text-[14px] md:text-[16px] leading-[23px] px-4">
            <p>Tax</p>
            {type === "checkout" ? (
              <p>
                <DisplayValue value={tax?.amount} />
              </p>
            ) : (
              <p className="text-[#F05769] text-[12px] leading-[23px]">
                calculated at next step
              </p>
            )}
          </div>
        )}
      </div>
      <div className="px-4">
        <div className="flex md:flex-col lg:flex-row justify-between text-[#231F20] text-[16px] leading-[23px] font-[700]">
          <p>Total Summary</p>
          <p>
            <DisplayValue value={total} />
          </p>
        </div>
      </div>
    </div>
  );
}
