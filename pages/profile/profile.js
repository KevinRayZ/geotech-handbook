// pages/profile/profile.js
const app = getApp();

Page({
  data: {
    userInfo: null,
    isLoggedIn: false,
    version: '4.0',
    projectCount: 0,
    historyCount: 0,
    favoriteCount: 0,
    // 用户详细信息
    userDetail: {
      company: '',
      position: '',
      phone: '',
      email: '',
      specialty: ''
    },
    // 编辑状态
    isEditing: false
  },

  onLoad() {
    console.log('[Profile] 个人中心页面加载');
    this.loadUserInfo();
    this.loadStats();
    this.loadUserDetail();
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 3 });
    }
    this.loadStats();
  },

  // 加载用户信息
  loadUserInfo() {
    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.setData({ 
        userInfo,
        isLoggedIn: true 
      });
    }
  },

  // 加载用户详细信息
  loadUserDetail() {
    const userDetail = wx.getStorageSync('userDetail') || {
      company: '',
      position: '',
      phone: '',
      email: '',
      specialty: ''
    };
    this.setData({ userDetail });
  },

  // 加载统计数据
  loadStats() {
    try {
      const projects = wx.getStorageSync('projects') || [];
      const history = wx.getStorageSync('searchHistory') || [];
      const favorites = wx.getStorageSync('favorites') || [];
      this.setData({ 
        projectCount: projects.length,
        historyCount: history.length,
        favoriteCount: favorites.length
      });
    } catch (err) {
      console.error('[Profile] 加载统计数据失败:', err);
    }
  },

  // ========== 用户登录 ==========
  onLogin() {
    wx.getUserProfile({
      desc: '用于完善用户资料',
      success: (res) => {
        const userInfo = res.userInfo;
        wx.setStorageSync('userInfo', userInfo);
        app.globalData.userInfo = userInfo;
        this.setData({ 
          userInfo,
          isLoggedIn: true 
        });
        wx.showToast({ title: '登录成功', icon: 'success' });
      },
      fail: (err) => {
        console.log('[Profile] 用户拒绝授权:', err);
        // 使用默认信息
        const defaultInfo = {
          nickName: '岩土工程师',
          avatarUrl: ''
        };
        wx.setStorageSync('userInfo', defaultInfo);
        this.setData({ 
          userInfo: defaultInfo,
          isLoggedIn: true 
        });
      }
    });
  },

  // ========== 用户信息编辑 ==========
  startEdit() {
    this.setData({ isEditing: true });
  },

  cancelEdit() {
    this.loadUserDetail();
    this.setData({ isEditing: false });
  },

  saveEdit() {
    const { userDetail } = this.data;
    wx.setStorageSync('userDetail', userDetail);
    this.setData({ isEditing: false });
    wx.showToast({ title: '保存成功', icon: 'success' });
  },

  onInputChange(e) {
    const { field } = e.currentTarget.dataset;
    const { value } = e.detail;
    this.setData({
      [`userDetail.${field}`]: value
    });
  },

  onSpecialtyChange(e) {
    const { value } = e.detail;
    this.setData({
      'userDetail.specialty': value
    });
  },

  // ========== 功能跳转 ==========
  goProjects() {
    wx.showToast({ title: '功能开发中', icon: 'none' });
  },

  goHistory() {
    wx.showToast({ title: '功能开发中', icon: 'none' });
  },

  goFavorites() {
    wx.showToast({ title: '功能开发中', icon: 'none' });
  },

  goUnitConvert() {
    wx.showToast({ title: '功能开发中', icon: 'none' });
  },

  goSpecCodes() {
    wx.showToast({ title: '功能开发中', icon: 'none' });
  },

  goHelp() {
    wx.showToast({ title: '功能开发中', icon: 'none' });
  },

  goFeedback() {
    wx.showToast({ title: '功能开发中', icon: 'none' });
  },

  goAbout() {
    wx.showModal({
      title: '关于我们',
      content: '岩土工程随身智库 v4.0\n\n基于5部权威岩土工程工具书\n42本常用规范\n230+核心条款\n\n为岩土工程师提供专业的移动计算工具',
      showCancel: false
    });
  },

  // 清除缓存
  clearCache() {
    wx.showModal({
      title: '清除缓存',
      content: '确定要清除所有缓存数据吗？',
      success: (res) => {
        if (res.confirm) {
          wx.clearStorageSync();
          this.setData({
            userInfo: null,
            isLoggedIn: false,
            userDetail: {
              company: '',
              position: '',
              phone: '',
              email: '',
              specialty: ''
            },
            projectCount: 0,
            historyCount: 0,
            favoriteCount: 0
          });
          wx.showToast({ title: '清除成功', icon: 'success' });
        }
      }
    });
  },

  // 退出登录
  onLogout() {
    wx.showModal({
      title: '退出登录',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          wx.removeStorageSync('userInfo');
          this.setData({
            userInfo: null,
            isLoggedIn: false
          });
          wx.showToast({ title: '已退出登录', icon: 'success' });
        }
      }
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
