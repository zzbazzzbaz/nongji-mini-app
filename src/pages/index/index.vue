<template>
  <view class="p-[24rpx]">
    <!-- 用户信息 -->
    <view class="bg-white rounded-[16rpx] p-[32rpx] mb-[24rpx]">
      <view class="flex items-center">
        <view class="w-[100rpx] h-[100rpx] rounded-full bg-primary flex items-center justify-center">
          <text class="text-white text-[40rpx]">{{ userInfo.username?.charAt(0) || '?' }}</text>
        </view>
        <view class="ml-[24rpx]">
          <text class="text-[32rpx] font-bold">{{ userInfo.username || '未登录' }}</text>
          <text class="block text-[24rpx] text-[#999] mt-[8rpx]">{{ userInfo.role_display || '' }}</text>
        </view>
      </view>
    </view>

    <!-- 功能入口 -->
    <view class="bg-white rounded-[16rpx] p-[32rpx]">
      <text class="text-[28rpx] text-[#999] mb-[24rpx] block">快捷操作</text>
      <view class="flex flex-wrap">
        <view class="w-1/2 flex flex-col items-center py-[24rpx]" @click="goCreate">
          <view class="w-[80rpx] h-[80rpx] rounded-[16rpx] bg-primary flex items-center justify-center mb-[16rpx]">
            <text class="text-white text-[40rpx]">+</text>
          </view>
          <text class="text-[28rpx]">新建检验</text>
        </view>
        <view v-if="userInfo.can_use_ocr" class="w-1/2 flex flex-col items-center py-[24rpx]" @click="goOcrCreate">
          <view class="w-[80rpx] h-[80rpx] rounded-[16rpx] bg-[#1989fa] flex items-center justify-center mb-[16rpx]">
            <text class="text-white text-[32rpx]">OCR</text>
          </view>
          <text class="text-[28rpx]">拍照识别</text>
        </view>
      </view>
    </view>

    <!-- 退出登录 -->
    <view class="mt-[48rpx]">
      <button class="w-full h-[88rpx] bg-white text-[#ee0a24] rounded-[16rpx] text-[30rpx]" @click="handleLogout">
        退出登录
      </button>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { onShow } from "@dcloudio/uni-app";
import { getProfile, logout } from "@/api/auth";

const userInfo = ref({});

const loadUserInfo = async () => {
  const token = uni.getStorageSync("token");
  if (!token) {
    uni.redirectTo({ url: "/pages/login/login" });
    return;
  }
  try {
    const res = await getProfile();
    if (res.code === 200) {
      userInfo.value = res.data;
      uni.setStorageSync("userInfo", res.data);
    }
  } catch (e) {
    console.error(e);
  }
};

const goCreate = () => {
  uni.navigateTo({ url: "/pages/inspection/create" });
};

const goOcrCreate = () => {
  uni.navigateTo({ url: "/pages/inspection/create?ocr=1" });
};

const handleLogout = () => {
  uni.showModal({
    title: "提示",
    content: "确定要退出登录吗？",
    success: async (res) => {
      if (res.confirm) {
        try {
          await logout();
        } catch (e) {
          // 忽略错误
        }
        uni.removeStorageSync("token");
        uni.removeStorageSync("userInfo");
        uni.redirectTo({ url: "/pages/login/login" });
      }
    },
  });
};

onShow(() => {
  loadUserInfo();
});
</script>
