/**
 * AI专家咨询页面
 * 基于AI蒸馏专家思维框架提供咨询服务
 */
const { getAllExperts, getExpertsByCategory } = require('../../core/experts/expert-data');

Page({
  data: {
    internationalExperts: [],
    domesticExperts: []
  },

  onLoad() {
    this.loadExperts();
  },

  /**
   * 加载专家列表
   */
  loadExperts() {
    const internationalExperts = getExpertsByCategory('international').map(e => ({
      id: e.id,
      name: e.nameCN,
      nameEn: e.name,
      title: e.title,
      country: e.country,
      era: e.era,
      avatar: e.avatar,
      bio: e.bio,
      mentalModels: e.mentalModels.slice(0, 3),
      heuristics: e.heuristics.slice(0, 3),
      works: e.works
    }));
    
    const domesticExperts = getExpertsByCategory('domestic').map(e => ({
      id: e.id,
      name: e.nameCN,
      nameEn: e.name,
      title: e.title,
      country: e.country,
      era: e.era,
      avatar: e.avatar,
      bio: e.bio,
      mentalModels: e.mentalModels.slice(0, 3),
      heuristics: e.heuristics.slice(0, 3),
      works: e.works
    }));
    
    this.setData({ internationalExperts, domesticExperts });
  },

  /**
   * 点击专家卡片
   */
  onExpertTap(e) {
    const { expert } = e.currentTarget.dataset;
    
    wx.showModal({
      title: `${expert.name} - AI蒸馏专家`,
      content: `${expert.bio}\n\n核心贡献：${expert.mentalModels.map(m => m.name).join('、')}\n\n⚠️ 本服务基于AI蒸馏技术，非专家本人服务`,
      confirmText: '开始对话',
      cancelText: '返回',
      success: (res) => {
        if (res.confirm) {
          this.startExpertChat(expert.id);
        }
      }
    });
  },

  /**
   * 开始专家对话
   */
  startExpertChat(expertId) {
    wx.navigateTo({
      url: `/pages/expert-chat/expert-chat?expertId=${expertId}`
    });
  },

  /**
   * 分享
   */
  onShareAppMessage() {
    return {
      title: 'AI岩土工程专家对话 - 免费技术服务',
      path: '/pages/expert-consult/expert-consult'
    };
  }
});
