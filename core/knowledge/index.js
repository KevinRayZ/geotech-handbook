/**
 * 知识库管理模块
 * 提供知识库的加载、搜索、分类查询功能
 */

const { getAllKnowledge, getCategoryKnowledge, searchKnowledge: searchData, getSafetyFactors, getSoilParams } = require('./knowledge-data');

// 知识库数据缓存
let _knowledgeData = null;

/**
 * 初始化知识库
 */
function initKnowledge() {
  _knowledgeData = getAllKnowledge();
  console.log('[Knowledge] 知识库初始化完成', Object.keys(_knowledgeData));
  return _knowledgeData;
}

/**
 * 获取知识库数据
 */
function getKnowledgeData() {
  if (!_knowledgeData) {
    initKnowledge();
  }
  return _knowledgeData;
}

/**
 * 根据分类获取知识
 */
function getKnowledgeByCategory(category) {
  const data = getKnowledgeData();
  return data[category] || null;
}

/**
 * 搜索知识库
 * @param {string} keyword 搜索关键词
 * @returns {Array} 搜索结果
 */
function searchKnowledge(keyword) {
  const data = getKnowledgeData();
  
  if (!keyword || keyword.trim() === '') {
    return [];
  }
  
  const results = [];
  const kw = keyword.toLowerCase().trim();
  
  // 遍历所有分类
  Object.keys(data).forEach(category => {
    const categoryData = data[category];
    
    // 搜索公式
    if (categoryData.formulas) {
      categoryData.formulas.forEach(item => {
        const searchText = [
          item.name,
          item.formula,
          item.description,
          item.category,
          ...(item.tags || [])
        ].join(' ').toLowerCase();
        
        if (searchText.includes(kw)) {
          results.push({
            type: 'formula',
            category: category,
            categoryName: categoryData.name,
            categoryColor: categoryData.color,
            ...item
          });
        }
      });
    }
    
    // 搜索工法
    if (categoryData.methods) {
      categoryData.methods.forEach(item => {
        const searchText = [
          item.name,
          item.description,
          item.applicable
        ].join(' ').toLowerCase();
        
        if (searchText.includes(kw)) {
          results.push({
            type: 'method',
            category: category,
            categoryName: categoryData.name,
            categoryColor: categoryData.color,
            ...item
          });
        }
      });
    }
    
    // 搜索参数
    if (categoryData.parameters) {
      categoryData.parameters.forEach(item => {
        const searchText = [
          item.name,
          item.symbol,
          item.description
        ].join(' ').toLowerCase();
        
        if (searchText.includes(kw)) {
          results.push({
            type: 'parameter',
            category: category,
            categoryName: categoryData.name,
            categoryColor: categoryData.color,
            ...item
          });
        }
      });
    }
  });
  
  return results;
}

/**
 * 获取所有公式（用于计算器选择）
 */
function getAllFormulas() {
  const data = getKnowledgeData();
  const formulas = [];
  
  Object.keys(data).forEach(category => {
    if (data[category].formulas) {
      data[category].formulas.forEach(f => {
        formulas.push({
          ...f,
          category,
          categoryName: data[category].name
        });
      });
    }
  });
  
  return formulas;
}

/**
 * 获取所有工法
 */
function getAllMethods() {
  const data = getKnowledgeData();
  const methods = [];
  
  Object.keys(data).forEach(category => {
    if (data[category].methods) {
      data[category].methods.forEach(m => {
        methods.push({
          ...m,
          category,
          categoryName: data[category].name
        });
      });
    }
  });
  
  return methods;
}

/**
 * 获取知识库统计信息
 */
function getStatistics() {
  const data = getKnowledgeData();
  const stats = {
    categories: 0,
    formulas: 0,
    methods: 0,
    parameters: 0
  };
  
  Object.keys(data).forEach(category => {
    stats.categories++;
    if (data[category].formulas) stats.formulas += data[category].formulas.length;
    if (data[category].methods) stats.methods += data[category].methods.length;
    if (data[category].parameters) stats.parameters += data[category].parameters.length;
  });
  
  return stats;
}

module.exports = {
  initKnowledge,
  getKnowledgeData,
  getKnowledgeByCategory,
  searchKnowledge,
  getAllFormulas,
  getAllMethods,
  getStatistics,
  getSafetyFactors,
  getSoilParams
};
