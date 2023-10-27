import BaseApi from "@/lib/api/_base.api";
const APIDOMAIN = process.env.NEXT_PUBLIC_TENANT_API;
export default class NOTIFICATIONAPI {
  static getNotificationsSwr(params = "", options = {}) {
    return BaseApi.swr(APIDOMAIN + `/api/notifications` + params, options);
  }

  static async getNotifications(params = "") {
    const res = await BaseApi.get(APIDOMAIN + `/api/notifications` + params);
    return res.data;
  }

  static countNotificationsSwr(options = {}) {
    return BaseApi.swr(APIDOMAIN + `/api/notifications/count`, options);
  }

  static async markAsRead(id) {
    const res = await BaseApi.patch(
      APIDOMAIN + "/api/notifications/" + id + "/mark-as-read"
    );
    return res.data;
  }

  static async markAllAsRead() {
    const res = await BaseApi.patch(
      APIDOMAIN + "/api/notifications/mark-all-as-read"
    );
    return res.data;
  }
}
