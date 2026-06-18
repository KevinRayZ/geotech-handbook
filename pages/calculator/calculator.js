// pages/calculator/calculator.js
const app = getApp();

Page({
  data: {
    searchKeyword: '',
    
    // 基坑工程计算器
    pitCalculators: [
      {
        id: 'earth-pressure',
        name: '土压力计算器',
        description: '朗肯/库仑理论计算主动、被动、静止土压力',
        icon: 'earth',
        visible: true
      },
      {
        id: 'stability',
        name: '基坑稳定性验算',
        description: '抗隆起、抗倾覆、抗滑移、抗流土、抗突涌',
        icon: 'chart-stability',
        visible: true
      },
      {
        id: 'deformation',
        name: '基坑变形估算',
        description: '墙体水平位移、地表沉降、坑底隆起',
        icon: 'chart-line',
        visible: false
      },
      {
        id: 'water-pressure',
        name: '水土压力计算',
        description: '水土分算/合算、渗流影响',
        icon: 'water',
        visible: false
      }
    ],
    
    // 边坡工程计算器
    slopeCalculators: [
      {
        id: 'slope-stability',
        name: '边坡稳定性分析',
        description: '瑞典圆弧法、简化毕肖普、不平衡推力法',
        icon: 'landscape',
        visible: false
      }
    ],
    
    // 地基处理计算器
    foundationCalculators: [
      {
        id: 'bearing',
        name: '复合地基承载力',
        description: '面积置换率、单桩承载力、复合地基承载力',
        icon: 'chart-combo',
        visible: true
      },
      {
        id: 'settlement',
        name: '地基沉降计算',
        description: '分层总和法、复合模量法',
        icon: 'chart-decrease',
        visible: false
      }
    ]
  },

  onLoad() {
    console.log('计算器页面加载');
  },

  onShow() {
    // 切换到计算器时刷新数据
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      });
    }
  },

  // 搜索输入变化
  onSearchChange(e) {
    const { value } = e.detail;
    this.setData({ searchKeyword: value });
    this.filterCalculators(value);
  },

  // 清除搜索
  onSearchClear() {
    this.setData({ searchKeyword: '' });
    this.resetCalculatorVisibility();
  },

  // 过滤计算器
  filterCalculators(keyword) {
    if (!keyword) {
      this.resetCalculatorVisibility();
      return;
    }
    
    const lowerKeyword = keyword.toLowerCase();
    
    const filterList = (list) => {
      return list.map(item => ({
        ...item,
        visible: item.name.toLowerCase().includes(lowerKeyword) || 
                 item.description.toLowerCase().includes(lowerKeyword)
      }));
    };
    
    this.setData({
      pitCalculators: filterList(this.data.pitCalculators),
      slopeCalculators: filterList(this.data.slopeCalculators),
      foundationCalculators: filterList(this.data.foundationCalculators)
    });
  },

  // 重置计算器可见性
  resetCalculatorVisibility() {
    const resetList = (list) => {
      return list.map(item => ({
        ...item,
        visible: true
      }));
    };
    
    this.setData({
      pitCalculators: resetList(this.data.pitCalculators),
      slopeCalculators: resetList(this.data.slopeCalculators),
      foundationCalculators: resetList(this.data.foundationCalculators)
    });
  },

  // 跳转到计算器详情
  goCalc(e) {
    const { id } = e.currentTarget.dataset;
    
    // 保存到最近使用
    this.saveToRecent(id);
    
    // 跳转到对应的计算器页面
    wx.navigateTo({
      url: `/subpackages/calc-detail/${id}/${id}`
    });
  },

  // 保存到最近使用
  saveToRecent(calcId) {
    try {
      let recentList = wx.getStorageSync('recentList') || [];
      
      // 查找计算器名称
      const allCalculators = [
        ...this.data.pitCalculators,
        ...this.data.slopeCalculators,
        ...this.data.foundationCalculators
      ];
      const calc = allCalculators.find(c => c.id === calcId);
      
      if (!calc) return;
      
      // 移除重复项
      recentList = recentList.filter(item => item.id !== calcId);
      
      // 添加到开头
      recentList.unshift({
        id: calcId,
        type: 'calculator',
        title: calc.name,
        note: calc.description,
        timestamp: Date.now()
      });
      
      // 只保留最近10条
      recentList = recentList.slice(0, 10);
      
      wx.setStorageSync('recentList', recentList);
    } catch (err) {
      console.error('保存最近使用失败:', err);
    }
  },

  // 分享
  onShareAppMessage() {
    return {
      title: '岩土工程计算器 - 土压力、稳定性、承载力计算',
      path: '/pages/calculator/calculator'
    };
  }
});
