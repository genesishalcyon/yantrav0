import BaseApi from "@/lib/api/_base.api";

const APIDOMAIN = process.env.NEXT_PUBLIC_TENANT_API;

export default class PAYMENTAPI {
  static async getContents(id, params = "") {
    const res = await BaseApi.get(
      APIDOMAIN + `/api/contents/${id}/entries` + params
    );
    return res.data;
  }

  static getMethodsSwr(params = "", options = {}) {
    return BaseApi.swr(APIDOMAIN + `/api/paymentmethod` + params, options);
  }
}
