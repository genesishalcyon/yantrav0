import { create } from "zustand";
import { devtools } from "zustand/middleware";
import NOTIFICATIONAPI from "@/lib/api/notification/request";
import Jsona from "jsona";
const dataFormatter = new Jsona();
let storeHandler = (set, get) => ({
  notifications: [],
  meta: {},
  loading: false,
  status: "",
  allRead: false,
  allReadChanged: (data) => set(() => ({ allRead: data })),
  allUnread: false,
  allUnreadChanged: (data) => set(() => ({ allUnread: data })),
  reCountNotification: () => {},
  onLoadMore: () => {
    if (get().meta?.current_page < get().meta?.last_page) {
      set(() => ({ loading: true }));
      NOTIFICATIONAPI.getNotifications(
        `?page[size]=${get().meta?.per_page}&page[number]=${
          get().meta?.current_page + 1
        }&filter[status]=${
          get().allRead && get().allUnread
            ? ""
            : get().allRead
            ? "read"
            : get().allUnread
            ? "unread"
            : ""
        }`
      ).then((res) => {
        const newNotifications = dataFormatter.deserialize(res);
        const mergedNotifications = [
          ...get().notifications,
          ...newNotifications,
        ];
        set(() => ({ notifications: mergedNotifications, loading: false }));
        if (res?.meta) {
          set(() => ({ meta: res.meta }));
        }
      });
    }
  },
  findLink: (notification) => {
    switch (notification.data.type) {
      case "bank_transfer_payment":
      case "order_placed":
      case "order_processed":
      case "order_delivered":
      case "order_fulfilled":
      case "order_cancelled":
        return `/account/purchases?reference=${notification.data.reference}`;
      case "new_user":
        return `/account`;
    }
    return "/";
  },
  notifMessage: (notification) => {
    switch (notification.data.type) {
      case "order_placed":
        return `Checkout Successful`;
      case "order_processed":
        return `Your order is being processed`;
      // case "order_shipped":
      //   return `Delivery for OR#${notification.data.reference} is successful`
      case "order_delivered":
        return `Your order is being delivered!`;
      case "order_fulfilled":
        return `You have marked your order fulfilled`;
      default:
        return notification.data.message;
    }
  },
  notifDescription: (notification) => {
    switch (notification.data.type) {
      case "order_placed":
        return `Your ORDER ID is OR#${notification.data.reference}`;
      case "order_processed":
        return `Now processing OR#${notification.data.reference}`;
      // case "order_shipped":
      //   return `Delivery for OR#${notification.data.reference} is successful`
      case "order_delivered":
        return `Delivery for OR#${notification.data.reference} is successful`;
      case "order_fulfilled":
        return `Thank you for your purchase!`;
    }
  },
});

storeHandler = devtools(storeHandler);
const store = create(storeHandler);

export default store;
