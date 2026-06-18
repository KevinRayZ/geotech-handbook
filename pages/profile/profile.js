// pages/profile/profile.js
const app = getApp();

Page({
  data: {
    userInfo: null,
    version: '1.0.0',
    projectCount: 0,
    historyCount: 0,
    favoriteCount: 0
  },

  onLoad() {
    console.log('个人中心页面加载');
    this.loadUserInfo();
    this.loadStats();
  },

  onShow() {
    // 切换到我的时刷新数据
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 3
      });
    }
    
    // 刷新统计数据
    this.loadStats();
  },

  // 加载用户信息
  loadUserInfo() {
    const userInfo = app.globalData.userInfo;
    if (userInfo) {
      this.setData({ userInfo });
    }
  },

  // 加载统计数据
  loadStats() {
    try {
      // 项目数量
      const projects = wx.getStorageSync('projects') || [];
      this.setData({ projectCount: projects.length });
      
      // 历史记录数量
      const history = wx.getStorageSync('calcHistory') || [];
      this.setData({ historyCount: history.length });
      
      // 收藏数量
      const favorites = wx.getStorageSync('favorites') || [];
      this.setData({ favoriteCount: favorites.length });
    } catch (err) {
      console.error('加载统计数据失败:', err);
    }
  },

  // 跳转到我的项目
  goProjects() {
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    });
  },

  // 跳转到计算历史
  goHistory() {
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    });
  },

  // 跳转到我的收藏
  goFavorites() {
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    });
  },

  // 跳转到单位换算
  goUnitConvert() {
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    });
  },

  // 跳转到规范速查
  goSpecCodes() {
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    });
  },

  // 跳转到使用帮助
  goHelp() {
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    });
  },

  // 跳转到意见反馈
  goFeedback() {
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    });
  },

  // 跳转到关于我们
  goAbout() {
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    });
  },

  // 分享
  onShareAppMessage() {
    return {
      title: '岩土工程随身智库 - 岩土工程师的移动工具箱',
      path: '/pages/profile/profile'
    };
  }
});
