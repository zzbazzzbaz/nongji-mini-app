<template>
  <view class="page-container">
    <!-- OCR识别区域 -->
    <view v-if="canUseOcr" class="card ocr-card">
      <view class="card-header">
        <text class="card-title">📷 OCR识别</text>
      </view>
      <view class="ocr-btns">
        <button class="ocr-btn ocr-btn-license" @click="ocrLicense">
          <text class="ocr-btn-icon">🪪</text>
          <text>识别行驶证</text>
        </button>
        <button class="ocr-btn ocr-btn-plate" @click="ocrPlate">
          <text class="ocr-btn-icon">🚗</text>
          <text>识别车牌</text>
        </button>
      </view>
    </view>

    <!-- 图片上传区域 -->
    <view class="card">
      <view class="card-header">
        <text class="card-title">📎 图片资料</text>
      </view>
      <view class="image-upload-grid">
        <view class="image-upload-item" @click="chooseImage('license_front')">
          <image v-if="images.license_front" :src="images.license_front" mode="aspectFill" class="upload-preview" />
          <view v-else class="upload-placeholder">
            <text class="upload-icon">+</text>
            <text class="upload-text">行驶证正面</text>
          </view>
          <view v-if="images.license_front" class="upload-delete" @click.stop="removeImage('license_front')">×</view>
        </view>
        <view class="image-upload-item" @click="chooseImage('license_back')">
          <image v-if="images.license_back" :src="images.license_back" mode="aspectFill" class="upload-preview" />
          <view v-else class="upload-placeholder">
            <text class="upload-icon">+</text>
            <text class="upload-text">行驶证副页</text>
          </view>
          <view v-if="images.license_back" class="upload-delete" @click.stop="removeImage('license_back')">×</view>
        </view>
        <view class="image-upload-item" @click="chooseImage('plate')">
          <image v-if="images.plate" :src="images.plate" mode="aspectFill" class="upload-preview" />
          <view v-else class="upload-placeholder">
            <text class="upload-icon">+</text>
            <text class="upload-text">车牌图片</text>
          </view>
          <view v-if="images.plate" class="upload-delete" @click.stop="removeImage('plate')">×</view>
        </view>
        <view class="image-upload-item" @click="chooseImage('brake_report')">
          <image v-if="images.brake_report" :src="images.brake_report" mode="aspectFill" class="upload-preview" />
          <view v-else class="upload-placeholder">
            <text class="upload-icon">+</text>
            <text class="upload-text">制动检验报告</text>
          </view>
          <view v-if="images.brake_report" class="upload-delete" @click.stop="removeImage('brake_report')">×</view>
        </view>
        <view class="image-upload-item" @click="chooseImage('headlight_report')">
          <image v-if="images.headlight_report" :src="images.headlight_report" mode="aspectFill" class="upload-preview" />
          <view v-else class="upload-placeholder">
            <text class="upload-icon">+</text>
            <text class="upload-text">前照灯检验报告</text>
          </view>
          <view v-if="images.headlight_report" class="upload-delete" @click.stop="removeImage('headlight_report')">×</view>
        </view>
      </view>
    </view>

    <!-- 正页信息 -->
    <view class="card">
      <view class="card-header"><text class="card-title">📋 正页信息</text></view>
      <view class="form-item">
        <text class="form-label required">号牌号码</text>
        <input v-model="form.license_plate_number" class="form-input" placeholder="请输入号牌号码" />
      </view>
      <view class="form-item">
        <text class="form-label">类型</text>
        <input v-model="form.vehicle_type" class="form-input" placeholder="如：履带式联合收割机" />
      </view>
      <view class="form-item">
        <text class="form-label">所有人</text>
        <input v-model="form.owner" class="form-input" placeholder="请输入所有人姓名" />
      </view>
      <view class="form-item">
        <text class="form-label">住址</text>
        <input v-model="form.address" class="form-input" placeholder="请输入住址" />
      </view>
      <view class="form-item">
        <text class="form-label">底盘号/机架号</text>
        <input v-model="form.chassis_number" class="form-input" placeholder="请输入底盘号" />
      </view>
      <view class="form-item">
        <text class="form-label">挂车架号码</text>
        <input v-model="form.trailer_frame_number" class="form-input" placeholder="请输入挂车架号码" />
      </view>
      <view class="form-item">
        <text class="form-label">发动机号码</text>
        <input v-model="form.engine_number" class="form-input" placeholder="请输入发动机号码" />
      </view>
      <view class="form-item">
        <text class="form-label">品牌</text>
        <input v-model="form.brand" class="form-input" placeholder="请输入品牌" />
      </view>
      <view class="form-item">
        <text class="form-label">型号名称</text>
        <input v-model="form.model_name" class="form-input" placeholder="请输入型号名称" />
      </view>
      <view class="form-item">
        <text class="form-label">登记日期</text>
        <picker mode="date" :value="form.registration_date" @change="(e) => form.registration_date = e.detail.value">
          <view class="form-input form-picker">
            <text :class="{ 'placeholder': !form.registration_date }">{{ form.registration_date || '请选择日期' }}</text>
            <text class="picker-arrow">›</text>
          </view>
        </picker>
      </view>
      <view class="form-item">
        <text class="form-label">发证日期</text>
        <picker mode="date" :value="form.issue_date" @change="(e) => form.issue_date = e.detail.value">
          <view class="form-input form-picker">
            <text :class="{ 'placeholder': !form.issue_date }">{{ form.issue_date || '请选择日期' }}</text>
            <text class="picker-arrow">›</text>
          </view>
        </picker>
      </view>
      <view class="form-item">
        <text class="form-label">发证机关</text>
        <input v-model="form.issue_authority" class="form-input" placeholder="请输入发证机关" />
      </view>
    </view>

    <!-- 副页信息 -->
    <view class="card">
      <view class="card-header"><text class="card-title">📄 副页信息</text></view>
      <view class="form-item">
        <text class="form-label">拖拉机最小使用质量</text>
        <input v-model="form.tractor_min_weight" class="form-input" placeholder="请输入" />
      </view>
      <view class="form-item">
        <text class="form-label">联合收割机质量</text>
        <input v-model="form.harvester_weight" class="form-input" placeholder="请输入" />
      </view>
      <view class="form-item">
        <text class="form-label">拖拉机最大允许载质量</text>
        <input v-model="form.tractor_max_load" class="form-input" placeholder="请输入" />
      </view>
      <view class="form-item">
        <text class="form-label">准乘人数</text>
        <input v-model="form.passenger_capacity" class="form-input" placeholder="请输入" />
      </view>
      <view class="form-item">
        <text class="form-label">外廓尺寸(毫米)</text>
        <input v-model="form.overall_dimension" class="form-input" placeholder="如：6000/2670/2850" />
      </view>
      <view class="form-item">
        <text class="form-label">检验记录</text>
        <input v-model="form.inspection_record" class="form-input" placeholder="请输入检验记录" />
      </view>
    </view>

    <!-- 其他信息 -->
    <view class="card">
      <view class="card-header"><text class="card-title">📝 其他信息</text></view>
      <view class="form-item">
        <text class="form-label">机身颜色</text>
        <input v-model="form.body_color" class="form-input" placeholder="请输入机身颜色" />
      </view>
      <view class="form-item">
        <text class="form-label">生产日期</text>
        <picker mode="date" :value="form.production_date" @change="(e) => form.production_date = e.detail.value">
          <view class="form-input form-picker">
            <text :class="{ 'placeholder': !form.production_date }">{{ form.production_date || '请选择日期' }}</text>
            <text class="picker-arrow">›</text>
          </view>
        </picker>
      </view>
      <view class="form-item">
        <text class="form-label">车牌识别结果</text>
        <input v-model="form.plate_ocr_result" class="form-input" placeholder="OCR识别自动填入" disabled />
      </view>
    </view>

    <!-- 底部按钮 -->
    <view class="bottom-bar">
      <button class="submit-btn" :loading="submitting" :disabled="submitting" @click="handleSubmit">保存修改</button>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { getInspection, updateInspectionWithImages } from "@/api/inspection";
