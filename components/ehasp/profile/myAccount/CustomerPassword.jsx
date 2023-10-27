import accountStore from "@/lib/store/accountStore";
import ModalButton from "@/components/ehasp/partials/ModalButton";
import CustomerPasswordModal from "@/components/ehasp/profile/myAccount/CustomerPasswordModal";
import EditDetailsIcon from "@/components/svg/EditDetailsIcon";
export default function CustomerPassword({}) {
  return (
    <div className="px-4 py-5 md:px-8 md:py-7 rounded-[8px] bg-[#FFFFFF] border border-[#CBCBCB]">
      <div className="flex justify-between items-center font-poppins">
        <p className="text-[#0A0903] text-[16px] leading-[27px] md:text-[18px] md:leading-[30px] font-[600]">
          Password
        </p>
        <ModalButton
          id="update-password"
          className="flex flex-nowrap items-center gap-x-2 text-[#F05769] leading-[21px] text-[14px] md:leading-[24px]"
        >
          <EditDetailsIcon />
          <span className="hidden 2sm:block">Change Password</span>
        </ModalButton>
        <CustomerPasswordModal id="update-password" />
      </div>
    </div>
  );
}
