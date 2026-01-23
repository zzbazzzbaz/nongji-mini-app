<template>
  <scroll-view class="policy-wrapper" scroll-y>
    <view class="policy-card">
      <text class="policy-title">隐私政策</text>

      <view class="section">
        <text class="section-title">一、引言</text>
        <text class="section-text">
          本隐私政策旨在说明我们如何收集、使用、存储和保护您的个人信息，以及您如何行使自己的隐私权利。请在使用本小程序前认真阅读并理解本政策。
        </text>
      </view>

      <view class="section">
        <text class="section-title">二、信息收集</text>
        <view class="bullet">
          <view class="dot"></view>
          <text class="section-text">基本信息：注册时需提供用户名、密码等基本信息。</text>
        </view>
        <view class="bullet">
          <view class="dot"></view>
          <text class="section-text">检测数据：农机检测过程中产生的相关数据信息。</text>
        </view>
      </view>

      <view class="section">
        <text class="section-title">三、信息使用</text>
        <view class="bullet">
          <view class="dot"></view>
          <text class="section-text">提供服务：用于实现本小程序的基本功能，如检测记录管理、报告生成等。</text>
        </view>
        <view class="bullet">
          <view class="dot"></view>
          <text class="section-text">优化体验：分析用户使用习惯，提升服务质量。</text>
        </view>
        <view class="bullet">
          <view class="dot"></view>
          <text class="section-text">安全保障：预防欺诈、维护网络安全。</text>
        </view>
        <view class="bullet">
          <view class="dot"></view>
          <text class="section-text">法律要求：配合政府监管，响应司法调查。</text>
        </view>
      </view>

      <view class="section">
        <text class="section-title">四、信息共享与披露</text>
        <text class="section-text">
          除非得到您的明确同意，或基于法律规定、保护公共利益、维护平台安全等必要情形，我们不会向第三方共享您的个人信息。
        </text>
      </view>

      <view class="section">
        <text class="section-title">五、信息安全</text>
        <text class="section-text">
          我们采用加密技术、防火墙等措施保护您的个人信息安全，但请注意，任何系统都无法完全避免安全风险，我们建议您定期更换密码，谨慎对待来自陌生人的请求。
        </text>
      </view>

      <view class="section">
        <text class="section-title">六、您的权利</text>
        <text class="section-text">
          您有权查询、更正、删除自己的个人信息，撤回同意，投诉举报等。如需行使上述权利，请通过本小程序内的联系方式与我们取得联系。
        </text>
      </view>

      <view class="section">
        <text class="section-title">七、政策更新</text>
        <text class="section-text">
          我们可能会不时更新本隐私政策，更新后的政策将在本小程序内公布。如有重大变更，我们会通过适当方式通知您。
        </text>
      </view>

      <view class="section">
        <text class="section-title">八、联系我们</text>
        <text class="section-text">
          如您对本隐私政策有任何疑问或建议，请通过本小程序内的联系方式与我们取得联系。
        </text>
      </view>
    </view>
  </scroll-view>
</template>

<style scoped>
.policy-wrapper {
  flex: 1;
  height: 100%;
  padding: 24rpx;
  background: linear-gradient(135deg, #f8fafc, #eef2ff);
  box-sizing: border-box;
}

.policy-card {
  background: #ffffff;
  border-radius: 32rpx;
  padding: 40rpx;
  box-shadow: 0 12rpx 32rpx rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  gap: 28rpx;
  width: 100%;
  box-sizing: border-box;
}

.policy-title {
  font-size: 40rpx;
  font-weight: 700;
  color: #0f172a;
}

.section {
  display: flex;
  flex-direction: column;
  gap: 12rpx;
}

.section-title {
  font-size: 30rpx;
  font-weight: 600;
  color: #1e293b;
}

.section-text {
  font-size: 28rpx;
  color: #475569;
  line-height: 1.6;
}

.bullet {
  display: flex;
  gap: 12rpx;
  align-items: flex-start;
}

.dot {
  width: 12rpx;
  height: 12rpx;
  border-radius: 50%;
  background: #0ea5e9;
  margin-top: 12rpx;
  flex-shrink: 0;
}
</style>
