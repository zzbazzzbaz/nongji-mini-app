import { request, downloadFile, getBaseUrl } from "@/utils/request";

// 获取检验记录列表
export const getInspections = (params) => {
  return request({ url: "/inspections/", data: params });
};

// 获取检验记录详情
export const getInspection = (id) => {
  return request({ url: `/inspections/${id}/` });
};

// 创建检验记录
export const createInspection = (data) => {
  return request({ url: "/inspections/", method: "POST", data });
};

// 创建检验记录（带图片）- 一次创建，多次更新上传图片
export const createInspectionWithImages = async (data, files) => {
  // 如果没有文件，直接用JSON请求
  if (!files || Object.keys(files).length === 0) {
    return createInspection(data);
  }
  
  const token = uni.getStorageSync("token");
  const fileKeys = Object.keys(files);
  
  // 先创建记录（带第一张图片）
  const firstFileKey = fileKeys[0];
  const firstFilePath = files[firstFileKey];
  
  const createRes = await new Promise((resolve, reject) => {
    uni.uploadFile({
      url: getBaseUrl() + "/inspections/",
      filePath: firstFilePath,
      name: firstFileKey,
      formData: data,
      header: { Authorization: token ? `Token ${token}` : "" },
      success: (res) => resolve(JSON.parse(res.data)),
      fail: reject,
    });
  });
  
  // 如果创建失败或只有一张图片，直接返回
  if (createRes.code !== 201 || fileKeys.length === 1) {
    return createRes;
  }
  
  // 上传剩余图片（逐个使用uploadFile + PUT header模拟）
  const recordId = createRes.data.id;
  for (let i = 1; i < fileKeys.length; i++) {
    const fileKey = fileKeys[i];
    const filePath = files[fileKey];
    await new Promise((resolve, reject) => {
      uni.uploadFile({
        url: getBaseUrl() + `/inspections/${recordId}/upload-image/`,
        filePath,
        name: fileKey,
        formData: {},
        header: { Authorization: token ? `Token ${token}` : "" },
        success: (res) => resolve(JSON.parse(res.data)),
        fail: reject,
      });
    });
  }
  
  return createRes;
};

// 更新检验记录
export const updateInspection = (id, data) => {
  return request({ url: `/inspections/${id}/`, method: "PUT", data });
};

// 更新检验记录（带图片）
export const updateInspectionWithImages = async (id, data, files) => {
  const token = uni.getStorageSync("token");
  const fileKeys = Object.keys(files || {});
  
  // 如果没有新图片，直接用JSON请求
  if (fileKeys.length === 0) {
    return updateInspection(id, data);
  }
  
  // 先更新基本数据和第一张图片
  const firstFileKey = fileKeys[0];
  const firstFilePath = files[firstFileKey];
  
  const updateRes = await new Promise((resolve, reject) => {
    uni.uploadFile({
      url: getBaseUrl() + `/inspections/${id}/`,
      filePath: firstFilePath,
      name: firstFileKey,
      formData: data,
      header: { Authorization: token ? `Token ${token}` : "" },
      success: (res) => resolve(JSON.parse(res.data)),
      fail: reject,
    });
  });
  
  // 如果更新失败或只有一张图片，直接返回
  if (updateRes.code !== 200 || fileKeys.length === 1) {
    return updateRes;
  }
  
  // 上传剩余图片
  for (let i = 1; i < fileKeys.length; i++) {
    const fileKey = fileKeys[i];
    const filePath = files[fileKey];
    await new Promise((resolve, reject) => {
      uni.uploadFile({
        url: getBaseUrl() + `/inspections/${id}/`,
        filePath,
        name: fileKey,
        formData: {},
        header: { Authorization: token ? `Token ${token}` : "" },
        success: (res) => resolve(JSON.parse(res.data)),
        fail: reject,
      });
    });
  }
  
  return updateRes;
};

// 删除检验记录
export const deleteInspection = (id) => {
  return request({ url: `/inspections/${id}/`, method: "DELETE" });
};

// 导出单个Word文档
export const exportInspection = (id) => {
  return downloadFile(`/inspections/${id}/export/`);
};

// 获取导出URL（用于H5直接下载）
export const getExportUrl = (id) => {
  const token = uni.getStorageSync("token");
  return `${getBaseUrl()}/inspections/${id}/export/?token=${token}`;
};

// 批量导出ZIP
export const exportBatch = (ids) => {
  return request({ url: "/inspections/export-batch/", method: "POST", data: { ids } });
};
