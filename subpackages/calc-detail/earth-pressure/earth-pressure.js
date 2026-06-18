// subpackages/calc-detail/earth-pressure/earth-pressure.js
const earthPressureCalc = require('../../../core/calculator/earth-pressure');
const Toast = require('tdesign-miniprogram/toast/index');

Page({
  data: {
    // 计算类型
    calcType: 'rankine',
    
    // 输入参数
    params: {
      pressureType: '主动',
      gamma: '',
      phi: '',
      c: '0',
      depth: '',
      surcharge: '0',
      alpha: '0',
      delta: '0',
      beta: '0'
    },
    
    // 状态
    loading: false,
    
    // 计算结果
    result: null
  },

  onLoad(options) {
    console.log('土压力计算器页面加载');
  },

  // 计算类型切换
  onTypeChange(e) {
    const { value } = e.detail;
    this.setData({ 
      calcType: value,
      result: null
    });
  },

  // 土压力类型切换
  onPressureTypeChange(e) {
    const { value } = e.detail;
    this.setData({
      'params.pressureType': value,
      result: null
    });
  },

  // 输入变化
  onInputChange(e) {
    const { key } = e.currentTarget.dataset;
    const { value } = e.detail;
    
    this.setData({
      [`params.${key}`]: value,
      result: null
    });
  },

  // 执行计算
  onCalculate() {
    const { params, calcType } = this.data;
    
    // 准备计算参数
    const calcParams = {
      method: calcType === 'rankine' ? '朗肯' : '库仑',
      pressureType: params.pressureType,
      gamma: parseFloat(params.gamma),
      phi: parseFloat(params.phi),
      c: parseFloat(params.c || '0'),
      depth: parseFloat(params.depth),
      surcharge: parseFloat(params.surcharge || '0'),
      alpha: parseFloat(params.alpha || '0'),
      delta: parseFloat(params.delta || '0'),
      beta: parseFloat(params.beta || '0')
    };
    
    // 验证参数
    const validation = earthPressureCalc.validate(calcParams);
    if (!validation.valid) {
      Toast({
        context: this,
        selector: '#t-toast',
        message: validation.errors[0],
        theme: 'error'
      });
      return;
    }
    
    this.setData({ loading: true });
    
    // 执行计算
    setTimeout(() => {
      try {
        const result = earthPressureCalc.calculate(calcParams);
        
        // 格式化结果项
        const items = [];
        Object.keys(result.results).forEach(key => {
          const item = result.results[key];
          if (item && item.value !== undefined) {
            items.push({
              key,
              label: item.label,
              value: item.value,
              unit: item.unit || ''
            });
          }
        });
        
        this.setData({
          result: {
            items,
            summary: result.summary,
            warnings: result.warnings || [],
            references: result.references || [],
            formula: result.formula || ''
          },
          loading: false
        });
        
        // 滚动到结果区域
        wx.pageScrollTo({
          scrollTop: 9999,
          duration: 300
        });
        
      } catch (err) {
        console.error('计算失败:', err);
        Toast({
          context: this,
          selector: '#t-toast',
          message: '计算失败，请检查输入参数',
          theme: 'error'
        });
        this.setData({ loading: false });
      }
    }, 500);
  },

  // 保存到项目
  onSave() {
    try {
      let calcHistory = wx.getStorageSync('calcHistory') || [];
      
      calcHistory.unshift({
        id: `earth-pressure-${Date.now()}`,
        calculatorId: 'earth-pressure',
        calculatorName: '土压力计算器',
        params: this.data.params,
        result: this.data.result,
        timestamp: Date.now()
      });
      
      // 只保留最近50条
      calcHistory = calcHistory.slice(0, 50);
      
      wx.setStorageSync('calcHistory', calcHistory);
      
      Toast({
        context: this,
        selector: '#t-toast',
        message: '保存成功',
        theme: 'success'
      });
    } catch (err) {
      console.error('保存失败:', err);
      Toast({
        context: this,
        selector: '#t-toast',
        message: '保存失败',
        theme: 'error'
      });
    }
  },

  // 分享结果
  onShare() {
    wx.showActionSheet({
      itemList: ['分享给微信好友', '分享到朋友圈'],
      success: (res) => {
        if (res.tapIndex === 0) {
          // 分享给好友
          this.onShareAppMessage();
        } else if (res.tapIndex === 1) {
          // 分享到朋友圈
          this.onShareTimeline();
        }
      }
    });
  },

  // 重新计算
  onReset() {
    this.setData({
      params: {
        pressureType: '主动',
        gamma: '',
        phi: '',
        c: '0',
        depth: '',
        surcharge: '0',
        alpha: '0',
        delta: '0',
        beta: '0'
      },
      result: null
    });
  },

  // 分享
  onShareAppMessage() {
    const { result } = this.data;
    return {
      title: result ? `土压力计算结果：${result.summary}` : '土压力计算器',
      path: '/subpackages/calc-detail/earth-pressure/earth-pressure'
    };
  },

  onShareTimeline() {
    return {
      title: '土压力计算器 - 朗肯/库仑理论',
      query: '',
      imageUrl: ''
    };
  }
});