import { ocrDrivingLicense, ocrLicensePlate } from "@/api/ocr";
import { getBaseUrl } from "@/utils/request";

const recordId = ref(null);
const submitting = ref(false);

const form = ref({
  license_plate_number: "",
  vehicle_type: "",
  owner: "",
  address: "",
  chassis_number: "",
  trailer_frame_number: "",
  engine_number: "",
  brand: "",
  model_name: "",
  registration_date: "",
  issue_date: "",
  issue_authority: "",
  tractor_min_weight: "",
  harvester_weight: "",
  tractor_max_load: "",
  passenger_capacity: "",
  overall_dimension: "",
  inspection_record: "",
  body_color: "",
  production_date: "",
  plate_ocr_result: "",
});

const images = reactive({
  license_front: "",
  license_back: "",
  plate: "",
  brake_report: "",
  headlight_report: "",
});

// 记录原始图片URL（用于判断是否有新上传）
const originalImages = reactive({
  license_front: "",
  license_back: "",
  plate: "",
  brake_report: "",
  headlight_report: "",
});

const canUseOcr = computed(() => {
  const userInfo = uni.getStorageSync("userInfo") || {};
  return userInfo.can_use_ocr;
});

const getImageUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return getBaseUrl().replace("/api/v1", "") + path;
};

