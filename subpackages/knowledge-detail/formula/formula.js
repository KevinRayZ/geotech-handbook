Page({
  data: {
    formulaId: '',
    formula: null,
    inputs: {},
    result: null
  },

  onLoad(options) {
    if (options.id) {
      this.setData({ formulaId: options.id });
      this.loadFormula(options.id);
    }
  },

  loadFormula(id) {
    // 从全局数据中获取公式数据
    const app = getApp();
    const knowledgeData = app.globalData.knowledgeData;
    
    if (knowledgeData) {
      // 查找对应的公式
      let found = null;
      for (const category of Object.values(knowledgeData)) {
        if (Array.isArray(category)) {
          found = category.find(item => item.id === id && item.formula);
          if (found) break;
        }
      }
      
      if (found) {
        this.setData({ formula: found });
        wx.setNavigationBarTitle({ title: found.title || '公式计算' });
        
        // 初始化输入参数
        if (found.params) {
          const inputs = {};
          found.params.forEach(param => {
            inputs[param.name] = '';
          });
          this.setData({ inputs });
        }
      }
    }
  },

  onInputChange(e) {
    const { field } = e.currentTarget.dataset;
    const { value } = e.detail;
    this.setData({
      [`inputs.${field}`]: value
    });
  },

  onCalculate() {
    const { formula, inputs } = this.data;
    if (!formula) return;

    // 验证输入
    const params = formula.params || [];
    for (const param of params) {
      if (!inputs[param.name] && inputs[param.name] !== 0) {
        wx.showToast({
          title: `请输入${param.name}`,
          icon: 'none'
        });
        return;
      }
    }

    // 这里可以添加具体的计算逻辑
    // 暂时显示输入的参数
    this.setData({
      result: {
        message: '计算功能开发中',
        inputs: { ...inputs }
      }
    });

    wx.showToast({
      title: '计算完成',
      icon: 'success'
    });
  },

  onReset() {
    const inputs = {};
    if (this.data.formula && this.data.formula.params) {
      this.data.formula.params.forEach(param => {
        inputs[param.name] = '';
      });
    }
    this.setData({
      inputs,
      result: null
    });
  },

  onShareAppMessage() {
    return {
      title: this.data.formula ? this.data.formula.title : '岩土工程公式',
      path: '/subpackages/knowledge-detail/formula/formula?id=' + this.data.formulaId
    };
  }
});
