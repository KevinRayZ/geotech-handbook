Page({
  data: {
    scheme: null,
    projectInfo: null
  },

  onLoad(options) {
    // 从缓存中获取方案数据
    const scheme = wx.getStorageSync('currentScheme');
    const projectInfo = wx.getStorageSync('currentProjectInfo');
    
    if (scheme) {
      this.setData({ scheme, projectInfo });
      wx.setNavigationBarTitle({ title: scheme.recommendation || '方案推荐结果' });
    }
  },

  onGoKnowledge(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({
      url: '/subpackages/knowledge-detail/detail/detail?id=' + id
    });
  },

  onGoFormula(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({
      url: '/subpackages/knowledge-detail/formula/formula?id=' + id
    });
  },

  onSave() {
    wx.showToast({
      title: '保存功能开发中',
      icon: 'none'
    });
  },

  onShare() {
    wx.showActionSheet({
      itemList: ['分享给微信好友', '分享到朋友圈', '复制链接'],
      success: (res) => {
        if (res.tapIndex === 0) {
          // 分享给好友
          wx.showToast({
            title: '请点击右上角分享',
            icon: 'none'
          });
        } else if (res.tapIndex === 1) {
          // 分享到朋友圈
          wx.showToast({
            title: '请点击右上角分享',
            icon: 'none'
          });
        } else if (res.tapIndex === 2) {
          // 复制链接
          wx.setClipboardData({
            data: '岩土工程随身手册 - 方案推荐',
            success: () => {
              wx.showToast({
                title: '链接已复制',
                icon: 'success'
              });
            }
          });
        }
      }
    });
  },

  onShareAppMessage() {
    return {
      title: this.data.scheme ? 
        '基坑支护方案推荐：' + this.data.scheme.recommendation : 
        '岩土工程方案推荐',
      path: '/subpackages/advisor-result/result/result'
    };
  }
});
