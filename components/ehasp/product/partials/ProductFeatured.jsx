import Link from "next/link";
export default function ProductFeatured({ product, redirect }) {
  return (
    <div className="flex flex-nowrap items-center gap-x-2">
      {product?.is_special_offer && (
        <Link
          href={redirect ? "/products?special-offer=1" : "#"}
          className="text-[#FFFFFF] rounded-[26px] px-3 py-1 bg-[#F05769] text-[12px] leading-[16px] md:leading-[18px]"
        >
          Special Offer
        </Link>
      )}
      {product?.is_special_offer && product?.is_featured && (
        <span className="text-[#AAAAAA] text-[16px] leading-[24px]">|</span>
      )}
      {product?.is_featured && (
        <Link
          href={redirect ? "/products?featured=1" : "#"}
          className="text-[#FFFFFF] rounded-[26px] px-3 py-1 bg-[#315589] text-[12px] leading-[16px] md:leading-[18px]"
        >
          Featured
        </Link>
      )}
    </div>
  );
}
