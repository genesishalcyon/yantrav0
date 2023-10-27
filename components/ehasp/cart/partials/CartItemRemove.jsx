import cartStore from "@/lib/store/cartStore";
import ConfirmButton from "@/components/ehasp/partials/confirm/ConfirmButton";
import CARTAPI from "@/lib/api/cart/request";
import { shallow } from "zustand/shallow";
export default function CartItemRemove({ item }) {
  const [reCount, cartRefetch] = cartStore(
    (state) => [state.reCount, state.cartRefetch],
    shallow
  );
  return (
    <ConfirmButton
      wrapperClassName="absolute right-4 w-[20px] h-[20px] flex items-center justify-center"
      title="Are you sure?"
      continueLabel="Yes"
      onContinue={() => {
        CARTAPI.removeCartItem(item.id).then(() => {
          reCount();
          cartRefetch();
        });
      }}
    >
      <span className="text-[#9E9E9E] text-[22px] font-[500]">&times;</span>
    </ConfirmButton>
  );
}
