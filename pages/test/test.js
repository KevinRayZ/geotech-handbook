// pages/test/test.js
const { getKnowledgeData, searchKnowledge, getStatistics } = require('../../core/knowledge/index');

Page({
  data: {
    testResults: [],
    isRunning: false,
    stats: null
  },

  onLoad() {
    this.runTests();
  },

  /**
   * 运行所有测试
   */
  async runTests() {
    this.setData({ isRunning: true, testResults: [] });
    const results = [];

    // 测试1: 知识库数据加载
    await this.addTestResult('知识库数据加载', () => {
      const data = getKnowledgeData();
      const categories = Object.keys(data);
      if (categories.length === 0) throw new Error('知识库为空');
      return `成功加载 ${categories.length} 个分类: ${categories.join(', ')}`;
    });

    // 测试2: 统计信息
    await this.addTestResult('统计信息', () => {
      const stats = getStatistics();
      this.setData({ stats });
      return `${stats.categories}个分类, ${stats.formulas}条公式, ${stats.methods}种工法, ${stats.parameters}个参数`;
    });

    // 测试3: 搜索功能 - 土压力
    await this.addTestResult('搜索"土压力"', () => {
      const results = searchKnowledge('土压力');
      if (results.length === 0) throw new Error('未找到结果');
      return `找到 ${results.length} 条结果`;
    });

    // 测试4: 搜索功能 - 稳定性
    await this.addTestResult('搜索"稳定性"', () => {
      const results = searchKnowledge('稳定性');
      if (results.length === 0) throw new Error('未找到结果');
      return `找到 ${results.length} 条结果`;
    });

    // 测试5: 搜索功能 - 承载力
    await this.addTestResult('搜索"承载力"', () => {
      const results = searchKnowledge('承载力');
      if (results.length === 0) throw new Error('未找到结果');
      return `找到 ${results.length} 条结果`;
    });

    // 测试6: 分类数据完整性
    await this.addTestResult('基坑工程数据', () => {
      const data = getKnowledgeData();
      const pit = data.pit;
      if (!pit) throw new Error('未找到基坑工程数据');
      return `${pit.formulas.length}条公式, ${pit.methods.length}种工法, ${pit.parameters.length}个参数`;
    });

    // 测试7: 分类数据完整性
    await this.addTestResult('边坡工程数据', () => {
      const data = getKnowledgeData();
      const slope = data.slope;
      if (!slope) throw new Error('未找到边坡工程数据');
      return `${slope.formulas.length}条公式, ${slope.methods.length}种工法, ${slope.parameters.length}个参数`;
    });

    // 测试8: 分类数据完整性
    await this.addTestResult('地基处理数据', () => {
      const data = getKnowledgeData();
      const foundation = data.foundation;
      if (!foundation) throw new Error('未找到地基处理数据');
      return `${foundation.formulas.length}条公式, ${foundation.methods.length}种工法, ${foundation.parameters.length}个参数`;
    });

    this.setData({ isRunning: false });
    
    const passed = results.filter(r => r.success).length;
    wx.showToast({
      title: `测试完成: ${passed}/${results.length} 通过`,
      icon: passed === results.length ? 'success' : 'none'
    });
  },

  /**
   * 添加测试结果
   */
  async addTestResult(name, testFn) {
    let success = false;
    let message = '';
    let error = '';

    try {
      message = testFn();
      success = true;
    } catch (err) {
      error = err.message;
      success = false;
    }

    const result = { name, success, message, error };
    this.data.testResults.push(result);
    this.setData({ testResults: this.data.testResults });
    
    // 延迟一下让UI更新
    await new Promise(resolve => setTimeout(resolve, 200));
  },

  /**
   * 重新运行测试
   */
  onRetest() {
    this.runTests();
  }
});
