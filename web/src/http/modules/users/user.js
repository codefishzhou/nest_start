import { notes, baseUrl } from "@/utils/global.js";
import { httpRequest, httpTokenRequest } from "@/http/api.js";

// 登录获取token
export const login = (data) => {
  return httpRequest({
    url: baseUrl + "/user/login",
    method: "POST",
    data,
  });
};