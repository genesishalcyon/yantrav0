import BaseApi from "@/lib/api/_base.api";
const APIDOMAIN = process.env.NEXT_PUBLIC_TENANT_API;
export default class CUSTOMERAPI {
  static async profile(params = "") {
    const res = await BaseApi.get(APIDOMAIN + "/api/account" + params);
    return res.data;
  }
  static async updateProfile(payload) {
    const res = await BaseApi.put(APIDOMAIN + "/api/account/update", payload);
    return res.data;
  }
  static async updateProfilePic(payload) {
    const res = await BaseApi.post(
      APIDOMAIN + "/api/account/profile-image",
      payload,
      {
        headers: {
          "content-type": "multipart/form-data",
        },
      }
    );
    return res.data;
  }
  static async updatePassword(payload) {
    const res = await BaseApi.put(APIDOMAIN + "/api/account/password", payload);
    return res.data;
  }
  static getProfileSwr(params = "", options = {}) {
    return BaseApi.swr(APIDOMAIN + `/api/account` + params, options);
  }
}
