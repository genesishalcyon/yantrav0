import BaseApi from "@/lib/api/_base.api";
const APIDOMAIN = process.env.NEXT_PUBLIC_TENANT_API;
export default class SHIPPINGMETHODAPI {
  static async getShippingRates(shippingMethod, shippingAddress, params = "") {
    const res = await BaseApi.get(
      APIDOMAIN +
        `/api/shipping-methods/${shippingMethod}/rate/${shippingAddress}` +
        params
    );
    return res.data;
  }

  static async postShippingRates(payload) {
    const res = await BaseApi.post(APIDOMAIN + "/api/shipping-rates", payload);
    return res.data;
  }

  static getShippingMethodSwr(params = "", options = {}) {
    return BaseApi.swr(APIDOMAIN + `/api/shipping-methods` + params, options);
  }
  static getShippingMethodRatesSwr(
    shippingMethod,
    shippingAddress,
    options = {}
  ) {
    return BaseApi.swr(
      APIDOMAIN +
        `/api/shipping-methods/${shippingMethod}/rate/${shippingAddress}`,
      options
    );
  }
}
