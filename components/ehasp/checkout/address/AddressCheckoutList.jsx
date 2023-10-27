import HomeAddressIcon from "@/components/svg/HomeAddressIcon";
import OfficeAddressIcon from "@/components/svg/OfficeAddressIcon";
import addressStore from "@/lib/store/addressStore";
export default function AddressCheckoutList({ addresses }) {
  const [dataHandler, addressLabel] = addressStore((state) => [
    state.dataHandler,
    state.addressLabel,
  ]);
  return (
    <div className="flex flex-col gap-y-4 p-4">
      {addresses.map((address) => (
        <div
          key={address?.id}
          className="p-4 border-[1px] border-[#E5E7EB] rounded-[8px] text-[14px] leading-[20px] md:text-[16px] md:leading-[23px]"
          onClick={() =>
            addressStore.setState({
              dataHandler: { ...dataHandler, address },
            })
          }
        >
          <div className="flex flex-col gap-y-6">
            <div className="flex items-center gap-x-4">
              <div
                className={`w-[16px] h-[16px] rounded-full ${
                  address?.id === dataHandler?.address?.id
                    ? "border-[5px] border-[#315589]"
                    : "border-[1px] border-[#E0E0E0]"
                }`}
              ></div>
              <div className="flex items-center gap-x-2">
                {address.label_as === "home" ? (
                  <HomeAddressIcon fill="#0F172A" />
                ) : (
                  <OfficeAddressIcon />
                )}
                <p className="capitalize">{address.label_as}</p>
              </div>
            </div>
            <div className="flex flex-col gap-y-1">
              <p className="text-[14px] text-[#aaaaaa] leading-[20px] font-[500]">{`House/Unit/Flr #, Bldg Name, Blk or Lot #`}</p>
              <p className="text-[14px] md:text-[16px] leading-[24px] font-[400]">
                {addressLabel(address)}
              </p>
            </div>
          </div>
        </div>
      ))}
      {/* <div className="flex py-2 gap-x-2">
        <p className="w-[40px]"></p>
        <p className="w-[300px] mr-4">{`House/Unit/Flr #, Bldg Name, Blk or Lot #`}</p>
        <p className="w-[120px]">City</p>
        <p className="w-[120px]">{`State/Region`}</p>
        <p className="w-[80px]">Zip Code</p>
        <p className="w-[80px]">Country</p>
      </div>
      {addresses.map((address) => (
        <div
          key={address?.id}
          className="flex py-2 border-t-[1px] border-b-[1px] border-[#EEEEEE] cursor-pointer gap-x-2"
          onClick={() =>
            addressStore.setState({
              dataHandler: { ...dataHandler, address },
            })
          }
        >
          <div className="w-[40px] flex justify-center items-center">
            <div
              className={`w-[16px] h-[16px] rounded-full ${
                address?.id === dataHandler?.address?.id
                  ? "border-[5px] border-[#D81B60]"
                  : "border-[1px] border-[#E0E0E0]"
              }`}
            ></div>
          </div>
          <p className="w-[300px] mr-4">{address?.address_line_1}</p>
          <p className="w-[120px]">{address?.city}</p>
          <p className="w-[120px]">{address?.state?.name}</p>
          <p className="w-[80px]">{address?.zip_code}</p>
          <p className="w-[80px]">{address?.state?.country?.code}</p>
        </div>
      ))} */}
    </div>
  );
}
