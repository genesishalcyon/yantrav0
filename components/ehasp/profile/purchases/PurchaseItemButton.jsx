import ModalButton from "@/components/ehasp/partials/ModalButton";
import AddReviewIcon from "@/components/svg/AddReviewIcon";
import EditDetailsIcon from "@/components/svg/EditDetailsIcon";
import persistentStore from "@/lib/store/persistentStore";
export default function PurchaseItemButton({ order, setActiveItem, item }) {
  const profile = persistentStore((state) => state.profile);
  return (
    <div className="md:ml-[135px] lg:ml-[190px] flex gap-x-4">
      {!!(item?.remarks?.data || item?.remarks?.media?.length) && (
        <ModalButton
          id="remarks-detail"
          className="text-[14px] flex flex-nowrap items-center gap-x-2 text-[#315589]"
          onClick={() => setActiveItem(item)}
        >
          <EditDetailsIcon fill="#315589" />
          View Remarks
        </ModalButton>
      )}

      {!!(order.status.toLowerCase() === "fulfilled" && !item?.reviewed_at) &&
        profile && (
          <ModalButton
            id="review"
            className="text-[14px] flex flex-nowrap items-center gap-x-2 text-[#315589]"
            onClick={() => setActiveItem(item)}
          >
            <AddReviewIcon fill="#315589" />
            Add Review
          </ModalButton>
        )}
      {!!(order.status.toLowerCase() === "fulfilled" && item?.reviewed_at) &&
        profile && (
          <ModalButton
            id="view-review"
            className="text-[14px] flex flex-nowrap items-center gap-x-2 text-[#315589]"
            onClick={() => setActiveItem(item)}
          >
            <AddReviewIcon fill="#315589" />
            View Review
          </ModalButton>
        )}
    </div>
  );
}
