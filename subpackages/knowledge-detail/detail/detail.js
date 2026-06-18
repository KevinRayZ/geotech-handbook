Page({
  data: {
    id: '',
    knowledge: null
  },

  onLoad(options) {
    if (options.id) {
      this.setData({ id: options.id });
      this.loadKnowledgeDetail(options.id);
    }
  },

  loadKnowledgeDetail(id) {
    // 从全局数据中获取知识库数据
    const app = getApp();
    const knowledgeData = app.globalData.knowledgeData;
    
    if (knowledgeData) {
      // 查找对应的知识条目
      let found = null;
      for (const category of Object.values(knowledgeData)) {
        if (Array.isArray(category)) {
          found = category.find(item => item.id === id);
          if (found) break;
        }
      }
      
      if (found) {
        this.setData({ knowledge: found });
        wx.setNavigationBarTitle({ title: found.title || '知识详情' });
      }
    }
  },

  onShareAppMessage() {
    return {
      title: this.data.knowledge ? this.data.knowledge.title : '岩土工程知识',
      path: '/subpackages/knowledge-detail/detail/detail?id=' + this.data.id
    };
  }
});
