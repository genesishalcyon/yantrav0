import orderStatuses from "@/lib/constant/orderStatuses";
export default function PurchaseStatus({ status }) {
  const bgColor = (status) => {
    switch (status) {
      case "pending":
      case "for_payment":
        return "bg-[#F3F4F6]";
      case "processing":
        return "bg-[#FCDDC7]";
      case "cancelled":
        return "bg-[#FFFBEB]";
      case "delivered":
        return "bg-[#D5F0B1]";
      case "shipped":
        return "bg-[#DEE0FA]";
      case "refunded":
        return "bg-[#FFF1F2]";
      case "fulfilled":
        return "bg-[#F2FDF5]";
      default:
        return "bg-[#FCDDC7]";
    }
  };
  const textColor = (status) => {
    switch (status) {
      case "pending":
      case "for_payment":
        return "text-[#374151]";
      case "processing":
        return "text-[#8F3415]";
      case "cancelled":
        return "text-[#A96E09]";
      case "delivered":
        return "text-[#2E5C0E]";
      case "shipped":
        return "text-[#3B45B0]";
      case "refunded":
        return "text-[#B4173A]";
      case "fulfilled":
        return "text-[#147638]";
      default:
        return "text-[#8F3415]";
    }
  };

  return (
    <div
      className={`flex items-center px-4 py-2 md:px-[18px] md:py-[10px] rounded-[28px] ${bgColor(
        status
      )} ${textColor(status)} text-[12px] leading-[20px] font-[500]`}
    >
      <p className="capitalize">
        {orderStatuses.find((o) => o.value === status)?.label || "N/A"}
      </p>
    </div>
  );
}
