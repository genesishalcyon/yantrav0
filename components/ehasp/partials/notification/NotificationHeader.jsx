import MarkAllAsReadIcon from "@/components/svg/MarkAllAsReadIcon";
import NOTIFICATIONAPI from "@/lib/api/notification/request";
import notificationStore from "@/lib/store/notificationStore";
export default function NotificationHeader({}) {
  const [allRead, allReadChanged, allUnread, allUnreadChanged] =
    notificationStore((state) => [
      state.allRead,
      state.allReadChanged,
      state.allUnread,
      state.allUnreadChanged,
    ]);
  return (
    <div className="flex justify-between shadow-md p-4 text-[13px] leading-[23px] font-[400]">
      <div className="flex gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            id="allRead"
            type="checkbox"
            className="accent-[#F05769]"
            checked={allRead}
            onChange={(e) => allReadChanged(e.target.checked)}
          />
          <label className="cursor-pointer text-[#555555]" htmlFor="allRead">
            Read
          </label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            id="allUnread"
            type="checkbox"
            className="accent-[#F05769]"
            checked={allUnread}
            onChange={(e) => allUnreadChanged(e.target.checked)}
          />
          <label className="cursor-pointer text-[#555555]" htmlFor="allUnread">
            Unread
          </label>
        </div>
      </div>
      <button
        className="text-[#F05769] flex items-center gap-x-2"
        onClick={() => {
          NOTIFICATIONAPI.markAllAsRead();
        }}
      >
        <MarkAllAsReadIcon fill="#F05769" />
        Mark All As Read
      </button>
    </div>
  );
}
