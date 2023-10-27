import QuantityField from "@/components/ehasp/cart/partials/QuantityField";
import productStore from "@/lib/store/productStore";
import { Fragment, useEffect } from "react";
import { maxQuantity } from "@/lib/services/productService";
export default function ProductQuantity({ item, selectedVariant }) {
  const quantity = productStore((state) => state.quantity);
  useEffect(() => {
    if (item?.allow_stocks === true) {
      if (selectedVariant?.stock < quantity) {
        productStore.setState({
          quantity: parseInt(selectedVariant?.stock),
        });
      } else if (selectedVariant?.stock > 0 && quantity === 0) {
        productStore.setState({
          quantity: 1,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedVariant]);

  const remainingStocks =
    item?.allow_stocks === true
      ? item?.productVariants?.length
        ? selectedVariant
          ? selectedVariant?.stock
          : maxQuantity
        : item?.stock
      : maxQuantity;

  const productStatus = selectedVariant ? selectedVariant?.status : item.status;

  return (
    <Fragment>
      {productStatus && remainingStocks > 0 && (
        <div className="flex items-center gap-x-2">
          <QuantityField
            className="w-[51px] h-[51px]"
            value={quantity}
            max={remainingStocks}
            disabled={remainingStocks === 0}
            onChange={(e) => {
              let handler = e?.target?.value;
              if (handler > remainingStocks || 0) {
                handler = remainingStocks;
              }
              productStore.setState({
                quantity: parseInt(handler || 1),
              });
            }}
            add={() => {
              if (remainingStocks <= quantity) {
                return;
              }
              productStore.setState({
                quantity: quantity + 1,
              });
            }}
            minus={() => {
              if (quantity > 1) {
                productStore.setState({
                  quantity: quantity - 1,
                });
              }
            }}
          />
          {(remainingStocks === 0 || remainingStocks <= 20) &&
            (item?.productVariants?.length === 0 || selectedVariant) &&
            item?.allow_stocks && (
              <div className="text-[#aaaaaa]">Stocks: {remainingStocks}</div>
            )}
        </div>
      )}
    </Fragment>
  );
}
