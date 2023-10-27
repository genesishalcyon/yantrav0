import BaseApi from "@/lib/api/_base.api";
const APIDOMAIN = process.env.NEXT_PUBLIC_TENANT_API;
export default class ADDRESSAPI {
  static async addAddress(payload, params = "") {
    const res = await BaseApi.post(
      APIDOMAIN + "/api/addresses" + params,
      payload
    );
    return res.data;
  }
  static async updateAddress(id, payload) {
    const res = await BaseApi.put(APIDOMAIN + "/api/addresses/" + id, payload);
    return res.data;
  }
  static async deleteAddress(id) {
    await BaseApi.delete(APIDOMAIN + "/api/addresses/" + id);
  }
  static async addressUpdateDefault(id, params) {
    const res = await BaseApi.post(
      APIDOMAIN + `/api/addresses/${id}/${params}`
    );
    return res.data;
  }
  static getAddressesSwr(params = "", options = {}) {
    return BaseApi.swr(APIDOMAIN + `/api/addresses` + params, options);
  }

  // Public
  static async validateAddress(payload) {
    const res = await BaseApi.post(
      APIDOMAIN + "/api/validate/address",
      payload
    );
    return res.data;
  }
}
