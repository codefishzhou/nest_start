// 检测接口状态
const checkStatus = (response) => {
  switch (response.statusCode) {
    case 400:
      uni.showToast({
        title: "请求错误",
        icon: "none",
        duration: 2000,
      });
      break;
    case 401:
      // store.commit('LOGIN_OUT')
      setTimeout(function () {
        uni.reLaunch({
          url: "/pages/index/index/",
        });
      }, 500);
      uni.showToast({
        title: "未授权，请登录",
        icon: "none",
        duration: 2000,
      });
      break;
    case 403:
      uni.showToast({
        title: "拒绝访问",
        icon: "none",
        duration: 2000,
      });
      break;
    case 404:
      uni.showToast({
        title: `请求地址出错: ${err.response.config.url}`,
        icon: "none",
        duration: 2000,
      });
      break;
    case 408:
      uni.showToast({
        title: "请求超时",
        icon: "none",
        duration: 2000,
      });
      break;
    case 500:
      uni.showToast({
        title: "服务器内部错误",
        icon: "none",
        duration: 2000,
      });
      break;
    case 501:
      uni.showToast({
        title: "服务未实现",
        icon: "none",
        duration: 2000,
      });
      break;
    case 502:
      uni.showToast({
        title: "网关错误",
        icon: "none",
        duration: 2000,
      });
      break;
    case 503:
      uni.showToast({
        title: "服务不可用",
        icon: "none",
        duration: 2000,
      });
      break;
    case 504:
      uni.showToast({
        title: "网关超时",
        icon: "none",
        duration: 2000,
      });
      break;
    case 505:
      uni.showToast({
        title: "HTTP版本不受支持",
        icon: "none",
        duration: 2000,
      });
      break;
    default:
  }
};
// 不带token请求
export const httpRequest = (opts) => {
  return new Promise((resolve, reject) => {
    //#ifdef APP-PLUS || H5
    uni.showLoading({
      title: "加载中...",
    });
    //#endif

    // #ifndef APP-PLUS || H5
    uni.showToast({
      title: "加载中...",
      icon: "loading",
    });
    //#endif
    uni.request({
      url: opts.url,
      data: opts.data,
      method: opts.method,
      header: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
      sslVerify: false,
      success: (res) => {
        if (res.statusCode && res.statusCode == 200) {
          uni.hideLoading();
          resolve(res.data);
        } else {
          uni.hideLoading();
          checkStatus(res);
          reject(res);
        }
      },
      fail: (err) => {
        uni.hideLoading();
        checkStatus(err);
        reject(err);
      },
    });
  });
};

//带Token请求
export const httpTokenRequest = (opts) => {
  let token = uni.getStorageSync("TOKEN");
  if (!token) {
    uni.reLaunch({
      url: "/pages/user/login/login2",
    });
    return;
  }
  return new Promise((resolve, reject) => {
    //#ifdef APP-PLUS || H5
    uni.showLoading({
      title: "加载中...",
    });
    //#endif

    // #ifndef APP-PLUS || H5
    uni.showToast({
      title: "加载中...",
      icon: "loading",
    });
    //#endif
    uni.request({
      url: opts.url,
      data: opts.data,
      method: opts.method,
      header: {
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: "Bearer " + token,
      },
      sslVerify: false,
      success: (res) => {
        if (res.statusCode && res.statusCode == 200) {
          uni.hideLoading();
          resolve(res.data);
        } else {
          uni.hideLoading();
          checkStatus(res);
          reject(res);
        }
      },
      fail: (err) => {
        uni.hideLoading();
        checkStatus(err);
        reject(err);
      },
    });
  });
};

//带Token请求
export const httpTokenfileUpload = (url, file, data) => {
  let token = uni.getStorageSync("TOKEN");
  if (!token) {
    uni.reLaunch({
      url: "/",
    });
    return;
  }

  return new Promise((resolve, reject) => {
    //#ifdef APP-PLUS || H5
    uni.showLoading({
      title: "加载中...",
    });
    //#endif

    // #ifndef APP-PLUS || H5
    uni.showToast({
      title: "加载中...",
      icon: "loading",
    });
    //#endif
    uni.uploadFile({
      url: url, //你上传接口
      filePath: file.url, //
      header: {
        Authorization: "Bearer " + token,
      },
      file: file.file,
      name: "file", //后台接收文件的标识
      formData: data,
      success: (res) => {
        if (res.statusCode && res.statusCode == 200) {
          uni.hideLoading();
          resolve(res.data);
        } else {
          uni.hideLoading();
          checkStatus(res);
          reject(res);
        }
      },
      fail: (err) => {
        console.log(err);
        uni.hideLoading();
        checkStatus(err);
        reject(err);
      },
    });
  });
};
