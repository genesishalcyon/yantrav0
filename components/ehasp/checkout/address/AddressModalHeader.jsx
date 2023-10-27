import AddAddressIcon from "@/components/svg/AddAddressIcon";
import addressStore from "@/lib/store/addressStore";
import { Fragment } from "react";
export default function AddressModalHeader({ title }) {
  const modalType = addressStore((state) => state.modalType);
  return (
    <Fragment>
      {modalType === "addressTable" ? (
        <Fragment>
          <h5
            className="text-[#231F20] text-[16px] leading-[27px] md:text-[18px] md:leading-[30px] font-[600]"
            id="addressModalLabel"
          >
            {/* {title} */}
            My Addresses
          </h5>
          <div className="flex flex-nowrap items-center gap-x-2">
            <AddAddressIcon />
            <button
              className="text-[#F05769] text-[12px] leading-[21px] md:text-[14px] md:leading-[24px]"
              onClick={() =>
                addressStore.setState({
                  modalType: "addressForm",
                  formErrors: "",
                })
              }
            >
              Add New Address
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <h5
            className="text-[#231F20] text-[16px] leading-[27px] md:text-[18px] md:leading-[30px] font-[600]"
            id="addressModalLabel"
          >
            New Address
          </h5>
        </Fragment>
      )}
    </Fragment>
  );
}
