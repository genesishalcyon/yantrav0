import EmptyProductsIcon from "@/components/svg/EmptyProductsIcon";
export default function EmptyProducts() {
  return (
    <div className="flex flex-col justify-center items-center gap-y-4 w-fit m-auto text-center min-h-[300px] font-poppins text-[#AAAAAA]">
      <EmptyProductsIcon />
      <p className="text-[40px] leading-[60px] font-[500]">{`Product Catalogue is empty...`}</p>
    </div>
  );
}
