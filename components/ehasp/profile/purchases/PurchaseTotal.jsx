export default function PurchaseTotal({ order }) {
  return (
    <div className="w-full sm:w-auto grid grid-cols-2 gap-x-4 gap-y-3">
      <div className="flex justify-start sm:justify-end text-[16px] leading-[23px]">
        Subtotal
      </div>
      <div className="flex justify-end text-[16px] leading-[27px] font-[600]">
        {`$ ${order.sub_total}`}
      </div>
      <div className="flex justify-start sm:justify-end text-[16px] leading-[23px]">
        Shipping Fee
      </div>
      <div className="flex justify-end text-[16px] leading-[27px] font-[600]">
        {`$ ${order.shipping_total}`}
      </div>
      <div className="flex justify-start sm:justify-end text-[#F05769] text-[16px] leading-[23px]">
        Order Total
      </div>
      <div className="flex justify-end text-[#F05769] text-[16px] leading-[27px] font-[600]">
        {`$ ${order.total}`}
      </div>
    </div>
  );
}
