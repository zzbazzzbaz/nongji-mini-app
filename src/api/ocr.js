import { uploadFile } from "@/utils/request";

// OCR识别行驶证（正页+副页一起识别）
export const ocrDrivingLicense = (filePath) => {
  return uploadFile("/ocr/driving-license/", filePath, "image");
};

// OCR识别车牌
export const ocrLicensePlate = (filePath) => {
  return uploadFile("/ocr/license-plate/", filePath, "image");
};
