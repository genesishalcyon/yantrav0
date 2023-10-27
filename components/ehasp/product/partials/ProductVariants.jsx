import productStore from "@/lib/store/productStore";
export default function ProductVariants({ product }) {
  const productOptions = product?.productOptions || [];
  const variants = product?.productVariants || [];
  const selectAttributes = productStore((state) => state.selectAttributes);
  const mapEntries = (attribute) => {
    const entries = [];
    variants.forEach((variant) => {
      const value = variant.combination.find(
        (e) => e.option === attribute
      )?.option_value;
      if (value) {
        entries.push(
          variant.combination.find((e) => e.option === attribute)?.option_value
        );
      }
    });
    return [...new Set(entries)]; // Remove Duplicate Entry
  };

  return (
    <div className="flex flex-col gap-y-4">
      {productOptions.map((option, i) => (
        <div
          key={i}
          className="flex flex-col gap-y-4 text-[16px] leading-[23px]"
        >
          <p className="capitalize">{option.name}</p>
          <div className="flex flex-wrap gap-2">
            {mapEntries(option.name).map((entry, i) => (
              <button
                key={i}
                className={`rounded-[8px] text-[14px] capitalize text-ellipsis overflow-hidden ${
                  selectAttributes[option.name] === entry
                    ? "border-[#F05769] border-[2px] px-[15px] py-[7px] bg-[#F05769] text-[#FFFFFF]"
                    : "border-[#555555] border-[1px] px-[16px] py-[8px]"
                }`}
                onClick={() => {
                  productStore.setState({
                    selectAttributes: {
                      ...selectAttributes,
                      [option.name]: entry,
                    },
                  });
                }}
              >
                {entry}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
