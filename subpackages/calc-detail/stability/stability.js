// subpackages/calc-detail/stability/stability.js
const pitStabilityCalc = require('../../../core/calculator/stability-pit');
const Toast = require('tdesign-miniprogram/toast/index');

Page({
  data: {
    // 验算类型
    checkType: 'antiHeave',
    checkTypes: [
      { value: 'antiHeave', label: '抗隆起', icon: 'chart-stability' },
      { value: 'antiOverturning', label: '抗倾覆', icon: 'swap' },
      { value: 'antiSliding', label: '抗滑移', icon: 'move' },
      { value: 'antiPiping', label: '抗流土', icon: 'water' },
      { value: 'antiBurst', label: '抗突涌', icon: 'chart-bubble' }
    ],
    
    // 输入参数
    params: {
      pitLevel: '二级',
      excavationDepth: '',
      embedDepth: '',
      gamma: '',
      c: '',
      phi: '',
      surcharge: '10',
      waterLevel: '',
      confinedWaterHead: '',
      confinedTopThickness: ''
    },
    
    // 状态
    loading: false,
    
    // 计算结果
    result: null
  },

  onLoad(options) {
    console.log('基坑稳定性验算页面加载');
  },

  // 验算类型切换
  onCheckTypeChange(e) {
    const { value } = e.currentTarget.dataset;
    this.setData({ 
      checkType: value,
      result: null
    });
  },

  // 基坑等级切换
  onPitLevelChange(e) {
    const { value } = e.detail;
    this.setData({
      'params.pitLevel': value,
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
    const { params, checkType } = this.data;
    
    // 准备计算参数
    const calcParams = {
      checkType: this.getCheckTypeName(checkType),
      pitLevel: params.pitLevel,
      excavationDepth: parseFloat(params.excavationDepth),
      embedDepth: parseFloat(params.embedDepth || '0'),
      gamma: parseFloat(params.gamma),
      c: parseFloat(params.c || '0'),
      phi: parseFloat(params.phi || '0'),
      surcharge: parseFloat(params.surcharge || '10'),
      waterLevel: parseFloat(params.waterLevel || '0'),
      confinedWaterHead: parseFloat(params.confinedWaterHead || '0'),
      confinedTopThickness: parseFloat(params.confinedTopThickness || '0')
    };
    
    // 验证参数
    const validation = pitStabilityCalc.validate(calcParams);
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
        const result = pitStabilityCalc.calculate(calcParams);
        
        // 格式化详细结果
        const details = [];
        if (result.results.details) {
          Object.keys(result.results.details).forEach(key => {
            if (key !== 'formula') {
              details.push({
                name: key,
                value: result.results.details[key]
              });
            }
          });
        }
        
        this.setData({
          result: {
            Fs: result.results.Fs.value,
            requiredFs: result.results.requiredFs.value,
            passed: result.results.passed.value,
            summary: result.summary,
            formula: result.results.details?.formula || '',
            details,
            references: result.references || []
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

  // 获取验算类型中文名
  getCheckTypeName(type) {
    const nameMap = {
      'antiHeave': '抗隆起',
      'antiOverturning': '抗倾覆',
      'antiSliding': '抗滑移',
      'antiPiping': '抗流土',
      'antiBurst': '抗突涌'
    };
    return nameMap[type] || type;
  },

  // 保存结果
  onSave() {
    try {
      let calcHistory = wx.getStorageSync('calcHistory') || [];
      
      calcHistory.unshift({
        id: `stability-${Date.now()}`,
        calculatorId: 'pit-stability',
        calculatorName: '基坑稳定性验算',
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

  // 重新计算
  onReset() {
    this.setData({
      params: {
        pitLevel: '二级',
        excavationDepth: '',
        embedDepth: '',
        gamma: '',
        c: '',
        phi: '',
        surcharge: '10',
        waterLevel: '',
        confinedWaterHead: '',
        confinedTopThickness: ''
      },
      result: null
    });
  },

  // 分享
  onShareAppMessage() {
    const { result } = this.data;
    return {
      title: result ? `基坑稳定性验算：${result.passed ? '通过' : '不通过'}` : '基坑稳定性验算',
      path: '/subpackages/calc-detail/stability/stability'
    };
  }
});
