import EmptyPurchasesIcon from "@/components/svg/EmptyPurchasesIcon";
export default function EmptyPurchases() {
  return (
    <div className="flex flex-col justify-center items-center gap-y-4 w-full m-auto bg-[#FFFFFF] rounded-[8px] text-center min-h-[400px] text-[#AAAAAA]">
      <EmptyPurchasesIcon />
      <p className="text-[40px] leading-[60px] font-[500]">{`No Orders Yet`}</p>
      {/* <p className="text-[16px] leading-[23px]">
        Browse our catalogue and purchase your favorites among our collection.
      </p> */}
    </div>
  );
}
