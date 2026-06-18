/**
 * 知识库管理模块
 * 提供知识库的加载、搜索、分类查询功能
 * v2.0 - 增加规范查询和专家匹配
 */

const { getAllKnowledge, getCategoryKnowledge, searchKnowledge: searchData, getSafetyFactors, getSoilParams, getRockClassification, getRockIntegrity, getSoilClassification } = require('./knowledge-data');
const { getStandardsData, searchStandards } = require('../../data/standards/index');
const { matchExpert, getExpertList } = require('../experts/expert-service');

// 知识库数据缓存
let _knowledgeData = null;
let _standardsData = null;

/**
 * 初始化知识库
 */
function initKnowledge() {
  _knowledgeData = getAllKnowledge();
  _standardsData = getStandardsData();
  console.log('[Knowledge] 知识库初始化完成', Object.keys(_knowledgeData));
  console.log('[Knowledge] 规范库初始化完成', Object.keys(_standardsData));
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
 * 搜索知识库（增强版：包含规范和专家匹配）
 * @param {string} keyword 搜索关键词
 * @returns {Object} 搜索结果
 */
function searchKnowledge(keyword) {
  const data = getKnowledgeData();
  
  if (!keyword || keyword.trim() === '') {
    return { results: [], standards: [], expert: null };
  }
  
  const results = [];
  const kw = keyword.toLowerCase().trim();
  
  // 遍历所有分类
  Object.keys(data).forEach(category => {
    if (category === 'common') return; // 跳过通用数据
    
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
  
  // 搜索规范
  const standardResults = searchStandards(keyword);
  
  // 匹配专家
  const matchedExpert = matchExpert(keyword);
  
  return {
    results,
    standards: standardResults,
    expert: matchedExpert
  };
}

/**
 * 获取所有公式（用于计算器选择）
 */
function getAllFormulas() {
  const data = getKnowledgeData();
  const formulas = [];
  
  Object.keys(data).forEach(category => {
    if (category === 'common') return;
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
    if (category === 'common') return;
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
 * 获取规范数据
 */
function getStandards() {
  if (!_standardsData) {
    _standardsData = getStandardsData();
  }
  return _standardsData;
}

/**
 * 根据分类获取规范
 */
function getStandardByCategory(category) {
  const standards = getStandards();
  return standards[category] || null;
}

/**
 * 获取知识库统计信息
 */
function getStatistics() {
  const data = getKnowledgeData();
  const standards = getStandards();
  const stats = {
    categories: 0,
    formulas: 0,
    methods: 0,
    parameters: 0,
    standards: 0,
    experts: getExpertList().length
  };
  
  Object.keys(data).forEach(category => {
    if (category === 'common') return;
    stats.categories++;
    if (data[category].formulas) stats.formulas += data[category].formulas.length;
    if (data[category].methods) stats.methods += data[category].methods.length;
    if (data[category].parameters) stats.parameters += data[category].parameters.length;
  });
  
  // 统计规范条款数
  Object.keys(standards).forEach(category => {
    if (standards[category].keyProvisions) {
      stats.standards += standards[category].keyProvisions.length;
    }
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
  getStandards,
  getStandardByCategory,
  getStatistics,
  getSafetyFactors,
  getSoilParams,
  getRockClassification,
  getRockIntegrity,
  getSoilClassification
};
