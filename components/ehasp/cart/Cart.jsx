import Image from "next/image";
import cartStore from "@/lib/store/cartStore";
import { Fragment } from "react";
import ProductVariantView from "@/components/ehasp/cart/partials/ProductVariantView";
import CartRemarksButton from "@/components/ehasp/cart/partials/CartRemarksButton";
import CartQuantity from "@/components/ehasp/cart/partials/CartQuantity";
import CartRemarksModal from "@/components/ehasp/cart/partials/CartRemarksModal";
import CartItemRemove from "@/components/ehasp/cart/partials/CartItemRemove";
import ProductFeatured from "@/components/ehasp/product/partials/ProductFeatured";
import persistentStore from "@/lib/store/persistentStore";
import { shallow } from "zustand/shallow";
import { currency } from "@/lib/services/currencyService";
import { formatProduct, formatImage } from "@/lib/services/productService";
import Link from "next/link";
export default function Cart() {
  const [cartItems, isActive, hasStock] = cartStore(
    (state) => [state.cartItems, state.isActive, state.hasStock],
    shallow
  );
  const cartSelectedHandler = persistentStore(
    (state) => state.cartSelectedHandler
  );

  const isChecked = (id) => {
    return cartSelectedHandler?.some((e) => e === id);
  };

  const updateSelection = (id, status) => {
    if (status) {
      const newValue = [...cartSelectedHandler, id];
      persistentStore.setState({ cartSelectedHandler: newValue });
    } else {
      const newValue = cartSelectedHandler.filter((e) => e !== id);
      persistentStore.setState({ cartSelectedHandler: newValue });
    }
  };

  const PriceDisplay = ({ item }) => {
    const sellingPrice = item.purchasable?.selling_price;
    const retailPrice = item.purchasable?.retail_price;
    return (
      <div className="flex gap-x-2 text-[14px] leading-[21px] md:text-[16px] md:leading-[24px] font-[600]">
        <p className="text-[#D81B60]">
          {currency} {sellingPrice}
        </p>
        {Number(retailPrice) > Number(sellingPrice) && (
          <p className="text-[#AAAAAA] line-through">
            {currency} {retailPrice}
          </p>
        )}
      </div>
    );
  };

  return (
    <Fragment>
      {cartItems.map((item, i) => (
        <div
          key={i}
          className="relative px-4 py-5 rounded-[8px] bg-[#FFFFFF] border border-[#CBCBCB]"
        >
          <CartItemRemove item={item} />
          <div className="flex gap-x-4">
            <div>
              {isActive(item) && (
                <input
                  type="checkbox"
                  checked={isChecked(item.id)}
                  onChange={(e) => updateSelection(item.id, e.target.checked)}
                  className="cursor-pointer w-[16px] h-[16px]"
                />
              )}
            </div>

            <div className="flex flex-col flex-grow gap-y-5">
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
                <div className="w-full flex flex-col flex-grow gap-y-2 pb-2 font-poppins text-[#555555]">
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
                  <PriceDisplay item={item} />
                  <ProductVariantView
                    combination={item?.purchasable?.combination}
                  />
                  {hasStock(item) ? (
                    <div className="font-poppins text-[#555555] hidden md:flex flex-col">
                      <div className="h-full flex flex-col lg:flex-row justify-between lg:items-end">
                        <div>
                          <CartRemarksButton item={item} />
                        </div>
                        <div className="flex justify-end">
                          <CartQuantity item={item} />
                        </div>
                      </div>
                      {item?.purchasable?.product?.minimum_order_quantity >
                        1 && (
                        <small className="w-full italic text-end text-[10px] md:text-[12px] mt-1">
                          Minimum of{" "}
                          {item?.purchasable?.product?.minimum_order_quantity}{" "}
                          pieces to order
                        </small>
                      )}
                    </div>
                  ) : (
                    <div className="flex justify-end font-poppins text-[#555555]">
                      <p className="text-[#aaaaaa] text-sm">Out of stock</p>
                    </div>
                  )}
                </div>
              </div>
              {hasStock(item) ? (
                <div className="font-poppins text-[#555555] md:hidden flex flex-col">
                  <div className="h-full flex justify-between items-end">
                    <CartRemarksButton item={item} />
                    <CartQuantity item={item} />
                  </div>
                  {item?.purchasable?.product?.minimum_order_quantity > 1 && (
                    <small className="w-full italic text-end text-[10px] md:text-[12px] mt-1">
                      Minimum of{" "}
                      {item?.purchasable?.product?.minimum_order_quantity}{" "}
                      pieces to order
                    </small>
                  )}
                </div>
              ) : (
                <div className="flex justify-end font-poppins text-[#555555]">
                  <p className="text-[#aaaaaa] text-sm">Out of stock</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
      <CartRemarksModal />
    </Fragment>
  );
}
