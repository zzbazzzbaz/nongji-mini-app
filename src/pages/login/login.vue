<template>
  <view class="min-h-screen bg-[#f5f5f5] flex flex-col items-center pt-[200rpx]">
    <view class="w-[120rpx] h-[120rpx] rounded-full bg-primary flex items-center justify-center mb-[48rpx]">
      <text class="text-white text-[48rpx]">农</text>
    </view>
    <text class="text-[36rpx] font-bold mb-[80rpx]">农机检测系统</text>

    <view class="w-[90%] bg-white rounded-[16rpx] p-[32rpx]">
      <view class="mb-[32rpx]">
        <text class="text-[28rpx] text-[#666] mb-[16rpx] block">用户名</text>
        <input
          v-model="form.username"
          class="h-[88rpx] bg-[#f5f5f5] rounded-[12rpx] px-[24rpx] text-[28rpx]"
          placeholder="请输入用户名"
        />
      </view>
      <view class="mb-[48rpx]">
        <text class="text-[28rpx] text-[#666] mb-[16rpx] block">密码</text>
        <input
          v-model="form.password"
          type="password"
          class="h-[88rpx] bg-[#f5f5f5] rounded-[12rpx] px-[24rpx] text-[28rpx]"
          placeholder="请输入密码"
        />
      </view>
      <button
        class="w-full h-[88rpx] bg-primary text-white rounded-[12rpx] text-[32rpx]"
        :loading="loading"
        @click="handleLogin"
      >
        登录
      </button>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";
import { login } from "@/api/auth";

const form = ref({
  username: "",
  password: "",
});
const loading = ref(false);

const handleLogin = async () => {
  if (!form.value.username || !form.value.password) {
    uni.showToast({ title: "请输入用户名和密码", icon: "none" });
    return;
  }
  loading.value = true;
  try {
    const res = await login(form.value);
    if (res.code === 200) {
      uni.setStorageSync("token", res.data.token);
      uni.setStorageSync("userInfo", res.data.user);
      uni.switchTab({ url: "/pages/index/index" });
    } else {
      uni.showToast({ title: res.message || "登录失败", icon: "none" });
    }
  } catch (e) {
    uni.showToast({ title: "网络错误", icon: "none" });
  } finally {
    loading.value = false;
  }
};
</script>
