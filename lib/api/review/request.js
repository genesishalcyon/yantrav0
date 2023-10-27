import BaseApi from "@/lib/api/_base.api";
const APIDOMAIN = process.env.NEXT_PUBLIC_TENANT_API;
export default class REVIEWAPI {
  static getSummaryReviewSwr(params = "", options = {}) {
    return BaseApi.swr(APIDOMAIN + `/api/reviews/ratings/` + params, options);
  }
  static listReviewsSwr(params = "", options = {}) {
    return BaseApi.swr(APIDOMAIN + `/api/reviews/` + params, options);
  }
  static async addReview(payload) {
    const res = await BaseApi.post(APIDOMAIN + "/api/reviews", payload);
    return res.data;
  }
}
