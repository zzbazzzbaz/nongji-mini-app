import { request } from "@/utils/request";

// 用户登录
export const login = (data) => {
  return request({ url: "/auth/login/", method: "POST", data });
};

// 获取当前用户信息
export const getProfile = () => {
  return request({ url: "/auth/profile/" });
};

// 退出登录
export const logout = () => {
  return request({ url: "/auth/logout/", method: "POST" });
};
