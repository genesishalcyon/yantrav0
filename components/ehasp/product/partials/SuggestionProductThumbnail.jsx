import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import FavoriteButton from "@/components/ehasp/product/partials/FavoriteButton";
import { currency } from "@/lib/services/currencyService";
import persistentStore from "@/lib/store/persistentStore";
import productStore from "@/lib/store/productStore";
export default function SuggestionProductThumbnail({ product }) {
  const profile = persistentStore((state) => state.profile);
  const findPrice = productStore((state) => state.findPrice);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  return (
    <div
      className="flex flex-col items-center cursor-pointer"
      onMouseEnter={() => setHoveredProduct(product.id)}
      onMouseLeave={() => setHoveredProduct(null)}
    >
      <div className="relative w-full h-[130px] 2sm:h-[200px] sm:h-[290px] lg:h-[271px]">
        <Link prefetch={false} href={`/products/${product.slug}`}>
          <Image
            alt={product.media[0]?.file_name || "product-image"}
            src={product.media[0]?.original_url || "/images/placeholder.webp"}
            fill
            className="object-cover object-center rounded-[8px]"
          />
        </Link>
        <FavoriteButton
          product={product}
          className="absolute z-[500] top-[15px] right-[15px]"
        />
        {hoveredProduct === product.id && (
          <Link
            prefetch={false}
            href={`/products/${product.slug}`}
            className="hidden md:inline-block absolute top-0 left-0 z-10 w-full h-full bg-[#0000004d] rounded-t-[8px]"
          >
            <span
              className="absolute-center z-10 w-full max-w-[184px] shadow-lg h-[52px] border-[2px] border-[#FFFFFF] rounded-[8px] flex justify-center items-center font-poppins text-[#FFFFFF] text-[16px] leading-[24px] font-[700]"
              style={{ textShadow: "1px 1px 4px rgb(10 10 10)" }}
            >
              View Details
            </span>
          </Link>
        )}
      </div>
      <Link
        prefetch={false}
        href={`/products/${product.slug}`}
        className="w-full flex flex-col py-[2px] gap-y-[2px] md:gap-y-2 md:px-4 md:py-5 text-[14px] leading-[16px] md:text-[16px] md:leading-[24px]"
      >
        <p className="font-[600] text-ellipsis overflow-hidden line-clamp-2">
          {product.name}
        </p>
        <div className="flex gap-x-3">
          <p className="font-[600]">
            {`${currency} ${findPrice(
              profile,
              product,
              product.selling_price
            )}`}
            <span className="text-[#AAAAAA] line-through font-[400] ml-3">{`${currency} ${product.retail_price}`}</span>
          </p>
        </div>
      </Link>
    </div>
  );
}
