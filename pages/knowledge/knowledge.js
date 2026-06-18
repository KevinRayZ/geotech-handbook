// pages/knowledge/knowledge.js
const { getKnowledgeByCategory, searchKnowledge, getStatistics } = require('../../core/knowledge/index');

const app = getApp();

Page({
  data: {
    // 搜索相关
    searchValue: '',
    searchResults: [],
    isSearching: false,
    
    // 分类相关
    currentCategory: 'pit',
    categories: [
      { id: 'geology', name: '工程地质', icon: 'leaf', color: '#07a35a' },
      { id: 'pit', name: '基坑工程', icon: 'building-1', color: '#0052d9' },
      { id: 'slope', name: '边坡工程', icon: 'chart', color: '#e37318' },
      { id: 'deepPit', name: '深基坑', icon: 'layers', color: '#8b5cf6' },
      { id: 'foundation', name: '地基处理', icon: 'root', color: '#d54941' }
    ],
    
    // 内容
    currentTab: 'formulas',
    tabs: [
      { value: 'formulas', label: '公式' },
      { value: 'methods', label: '工法' },
      { value: 'parameters', label: '参数' }
    ],
    formulas: [],
    methods: [],
    parameters: [],
    
    // 统计
    stats: null
  },

  onLoad() {
    console.log('[Knowledge] 页面加载');
    this.loadCategoryData();
    this.loadStats();
  },

  onShow() {
    console.log('[Knowledge] 页面显示');
  },

  /**
   * 加载分类数据
   */
  loadCategoryData() {
    const { currentCategory } = this.data;
    const categoryData = getKnowledgeByCategory(currentCategory);
    
    if (categoryData) {
      this.setData({
        formulas: categoryData.formulas || [],
        methods: categoryData.methods || [],
        parameters: categoryData.parameters || []
      });
      console.log(`[Knowledge] 加载 ${currentCategory} 数据:`, {
        formulas: categoryData.formulas?.length || 0,
        methods: categoryData.methods?.length || 0,
        parameters: categoryData.parameters?.length || 0
      });
    } else {
      console.warn(`[Knowledge] 未找到分类数据: ${currentCategory}`);
      this.setData({ formulas: [], methods: [], parameters: [] });
    }
  },

  /**
   * 加载统计信息
   */
  loadStats() {
    const stats = getStatistics();
    this.setData({ stats });
  },

  /**
   * 切换分类
   */
  onCategoryChange(e) {
    const { id } = e.currentTarget.dataset;
    this.setData({ currentCategory: id });
    this.loadCategoryData();
  },

  /**
   * 切换Tab
   */
  onTabChange(e) {
    this.setData({ currentTab: e.detail.value });
  },

  /**
   * 搜索输入
   */
  onSearchInput(e) {
    const value = e.detail.value;
    this.setData({ searchValue: value });
    
    if (value.trim()) {
      this.doSearch(value);
    } else {
      this.setData({ searchResults: [], isSearching: false });
    }
  },

  /**
   * 搜索确认
   */
  onSearchConfirm(e) {
    const value = e.detail.value || this.data.searchValue;
    if (value.trim()) {
      this.doSearch(value);
    }
  },

  /**
   * 清除搜索
   */
  onSearchClear() {
    this.setData({
      searchValue: '',
      searchResults: [],
      isSearching: false
    });
  },

  /**
   * 执行搜索
   */
  doSearch(keyword) {
    console.log('[Knowledge] 搜索:', keyword);
    const results = searchKnowledge(keyword);
    
    this.setData({
      searchResults: results,
      isSearching: true
    });
    
    console.log(`[Knowledge] 搜索结果: ${results.length} 条`);
  },

  /**
   * 点击搜索结果
   */
  onResultTap(e) {
    const { item } = e.currentTarget.dataset;
    // 可以跳转到详情页或显示详情弹窗
    wx.showToast({
      title: `查看: ${item.name}`,
      icon: 'none'
    });
  },

  /**
   * 点击公式
   */
  onFormulaTap(e) {
    const { item } = e.currentTarget.dataset;
    wx.showModal({
      title: item.name,
      content: `公式: ${item.formula}\n\n说明: ${item.description}\n\n分类: ${item.category}`,
      showCancel: false
    });
  },

  /**
   * 点击工法
   */
  onMethodTap(e) {
    const { item } = e.currentTarget.dataset;
    wx.showModal({
      title: item.name,
      content: `${item.description}\n\n适用条件: ${item.applicable}`,
      showCancel: false
    });
  },

  /**
   * 点击参数
   */
  onParamTap(e) {
    const { item } = e.currentTarget.dataset;
    wx.showModal({
      title: `${item.name} (${item.symbol})`,
      content: `单位: ${item.unit}\n\n说明: ${item.description}`,
      showCancel: false
    });
  }
});
