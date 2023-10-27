import axios from "axios";
import interceptorSetup from "./interceptor";
import UseSWR from "swr";
interceptorSetup(axios);
const basicAxios = axios.create();
const defaultConfig = {
  headers: {
    "content-type": "application/json",
  },
};
export default class BaseApi {
  static async get(URL, config = defaultConfig) {
    return await axios.get(URL, config);
  }
  static async post(URL, data, config = defaultConfig) {
    return await axios.post(URL, data, config).then(
      (response) => {
        return response;
      },
      (error) => {
        throw error;
      }
    );
  }
  static async put(URL, data, config = defaultConfig) {
    return await axios.put(URL, data, config).then(
      (response) => {
        return response;
      },
      (error) => {
        throw error;
      }
    );
  }
  static async patch(URL, data, config = defaultConfig) {
    return await axios.patch(URL, data, config).then(
      (response) => {
        return response;
      },
      (error) => {
        throw error;
      }
    );
  }

  static async delete(URL, config = defaultConfig) {
    return await axios.delete(URL, config).then(
      (response) => {
        return response;
      },
      (error) => {
        throw error;
      }
    );
  }

  // Documentation: https://swr.vercel.app/docs/api
  static swr(URL, options = {}) {
    const fetcher = (link) => this.get(link);
    const render = options.hasOwnProperty("render") ? options.render : true;
    const { data, mutate, isValidating, error } = UseSWR(
      render ? URL : null,
      fetcher,
      options
    );
    return {
      data: data ? data.data : data,
      mutate,
      isValidating,
      error,
    };
  }
  static swrPost(URL, payload, options = {}) {
    const fetcher = (link) => this.post(link, payload);
    const render = options.hasOwnProperty("render") ? options.render : true;
    const { data, mutate, isValidating, error } = UseSWR(
      render ? URL : null,
      fetcher,
      options
    );
    return {
      data: data ? data.data : data,
      mutate,
      isValidating,
      error,
    };
  }

  // No Interceptor
  static async customGet(URL, headers) {
    return basicAxios.get(URL, headers);
  }

  static async customPut(URL, data, headers) {
    return basicAxios.put(URL, data, headers);
  }
}
