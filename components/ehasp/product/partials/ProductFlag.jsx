import { Fragment } from "react";
export default function ProductFlag({ item }) {
  return (
    <Fragment>
      {(item?.is_special_offer || item?.is_featured) && (
        <p className="w-auto flex justify-center absolute top-0 left-0 p-3 rounded-br-[8px] font-poppins text-[#FFFFFF] text-[12px] leading-[23px] font-[600]">
          {item?.is_special_offer && (
            <span
              className={`w-[110px] text-center bg-[#F05769] px-3 py-1 rounded-[26px] ${
                !item.is_featured && "rounded-[26px]"
              }`}
            >
              Special Offer
            </span>
          )}
          {item?.is_featured && (
            <span
              className={`text-center bg-[#315589] px-3 py-1 rounded-[26px] text-xs font-[400] ${
                !item.is_special_offer && "rounded-[26px]"
              }`}
            >
              Featured
            </span>
          )}
        </p>
      )}
    </Fragment>
  );
}
