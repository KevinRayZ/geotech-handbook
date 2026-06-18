// pages/advisor/advisor.js
const app = getApp();
const { recommendPitScheme, getSchemeDetail } = require('../../core/advisor/pit-scheme');

Page({
  data: {
    // 工程类型
    selectedType: 'pit',
    
    // 输入参数
    params: {
      depth: '',
      soilType: 'clay',
      waterLevel: '',
      environment: 'normal',
      surcharge: '10',
      pitLevel: '二级'
    },
    
    // 状态
    loading: false,
    canRecommend: false,
    
    // 推荐结果
    scheme: null
  },

  onLoad() {
    console.log('方案助手页面加载');
  },

  onShow() {
    // 切换到方案助手时刷新数据
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      });
    }
  },

  // 选择工程类型
  selectType(e) {
    const { type } = e.currentTarget.dataset;
    this.setData({ 
      selectedType: type,
      scheme: null
    });
  },

  // 输入变化
  onInputChange(e) {
    const { key } = e.currentTarget.dataset;
    const { value } = e.detail;
    
    this.setData({
      [`params.${key}`]: value
    });
    
    this.checkCanRecommend();
  },

  // 土质类型变化
  onSoilTypeChange(e) {
    const { value } = e.detail;
    this.setData({
      'params.soilType': value
    });
    this.checkCanRecommend();
  },

  // 环境条件变化
  onEnvChange(e) {
    const { value } = e.detail;
    this.setData({
      'params.environment': value
    });
    this.checkCanRecommend();
  },

  // 基坑等级变化
  onPitLevelChange(e) {
    const { value } = e.detail;
    this.setData({
      'params.pitLevel': value
    });
    this.checkCanRecommend();
  },

  // 检查是否可以推荐
  checkCanRecommend() {
    const { params, selectedType } = this.data;
    
    let canRecommend = false;
    
    if (selectedType === 'pit') {
      // 基坑需要深度和土质
      canRecommend = params.depth && params.soilType && params.environment;
    }
    
    this.setData({ canRecommend });
  },

  // 执行推荐
  onRecommend() {
    if (!this.data.canRecommend) {
      wx.showToast({
        title: '请填写必要的工程参数',
        icon: 'none'
      });
      return;
    }
    
    this.setData({ loading: true });
    
    // 模拟计算延迟
    setTimeout(() => {
      try {
        const { params } = this.data;
        
        // 调用推荐引擎
        const result = recommendPitScheme({
          depth: parseFloat(params.depth),
          soilType: params.soilType,
          environment: params.environment,
          waterLevel: params.waterLevel ? parseFloat(params.waterLevel) : null,
          surcharge: params.surcharge ? parseFloat(params.surcharge) : 10,
          pitLevel: params.pitLevel
        });
        
        if (result.error) {
          wx.showToast({
            title: result.error,
            icon: 'none'
          });
          this.setData({ loading: false });
          return;
        }
        
        // 处理设计参数
        const designParamsList = [];
        if (result.designParams) {
          Object.keys(result.designParams).forEach(key => {
            designParamsList.push({
              name: key,
              value: result.designParams[key]
            });
          });
        }
        
        this.setData({
          scheme: {
            ...result,
            designParamsList
          },
          loading: false
        });
        
        // 滚动到结果区域
        wx.pageScrollTo({
          scrollTop: 9999,
          duration: 300
        });
        
      } catch (err) {
        console.error('推荐失败:', err);
        wx.showToast({
          title: '推荐失败，请重试',
          icon: 'none'
        });
        this.setData({ loading: false });
      }
    }, 1000);
  },

  // 查看方案详情
  goSchemeDetail(e) {
    const { scheme } = e.currentTarget.dataset;
    const detail = getSchemeDetail(scheme);
    
    // 保存方案详情到临时存储
    wx.setStorageSync('tempSchemeDetail', {
      name: scheme,
      ...detail
    });
    
    wx.navigateTo({
      url: `/subpackages/advisor-result/result/result?scheme=${encodeURIComponent(scheme)}`
    });
  },

  // 保存到项目
  onSave() {
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    });
  },

  // 分享方案
  onShare() {
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    });
  },

  // 分享
  onShareAppMessage() {
    return {
      title: '岩土工程方案助手 - 智能推荐支护方案',
      path: '/pages/advisor/advisor'
    };
  }
});
