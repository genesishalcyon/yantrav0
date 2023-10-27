import BaseApi from "@/lib/api/_base.api";

const APIDOMAIN = process.env.NEXT_PUBLIC_TENANT_API;

export default class FAVORITEAPI {
  static async add(payload) {
    try {
      const res = await BaseApi.post(APIDOMAIN + "/api/favorites", payload);
      return res;
    } catch (err) {
      throw err;
    }
  }
  static async remove(id) {
    try {
      const res = await BaseApi.delete(APIDOMAIN + "/api/favorites/" + id);
      return res;
    } catch (err) {
      throw err;
    }
  }

  static async getFavorites(params = "") {
    const res = await BaseApi.get(APIDOMAIN + `/api/favorites` + params);
    return res.data;
  }

  static getFavoritesSwr(params = "", options = {}) {
    return BaseApi.swr(APIDOMAIN + `/api/favorites` + params, options);
  }
}