const loadDetail = async () => {
  uni.showLoading({ title: "加载中..." });
  try {
    const res = await getInspection(recordId.value);
    if (res.code === 200) {
      Object.keys(form.value).forEach((key) => {
        if (res.data[key] !== undefined && res.data[key] !== null) {
          form.value[key] = res.data[key];
        }
      });
      // 加载已有图片
      if (res.data.license_front_image) {
        images.license_front = getImageUrl(res.data.license_front_image);
        originalImages.license_front = images.license_front;
      }
      if (res.data.license_back_image) {
        images.license_back = getImageUrl(res.data.license_back_image);
        originalImages.license_back = images.license_back;
      }
      if (res.data.plate_image) {
        images.plate = getImageUrl(res.data.plate_image);
        originalImages.plate = images.plate;
      }
      if (res.data.brake_report_image) {
        images.brake_report = getImageUrl(res.data.brake_report_image);
        originalImages.brake_report = images.brake_report;
      }
      if (res.data.headlight_report_image) {
        images.headlight_report = getImageUrl(res.data.headlight_report_image);
        originalImages.headlight_report = images.headlight_report;
      }
    }
  } catch (e) {
    uni.showToast({ title: "加载失败", icon: "none" });
  } finally {
    uni.hideLoading();
  }
};

const chooseImage = (type) => {
  uni.chooseImage({
    count: 1,
    sourceType: ["camera", "album"],
    success: (res) => {
      images[type] = res.tempFilePaths[0];
    },
  });
};

const removeImage = (type) => {
  images[type] = "";
};

const ocrLicense = () => {
  uni.chooseImage({
    count: 1,
    sourceType: ["camera", "album"],
    success: async (res) => {
      const filePath = res.tempFilePaths[0];
      images.license_front = filePath;
      uni.showLoading({ title: "识别中..." });
      try {
        const ocrRes = await ocrDrivingLicense(filePath);
        if (ocrRes.code === 200) {
          Object.keys(ocrRes.data).forEach((key) => {
            if (form.value.hasOwnProperty(key) && ocrRes.data[key]) {
              form.value[key] = ocrRes.data[key];
            }
          });
          uni.showToast({ title: "识别成功", icon: "success" });
        } else {
          uni.showToast({ title: ocrRes.message || "识别失败", icon: "none" });
        }
      } catch (e) {
        uni.showToast({ title: "识别失败", icon: "none" });
      } finally {
        uni.hideLoading();
      }
    },
  });
};

const ocrPlate = () => {
  uni.chooseImage({
    count: 1,
    sourceType: ["camera", "album"],
    success: async (res) => {
      const filePath = res.tempFilePaths[0];
      images.plate = filePath;
      uni.showLoading({ title: "识别中..." });
      try {
        const ocrRes = await ocrLicensePlate(filePath);
        if (ocrRes.code === 200) {
          form.value.plate_ocr_result = ocrRes.data.plate_number;
          if (!form.value.license_plate_number) {
            form.value.license_plate_number = ocrRes.data.plate_number;
          }
          uni.showToast({ title: "识别成功", icon: "success" });
        } else {
          uni.showToast({ title: ocrRes.message || "识别失败", icon: "none" });
        }
      } catch (e) {
        uni.showToast({ title: "识别失败", icon: "none" });
      } finally {
        uni.hideLoading();
      }
    },
  });
};

