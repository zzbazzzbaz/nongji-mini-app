<template>
  <scroll-view class="policy-wrapper" scroll-y>
    <view class="policy-card">
      <text class="policy-title">恒拓农机检测用户协议</text>

      <view class="section">
        <text class="section-title">一、总则</text>
        <view class="subsection">
          <text class="sub-title">（一）目的与范围</text>
          <text class="section-text">
            本用户协议（以下简称"协议"）旨在明确您（以下简称"用户"）在使用恒拓农机检测系统（以下简称"本小程序"）服务过程中的权利与义务，以及我们提供的服务内容、方式及相关规则。请您在注册、登录及使用本小程序前仔细阅读本协议，一旦开始使用即表示您已充分理解并同意接受本协议的全部条款。
          </text>
        </view>
        <view class="subsection">
          <text class="sub-title">（二）协议生效</text>
          <text class="section-text">
            用户完成注册并登录本小程序，即视为同意本协议的全部内容，本协议即在用户与服务商之间产生法律效力。
          </text>
        </view>
        <view class="subsection">
          <text class="sub-title">（三）修改权</text>
          <text class="section-text">
            我们有权根据法律法规变化、业务发展需要或技术升级等原因对本协议进行修改，修改后的协议将在本小程序内公布，不再单独通知用户。继续使用本小程序则视为接受修改后的协议。
          </text>
        </view>
      </view>

      <view class="section">
        <text class="section-title">二、服务内容</text>
        <text class="section-text">
          本小程序提供的服务包括但不限于：农机检测信息查询、检测记录管理、检测报告生成等功能，具体服务内容以实际提供为准。
        </text>
      </view>

      <view class="section">
        <text class="section-title">三、用户账户管理</text>
        <view class="bullet">
          <view class="dot"></view>
          <text class="section-text">账户注册与登录：用户需通过合法有效的用户名和密码完成注册与登录。</text>
        </view>
        <view class="bullet">
          <view class="dot"></view>
          <text class="section-text">信息真实性：用户应保证提供的个人信息真实有效，否则我们有权暂停或终止服务。</text>
        </view>
        <view class="bullet">
          <view class="dot"></view>
          <text class="section-text">账户安全：用户应妥善保管账号和密码，对因用户自身原因导致的账号被盗用、信息泄露等后果自行承担责任。</text>
        </view>
      </view>

      <view class="section">
        <text class="section-title">四、知识产权</text>
        <text class="section-text">
          本小程序内的所有内容（包括但不限于文字、图片、音频、视频等）的知识产权归我们或相关权利人所有，未经授权不得擅自复制、传播或使用。
        </text>
      </view>

      <view class="section">
        <text class="section-title">五、法律责任与免责声明</text>
        <view class="bullet">
          <view class="dot"></view>
          <text class="section-text">我们不对因网络故障、第三方攻击等非我方因素导致的服务中断或数据丢失负责。</text>
        </view>
        <view class="bullet">
          <view class="dot"></view>
          <text class="section-text">用户应遵守国家法律法规及平台规定，对于违法违规行为，我们有权采取相应措施直至追究法律责任。</text>
        </view>
      </view>

      <view class="section">
        <text class="section-title">六、争议解决</text>
        <text class="section-text">
          双方因执行本协议发生争议，应首先通过友好协商解决；协商不成时，可提交至有管辖权的人民法院诉讼解决。
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

.subsection {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
  padding-left: 8rpx;
}

.sub-title {
  font-size: 28rpx;
  font-weight: 600;
  color: #334155;
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
