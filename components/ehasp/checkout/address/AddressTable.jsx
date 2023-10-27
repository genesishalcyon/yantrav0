import addressStore from "@/lib/store/addressStore";
export default function AddressTable({ addresses }) {
  const dataHandler = addressStore((state) => state.dataHandler);
  return (
    <div className="inline-block">
      <div className="flex py-2 gap-x-2">
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
                  ? "border-[5px] border-[#F05769]"
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
      ))}
    </div>
  );
}
