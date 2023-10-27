import ModalButton from "@/components/ehasp/partials/ModalButton";
import CustomerInfoModal from "@/components/ehasp/profile/myAccount/CustomerInfoModal";
import { Fragment } from "react";
import persistentStore from "@/lib/store/persistentStore";
import accountStore from "@/lib/store/accountStore";
export default function GuestInfo() {
  const guest = persistentStore((state) => state.guest);
  return (
    <Fragment>
      <div className="flex flex-col gap-y-4">
        <div className="px-4 py-5 rounded-[8px] bg-[#FFFFFF] flex flex-col gap-y-5 border border-[#CBCBCB]">
          <div className="flex justify-between">
            <p className="text-[16px] leading-[27px] font-[600]">
              Customer Information
            </p>
            <ModalButton
              id="guest-info"
              className="text-[14px] leading-[23px] text-[#F05769]"
              onClick={() => {
                accountStore.setState({
                  informationForm: guest,
                });
              }}
            >
              Edit
            </ModalButton>
          </div>

          <div className="flex flex-wrap gap-y-4">
            <div className="flex flex-col w-full sm:w-[50%]">
              <p className="text-[12px] text-[#555555] leading-[20px] font-[500]">
                First Name
              </p>
              <p className="text-[14px] leading-[24px] text-[#231F20] font-[600]">
                {guest?.first_name}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-[12px] text-[#555555] leading-[20px] font-[500]">
                Last Name
              </p>
              <p className="text-[14px] leading-[24px] text-[#231F20] font-[600]">
                {guest?.last_name}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-y-4">
            <div className="flex flex-col w-full sm:w-[50%]">
              <p className="text-[12px] text-[#555555] leading-[20px] font-[500]">
                Email
              </p>
              <p className="text-[14px] leading-[24px] text-[#231F20] font-[600]">
                {guest?.email}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-[12px] text-[#555555] leading-[20px] font-[500]">
                Mobile
              </p>
              <p className="text-[14px] leading-[24px] text-[#231F20] font-[600]">
                {guest?.mobile}
              </p>
            </div>
          </div>
        </div>
      </div>
      <CustomerInfoModal id="guest-info" />
    </Fragment>
  );
}
