import authStore from "@/lib/store/authStore";
import { shallow } from "zustand/shallow";
import Address from "@/components/ehasp/auth/partials/Address";
export default function RegistrationAddress({}) {
  const [
    onChangeShippingAddress,
    onChangeBillingAddress,
    shippingAddress,
    billingAddress,
    registrationError,
  ] = authStore(
    (state) => [
      state.onChangeShippingAddress,
      state.onChangeBillingAddress,
      state.shippingAddress,
      state.billingAddress,
      state.registrationError,
    ],
    shallow
  );

  return (
    <>
      <div className="flex flex-col gap-y-12 bg-[#FFFFFF] rounded-[8px] p-12 my-8 border-[1px] border-solid border-[#CBCBCB]">
        <Address
          addressForm={shippingAddress}
          fieldOnChange={onChangeShippingAddress}
          title="Shipping Address"
          titleClassName="text-[#231F20] font-poppins text-[20px] font-[700] leading-normal tracking-[1px]"
          id="shipping"
          errors={registrationError}
        />
        <div className="flex items-center gap-x-2">
          <input
            id="shippingIsbilling"
            type="checkbox"
            checked={billingAddress.same_as_shipping}
            onChange={(e) =>
              onChangeBillingAddress({
                same_as_shipping: e?.target?.checked ? 1 : 0,
              })
            }
          />
          <label
            className="cursor-pointer text-[#374151] text-[14px] leading-[20px] font-[500]"
            htmlFor="shippingIsbilling"
          >
            Set this as Billing Address as well
          </label>
        </div>
      </div>
      {!billingAddress.same_as_shipping && (
        <div className="flex flex-col gap-y-4 bg-[#FFFFFF] rounded-[8px] p-8 pt-12 my-8 border-[1px] border-solid border-[#CBCBCB]">
          <Address
            addressForm={billingAddress}
            fieldOnChange={onChangeBillingAddress}
            title="Billing Address"
            titleClassName="font-poppins text-[#231F20] text-[20px] leading-[30px] font-[700] tracking-[1px]"
            id="billing"
            errors={registrationError}
          />
        </div>
      )}
    </>
  );
}
