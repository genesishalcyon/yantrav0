import NOTIFICATIONAPI from "@/lib/api/notification/request";
import { deserialize } from "@/lib/services/globalService";
import { useEffect } from "react";
import notificationStore from "@/lib/store/notificationStore";
import NotificationItem from "@/components/ehasp/partials/notification/NotificationItem";
import NotificationHeader from "@/components/ehasp/partials/notification/NotificationHeader";
export default function NotificationList({}) {
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    document.body.style.paddingRight = "17px";
    return () => {
      document.body.style.overflowY = "auto";
      document.body.style.paddingRight = "0px";
    };
  }, []);

  const [notifications, loading, onLoadMore, allRead, allUnread] =
    notificationStore((state) => [
      state.notifications,
      state.loading,
      state.onLoadMore,
      state.allRead,
      state.allUnread,
    ]);

  const { isValidating: notificationsLoading } =
    NOTIFICATIONAPI.getNotificationsSwr(
      `?page[size]=20&page[number]=1&filter[status]=${
        allRead && allUnread ? "" : allRead ? "read" : allUnread ? "unread" : ""
      }`,
      {
        revalidateOnFocus: false,
        onSuccess: (res) => {
          if (res) {
            const notifications = deserialize(res?.data || {});
            notificationStore.setState({
              notifications,
              meta: res?.data?.meta || {},
            });
          }
        },
      }
    );

  const scrollHandler = (e) => {
    const scroll = Math.round(e.target.offsetHeight + e.target.scrollTop);
    if (scroll >= e.target.scrollHeight && !loading && !notificationsLoading) {
      onLoadMore();
    }
  };

  return (
    <div className="relative h-full">
      <NotificationHeader />
      <div
        className="flex flex-col gap-y-1 px-4 py-2 pb-16 h-full overflow-y-auto notification-scroll text-[13px] leading-[23px]"
        onScroll={(e) => scrollHandler(e)}
      >
        {notifications.map((notification, i) => (
          <NotificationItem key={i} notification={notification} />
        ))}
      </div>
    </div>
  );
}
