import TrashIcon from "@/components/svg/TrashIcon";
import cartStore from "@/lib/store/cartStore";
import { shallow } from "zustand/shallow";
import ConfirmButton from "@/components/ehasp/partials/confirm/ConfirmButton";
import CARTAPI from "@/lib/api/cart/request";
import persistentStore from "@/lib/store/persistentStore";
export default function SelectAllToggle() {
  const [reCount, cartRefetch, filteredSelectedItems, activeItems] = cartStore(
    (state) => [
      state.reCount,
      state.cartRefetch,
      state.filteredSelectedItems,
      state.activeItems,
    ],
    shallow
  );
  const cartSelectedHandler = persistentStore(
    (state) => state.cartSelectedHandler
  );
  const selectedItems = filteredSelectedItems(cartSelectedHandler) || [];

  const updateGlobalSelection = (value) => {
    persistentStore.setState({
      cartSelectedHandler: value ? activeItems().map((e) => e.id) : [],
    });
  };

  const isAllSelected = () => {
    const x = activeItems().filter((e) =>
      cartSelectedHandler.some((c) => e.id === c)
    );
    return x.length !== 0 && x.length === activeItems().length;
  };

  const Input = ({ id, status, disabled }) => {
    return (
      <div className="flex items-center gap-2">
        <input
          name={id}
          type="checkbox"
          checked={status}
          disabled={disabled}
          onChange={(e) => updateGlobalSelection(e.target.checked)}
          id={id}
          className="cursor-pointer w-[16px] h-[16px]"
        />
        <label
          htmlFor={id}
          className={`cursor-pointer text-[16px] leading-[24px] md:text-[18px] md:leading-[27px] font-[600] ${
            disabled ? "text-[#AAAAAA]" : "text-[#231F20]"
          }`}
        >
          Select All
        </label>
      </div>
    );
  };

  return (
    <div className="px-4 py-4 rounded-[8px] bg-[#FFFFFF] border border-[#CBCBCB]">
      <div className="flex justify-between items-center">
        {isAllSelected() && activeItems()?.length > 0 ? (
          <Input
            key="checked"
            id="checked"
            status={true}
            disabled={activeItems()?.length === 0}
          />
        ) : (
          ""
        )}
        {!isAllSelected() || activeItems()?.length === 0 ? (
          <Input
            key="unchecked"
            id="unchecked"
            status={false}
            disabled={activeItems()?.length === 0}
          />
        ) : (
          ""
        )}

        {!!selectedItems.length && (
          <ConfirmButton
            className="flex items-center justify-center"
            title="Are you sure?"
            continueLabel="Yes"
            onContinue={() => {
              CARTAPI.bulkDelete({
                cart_line_ids: selectedItems.map((n) => n.id),
              }).then(() => {
                persistentStore.setState({ cartSelectedHandler: [] });
                reCount();
                cartRefetch();
              });
            }}
          >
            <TrashIcon className="w-[17px] h-[20px] md:w-[24px] md:h-[24px]" />
          </ConfirmButton>
        )}
      </div>
    </div>
  );
}
