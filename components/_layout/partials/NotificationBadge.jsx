import NOTIFICATIONAPI from "@/lib/api/notification/request";
import notificationStore from "@/lib/store/notificationStore";

const NotificationBadge = ({ profile }) => {
  const { data: notificationCount, mutate: reCountNotification } =
    NOTIFICATIONAPI.countNotificationsSwr({
      render: profile,
      revalidateOnFocus: false,
      onSuccess: () => {
        notificationStore.setState({ reCountNotification });
      },
    });

  return (
    <>
      {!!notificationCount?.count && (
        <div className="absolute top-0 right-0 rounded-full bg-[#18ACBA] border-[1px] border-[#FFFFFF] border-full w-[7px] h-[7px]"></div>
      )}
    </>
  );
};

export default NotificationBadge;
