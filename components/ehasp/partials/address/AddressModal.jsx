import BaseModal from "@/components/ehasp/partials/BaseModal";
import AddressForm from "@/components/ehasp/partials/address/AddressForm";
import LoadingButton from "@/components/ehasp/partials/LoadingButton";
import addressStore from "@/lib/store/addressStore";
import { useRef } from "react";
const { toast } = await import("react-toastify");
import persistentStore from "@/lib/store/persistentStore";
import checkoutStore from "@/lib/store/checkoutStore";
export default function AddressModal({ id, refetch }) {
  const ref = useRef("");
  const profile = persistentStore((state) => state.profile);
  const resetShipping = checkoutStore((state) => state.resetShipping);
  const [
    addressForm,
    activeAddress,
    addAddress,
    updateAddress,
    addressType,
    formCompleted,
    validateAddress,
    fieldOnChange,
  ] = addressStore((state) => [
    state.addressForm,
    state.activeAddress,
    state.addAddress,
    state.updateAddress,
    state.addressType,
    state.formCompleted,
    state.validateAddress,
    state.fieldOnChange,
  ]);
  const triggerAddAddress = () => {
    if (!profile) {
      // Guest
      validateAddress(addressForm)
        .then((res) => {
          const { zip5 } = res;
          fieldOnChange({ zip_code: zip5 });
          const newAddress = {
            ...addressForm,
            zip_code: zip5 || addressForm?.zip_code,
          };
          resetShipping();
          if (addressType === "shipping" && addressForm.shippingIsbilling) {
            persistentStore.setState({
              shipping: newAddress,
              billing: newAddress,
            });
          } else {
            persistentStore.setState({ [addressType]: newAddress });
          }
          ref.current.click();
          toast.success("Address Saved", {
            position: toast.POSITION.TOP_RIGHT,
          });
        })
        .catch(() => {});
      return;
    }
    addAddress()
      .then(() => {
        refetch();
        ref.current.click();
        toast.success("New address successfuly added!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch(() => {});
  };

  const triggerUpdateAddress = () => {
    updateAddress(activeAddress.id)
      .then(() => {
        refetch();
        ref.current.click();
        toast.success("Address successfuly updated!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch(() => {});
  };

  return (
    <BaseModal
      id={id}
      data={{ title: activeAddress ? "Edit Address" : "Add Address" }}
    >
      <AddressForm className="relative overflow-auto md:overflow-visible p-4 grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6" />
      <div className="px-4 py-5 mt-auto flex justify-center md:justify-start gap-x-4 font-poppins text-[#FFFFFF] text-[14px] leading-[20px] font-[500]">
        <LoadingButton
          disabled={profile ? false : !formCompleted()}
          onClick={() =>
            activeAddress ? triggerUpdateAddress() : triggerAddAddress()
          }
          loadingColor="bg-[#315589]"
          label="Save"
          labelLoading="Processing..."
          className="flex justify-center items-center bg-[#315589] py-[14px] md:py-[8px] px-[16px] rounded-[26px] w-full max-w-[190px] md:w-auto md:max-w-auto"
        />
        <button
          className="flex justify-center items-center bg-[#EE3424] py-[14px] md:py-[8px] px-[16px] rounded-[26px] w-full max-w-[190px] md:w-auto md:max-w-auto"
          ref={ref}
          data-te-modal-dismiss
          aria-label="Close"
        >
          Close
        </button>
      </div>
    </BaseModal>
  );
}
