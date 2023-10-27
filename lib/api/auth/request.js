import BaseApi from "@/lib/api/_base.api";
import { setCookie, destroyCookie } from "nookies";
import persistentStore from "@/lib/store/persistentStore";
import favoriteStore from "@/lib/store/favoriteStore";
const APIDOMAIN = process.env.NEXT_PUBLIC_TENANT_API;
const TOKEN = process.env.NEXT_PUBLIC_TOKEN || "";
export default class AUTHAPI {
  static async register(payload) {
    try {
      const res = await BaseApi.post(APIDOMAIN + "/api/register", payload);
      return res;
    } catch (err) {
      throw err;
    }
  }

  static async login(payload) {
    try {
      const res = await BaseApi.post(APIDOMAIN + "/api/login", payload);
      setCookie({}, TOKEN, res.data.token, {
        path: "/",
      });
      return res;
    } catch (err) {
      throw err;
    }
  }

  static async logout() {
    destroyCookie(null, TOKEN);
    persistentStore.setState({ profile: "" });
    favoriteStore.setState({ productIds: [] });
    window.location.href = "/";
  }

  static async forgotPassword(payload) {
    try {
      const res = await BaseApi.post(
        APIDOMAIN + "/api/account/password/email",
        payload
      );
      return res;
    } catch (err) {
      throw err;
    }
  }

  static async verifyAccount() {
    try {
      const res = await BaseApi.post(
        APIDOMAIN + "/api/account/verification/resend"
      );
      return res;
    } catch (err) {
      throw err;
    }
  }

  static async resetPassword(payload) {
    try {
      await BaseApi.post(APIDOMAIN + "/api/account/password/reset", payload);
      // window.location.href = "/login";
    } catch (err) {
      throw err;
    }
  }
}