const handleSubmit = async () => {
  if (!form.value.license_plate_number) {
    uni.showToast({ title: "请输入号牌号码", icon: "none" });
    return;
  }
  submitting.value = true;
  try {
    const data = {};
    Object.keys(form.value).forEach((key) => {
      if (form.value[key]) {
        data[key] = form.value[key];
      }
    });
    // 只上传新选择的图片（非原始URL）
    const files = {};
    if (images.license_front && images.license_front !== originalImages.license_front) {
      files.license_front_image = images.license_front;
    }
    if (images.license_back && images.license_back !== originalImages.license_back) {
      files.license_back_image = images.license_back;
    }
    if (images.plate && images.plate !== originalImages.plate) {
      files.plate_image = images.plate;
    }
    if (images.brake_report && images.brake_report !== originalImages.brake_report) {
      files.brake_report_image = images.brake_report;
    }
    if (images.headlight_report && images.headlight_report !== originalImages.headlight_report) {
      files.headlight_report_image = images.headlight_report;
    }
    
    const res = await updateInspectionWithImages(recordId.value, data, files);
    if (res.code === 200) {
      uni.showToast({ title: "保存成功", icon: "success" });
      setTimeout(() => uni.navigateBack(), 1500);
    } else {
      uni.showToast({ title: res.message || "保存失败", icon: "none" });
    }
  } catch (e) {
    uni.showToast({ title: "保存失败", icon: "none" });
  } finally {
    submitting.value = false;
  }
};

onLoad((options) => {
  recordId.value = options.id;
  if (recordId.value) {
    loadDetail();
  }
});
</script>

<style scoped>
.page-container {
  min-height: 100vh;
  background: #f5f7fa;
  padding: 24rpx;
  padding-bottom: 160rpx;
}

.card {
  background: #fff;
  border-radius: 16rpx;
  margin-bottom: 24rpx;
  overflow: hidden;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.04);
}

.card-header {
  padding: 24rpx 28rpx;
  border-bottom: 1rpx solid #f0f0f0;
  background: #fafbfc;
}

.card-title {
  font-size: 28rpx;
  font-weight: 600;
  color: #333;
}

.ocr-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.ocr-card .card-header {
  background: transparent;
  border-bottom: 1rpx solid rgba(255, 255, 255, 0.2);
}

.ocr-card .card-title {
  color: #fff;
}

.ocr-btns {
  display: flex;
  padding: 24rpx;
  gap: 20rpx;
}

.ocr-btn {
  flex: 1;
  height: 100rpx;
  border-radius: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26rpx;
  border: none;
  gap: 8rpx;
}

.ocr-btn-license {
  background: rgba(255, 255, 255, 0.95);
  color: #667eea;
}

.ocr-btn-plate {
  background: rgba(255, 255, 255, 0.95);
  color: #07c160;
}

.ocr-btn-icon {
  font-size: 32rpx;
}

.image-upload-grid {
  display: flex;
  flex-wrap: wrap;
  padding: 20rpx;
  gap: 16rpx;
}

.image-upload-item {
  width: calc(33.33% - 12rpx);
  aspect-ratio: 1;
  border-radius: 12rpx;
  overflow: hidden;
  position: relative;
  background: #f8f9fa;
  border: 2rpx dashed #ddd;
}

.upload-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.upload-icon {
  font-size: 48rpx;
  color: #ccc;
  line-height: 1;
}

.upload-text {
  font-size: 20rpx;
  color: #999;
  margin-top: 8rpx;
  text-align: center;
}

.upload-preview {
  width: 100%;
  height: 100%;
}

.upload-delete {
  position: absolute;
  top: 0;
  right: 0;
  width: 40rpx;
  height: 40rpx;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 28rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0 0 0 12rpx;
}

.form-item {
  padding: 20rpx 28rpx;
  border-bottom: 1rpx solid #f5f5f5;
}

.form-item:last-child {
  border-bottom: none;
}

.form-label {
  display: block;
  font-size: 24rpx;
  color: #666;
  margin-bottom: 12rpx;
}

.form-label.required::before {
  content: "*";
  color: #ee0a24;
  margin-right: 4rpx;
}

.form-input {
  width: 100%;
  height: 72rpx;
  background: #f8f9fa;
  border-radius: 8rpx;
  padding: 0 20rpx;
  font-size: 28rpx;
  color: #333;
  box-sizing: border-box;
}

.form-picker {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.form-picker .placeholder {
  color: #999;
}

.picker-arrow {
  color: #ccc;
  font-size: 32rpx;
}

.bottom-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 20rpx 24rpx;
  padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
  background: #fff;
  box-shadow: 0 -2rpx 12rpx rgba(0, 0, 0, 0.06);
}

.submit-btn {
  width: 100%;
  height: 88rpx;
  background: linear-gradient(135deg, #07c160 0%, #06ad56 100%);
  color: #fff;
  font-size: 32rpx;
  font-weight: 500;
  border-radius: 12rpx;
  border: none;
}

.submit-btn[disabled] {
  opacity: 0.6;
}
</style>
