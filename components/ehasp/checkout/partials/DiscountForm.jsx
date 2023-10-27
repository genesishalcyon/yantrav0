import persistentStore from "@/lib/store/persistentStore";
import FormField from "@/components/ehasp/partials/forms/FormField";
import { useEffect, useMemo } from "react";
import { currency } from "@/lib/services/currencyService";
import cartStore from "@/lib/store/cartStore";
export default function DiscountForm({ summary = {} }) {
  const refetchSummary = cartStore((state) => state.refetchSummary);

  const [discountForm, onChangeCode] = persistentStore((state) => [
    state.discountForm,
    state.onChangeCode,
  ]);
  const { discount } = summary;
  const generateError = useMemo(() => {
    const discount_message = discount?.message;
    if (discount_message) {
      return { discount_message: [discount_message] };
    }
  }, [discount]);

  useEffect(() => {
    onChangeCode({ discountCodeHandler: discountForm.discountCode });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col gap-y-5 ">
      <div className="flex flex-col gap-y-4">
        <p className="text-[#231F20] text-[16px] leading-[27px] font-[600] px-4">
          Discount Code
        </p>
        <div className="flex gap-x-4 text-[16px] leading-[24px] px-4">
          <FormField
            type="text"
            name="discount_message"
            placeholder="Enter Code"
            wrapperclassname="w-full"
            className={`border-[1px] border-[#CBCBCB] rounded-[8px] w-full px-4 py-2 ${
              discount
                ? discount?.status === "valid"
                  ? "border-[#315589]"
                  : "border-[#EE3424]"
                : ""
            }`}
            value={discountForm.discountCodeHandler}
            onChange={(e) =>
              onChangeCode({ discountCodeHandler: e?.target?.value })
            }
            onClear={() => {
              onChangeCode({ discountCodeHandler: "", discountCode: "" });
            }}
            textClass={`${
              discount?.status === "valid" ? "text-[#315589]" : "text-[#EE3424]"
            }`}
            errors={generateError}
            errortype="bordertext"
          />
          <div>
            <button
              className="text-[16px] bg-[#315589] py-2 px-4 rounded-[26px] w-full max-w-[88px] text-[#FFFFFF] font-[600]"
              onClick={() => {
                onChangeCode({
                  discountCode: discountForm.discountCodeHandler,
                });
                // refetchSummary();
              }}
            >
              Apply
            </button>
          </div>
        </div>
        {/* {discount && discount.status === "valid" && (
          <div className="flex justify-between font-poppins text-[#555555] text-[16px] leading-[23px]">
            <p>Discount</p>
            <p>
              {discount.type === "fixed_value"
                ? `-${currency}${discount.amount}`
                : discount.type === "percentage"
                ? `-${currency}${discount.total_savings} (${discount.amount}% OFF)`
                : ""}
            </p>
          </div>
        )} */}
      </div>
      <div className="w-full h-[1px] bg-[#D9D9D9]"></div>
    </div>
  );
}
