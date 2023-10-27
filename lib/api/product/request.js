import BaseApi from "@/lib/api/_base.api";
const APIDOMAIN = process.env.NEXT_PUBLIC_TENANT_API;

export default class PRODUCTAPI {
  static async getProducts(params = "") {
    const res = await BaseApi.get(APIDOMAIN + `/api` + params);
    return res.data;
  }
  static async findProduct(slug, params = "") {
    const res = await BaseApi.get(APIDOMAIN + `/api/products/${slug}` + params);
    return res.data;
  }
  static async findProductCustom(segment, params = "") {
    const res = await BaseApi.get(APIDOMAIN + `/api` + segment + params);
    return res.data;
  }
  static findProductCustomSwr(params = "", options = {}) {
    return BaseApi.swr(APIDOMAIN + `/api` + params, options);
  }
  static getProductsSwr(params = "", options = {}) {
    return BaseApi.swr(APIDOMAIN + `/api` + params, options);
  }

  static async getProductsAuth(params = "") {
    const res = await BaseApi.get(APIDOMAIN + `/api/auth/products` + params);
    return res.data;
  }
  static async findProductAuth(slug, params = "") {
    const res = await BaseApi.get(
      APIDOMAIN + `/api/auth/products/${slug}` + params
    );
    return res.data;
  }
  static findProductAuthSwr(params = "", options = {}) {
    return BaseApi.swr(APIDOMAIN + `/api/auth/products` + params, options);
  }
  static getProductsAuthSwr(params = "", options = {}) {
    return BaseApi.swr(APIDOMAIN + `/api/auth/products` + params, options);
  }
}
