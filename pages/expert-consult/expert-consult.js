/**
 * AI专家咨询页面
 * 基于AI蒸馏专家思维框架提供咨询服务
 */
const { getExpertList, getExpertById } = require('../../core/experts/expert-service');

Page({
  data: {
    experts: []
  },

  onLoad() {
    this.loadExperts();
  },

  /**
   * 加载专家列表
   */
  loadExperts() {
    const experts = getExpertList().map(expert => {
      const fullExpert = getExpertById(expert.id);
      return {
        ...expert,
        mentalModels: fullExpert ? fullExpert.mentalModels.slice(0, 3) : []
      };
    });
    this.setData({ experts });
  },

  /**
   * 点击专家卡片
   */
  onExpertTap(e) {
    const expert = e.currentTarget.dataset.expert;
    const fullExpert = getExpertById(expert.id);

    wx.showModal({
      title: `${expert.name} - AI蒸馏专家`,
      content: `${expert.description}\n\n专长领域：${expert.specialties.join('、')}\n\n⚠️ 本服务基于AI蒸馏技术，非专家本人服务`,
      confirmText: '开始咨询',
      cancelText: '返回',
      success: (res) => {
        if (res.confirm) {
          this.startExpertChat(expert.id);
        }
      }
    });
  },

  /**
   * 开始咨询
   */
  startConsult() {
    // 默认使用第一个专家
    const experts = this.data.experts;
    if (experts.length > 0) {
      this.startExpertChat(experts[0].id);
    }
  },

  /**
   * 开始专家对话
   */
  startExpertChat(expertId) {
    // 跳转到搜索页面，并标记为专家咨询模式
    wx.navigateTo({
      url: `/pages/search/search?expertId=${expertId}&mode=expert`
    });
  },

  /**
   * 分享
   */
  onShareAppMessage() {
    return {
      title: 'AI岩土工程专家咨询 - 免费技术服务',
      path: '/pages/expert-consult/expert-consult'
    };
  }
});
