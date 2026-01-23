<template>
  <view class="min-h-screen bg-[#f5f5f5] flex flex-col items-center pt-[200rpx]">
    <view class="w-[120rpx] h-[120rpx] rounded-full flex items-center justify-center mb-[48rpx]">
      <image src="/static/tabbar/logo.png" mode="aspectFit" class="w-full h-full" />
    </view>
    <text class="text-[36rpx] font-bold mb-[80rpx]">恒拓农机检测系统</text>

    <view class="w-[90%] bg-white rounded-[16rpx] p-[32rpx]">
      <view class="mb-[32rpx]">
        <text class="text-[28rpx] text-[#666] mb-[16rpx] block">用户名</text>
        <input
          v-model="form.username"
          class="h-[88rpx] bg-[#f5f5f5] rounded-[12rpx] px-[24rpx] text-[28rpx]"
          placeholder="请输入用户名"
        />
      </view>
      <view class="mb-[32rpx]">
        <text class="text-[28rpx] text-[#666] mb-[16rpx] block">密码</text>
        <input
          v-model="form.password"
          type="password"
          class="h-[88rpx] bg-[#f5f5f5] rounded-[12rpx] px-[24rpx] text-[28rpx]"
          placeholder="请输入密码"
        />
      </view>
      
      <!-- 用户协议勾选 -->
      <view class="flex items-center mb-[16rpx]">
        <checkbox
          :checked="agreementChecked"
          @click="agreementChecked = !agreementChecked"
          color="#10b981"
          class="mr-[12rpx]"
          style="transform: scale(0.8)"
        />
        <text class="text-[24rpx] text-[#666]">我已阅读并同意</text>
        <text class="text-[24rpx] text-primary ml-[8rpx]" @click="showAgreementPopup = true">《用户协议》</text>
      </view>
      
      <!-- 隐私政策勾选 -->
      <view class="flex items-center mb-[32rpx]">
        <checkbox
          :checked="privacyChecked"
          @click="privacyChecked = !privacyChecked"
          color="#10b981"
          class="mr-[12rpx]"
          style="transform: scale(0.8)"
        />
        <text class="text-[24rpx] text-[#666]">我已阅读并同意</text>
        <text class="text-[24rpx] text-primary ml-[8rpx]" @click="showPrivacyPopup = true">《隐私政策》</text>
      </view>
      
      <button
        class="w-full h-[88rpx] bg-primary text-white rounded-[12rpx] text-[32rpx]"
        :loading="loading"
        @click="handleLogin"
      >
        登录
      </button>
    </view>
    
    <!-- 用户协议弹窗 -->
    <view v-if="showAgreementPopup" class="popup-mask" @click="showAgreementPopup = false">
      <view class="popup-content" @click.stop>
        <view class="popup-header">
          <text class="popup-title">用户协议</text>
          <text class="popup-close" @click="showAgreementPopup = false">✕</text>
        </view>
        <view class="popup-body">
          <UserAgreementContent />
        </view>
        <view class="popup-footer">
          <button class="popup-btn" @click="handleAgreeAgreement">我已阅读并同意</button>
        </view>
      </view>
    </view>
    
    <!-- 隐私政策弹窗 -->
    <view v-if="showPrivacyPopup" class="popup-mask" @click="showPrivacyPopup = false">
      <view class="popup-content" @click.stop>
        <view class="popup-header">
          <text class="popup-title">隐私政策</text>
          <text class="popup-close" @click="showPrivacyPopup = false">✕</text>
        </view>
        <view class="popup-body">
          <PrivacyPolicyContent />
        </view>
        <view class="popup-footer">
          <button class="popup-btn" @click="handleAgreePrivacy">我已阅读并同意</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";
import { login } from "@/api/auth";
import UserAgreementContent from "./components/UserAgreementContent.vue";
import PrivacyPolicyContent from "./components/PrivacyPolicyContent.vue";

const form = ref({
  username: "",
  password: "",
});
const loading = ref(false);

// 协议勾选状态
const agreementChecked = ref(false);
const privacyChecked = ref(false);

// 弹窗显示状态
const showAgreementPopup = ref(false);
const showPrivacyPopup = ref(false);

// 同意用户协议
const handleAgreeAgreement = () => {
  agreementChecked.value = true;
  showAgreementPopup.value = false;
};

// 同意隐私政策
const handleAgreePrivacy = () => {
  privacyChecked.value = true;
  showPrivacyPopup.value = false;
};

const handleLogin = async () => {
  if (!form.value.username || !form.value.password) {
    uni.showToast({ title: "请输入用户名和密码", icon: "none" });
    return;
  }
  
  // 检查是否勾选用户协议
  if (!agreementChecked.value) {
    uni.showToast({ title: "请先阅读并同意用户协议", icon: "none" });
    return;
  }
  
  // 检查是否勾选隐私政策
  if (!privacyChecked.value) {
    uni.showToast({ title: "请先阅读并同意隐私政策", icon: "none" });
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

<style scoped>
/* 弹窗遮罩 */
.popup-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

/* 弹窗内容 */
.popup-content {
  width: 90%;
  height: 70vh;
  background: #fff;
  border-radius: 24rpx;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* 弹窗头部 */
.popup-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 32rpx;
  border-bottom: 1rpx solid #eee;
}

.popup-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
}

.popup-close {
  font-size: 36rpx;
  color: #999;
  padding: 8rpx;
}

/* 弹窗主体 */
.popup-body {
  flex: 1;
  overflow: hidden;
}

/* 弹窗底部 */
.popup-footer {
  padding: 24rpx 32rpx;
  border-top: 1rpx solid #eee;
}

.popup-btn {
  width: 100%;
  height: 80rpx;
  background: #10b981;
  color: #fff;
  border-radius: 12rpx;
  font-size: 28rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
