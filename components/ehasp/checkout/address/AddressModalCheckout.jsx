import AddressModalHeader from "@/components/ehasp/checkout/address/AddressModalHeader";
// import AddressTable from "@/components/ehasp/checkout/address/AddressTable";
import AddressCheckoutList from "@/components/ehasp/checkout/address/AddressCheckoutList";
import AddressForm from "@/components/ehasp/partials/address/AddressForm";
import addressStore from "@/lib/store/addressStore";
import checkoutStore from "@/lib/store/checkoutStore";
import { useRef } from "react";
import { shallow } from "zustand/shallow";
import { toast } from "react-toastify";
export default function AddressModalCheckout({
  id,
  reFetchAddress,
  addresses,
}) {
  const ref = useRef();
  const resetShipping = checkoutStore((state) => state.resetShipping);
  const [modalType, checkoutAddress, addAddress, dataHandler] = addressStore(
    (state) => [
      state.modalType,
      state.checkoutAddress,
      state.addAddress,
      state.dataHandler,
    ],
    shallow
  );

  const saveSelectedAddress = () => {
    resetShipping();
    addressStore.setState({
      checkoutAddress: {
        ...checkoutAddress,
        [dataHandler.id]: dataHandler.address,
      },
    });
    ref.current.click();
  };

  const triggerAddAddress = () => {
    addAddress()
      .then((address) => {
        resetShipping();
        addressStore.setState({
          checkoutAddress: {
            ...checkoutAddress,
            [dataHandler.id]: address,
          },
        });
        ref.current.click();
        toast.success("New address successfuly added!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        reFetchAddress();
      })
      .catch(() => {});
  };

  return (
    <div
      data-te-modal-init
      className="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
      id={`modal-${id}`}
      tabIndex="-1"
      aria-labelledby="addressModalLabel"
      aria-modal="true"
      role="dialog"
    >
      <div
        data-te-modal-dialog-ref
        className="pointer-events-none relative w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto mt-0 min-[768px]:mt-7 w-full min-[768px]:max-w-[600px] min-[992px]:max-w-[800px] min-[0px]:h-full"
      >
        <div className="pointer-events-auto relative flex flex-col w-full h-full md:h-auto md:rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none">
          <div className="flex flex-shrink-0 items-center justify-between md:rounded-t-md border-b-2 border-neutral-100 border-opacity-100 px-4 py-5">
            <AddressModalHeader title={dataHandler.title} />
          </div>
          <div className="relative overflow-x-auto">
            {modalType === "addressTable" ? (
              // <AddressTable addresses={addresses} />
              <AddressCheckoutList addresses={addresses} />
            ) : (
              <AddressForm />
            )}
          </div>

          <div className="px-4 py-5 mt-auto flex justify-center md:justify-start gap-x-4 text-[#FFFFFF] text-[14px] leading-[20px] font-[500]">
            <button
              className="bg-[#315589] py-[14px] md:py-[8px] px-[16px] rounded-[26px] w-full max-w-[190px] md:w-auto md:max-w-auto"
              onClick={() =>
                modalType === "addressTable"
                  ? saveSelectedAddress()
                  : triggerAddAddress()
              }
            >
              Save
            </button>
            <button
              ref={ref}
              className="bg-[#DF3020] py-[14px] md:py-[8px] px-[16px] rounded-[26px] w-full max-w-[190px] md:w-auto md:max-w-auto"
              data-te-modal-dismiss
              aria-label="Close"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
