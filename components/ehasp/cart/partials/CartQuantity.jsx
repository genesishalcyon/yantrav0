const { toast } = await import("react-toastify");
import { Fragment } from "react";
import { maxQuantity, formatProduct } from "@/lib/services/productService";
import cartStore from "@/lib/store/cartStore";
import QuantityField from "@/components/ehasp/cart/partials/QuantityField";
export default function CartQuantity({ item }) {
  const product = formatProduct(item);
  const updateQuantity = cartStore((state) => state.updateQuantity);
  const remainingStocks =
    product?.allow_stocks === true ? item?.purchasable?.stock : maxQuantity;
  const updateQuantityTrigger = (id, quantity) => {
    if (quantity) {
      updateQuantity(id, quantity).catch((err) => {
        const { message = "Unable to update." } = err?.data || {};
        toast.warning(message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
    }
  };
  return (
    <Fragment>
      <div className="flex items-center gap-x-4">
        {remainingStocks <= 50 && product?.allow_stocks && (
          <div className="text-[#aaaaaa] text-sm">
            {remainingStocks} in stock
          </div>
        )}
        <QuantityField
          value={item.quantity}
          max={remainingStocks}
          disabled={remainingStocks === 0}
          onChange={(e) => {
            let handler = e?.target?.value;
            if (handler > remainingStocks || 0) {
              handler = remainingStocks;
            }
            updateQuantityTrigger(item.id, parseInt(handler));
          }}
          add={() => {
            if (remainingStocks <= item.quantity) {
              return;
            }
            updateQuantityTrigger(item.id, item.quantity + 1);
          }}
          minus={() => {
            if (item.quantity > 1) {
              const quantity = item.quantity + -1;
              updateQuantityTrigger(item.id, quantity);
            }
          }}
        />
      </div>
    </Fragment>
  );
}
