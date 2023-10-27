import BaseApi from "@/lib/api/_base.api";
const APIDOMAIN = process.env.NEXT_PUBLIC_TENANT_API;
export default class MEDIAAPI {
  static async upload(payload) {
    const res = await BaseApi.post(APIDOMAIN + "/api/fileupload-tmp", payload, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    return res.data;
  }
}
