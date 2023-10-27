import EarnedPointsIcon from "@/components/svg/EarnedPointsIcon";
export default function PurchaseEarnedPoints() {
  return (
    <div className="flex items-center gap-x-12 p-5 rounded-[8px] bg-[#FFFFFF] text-[#E38E00] text-[16px] leading-[27px]">
      <div className="flex items-center gap-x-3">
        <EarnedPointsIcon />
        <p className="font-[600]">My Total Earned Points</p>
      </div>
      <span>44</span>
    </div>
  );
}
