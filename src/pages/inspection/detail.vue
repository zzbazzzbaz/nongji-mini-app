<template>
  <view class="page-container">
    <!-- 顶部信息卡片 -->
    <view v-if="record" class="header-card">
      <view class="header-plate">{{ record.license_plate_number }}</view>
      <view class="header-tags">
        <text class="header-tag">{{ record.vehicle_type || '未知类型' }}</text>
        <text v-if="record.owner" class="header-tag">{{ record.owner }}</text>
      </view>
    </view>

    <view v-if="record" class="content-area">
      <!-- 图片资料 -->
      <view v-if="hasImages" class="card">
        <view class="card-header">
          <text class="card-title">📷 图片资料</text>
        </view>
        <view class="image-grid">
          <view v-if="record.license_front_image" class="image-item" @click="previewImage(record.license_front_image)">
            <image :src="getImageUrl(record.license_front_image)" mode="aspectFill" class="image-thumb" />
            <text class="image-label">行驶证正面</text>
          </view>
          <view v-if="record.license_back_image" class="image-item" @click="previewImage(record.license_back_image)">
            <image :src="getImageUrl(record.license_back_image)" mode="aspectFill" class="image-thumb" />
            <text class="image-label">行驶证副页</text>
          </view>
          <view v-if="record.plate_image" class="image-item" @click="previewImage(record.plate_image)">
            <image :src="getImageUrl(record.plate_image)" mode="aspectFill" class="image-thumb" />
            <text class="image-label">车牌图片</text>
          </view>
          <view v-if="record.brake_report_image" class="image-item" @click="previewImage(record.brake_report_image)">
            <image :src="getImageUrl(record.brake_report_image)" mode="aspectFill" class="image-thumb" />
            <text class="image-label">制动检验报告</text>
          </view>
          <view v-if="record.headlight_report_image" class="image-item" @click="previewImage(record.headlight_report_image)">
            <image :src="getImageUrl(record.headlight_report_image)" mode="aspectFill" class="image-thumb" />
            <text class="image-label">前照灯检验报告</text>
          </view>
        </view>
      </view>

      <!-- 正页信息 -->
      <view class="card">
        <view class="card-header"><text class="card-title">📋 正页信息</text></view>
        <view class="info-list">
          <view class="info-row"><text class="info-label">所有人</text><text class="info-value">{{ record.owner || '-' }}</text></view>
          <view class="info-row"><text class="info-label">住址</text><text class="info-value">{{ record.address || '-' }}</text></view>
          <view class="info-row"><text class="info-label">底盘号</text><text class="info-value">{{ record.chassis_number || '-' }}</text></view>
          <view v-if="record.trailer_frame_number" class="info-row"><text class="info-label">挂车架号码</text><text class="info-value">{{ record.trailer_frame_number }}</text></view>
          <view class="info-row"><text class="info-label">发动机号码</text><text class="info-value">{{ record.engine_number || '-' }}</text></view>
          <view class="info-row"><text class="info-label">品牌</text><text class="info-value">{{ record.brand || '-' }}</text></view>
          <view class="info-row"><text class="info-label">型号名称</text><text class="info-value">{{ record.model_name || '-' }}</text></view>
          <view class="info-row"><text class="info-label">登记日期</text><text class="info-value">{{ record.registration_date || '-' }}</text></view>
          <view class="info-row"><text class="info-label">发证日期</text><text class="info-value">{{ record.issue_date || '-' }}</text></view>
          <view class="info-row"><text class="info-label">发证机关</text><text class="info-value">{{ record.issue_authority || '-' }}</text></view>
        </view>
      </view>

      <!-- 副页信息 -->
      <view class="card">
        <view class="card-header"><text class="card-title">📄 副页信息</text></view>
        <view class="info-list">
          <view v-if="record.tractor_min_weight" class="info-row"><text class="info-label">拖拉机最小使用质量</text><text class="info-value">{{ record.tractor_min_weight }}</text></view>
          <view v-if="record.harvester_weight" class="info-row"><text class="info-label">联合收割机质量</text><text class="info-value">{{ record.harvester_weight }}</text></view>
          <view v-if="record.tractor_max_load" class="info-row"><text class="info-label">最大允许载质量</text><text class="info-value">{{ record.tractor_max_load }}</text></view>
          <view class="info-row"><text class="info-label">准乘人数</text><text class="info-value">{{ record.passenger_capacity || '-' }}</text></view>
          <view class="info-row"><text class="info-label">外廓尺寸</text><text class="info-value">{{ record.overall_dimension || '-' }}</text></view>
          <view class="info-row"><text class="info-label">检验记录</text><text class="info-value">{{ record.inspection_record || '-' }}</text></view>
        </view>
      </view>

      <!-- 其他信息 -->
      <view class="card">
        <view class="card-header"><text class="card-title">📝 其他信息</text></view>
        <view class="info-list">
          <view v-if="record.body_color" class="info-row"><text class="info-label">机身颜色</text><text class="info-value">{{ record.body_color }}</text></view>
          <view v-if="record.production_date" class="info-row"><text class="info-label">生产日期</text><text class="info-value">{{ record.production_date }}</text></view>
          <view v-if="record.plate_ocr_result" class="info-row"><text class="info-label">车牌识别结果</text><text class="info-value">{{ record.plate_ocr_result }}</text></view>
          <view class="info-row"><text class="info-label">创建时间</text><text class="info-value">{{ formatDate(record.created_at) }}</text></view>
          <view v-if="record.updated_at !== record.created_at" class="info-row"><text class="info-label">更新时间</text><text class="info-value">{{ formatDate(record.updated_at) }}</text></view>
        </view>
      </view>
    </view>

    <!-- 底部操作栏 -->
    <view class="bottom-bar">
      <button class="action-btn btn-edit" @click="handleEdit">编辑</button>
      <button class="action-btn btn-delete" @click="handleDelete">删除</button>
      <button class="action-btn btn-export" @click="handleExport">导出</button>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { getInspection, deleteInspection, exportInspection, getExportUrl } from "@/api/inspection";
