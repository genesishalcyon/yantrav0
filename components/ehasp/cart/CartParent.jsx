import Cart from "@/components/ehasp/cart/Cart";
import cartStore from "@/lib/store/cartStore";
import CARTAPI from "@/lib/api/cart/request";
import RecommendedProducts from "@/components/ehasp/product/partials/RecommendedProducts";
import SelectAllToggle from "@/components/ehasp/checkout/partials/SelectAllToggle";
import PageLoading from "@/components/page/PageLoading";
import CartButtons from "@/components/ehasp/cart/partials/CartButtons";
import EmptyItems from "@/components/ehasp/cart/partials/EmptyItems";
import { deserialize } from "@/lib/services/globalService";
import persistentStore from "@/lib/store/persistentStore";
import { useEffect } from "react";
import Summary from "@/components/ehasp/checkout/partials/Summary";
import { shallow } from "zustand/shallow";
export default function CartParent() {
  const cartSelectedHandler = persistentStore(
    (state) => state.cartSelectedHandler
  );
  const [cartItems, filteredSelectedItems] = cartStore(
    (state) => [state.cartItems, state.filteredSelectedItems],
    shallow
  );
  const {
    data,
    mutate: cartRefetch,
    isValidating: isLoading,
  } = CARTAPI.getCartItemsSwr("?include=cartLines", {
    revalidateOnFocus: false,
    keepPreviousData: true,
    onSuccess: (res) => {
      const productsFormatted = deserialize(res.data);
      const items = productsFormatted?.cartLines || [];
      cartStore.setState({
        cartItems: items,
        cartRefetch,
      });
    },
  });

  useEffect(() => {
    persistentStore.setState({
      discountForm: {
        discountCodeHandler: "",
        discountCode: "",
      },
      shipping: "",
      billing: "",
    });
  }, []);

  return (
    <div>
      {data ? (
        <>
          <div className="max-w-xl mx-auto pt-6 pb-12 bg-[#F8F8F9] px-4 xl:px-0">
            <p className="text-[#231F20] text-[24px] md:text-[30px] font-[600]">
              My Cart
            </p>
            <div className="flex flex-wrap md:flex-nowrap gap-x-4 gap-y-8 mt-6">
              <div className="w-full md:w-2/3 flex flex-col gap-y-4">
                <SelectAllToggle />
                {cartItems?.length ? <Cart /> : <EmptyItems />}
              </div>
              <div className="w-full md:w-1/3 flex flex-col gap-y-8">
                <div className="flex flex-col px-4 py-5 rounded-[8px] bg-[#FFFFFF] border border-[#CBCBCB]">
                  <div className="flex flex-col gap-y-5">
                    <div className="flex flex-col gap-y-4">
                      <Summary
                        items={filteredSelectedItems(cartSelectedHandler)}
                        type="cart"
                      />
                    </div>
                  </div>
                </div>
                <CartButtons />
              </div>
            </div>
          </div>
          {cartItems?.length === 0 && <RecommendedProducts />}
        </>
      ) : (
        <div className="min-h-[400px]"></div>
      )}
      {isLoading && <PageLoading />}
    </div>
  );
}
