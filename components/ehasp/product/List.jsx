import productStore from "@/lib/store/productStore";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import FavoriteButton from "@/components/ehasp/product/partials/FavoriteButton";
import EmptyProducts from "@/components/ehasp/product/partials/EmptyProducts";
import ProductFeatured from "@/components/ehasp/product/partials/ProductFeatured";
import ProductPrice from "@/components/ehasp/product/partials/ProductPrice";
export default function List() {
  const [allProducts] = productStore((state) => [state.allProducts]);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  return (
    <>
      {allProducts?.length === 0 ? (
        <EmptyProducts />
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          {allProducts.map((product, i) => (
            <div
              key={i}
              className="relative cursor-pointer"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="relative w-full md:w-full h-[190px] sm:h-[290px] md:h-[350px] lg:h-[271px]">
                <Link prefetch={false} href={`/products/${product.slug}`}>
                  <Image
                    alt="Product Image"
                    src={
                      product?.media[0]?.original_url ||
                      "/images/placeholder.webp"
                    }
                    fill
                    priority
                    className={`object-cover object-center rounded-t-[8px] ${
                      hoveredProduct === product.id ? "" : "rounded-b-[8px]"
                    }`}
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
                      className="absolute-center z-10 w-full max-w-[184px] shadow-lg h-[52px] border-[2px] border-[#FFFFFF] rounded-[26px] flex justify-center items-center font-poppins text-[#FFFFFF] text-[16px] leading-[24px] font-[700]"
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
                className={`py-[2px] md:p-4 flex flex-col gap-y-3 pt-3 lg:pt-2 font-poppins ${
                  hoveredProduct === product.id
                    ? "bg-[#FFFFFF] rounded-b-[8px]"
                    : ""
                }`}
              >
                <ProductFeatured product={product} />
                <p className="text-[#231F20] text-[14px] leading-[16px] md:text-[16px] md:leading-[24px] font-[700] line-clamp-2">
                  {product.name}
                </p>
                <ProductPrice product={product} />
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
