import { maxQuantity } from "@/lib/services/productService";
export default function QuantityField({
  value,
  onChange,
  add,
  minus,
  className,
  disabled = false,
  max = maxQuantity,
}) {
  return (
    <div className="flex">
      <button
        className={`w-[35px] h-[35px] flex justify-center items-center text-[#FFFFFF] text-[16px] bg-[#F05769] rounded-full ${className} ${
          (value <= 1 || disabled) && "cursor-not-allowed bg-[#FF9DA9]"
        }`}
        onClick={() => {
          if (disabled) return;
          minus();
        }}
      >
        -
      </button>
      <input
        disabled={disabled}
        min={disabled ? 0 : 1}
        onChange={onChange}
        value={disabled ? 0 : value}
        type="number"
        className={`text-center w-[65px] text-[#555555] text-[16px] leading-[24px] font-[600] product-quantity ${
          disabled && "cursor-not-allowed bg-[#efefef]"
        }`}
      />

      <button
        className={`w-[35px] h-[35px] flex justify-center items-center text-[#FFFFFF] text-[16px] bg-[#F05769] rounded-full ${className} ${
          (value >= max || disabled) && "cursor-not-allowed bg-[#FF9DA9]"
        }`}
        onClick={() => {
          if (disabled) return;
          add();
        }}
      >
        +
      </button>
    </div>
  );
}
