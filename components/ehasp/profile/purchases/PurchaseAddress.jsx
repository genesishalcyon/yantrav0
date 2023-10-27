import addressStore from "@/lib/store/addressStore";
export default function PurchaseAddress({ address }) {
  const addressLabel = addressStore((state) => state.addressLabel);
  return (
    <div className="flex flex-col gap-y-4 font-poppins">
      <div className="flex flex-col">
        <p className="text-[#555555] text-[12px] leading-[20px] font-[500]">
          House/Unit/Flr #, Bldg Name, Blk or Lot #
        </p>
        <p className="text-[14px] text-[#0A0903] font-[600] leading-[24px]">
          {addressLabel(address?.address)}
        </p>
      </div>
      <div className="flex flex-wrap gap-y-4">
        <div className="flex flex-col w-full sm:w-[50%]">
          <p className="text-[#555555] text-[12px] leading-[20px] font-[500]">
            Country
          </p>
          <p className="text-[14px] text-[#0A0903] font-[600] leading-[24px]">
            {address?.address?.country}
          </p>
        </div>
        <div className="flex flex-col">
          <p className="text-[#555555] text-[12px] leading-[20px] font-[500]">
            State
          </p>
          <p className="text-[14px] text-[#0A0903] font-[600] leading-[24px]">
            {address?.address?.state}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-y-4">
        <div className="flex flex-col w-full sm:w-[50%]">
          <p className="text-[#555555] text-[12px] leading-[20px] font-[500]">
            City/Province
          </p>
          <p className="text-[14px] text-[#0A0903] font-[600] leading-[24px]">
            {address?.address?.city}
          </p>
        </div>
        <div className="flex flex-col">
          <p className="text-[#555555] text-[12px] leading-[20px] font-[500]">
            Zip
          </p>
          <p className="text-[14px] text-[#0A0903] font-[600] leading-[24px]">
            {address?.address?.zip_code}
          </p>
        </div>
      </div>
    </div>
  );
}
