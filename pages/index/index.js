// pages/index/index.js
const { getStatistics, searchKnowledge } = require('../../core/knowledge/index');

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