import { getBaseUrl } from "@/utils/request";

const recordId = ref(null);
const record = ref(null);

const imageList = computed(() => {
  if (!record.value) return [];
  const list = [];
  if (record.value.license_front_image) list.push(record.value.license_front_image);
  if (record.value.license_back_image) list.push(record.value.license_back_image);
  if (record.value.plate_image) list.push(record.value.plate_image);
  if (record.value.brake_report_image) list.push(record.value.brake_report_image);
  if (record.value.headlight_report_image) list.push(record.value.headlight_report_image);
  return list;
});

const hasImages = computed(() => imageList.value.length > 0);

const getImageUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return getBaseUrl().replace("/api/v1", "") + path;
};

const previewImage = (path) => {
  const url = getImageUrl(path);
  const urls = imageList.value.map(p => getImageUrl(p));
  uni.previewImage({ urls, current: url });
};

const loadDetail = async () => {
  uni.showLoading({ title: "加载中..." });
  try {
    const res = await getInspection(recordId.value);
    if (res.code === 200) {
      record.value = res.data;
    }
  } catch (e) {
    uni.showToast({ title: "加载失败", icon: "none" });
  } finally {
    uni.hideLoading();
  }
};

const formatDate = (dateStr) => {
  if (!dateStr) return "-";
  return dateStr.replace("T", " ").split(".")[0];
};

const handleEdit = () => {
  uni.navigateTo({ url: `/pages/inspection/edit?id=${recordId.value}` });
};

const handleDelete = () => {
  uni.showModal({
    title: "确认删除",
    content: "删除后无法恢复，确定删除吗？",
    success: async (res) => {
      if (res.confirm) {
        try {
          const delRes = await deleteInspection(recordId.value);
          if (delRes.code === 200) {
            uni.showToast({ title: "删除成功", icon: "success" });
            setTimeout(() => uni.navigateBack(), 1500);
          } else {
            uni.showToast({ title: delRes.message || "删除失败", icon: "none" });
          }
        } catch (e) {
          uni.showToast({ title: "删除失败", icon: "none" });
        }
      }
    },
  });
};

const handleExport = async () => {
  // #ifdef H5
  window.open(getExportUrl(recordId.value), "_blank");
  // #endif
  // #ifndef H5
  uni.showLoading({ title: "导出中..." });
  try {
    const filePath = await exportInspection(recordId.value);
    uni.hideLoading();
    uni.openDocument({ filePath, showMenu: true });
  } catch (e) {
    uni.hideLoading();
    uni.showToast({ title: "导出失败", icon: "none" });
  }
  // #endif
};

onLoad((options) => {
  recordId.value = options.id;
  loadDetail();
});
</script>

<style scoped>
.page-container {
  min-height: 100vh;
  background: #f5f7fa;
  padding-bottom: 140rpx;
}

.header-card {
  background: linear-gradient(135deg, #07c160 0%, #06ad56 100%);
  padding: 48rpx 32rpx 64rpx;
  text-align: center;
}

.header-plate {
  font-size: 52rpx;
  font-weight: bold;
  color: #fff;
  letter-spacing: 4rpx;
}

.header-tags {
  display: flex;
  justify-content: center;
  gap: 16rpx;
  margin-top: 20rpx;
  flex-wrap: wrap;
}

.header-tag {
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  font-size: 24rpx;
  padding: 8rpx 20rpx;
  border-radius: 20rpx;
}

.content-area {
  padding: 24rpx;
  margin-top: -32rpx;
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

.image-grid {
  display: flex;
  flex-wrap: wrap;
  padding: 16rpx;
  gap: 12rpx;
}

.image-item {
  width: calc(33.33% - 8rpx);
  position: relative;
}

.image-thumb {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 12rpx;
  background: #f5f5f5;
}

.image-label {
  display: block;
  text-align: center;
  font-size: 20rpx;
  color: #666;
  margin-top: 8rpx;
  margin-bottom: 8rpx;
}

.info-list {
  padding: 8rpx 0;
}

.info-row {
  display: flex;
  padding: 16rpx 28rpx;
  border-bottom: 1rpx solid #f8f8f8;
}

.info-row:last-child {
  border-bottom: none;
}

.info-label {
  width: 180rpx;
  font-size: 26rpx;
  color: #999;
  flex-shrink: 0;
}

.info-value {
  flex: 1;
  font-size: 26rpx;
  color: #333;
  word-break: break-all;
}

.bottom-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  gap: 16rpx;
  padding: 20rpx 24rpx;
  padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
  background: #fff;
  box-shadow: 0 -2rpx 12rpx rgba(0, 0, 0, 0.06);
}

.action-btn {
  flex: 1;
  height: 80rpx;
  border-radius: 12rpx;
  font-size: 28rpx;
  border: none;
}

.btn-edit {
  background: #f5f5f5;
  color: #333;
}

.btn-delete {
  background: #fff0f0;
  color: #ee0a24;
}

.btn-export {
  background: linear-gradient(135deg, #07c160 0%, #06ad56 100%);
  color: #fff;
}
</style>
