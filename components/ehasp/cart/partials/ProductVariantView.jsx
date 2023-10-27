import { Fragment } from "react";
import { findCombination } from "@/lib/services/productService";
export default function ProductVariantView({ combination }) {
  return (
    <Fragment>
      {!!combination && (
        <div className="flex gap-x-4 text-[12px] md:text-[14px] leading-[21px] md:leading-[23px] ">
          <p className="text-[#555555]">Variation</p>
          <p className="overflow-hidden text-ellipsis text-[#231F20] font-[600]">
            {findCombination(combination)}
          </p>
          {/* <p className="line-clamp-1">{findCombination(combination)}</p> */}
        </div>
      )}
    </Fragment>
  );
}
