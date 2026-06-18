// pages/advisor/advisor.js
const app = getApp();
const { recommendPitScheme, getSchemeDetail: getPitDetail } = require('../../core/advisor/pit-scheme');
const { recommendSlopeScheme, getSchemeDetail: getSlopeDetail } = require('../../core/advisor/slope-scheme');
const { recommendTreatmentScheme, getSchemeDetail: getTreatmentDetail } = require('../../core/advisor/treatment-scheme');

Page({
  data: {
    // 工程类型
    selectedType: 'pit',
    
    // 基坑参数
    params: {
      depth: '',
      soilType: 'clay',
      waterLevel: '',
      environment: 'normal',
      surcharge: '10',
      pitLevel: '二级'
    },
    
    // 边坡参数
    slopeParams: {
      slopeHeight: '',
      slopeType: 'rock',
      rockType: 'medium',
      soilType: 'clay',
      hasSlidingFace: 'no',
      slidingDepth: '',
      slopeLevel: '二级'
    },
    
    // 地基处理参数
    treatmentParams: {
      treatmentDepth: '',
      soilType: 'softClay',
      bearingCapacity: '',
      isCollapsible: 'no',
      hasTime: 'yes'
    },
    
    // 状态
    loading: false,
    canRecommend: false,
    
    // 推荐结果
    scheme: null,
    designParamsList: []
  },

  onLoad() {
    console.log('[Advisor] 方案助手页面加载');
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 2 });
    }
  },

  // ========== 工程类型选择 ==========
  selectType(e) {
    const { type } = e.currentTarget.dataset;
    this.setData({ 
      selectedType: type,
      scheme: null,
      canRecommend: false
    });
  },

  // ========== 基坑参数 ==========
  onInputChange(e) {
    const { key } = e.currentTarget.dataset;
    const { value } = e.detail;
    this.setData({ [`params.${key}`]: value });
    this.checkCanRecommend();
  },

  onSoilTypeChange(e) {
    const { value } = e.currentTarget.dataset;
    this.setData({ 'params.soilType': value });
    this.checkCanRecommend();
  },

  onEnvChange(e) {
    const { value } = e.currentTarget.dataset;
    this.setData({ 'params.environment': value });
    this.checkCanRecommend();
  },

  onPitLevelChange(e) {
    const { value } = e.currentTarget.dataset;
    this.setData({ 'params.pitLevel': value });
    this.checkCanRecommend();
  },

  // ========== 边坡参数 ==========
  onSlopeInputChange(e) {
    const { key } = e.currentTarget.dataset;
    const { value } = e.detail;
    this.setData({ [`slopeParams.${key}`]: value });
    this.checkCanRecommend();
  },

  onSlopeTypeChange(e) {
    const { value } = e.currentTarget.dataset;
    this.setData({ 'slopeParams.slopeType': value });
    this.checkCanRecommend();
  },

  onRockTypeChange(e) {
    const { value } = e.currentTarget.dataset;
    this.setData({ 'slopeParams.rockType': value });
    this.checkCanRecommend();
  },

  onSlopeSoilTypeChange(e) {
    const { value } = e.currentTarget.dataset;
    this.setData({ 'slopeParams.soilType': value });
    this.checkCanRecommend();
  },

  onSlidingFaceChange(e) {
    const { value } = e.currentTarget.dataset;
    this.setData({ 'slopeParams.hasSlidingFace': value });
    this.checkCanRecommend();
  },

  onSlopeLevelChange(e) {
    const { value } = e.currentTarget.dataset;
    this.setData({ 'slopeParams.slopeLevel': value });
    this.checkCanRecommend();
  },

  // ========== 地基处理参数 ==========
  onTreatmentInputChange(e) {
    const { key } = e.currentTarget.dataset;
    const { value } = e.detail;
    this.setData({ [`treatmentParams.${key}`]: value });
    this.checkCanRecommend();
  },

  onTreatmentSoilTypeChange(e) {
    const { value } = e.currentTarget.dataset;
    this.setData({ 'treatmentParams.soilType': value });
    this.checkCanRecommend();
  },

  onCollapsibleChange(e) {
    const { value } = e.currentTarget.dataset;
    this.setData({ 'treatmentParams.isCollapsible': value });
    this.checkCanRecommend();
  },

  onHasTimeChange(e) {
    const { value } = e.currentTarget.dataset;
    this.setData({ 'treatmentParams.hasTime': value });
    this.checkCanRecommend();
  },

  // ========== 检查是否可以推荐 ==========
  checkCanRecommend() {
    const { selectedType, params, slopeParams, treatmentParams } = this.data;
    let canRecommend = false;
    
    if (selectedType === 'pit') {
      canRecommend = params.depth && params.soilType && params.environment;
    } else if (selectedType === 'slope') {
      canRecommend = slopeParams.slopeHeight && slopeParams.slopeType;
    } else if (selectedType === 'foundation') {
      canRecommend = treatmentParams.treatmentDepth && treatmentParams.soilType;
    }
    
    this.setData({ canRecommend });
  },

  // ========== 执行推荐 ==========
  onRecommend() {
    if (!this.data.canRecommend || this.data.loading) return;
    
    this.setData({ loading: true });
    
    setTimeout(() => {
      try {
        const { selectedType } = this.data;
        let result = null;
        
        if (selectedType === 'pit') {
          result = this.recommendPit();
        } else if (selectedType === 'slope') {
          result = this.recommendSlope();
        } else if (selectedType === 'foundation') {
          result = this.recommendTreatment();
        }
        
        if (result && !result.error) {
          // 处理设计参数列表
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
            scheme: result,
            designParamsList,
            loading: false
          });
          
          // 滚动到结果区域
          wx.pageScrollTo({ scrollTop: 9999, duration: 300 });
        } else {
          wx.showToast({
            title: result?.error || '推荐失败，请重试',
            icon: 'none'
          });
          this.setData({ loading: false });
        }
      } catch (err) {
        console.error('[Advisor] 推荐失败:', err);
        wx.showToast({ title: '推荐失败，请重试', icon: 'none' });
        this.setData({ loading: false });
      }
    }, 1000);
  },

  // 推荐基坑方案
  recommendPit() {
    const { params } = this.data;
    return recommendPitScheme({
      depth: parseFloat(params.depth),
      soilType: params.soilType,
      environment: params.environment,
      waterLevel: params.waterLevel ? parseFloat(params.waterLevel) : null,
      surcharge: params.surcharge ? parseFloat(params.surcharge) : 10,
      pitLevel: params.pitLevel
    });
  },

  // 推荐边坡方案
  recommendSlope() {
    const { slopeParams } = this.data;
    return recommendSlopeScheme({
      slopeHeight: parseFloat(slopeParams.slopeHeight),
      slopeType: slopeParams.slopeType,
      rockType: slopeParams.rockType,
      soilType: slopeParams.soilType,
      hasSlidingFace: slopeParams.hasSlidingFace === 'yes',
      slidingDepth: slopeParams.slidingDepth ? parseFloat(slopeParams.slidingDepth) : null,
      slopeLevel: slopeParams.slopeLevel
    });
  },

  // 推荐地基处理方案
  recommendTreatment() {
    const { treatmentParams } = this.data;
    return recommendTreatmentScheme({
      treatmentDepth: parseFloat(treatmentParams.treatmentDepth),
      soilType: treatmentParams.soilType,
      bearingCapacity: treatmentParams.bearingCapacity ? parseFloat(treatmentParams.bearingCapacity) : null,
      isCollapsible: treatmentParams.isCollapsible === 'yes',
      hasTime: treatmentParams.hasTime === 'yes'
    });
  },

  // ========== 其他操作 ==========
  goConsultation() {
    wx.navigateTo({ url: '/pages/consultation/consultation' });
  },

  onShare() {
    wx.showToast({ title: '功能开发中', icon: 'none' });
  },

  onShareAppMessage() {
    return {
      title: '岩土工程方案助手 - 智能推荐初步方案',
      path: '/pages/advisor/advisor'
    };
  }
});
