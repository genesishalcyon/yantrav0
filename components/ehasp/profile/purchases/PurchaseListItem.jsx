import Link from "next/link";
import Image from "next/image";
import ProductFeatured from "@/components/ehasp/product/partials/ProductFeatured";
import {
  formatProduct,
  formatImage,
  findCombination,
} from "@/lib/services/productService";
export default function PurchaseListItem({ order, item }) {
  return (
    <div className="flex bg-[#FFFFFF] px-6 py-8 border-b-[1px] border-[#E5E7EB]">
      <div className="flex flex-grow justify-start gap-4">
        <div className="w-fit">
          <Link href={`/products/${item?.purchasable?.product?.slug}`}>
            <div className="relative w-[83px] h-[83px] sm:w-[100px] sm:h-[100px]">
              <Image
                alt="order image"
                src={
                  item.media[0]?.attributes?.original_url ||
                  "/images/placeholder.webp"
                }
                fill
                priority
                className="object-cover object-center rounded-[8px]"
              />
            </div>
          </Link>
        </div>
        <div className="flex flex-col w-full gap-y-1 text-[#555555]">
          <ProductFeatured product={formatProduct(item)} redirect={true} />
          <Link href={`/products/${item?.purchasable?.product?.slug}`}>
            <p className="text-[14px] leading-[24px] md:text-[18px] md:leading-[27px] font-[600] text-[#231F20]">
              {formatProduct(item).name}
            </p>
          </Link>
          {item.purchasable?.combination && (
            <div className="flex gap-x-4 text-[12px] leading-[21px] md:text-[14px] md:leading-[23px] w-[150px] sm:w-[350px] md:w-[350px] lg:w-[500px] xl:w-[600px]">
              <p className="hidden md:inline">Variation</p>
              <p className="text-[#231F20] font-[600] overflow-hidden text-ellipsis">
                {findCombination(item?.purchasable?.combination)}
              </p>
            </div>
          )}
          <div className="flex justify-between">
            <div className="flex gap-x-4 text-[12px] leading-[21px] md:text-[14px] md:leading-[23px]">
              <p className="hidden md:inline">Quantity</p>
              <p className="text-[#231F20] font-[600]">{item.quantity}</p>
            </div>
            <div className="flex w-fit self-end text-[#231F20] font-[700] text-[14px] leading-[24px] md:text-[16px] md:leading-[27px]">
              {order?.currency?.symbol} {item.purchasable.selling_price}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
