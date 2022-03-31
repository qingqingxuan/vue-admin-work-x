import Axios, { AxiosResponse } from "axios";
import qs from "qs";

const baseIp = "http://api.vueadminwork.com/";

export const CONTENT_TYPE = "Content-Type";

export const FORM_URLENCODED =
  "application/x-www-form-urlencoded; charset=UTF-8";

export const APPLICATION_JSON = "application/json; charset=UTF-8";

export const TEXT_PLAIN = "text/plain; charset=UTF-8";

const service = Axios.create({
  baseURL: baseIp,
  timeout: 10 * 60 * 1000,
});

service.interceptors.request.use(
  (config) => {
    !config.headers && (config.headers = {});
    config.headers["Admin-Work-Version"] = "x";
    if (!config.headers[CONTENT_TYPE]) {
      config.headers[CONTENT_TYPE] = APPLICATION_JSON;
    }
    if (config.headers[CONTENT_TYPE] === FORM_URLENCODED) {
      config.data = qs.stringify(config.data);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error.response);
  }
);

service.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    if (response.status === 200) {
      return response;
    } else {
      throw new Error(response.status.toString());
    }
  },
  (error) => {
    if (process.env.NODE_ENV === "development") {
      console.log(error);
    }
    return Promise.reject({ code: 500, msg: "服务器异常，请稍后重试…" });
  }
);

export default service;
