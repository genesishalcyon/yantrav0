import EditDetailsIcon from "@/components/svg/EditDetailsIcon";
import cartStore from "@/lib/store/cartStore";
import ModalButton from "@/components/ehasp/partials/ModalButton";
import { formatProduct } from "@/lib/services/productService";
export default function CartRemarksButton({ item }) {
  const hasRemarks =
    item?.remarks?.data?.notes?.length > 0 || item?.remarks?.media?.length > 0;
  return (
    <div>
      {formatProduct(item).allow_customer_remarks === true && (
        <ModalButton
          id="remarks"
          className={`flex flex-nowrap items-center gap-x-2 ${
            hasRemarks ? "text-[#EE3424]" : "text-[#555555]"
          } text-[12px] md:text-[14px] leading-[23px]`}
          onClick={() => {
            const remarks = item.remarks;
            const mediaHandler = remarks?.media || [];
            const media = mediaHandler.map((e) => {
              switch (e.attributes.type) {
                case "video":
                  return {
                    type: "video",
                    src: e.attributes.original_url,
                  };
                default:
                  return {
                    type: "image",
                    src:
                      e.attributes.original_url || "/images/placeholder.webp",
                  };
              }
            });
            cartStore.setState({
              activeItem: item,
              remarksForm: {
                notes: remarks?.data?.notes || "",
                media,
              },
            });
          }}
        >
          <EditDetailsIcon fill={hasRemarks ? "#EE3424" : "#555555"} />
          {hasRemarks ? "View Remarks" : "Add Remarks"}
        </ModalButton>
      )}
    </div>
  );
}
