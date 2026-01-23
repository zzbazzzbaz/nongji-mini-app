const BASE_URL = "https://www.zbhtdz.top/api/v1";

export const getBaseUrl = () => BASE_URL;

export const request = (options) => {
  return new Promise((resolve, reject) => {
    const token = uni.getStorageSync("token");
    uni.request({
      url: BASE_URL + options.url,
      method: options.method || "GET",
      data: options.data,
      header: {
        Authorization: token ? `Token ${token}` : "",
        "Content-Type": options.contentType || "application/json",
      },
      success: (res) => {
        if (res.data.code === 401) {
          uni.removeStorageSync("token");
          uni.removeStorageSync("userInfo");
          uni.redirectTo({ url: "/pages/login/login" });
          reject(res.data);
        } else {
          resolve(res.data);
        }
      },
      fail: reject,
    });
  });
};

export const uploadFile = (url, filePath, name = "image", formData = {}) => {
  return new Promise((resolve, reject) => {
    const token = uni.getStorageSync("token");
    uni.uploadFile({
      url: BASE_URL + url,
      filePath,
      name,
      formData,
      header: {
        Authorization: token ? `Token ${token}` : "",
      },
      success: (res) => {
        resolve(JSON.parse(res.data));
      },
      fail: reject,
    });
  });
};

export const downloadFile = (url) => {
  return new Promise((resolve, reject) => {
    const token = uni.getStorageSync("token");
    uni.downloadFile({
      url: BASE_URL + url,
      header: {
        Authorization: token ? `Token ${token}` : "",
      },
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.tempFilePath);
        } else {
          reject(new Error("下载失败"));
        }
      },
      fail: reject,
    });
  });
};
