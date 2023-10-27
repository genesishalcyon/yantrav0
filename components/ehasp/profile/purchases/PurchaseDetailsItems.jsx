import { Fragment, useState } from "react";
import ProductFeatured from "@/components/ehasp/product/partials/ProductFeatured";
import RemarksDetailsModal from "@/components/ehasp/profile/purchases/modal/RemarksDetailsModal";
import ReviewFormModal from "@/components/ehasp/profile/purchases/modal/ReviewFormModal";
import ReviewDetailsModal from "@/components/ehasp/profile/purchases/modal/ReviewDetailsModal";
import orderStore from "@/lib/store/orderStore";
import Image from "next/image";
import Link from "next/link";
import PurchaseItemButton from "@/components/ehasp/profile/purchases/PurchaseItemButton";
import {
  formatProduct,
  formatImage,
  findCombination,
} from "@/lib/services/productService";
export default function PurchaseDetailsItems({ refetchOrder }) {
  const order = orderStore((state) => state.order);
  const items = order?.orderLines || [];
  const [activeItem, setActiveItem] = useState();
  return (
    <Fragment>
      <div className="flex flex-col bg-[#FFFFFF] p-5 rounded-[8px] gap-y-6 border border-[#CBCBCB]">
        {items.map((item, i) => (
          <div
            key={i}
            className={`relative ${
              items.length - 1 !== i
                ? "pb-6 border-b-[1px] border-[#CBCBCB]"
                : ""
            }`}
          >
            <div className="flex gap-x-4 gap-y-5">
              <div className="w-fit">
                <Link href={`/products/${item?.purchasable?.product?.slug}`}>
                  <div className="relative w-[86px] h-[86px] md:w-[120px] md:h-[120px] lg:w-[174px] lg:h-[174px]">
                    <Image
                      alt="Remarks Details"
                      src={
                        formatImage(item).original_url ||
                        "/images/placeholder.webp"
                      }
                      fill
                      priority
                      className="object-cover object-center rounded-[8px]"
                    />
                  </div>
                </Link>
              </div>
              <div className="flex flex-col flex-grow gap-y-2 font-poppins text-[#555555]">
                <div>
                  <ProductFeatured
                    product={formatProduct(item)}
                    redirect={true}
                  />
                  <Link href={`/products/${item?.purchasable?.product?.slug}`}>
                    <p className="text-[16px] md:text-[18px] leading-[24px] font-[600] text-[#0A0903]">
                      {formatProduct(item).name}
                    </p>
                  </Link>
                  <p className="text-[10px] leading-[16px] md:text-[12px] md:leading-[23px] capitalize">
                    {item?.purchasable?.sku}
                  </p>
                </div>
                <div className="flex w-full gap-x-2">
                  <p className="text-[14px] leading-[27px] text-[#F05769] font-[600] md:text-[18px]">
                    {order?.currency?.symbol} {item?.purchasable?.selling_price}
                  </p>
                </div>
                {item?.purchasable?.combination && (
                  <div className="hidden md:flex gap-x-4 text-[14px] leading-[23px] md:w-[200px] lg:w-[300px] xl:w-[400px]">
                    <p>Variation</p>
                    <p className="text-[#0A0903] font-[600] text-[14px] overflow-hidden text-ellipsis">
                      {findCombination(item?.purchasable?.combination)}
                    </p>
                  </div>
                )}
                <div className="justify-between hidden mb-4 md:flex">
                  <div className="flex gap-x-4 text-[12px] md:text-[14px] leading-[23px]">
                    <p>Quantity</p>
                    <p className="text-[#0A0903] text-[14px] font-[600]">
                      {item.quantity}
                    </p>
                  </div>
                  <div className="flex gap-x-4 leading-[23px]">
                    <span className="text-[12px] md:text-[14px] font-normal text-[#555555] mr-1">
                      Subtotal:
                    </span>
                    <span className="text-[#0A0903] text-[14px] ">
                      {order?.currency?.symbol} {item.sub_total}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:hidden font-poppins text-[#555555] mt-4 flex flex-col gap-y-4">
              {item?.purchasable?.combination && (
                <div className="flex gap-x-4 text-[12px] leading-[21px] w-[250px] sm:w-[450px]">
                  <p>Variation</p>
                  <p className="text-[#0A0903] overflow-hidden text-ellipsis">
                    {findCombination(item?.purchasable?.combination)}
                  </p>
                </div>
              )}
              <div className="flex justify-between mb-4">
                <div className="flex gap-x-4 text-[12px] md:text-[14px] leading-[23px]">
                  <p>Quantity</p>
                  <p className="text-[#0A0903]">{item.quantity}</p>
                </div>
                <div className="flex gap-x-4 text-[14px] md:text-[16px] leading-[23px]">
                  <span className="text-[12px] font-normal text-[#555555] mr-1">
                    Subtotal:
                  </span>
                  <span className="text-[#0A0903]">
                    {order?.currency?.symbol} {item.sub_total}
                  </span>
                </div>
              </div>
            </div>

            <PurchaseItemButton
              order={order}
              item={item}
              setActiveItem={setActiveItem}
            />
          </div>
        ))}
      </div>
      <RemarksDetailsModal id="remarks-detail" item={activeItem} />
      <ReviewFormModal id="review" item={activeItem} callback={refetchOrder} />
      <ReviewDetailsModal id="view-review" item={activeItem} />
    </Fragment>
  );
}
