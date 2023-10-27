import cartStore from "@/lib/store/cartStore";
import RemarksModal from "@/components/ehasp/partials/RemarksModal";
import CARTAPI from "@/lib/api/cart/request";
import { shallow } from "zustand/shallow";
import { toast } from "react-toastify";
export default function CartRemarksModal() {
  const [remarksForm, activeItem, cartRefetch] = cartStore(
    (state) => [state.remarksForm, state.activeItem, state.cartRefetch],
    shallow
  );
  return (
    <RemarksModal
      id="remarks"
      onSave={async () => {
        const { notes, media } = remarksForm;
        const payload = {
          remarks: {
            media: media.map((n) => n.src),
            notes,
          },
          type: "remarks",
        };
        return await CARTAPI.addRemarks(activeItem.id, payload).then(() => {
          toast.success("Remarks Added!", {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
      }}
      callBack={cartRefetch}
    />
  );
}
