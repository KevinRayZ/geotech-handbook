/**
 * 快捷查询页面
 * 集成AI API提供智能搜索功能
 */
const { searchKnowledge, getKnowledgeData } = require('../../core/knowledge/index');
const { intelligentSearch, generateSuggestions, testConnection } = require('../../core/ai/ai-service');

Page({
  data: {
    // 搜索相关
    searchValue: '',
    isSearching: false,
    searchDone: false,

    // 搜索建议
    suggestions: [],
    showSuggestions: false,

    // 结果
    localResults: [],
    aiResponse: '',
    hasLocalResults: false,
    hasAiResponse: false,

    // 热门搜索
    hotKeywords: [
      '土压力系数', '朗肯', '库仑', '安全系数',
      '复合地基', '承载力', '沉降', '稳定性',
      '土钉墙', '锚杆', '排桩', '地下连续墙',
      '内摩擦角', '黏聚力', '重度', '压缩模量'
    ],

    // 搜索历史
    history: [],

    // AI状态
    aiSearching: false,
    aiError: null,
    aiConnected: true,

    // 示例问题
    exampleQuestions: [
      '如何计算朗肯主动土压力？',
      '基坑抗隆起稳定性验算方法？',
      'CFG桩复合地基承载力如何计算？',
      '边坡稳定性分析有哪些方法？'
    ]
  },

  onLoad() {
    // 加载搜索历史
    const history = wx.getStorageSync('search_history') || [];
    this.setData({ history: history.slice(0, 10) });

    // 测试AI连接
    this.checkAiConnection();
  },

  /**
   * 检查AI连接状态
   */
  async checkAiConnection() {
    try {
      const connected = await testConnection();
      this.setData({ aiConnected: connected });
    } catch (err) {
      this.setData({ aiConnected: false });
    }
  },

  /**
   * 搜索输入
   */
  onSearchInput(e) {
    const value = e.detail.value;
    this.setData({ searchValue: value });

    // 生成搜索建议
    if (value && value.length >= 2) {
      const suggestions = generateSuggestions(value);
      this.setData({
        suggestions,
        showSuggestions: suggestions.length > 0
      });
    } else {
      this.setData({ suggestions: [], showSuggestions: false });
    }
  },

  /**
   * 执行搜索
   */
  async onSearch(e) {
    const keyword = e.detail.value || this.data.searchValue;
    if (!keyword.trim()) return;

    this.setData({
      isSearching: true,
      searchDone: false,
      localResults: [],
      aiResponse: '',
      hasLocalResults: false,
      hasAiResponse: false,
      aiSearching: false,
      aiError: null,
      showSuggestions: false
    });

    // 保存搜索历史
    this.saveHistory(keyword);

    // 第一步：查询本地知识库
    const localResults = searchKnowledge(keyword);

    this.setData({
      localResults: localResults.slice(0, 10),
      hasLocalResults: localResults.length > 0,
      aiSearching: true
    });

    // 第二步：调用AI进行智能搜索
    try {
      const result = await intelligentSearch(keyword, localResults);

      this.setData({
        aiResponse: result.aiResponse || '',
        hasAiResponse: !!result.aiResponse,
        aiError: result.error || null,
        aiSearching: false
      });
    } catch (err) {
      console.error('AI搜索失败:', err);
      this.setData({
        aiSearching: false,
        aiError: err.message
      });
    }

    this.setData({
      isSearching: false,
      searchDone: true
    });
  },

  /**
   * 点击搜索建议
   */
  onSuggestionTap(e) {
    const keyword = e.currentTarget.dataset.keyword;
    this.setData({ searchValue: keyword, showSuggestions: false });
    this.onSearch({ detail: { value: keyword } });
  },

  /**
   * 点击热门搜索
   */
  onHotKeywordTap(e) {
    const keyword = e.currentTarget.dataset.keyword;
    this.setData({ searchValue: keyword });
    this.onSearch({ detail: { value: keyword } });
  },

  /**
   * 点击历史搜索
   */
  onHistoryTap(e) {
    const keyword = e.currentTarget.dataset.keyword;
    this.setData({ searchValue: keyword });
    this.onSearch({ detail: { value: keyword } });
  },

  /**
   * 点击示例问题
   */
  onExampleTap(e) {
    const question = e.currentTarget.dataset.question;
    this.setData({ searchValue: question });
    this.onSearch({ detail: { value: question } });
  },

  /**
   * 点击本地结果
   */
  onLocalResultTap(e) {
    const item = e.currentTarget.dataset.item;
    wx.showModal({
      title: item.name,
      content: this.formatLocalResult(item),
      showCancel: false
    });
  },

  /**
   * 格式化本地结果
   */
  formatLocalResult(item) {
    let content = '';
    if (item.formula) content += `公式：${item.formula}\n\n`;
    if (item.description) content += item.description;
    return content || '暂无详细信息';
  },

  /**
   * 保存搜索历史
   */
  saveHistory(keyword) {
    let history = wx.getStorageSync('search_history') || [];
    history = history.filter(item => item !== keyword);
    history.unshift(keyword);
    history = history.slice(0, 20);
    wx.setStorageSync('search_history', history);
    this.setData({ history: history.slice(0, 10) });
  },

  /**
   * 清除搜索历史
   */
  clearHistory() {
    wx.removeStorageSync('search_history');
    this.setData({ history: [] });
  },

  /**
   * 清除搜索
   */
  onClearSearch() {
    this.setData({
      searchValue: '',
      isSearching: false,
      searchDone: false,
      localResults: [],
      aiResponse: '',
      hasLocalResults: false,
      hasAiResponse: false,
      aiSearching: false,
      aiError: null,
      suggestions: [],
      showSuggestions: false
    });
  },

  /**
   * 复制AI回复
   */
  onCopyAiResponse() {
    if (this.data.aiResponse) {
      wx.setClipboardData({
        data: this.data.aiResponse,
        success: () => {
          wx.showToast({ title: '已复制', icon: 'success' });
        }
      });
    }
  }
});
