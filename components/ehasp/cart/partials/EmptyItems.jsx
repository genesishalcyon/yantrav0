import EmptyCartIcon from "@/components/svg/EmptyCartIcon";
export default function EmptyItems() {
  return (
    <div className="flex flex-col justify-center items-center gap-y-4 w-fit m-auto text-center min-h-[300px] text-[#AAAAAA]">
      <EmptyCartIcon />
      <p className="text-[24px] leading-[36px] md:text-[40px] md:leading-[60px] font-[500]">{`Your cart is empty...`}</p>
      <p className="text-[14px] md:text-[16px] leading-[23px]">
        This is fill in text. It is here temporarily, and will be replaced with
        the proper text shortly.
      </p>
    </div>
  );
}
