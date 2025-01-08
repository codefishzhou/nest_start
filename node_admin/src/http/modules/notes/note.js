import { notes, baseUrl } from "@/utils/global.js";
import { httpRequest, httpTokenRequest } from "@/http/api.js";

// 获取库位分页数据
export const add = (data) => {
  return httpTokenRequest({
    url: baseUrl + "/nodes/create",
    method: "POST",
    data,
  });
};


export const login = (data) => {
  return httpTokenRequest({
    url: baseUrl + "/user/login",
    method: "POST",
    data,
  });
};

// 获取一句话
export const OneLiner = () => {
  return httpTokenRequest({
    url: "https://v1.hitokoto.cn",
    method: "GET",
  });
};

// 根据月份获取数据
export const findMonth = (data) => {
  return httpTokenRequest({
    url: baseUrl + "/nodes/get-by-month",
    method: "post",
    data,
  });
};

//根据id删除
export const deleteNote = (data) => {
  return httpTokenRequest({
    url: baseUrl + "/nodes/delete",
    method: "delete",
    data,
  });
};

//根据id删除
export const editNote = (data) => {
  let obj = data
  let updateId = data.id
  delete data.id
  delete data.disabled
  delete data.show
  return httpTokenRequest({
    url: baseUrl + "/nodes/"+updateId,
    method: "post",
    data:obj
  });
};

//导出
export const exportFile = () => {
  return httpTokenRequest({
    url: baseUrl + "/nodes/export",
    method: "post",
  });
};
