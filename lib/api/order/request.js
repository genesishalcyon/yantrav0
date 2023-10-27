import BaseApi from "@/lib/api/_base.api";
const APIDOMAIN = process.env.NEXT_PUBLIC_TENANT_API;
import { auth } from "@/lib/services/globalService";
const GUEST_FEATURE = process.env.NEXT_PUBLIC_GUEST_FEATURE;
export default class ORDERAPI {
  static async placedOrder(payload) {
    const url = `/api${
      !auth && GUEST_FEATURE === "true" ? "/guest" : ""
    }/orders`;
    const res = await BaseApi.post(APIDOMAIN + url, payload);
    return res.data;
  }

  static async updateOrderStatus(id, payload) {
    const url = `/api${
      !auth && GUEST_FEATURE === "true" ? "/guest" : ""
    }/orders/`;
    const res = await BaseApi.patch(APIDOMAIN + url + id, payload);
    return res.data;
  }

  static async continuePayment(reference, payload) {
    const url = `/api${
      !auth && GUEST_FEATURE === "true" ? "/guest" : ""
    }/orders/`;
    const res = await BaseApi.patch(APIDOMAIN + url + reference, payload);
    return res.data;
  }

  static getOrdersSwr(params = "", options = {}) {
    const url = `/api${
      !auth && GUEST_FEATURE === "true" ? "/guest" : ""
    }/orders`;
    return BaseApi.swr(APIDOMAIN + url + params, options);
  }

  static async getOrderDetails(reference, params = "") {
    const url = `/api${
      !auth && GUEST_FEATURE === "true" ? "/guest" : ""
    }/orders/`;
    const res = await BaseApi.get(APIDOMAIN + url + reference + params);
    return res.data;
  }
}
