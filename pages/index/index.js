// pages/index/index.js
const { getStatistics, searchKnowledge } = require('../../core/knowledge/index');
const { getExpertsByCategory, getAllExperts } = require('../../core/experts/expert-data');

const app = getApp();

Page({
  data: {
    stats: null,
    ready: false,
    recentSearches: ['土压力', '稳定性', '承载力', '基坑', '边坡']
  },

  onLoad() {
    console.log('[Index] 页面加载');
    this.checkReady();
  },

  onShow() {
    console.log('[Index] 页面显示');
    this.checkReady();
  },

  /**
   * 检查知识库是否就绪
   */
  checkReady() {
    const stats = getStatistics();
    this.setData({
      stats,
      ready: app.globalData.knowledgeReady
    });
  },

  /**
   * 跳转到快捷查询
   */
  goSearch() {
    wx.navigateTo({
      url: '/pages/search/search'
    });
  },

  /**
   * 跳转到知识库
   */
  goKnowledge() {
    wx.switchTab({
      url: '/pages/knowledge/knowledge'
    });
  },

  /**
   * 跳转到方案推荐
   */
  goAdvisor() {
    wx.switchTab({
      url: '/pages/advisor/advisor'
    });
  },

  /**
   * 跳转到专家对话页面
   * 根据选择的分类（国际/国内）显示对应专家列表，或直接进入第一个专家
   */
  goExpertChat(e) {
    const { category } = e.currentTarget.dataset;
    const experts = getExpertsByCategory(category);
    
    if (experts.length === 0) {
      wx.showToast({ title: '暂无该分类专家', icon: 'none' });
      return;
    }
    
    // 如果只有一个专家，直接进入对话
    if (experts.length === 1) {
      wx.navigateTo({
        url: `/pages/expert-chat/expert-chat?expertId=${experts[0].id}`
      });
      return;
    }
    
    // 多个专家时，显示选择菜单
    wx.showActionSheet({
      itemList: experts.map(e => `${e.nameCN} - ${e.title}`),
      success: (res) => {
        const selectedExpert = experts[res.tapIndex];
        wx.navigateTo({
          url: `/pages/expert-chat/expert-chat?expertId=${selectedExpert.id}`
        });
      }
    });
  },

  /**
   * 跳转到AI专家咨询（专家列表页）
   */
  goExpertConsult() {
    wx.navigateTo({
      url: '/pages/expert-consult/expert-consult'
    });
  },

  /**
   * 跳转到专项咨询
   */
  goConsultation() {
    wx.navigateTo({
      url: '/pages/consultation/consultation'
    });
  },

  /**
   * 跳转到测试页面
   */
  goTest() {
    wx.navigateTo({
      url: '/pages/test/test'
    });
  },

  /**
   * 快速搜索
   */
  onQuickSearch(e) {
    const { keyword } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/search/search?keyword=${encodeURIComponent(keyword)}`
    });
  }
});
