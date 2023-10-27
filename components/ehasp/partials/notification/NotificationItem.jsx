import NOTIFICATIONAPI from "@/lib/api/notification/request";
import { useRouter } from "next/router";
import notificationStore from "@/lib/store/notificationStore";
export default function NotificationList({ notification }) {
  const router = useRouter();
  const [findLink, notifMessage, notifDescription, reCountNotification] =
    notificationStore((state) => [
      state.findLink,
      state.notifMessage,
      state.notifDescription,
      state.reCountNotification,
    ]);
  return (
    <div
      className="flex flex-col py-2 border-b-[1px] border-[#D9D9D9] cursor-pointer"
      onClick={() => {
        NOTIFICATIONAPI.markAsRead(notification.id).then(() => {
          reCountNotification();
          router.push(findLink(notification));
        });
      }}
    >
      <p className={`${!notification.read_at ? "font-[600]" : ""}`}>
        {notifMessage(notification)}
      </p>
      <p className="text-[#AAAAAA]">{notifDescription(notification)}</p>
      <p
        className={`text-[#F05769] ${
          !notification.read_at ? "font-[500]" : ""
        }`}
      >
        {notification.data.button}
      </p>
    </div>
  );
}
