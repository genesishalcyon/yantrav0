export default function PurchasePointsToBeEarned({ order }) {
  return (
    <div className="w-full sm:w-auto flex justify-between items-center gap-x-3 font-poppins text-[#E38E00] text-[16px] leading-[23px]">
      {!["Cancelled", "Refunded"].includes(order.status) && (
        <>
          <p>{`Points ${
            order.status === "Fulfilled" ? "" : "to be"
          } Earned`}</p>
          <span>{`+ 14`}</span>
        </>
      )}
    </div>
  );
}
