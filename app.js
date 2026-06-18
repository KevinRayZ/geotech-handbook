// app.js
const { initKnowledge, getStatistics } = require('./core/knowledge/index');

App({
  onLaunch() {
    console.log('[App] 岩土工程随身智库启动');
    
    // 初始化知识库
    this.initKnowledgeBase();
    
    // 获取系统信息
    this.getSystemInfo();
  },

  onShow() {
    console.log('[App] 应用显示');
  },

  onHide() {
    console.log('[App] 应用隐藏');
  },

  /**
   * 初始化知识库
   */
  initKnowledgeBase() {
    try {
      const startTime = Date.now();
      initKnowledge();
      const stats = getStatistics();
      const elapsed = Date.now() - startTime;
      
      console.log(`[App] 知识库初始化完成，耗时 ${elapsed}ms`);
      console.log(`[App] 知识库统计: ${stats.categories}个分类, ${stats.formulas}条公式, ${stats.methods}种工法, ${stats.parameters}个参数`);
      
      this.globalData.knowledgeStats = stats;
      this.globalData.knowledgeReady = true;
    } catch (err) {
      console.error('[App] 知识库初始化失败:', err);
      this.globalData.knowledgeReady = false;
    }
  },

  /**
   * 获取系统信息
   */
  getSystemInfo() {
    try {
      const systemInfo = wx.getSystemInfoSync();
      this.globalData.systemInfo = systemInfo;
      this.globalData.statusBarHeight = systemInfo.statusBarHeight || 20;
      this.globalData.navBarHeight = 44;
      
      // 获取胶囊按钮信息
      try {
        this.globalData.menuButtonInfo = wx.getMenuButtonBoundingClientRect();
      } catch (e) {
        this.globalData.menuButtonInfo = { top: 26, height: 32 };
      }
    } catch (err) {
      console.error('[App] 获取系统信息失败:', err);
    }
  },

  globalData: {
    userInfo: null,
    systemInfo: null,
    statusBarHeight: 20,
    navBarHeight: 44,
    menuButtonInfo: null,
    knowledgeReady: false,
    knowledgeStats: null,
    
    config: {
      version: '1.0.0',
      appName: '岩土工程随身智库',
      categories: [
        { id: 'geology', name: '工程地质', icon: 'leaf', color: '#07a35a' },
        { id: 'pit', name: '基坑工程', icon: 'building-1', color: '#0052d9' },
        { id: 'slope', name: '边坡工程', icon: 'chart', color: '#e37318' },
        { id: 'deepPit', name: '深基坑工程', icon: 'layers', color: '#8b5cf6' },
        { id: 'foundation', name: '地基处理', icon: 'root', color: '#d54941' }
      ]
    }
  }
});
