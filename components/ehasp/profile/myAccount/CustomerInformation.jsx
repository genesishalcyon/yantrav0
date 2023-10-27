import accountStore from "@/lib/store/accountStore";
import ModalButton from "@/components/ehasp/partials/ModalButton";
import CustomerInfoModal from "@/components/ehasp/profile/myAccount/CustomerInfoModal";
import EditDetailsIcon from "@/components/svg/EditDetailsIcon";
export default function CustomerInformation({}) {
  const account = accountStore((state) => state.account);
  return (
    <div className="flex flex-col gap-y-8 px-4 py-5 md:px-8 md:py-7 rounded-[8px] bg-[#FFFFFF] border border-[#CBCBCB]">
      <div className="flex justify-between items-center font-poppins">
        <p className="text-[#0A0903] text-[16px] leading-[27px] md:text-[18px] md:leading-[30px] font-[600]">
          Customer Information
        </p>
        <ModalButton
          id="information"
          className="flex flex-nowrap items-center gap-x-2 text-[#F05769] leading-[21px] text-[14px] md:leading-[24px]"
        >
          <EditDetailsIcon />
          <span className="hidden 2sm:block">Edit Details</span>
        </ModalButton>
        <CustomerInfoModal id="information" />
      </div>

      <div className="grid grid-cols-2 gap-8 text-[14px] leading-[21px]">
        <div className="flex flex-col gap-y-4 overflow-hidden text-ellipsis">
          <label className="text-[#555555]">First Name</label>
          <span className="text-[#231F20] text-[14px] font-[600]">
            {account?.first_name}
          </span>
        </div>
        <div className="flex flex-col gap-y-4 overflow-hidden text-ellipsis">
          <label className="text-[#555555]">Last Name</label>
          <span className="text-[#231F20] text-[14px] font-[600]">
            {account?.last_name}
          </span>
        </div>
        <div className="flex flex-col gap-y-4 overflow-hidden text-ellipsis">
          <label className="text-[#555555]">Email Address</label>
          <span className="text-[#231F20] text-[14px] font-[600]">
            {account?.email}
          </span>
        </div>
        <div className="flex flex-col gap-y-4 overflow-hidden text-ellipsis">
          <label className="text-[#555555]">Phone</label>
          <span className="text-[#231F20] text-[14px] font-[600]">
            {account?.mobile}
          </span>
        </div>
        <div className="flex flex-col gap-y-4 overflow-hidden text-ellipsis">
          <label className="text-[#555555]">Birth Date</label>
          <span className="text-[#231F20] text-[14px] font-[600]">
            {account?.birth_date}
          </span>
        </div>
        <div className="flex flex-col gap-y-4 overflow-hidden text-ellipsis">
          <label className="text-[#555555]">Gender</label>
          <span className="text-[#231F20] text-[14px] font-[600]">
            {account?.gender}
          </span>
        </div>
      </div>
    </div>
  );
}
