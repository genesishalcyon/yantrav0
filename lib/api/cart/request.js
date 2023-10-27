import BaseApi from "@/lib/api/_base.api";
const APIDOMAIN = process.env.NEXT_PUBLIC_TENANT_API;
const GUEST_FEATURE = process.env.NEXT_PUBLIC_GUEST_FEATURE;
import { auth } from "@/lib/services/globalService";
export default class CARTAPI {
  static getCartItemsSwr(params = "", options = {}) {
    const url = `/api${
      !auth && GUEST_FEATURE === "true" ? "/guest" : ""
    }/carts`;
    return BaseApi.swr(APIDOMAIN + url + params, options);
  }
  static countCartItemsSwr(options = {}) {
    const url = `/api${
      !auth && GUEST_FEATURE === "true" ? "/guest" : ""
    }/carts/count`;
    return BaseApi.swr(APIDOMAIN + url, options);
  }
  static async addToCart(payload) {
    const url = `/api${
      !auth && GUEST_FEATURE === "true" ? "/guest" : ""
    }/carts/cartlines/`;
    const res = await BaseApi.post(APIDOMAIN + url, payload);
    return res.data;
  }
  static async addRemarks(id, payload) {
    const url = `/api${
      !auth && GUEST_FEATURE === "true" ? "/guest" : ""
    }/carts/cartlines/`;
    const res = await BaseApi.patch(APIDOMAIN + url + id, payload);
    return res.data;
  }
  static async updateQuantity(id, payload) {
    const url = `/api${
      !auth && GUEST_FEATURE === "true" ? "/guest" : ""
    }/carts/cartlines/`;
    const res = await BaseApi.patch(APIDOMAIN + url + id, payload);
    return res.data;
  }
  static async bulkDelete(payload) {
    const url = `/api${
      !auth && GUEST_FEATURE === "true" ? "/guest" : ""
    }/carts/cartlines/bulk-remove`;
    const res = await BaseApi.post(APIDOMAIN + url, payload);
    return res.data;
  }
  static async removeCartItem(id) {
    const url = `/api${
      !auth && GUEST_FEATURE === "true" ? "/guest" : ""
    }/carts/cartlines/`;
    await BaseApi.delete(APIDOMAIN + url + id);
  }
  static async checkout(payload) {
    const url = `/api${
      !auth && GUEST_FEATURE === "true" ? "/guest" : ""
    }/carts/checkouts/`;
    const res = await BaseApi.post(APIDOMAIN + url, payload);
    return res.data;
  }
  static getCheckoutItemsSwr(params = "", options = {}) {
    const url = `/api${
      !auth && GUEST_FEATURE === "true" ? "/guest" : ""
    }/carts/checkouts`;
    return BaseApi.swr(APIDOMAIN + url + params, options);
  }
  static getSummarySwr(params = "", options = {}) {
    return BaseApi.swr(APIDOMAIN + `/api/carts/summary` + params, options);
  }

  // Guest
  static postSummarySwr(key = "", payload, options = {}) {
    return BaseApi.swrPost(
      APIDOMAIN + `/api/guest/carts/summary?${key}`,
      payload,
      options
    );
  }
}
