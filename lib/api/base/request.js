import BaseApi from "@/lib/api/_base.api";
const APIDOMAIN = process.env.NEXT_PUBLIC_TENANT_API;

export default class BASEAPI {
  static async get(params = "") {
    const res = await BaseApi.get(APIDOMAIN + `/api` + params);
    return res.data;
  }
}
