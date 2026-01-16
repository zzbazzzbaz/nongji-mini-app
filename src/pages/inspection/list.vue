<template>
  <view class="p-[24rpx]">
    <!-- 搜索框 -->
    <view class="bg-white rounded-[12rpx] px-[24rpx] mb-[24rpx] flex items-center">
      <input
        v-model="keyword"
        class="flex-1 h-[80rpx] text-[28rpx]"
        placeholder="搜索号牌号码/所有人/底盘号"
        @confirm="handleSearch"
      />
      <text class="text-primary text-[28rpx]" @click="handleSearch">搜索</text>
    </view>

    <!-- 列表 -->
    <view v-if="list.length > 0">
      <view
        v-for="item in list"
        :key="item.id"
        class="bg-white rounded-[12rpx] p-[24rpx] mb-[24rpx]"
        @click="goDetail(item.id)"
      >
        <view class="flex justify-between items-center mb-[16rpx]">
          <text class="text-[32rpx] font-bold">{{ item.license_plate_number }}</text>
          <text class="text-[24rpx] text-[#999]">{{ formatDate(item.created_at) }}</text>
        </view>
        <view class="text-[28rpx] text-[#666]">
          <text>{{ item.owner || '-' }}</text>
          <text class="mx-[16rpx]">|</text>
          <text>{{ item.vehicle_type || '-' }}</text>
        </view>
        <view class="text-[24rpx] text-[#999] mt-[8rpx]">
          {{ item.brand }} {{ item.model_name }}
        </view>
      </view>
    </view>

    <!-- 空状态 -->
    <view v-else-if="!loading" class="flex flex-col items-center pt-[200rpx]">
      <text class="text-[28rpx] text-[#999]">暂无检验记录</text>
    </view>

    <!-- 底部状态 -->
    <view v-if="list.length > 0" class="text-center py-[32rpx]">
      <text v-if="loading" class="text-[24rpx] text-[#999]">加载中...</text>
      <text v-else-if="!hasMore" class="text-[24rpx] text-[#999]">没有更多了</text>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";
import { onShow, onReachBottom, onPullDownRefresh } from "@dcloudio/uni-app";
import { getInspections } from "@/api/inspection";

const list = ref([]);
const keyword = ref("");
const page = ref(1);
const loading = ref(false);
const hasMore = ref(true);

const loadList = async (reset = false) => {
  if (loading.value) return;
  if (!reset && !hasMore.value) return;

  if (reset) {
    page.value = 1;
    hasMore.value = true;
  }

  loading.value = true;
  try {
    const res = await getInspections({
      page: page.value,
      page_size: 20,
      keyword: keyword.value,
    });
    if (res.code === 200) {
      if (reset) {
        list.value = res.data.results;
      } else {
        list.value = [...list.value, ...res.data.results];
      }
      hasMore.value = list.value.length < res.data.total;
      page.value++;
    }
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
    uni.stopPullDownRefresh();
  }
};

const handleSearch = () => {
  loadList(true);
};

const goDetail = (id) => {
  uni.navigateTo({ url: `/pages/inspection/detail?id=${id}` });
};

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  return dateStr.split("T")[0];
};

onShow(() => {
  loadList(true);
});

onPullDownRefresh(() => {
  loadList(true);
});

onReachBottom(() => {
  loadList();
});
</script>
