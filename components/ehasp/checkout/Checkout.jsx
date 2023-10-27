import Image from "next/image";
import { Fragment, useState } from "react";
import EditDetailsIcon from "@/components/svg/EditDetailsIcon";
import AddressCheckout from "@/components/ehasp/checkout/address/AddressCheckout";
import ProductVariantView from "@/components/ehasp/cart/partials/ProductVariantView";
import RemarksDetailsModal from "@/components/ehasp/profile/purchases/modal/RemarksDetailsModal";
import ModalButton from "@/components/ehasp/partials/ModalButton";
import ProductFeatured from "@/components/ehasp/product/partials/ProductFeatured";
import { currency } from "@/lib/services/currencyService";
import { formatProduct, formatImage } from "@/lib/services/productService";
import Link from "next/link";
import persistentStore from "@/lib/store/persistentStore";
import GuestInfo from "@/components/ehasp/checkout/guest/GuestInfo";
import LoadingIcon from "@/components/svg/LoadingIcon";
const GUEST_FEATURE = process.env.NEXT_PUBLIC_GUEST_FEATURE;
export default function Checkout({ items = [], loading = false }) {
  const profile = persistentStore((state) => state.profile);
  const [activeItem, setActiveItem] = useState({});
  const PriceDisplay = ({ item }) => {
    const sellingPrice = item.purchasable?.selling_price;
    const retailPrice = item.purchasable?.retail_price;
    return (
      <>
        <p className="text-[#D81B60]">
          {currency} {sellingPrice}
        </p>
        {Number(retailPrice) > Number(sellingPrice) && (
          <p className="text-[#AAAAAA] line-through">
            {currency} {retailPrice}
          </p>
        )}
      </>
    );
  };
  return (
    <Fragment>
      {!profile && GUEST_FEATURE === "true" && <GuestInfo />}
      <AddressCheckout />
      <div className="px-4 pt-5 pb-8 rounded-[8px] bg-[#FFFFFF] flex flex-col gap-y-5 border border-[#CBCBCB]">
        <p className="font-poppins text-[#231F20] text-[16px] leading-[27px] font-[600]">
          Order Details
        </p>
        {loading ? (
          <div className="h-[200px] flex justify-center items-center">
            <LoadingIcon className="w-10 h-10" />
          </div>
        ) : (
          <Fragment>
            {items.map((item, i) => (
              <div key={i} className="flex flex-col flex-grow gap-y-5">
                {i !== 0 && (
                  <div className="bg-[#D9D9D9] w-full h-[1px] my-2"></div>
                )}

                <div className="flex gap-x-4">
                  <Link href={`/products/${item?.purchasable?.product?.slug}`}>
                    <div className="relative w-[86px] h-[86px] md:w-[120px] md:h-[120px] lg:w-[174px] lg:h-[174px]">
                      <Image
                        alt={formatProduct(item).name}
                        src={
                          formatImage(item).original_url ||
                          "/images/placeholder.webp"
                        }
                        fill
                        className="object-cover object-center rounded-[8px]"
                      />
                    </div>
                  </Link>
                  <div className="flex flex-col flex-grow gap-y-2 pb-2 font-poppins text-[#555555]">
                    <div>
                      <Link
                        href={`/products/${item?.purchasable?.product?.slug}`}
                      >
                        <ProductFeatured
                          product={formatProduct(item)}
                          redirect={true}
                        />
                        <p className="text-[16px] leading-[24px] font-[600] text-[#231F20]">
                          {formatProduct(item).name}
                        </p>
                      </Link>
                      <p className="text-[10px] leading-[16px] md:text-[12px] md:leading-[23px] capitalize">
                        {item?.purchasable?.sku}
                      </p>
                    </div>
                    <div className="flex flex-col w-full 2sm:flex-row">
                      <div className="flex gap-x-2">
                        <PriceDisplay item={item} />
                      </div>
                      <div className="flex-grow text-left 2sm:text-right">
                        <span className="text-[12px] font-normal text-dim-black mr-1">
                          Quantity:
                        </span>
                        <span className="text-[#231F20]">{item.quantity}</span>
                      </div>
                    </div>
                    {item?.purchasable?.combination && (
                      <ProductVariantView
                        combination={item.purchasable.combination}
                      />
                    )}
                    <div className="font-poppins text-[#555555] hidden md:flex flex-col mt-2">
                      {formatProduct(item).allow_customer_remarks === true &&
                      (item?.remarks?.data?.notes?.length > 0 ||
                        item?.remarks?.media?.length > 0) ? (
                        <ModalButton
                          id="view-remarks"
                          className="flex flex-nowrap items-center gap-x-2 font-poppins text-[#D81B60] text-[14px] leading-[23px]"
                          onClick={() => {
                            setActiveItem(item);
                          }}
                        >
                          <EditDetailsIcon fill="#D81B60" />
                          View Remarks
                        </ModalButton>
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="font-poppins text-[#555555] md:hidden flex flex-col">
                  {formatProduct(item).allow_customer_remarks === true &&
                  (item?.remarks?.data?.notes?.length > 0 ||
                    item?.remarks?.media?.length > 0) ? (
                    <ModalButton
                      id="view-remarks"
                      className="flex flex-nowrap items-center gap-x-2 font-poppins text-[#D81B60] text-[14px] leading-[23px]"
                      onClick={() => {
                        setActiveItem(item);
                      }}
                    >
                      <EditDetailsIcon fill="#D81B60" />
                      View Remarks
                    </ModalButton>
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            ))}
          </Fragment>
        )}
      </div>
      <RemarksDetailsModal id="view-remarks" item={activeItem} />
    </Fragment>
  );
}
