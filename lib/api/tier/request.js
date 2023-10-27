import BaseApi from "@/lib/api/_base.api";

const APIDOMAIN = process.env.NEXT_PUBLIC_TENANT_API;

export default class TIERSAPI {
  static getTiersSwr(params = "", options = {}) {
    return BaseApi.swr(APIDOMAIN + `/api/tiers` + params, options);
  }
}
