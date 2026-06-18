/**
 * 岩土工程规范数据模块（完整版）
 * 涵盖59本常用规范，支持离线查询
 * 
 * 数据来源：用户ima知识库 "RAY的知识库"
 * 分类：01-综合手册、02-边坡规范、03-基坑规范、04-地基基础、05-勘察规范、06-抗震规范、07-通用规范、08-其他参考
 */

// 导入各分类规范数据
const surveyStandards = require('./survey');
const foundationStandards = require('./foundation');
const pitStandards = require('./pit');
const slopeStandards = require('./slope');
const treatmentStandards = require('./treatment');
const specialSoilStandards = require('./special-soil');
const seismicStandards = require('./seismic');
const monitoringStandards = require('./monitoring');
const generalStandards = require('./general');
const handbookStandards = require('./handbooks');

// 合并所有规范数据
const STANDARDS_DATA = {
  ...surveyStandards,
  ...foundationStandards,
  ...pitStandards,
  ...slopeStandards,
  ...treatmentStandards,
  ...specialSoilStandards,
  ...seismicStandards,
  ...monitoringStandards,
  ...generalStandards,
  ...handbookStandards
};

// 规范分类索引
const STANDARDS_INDEX = {
  survey: { name: '勘察类规范', standards: Object.keys(surveyStandards) },
  foundation: { name: '地基基础类规范', standards: Object.keys(foundationStandards) },
  pit: { name: '基坑工程类规范', standards: Object.keys(pitStandards) },
  slope: { name: '边坡工程类规范', standards: Object.keys(slopeStandards) },
  treatment: { name: '地基处理类规范', standards: Object.keys(treatmentStandards) },
  specialSoil: { name: '特殊土类规范', standards: Object.keys(specialSoilStandards) },
  seismic: { name: '抗震类规范', standards: Object.keys(seismicStandards) },
  monitoring: { name: '监测检测类规范', standards: Object.keys(monitoringStandards) },
  general: { name: '通用规范', standards: Object.keys(generalStandards) },
  handbook: { name: '综合手册', standards: Object.keys(handbookStandards) }
};

/**
 * 获取所有规范数据
 */
function getStandardsData() {
  return STANDARDS_DATA;
}

/**
 * 获取规范分类索引
 */
function getStandardsIndex() {
  return STANDARDS_INDEX;
}

/**
 * 根据分类获取规范
 */
function getStandardByCategory(category) {
  return STANDARDS_DATA[category] || null;
}

/**
 * 根据规范编号获取规范
 */
function getStandardByCode(code) {
  for (const [key, standard] of Object.entries(STANDARDS_DATA)) {
    if (standard.code === code) {
      return { key, ...standard };
    }
  }
  return null;
}

/**
 * 搜索规范条款
 */
function searchStandards(keyword) {
  const results = [];
  const kw = keyword.toLowerCase();

  Object.keys(STANDARDS_DATA).forEach(category => {
    const standard = STANDARDS_DATA[category];
    if (!standard.keyProvisions) return;

    standard.keyProvisions.forEach(provision => {
      const searchText = [
        provision.title,
        provision.content,
        provision.clause,
        provision.formula,
        ...(provision.tags || [])
      ].join(' ').toLowerCase();

      if (searchText.includes(kw)) {
        results.push({
          ...provision,
          standardCode: standard.code,
          standardName: standard.name,
          category
        });
      }
    });
  });

  return results;
}

/**
 * 获取规范统计信息
 */
function getStandardsStats() {
  let totalProvisions = 0;
  const stats = {
    totalStandards: Object.keys(STANDARDS_DATA).length,
    categories: Object.keys(STANDARDS_INDEX).length,
    provisionsByCategory: {}
  };

  Object.keys(STANDARDS_INDEX).forEach(category => {
    const categoryStandards = STANDARDS_INDEX[category].standards;
    let categoryProvisions = 0;
    
    categoryStandards.forEach(standardKey => {
      const standard = STANDARDS_DATA[standardKey];
      if (standard && standard.keyProvisions) {
        categoryProvisions += standard.keyProvisions.length;
      }
    });

    stats.provisionsByCategory[category] = categoryProvisions;
    totalProvisions += categoryProvisions;
  });

  stats.totalProvisions = totalProvisions;
  return stats;
}

module.exports = {
  getStandardsData,
  getStandardsIndex,
  getStandardByCategory,
  getStandardByCode,
  searchStandards,
  getStandardsStats
};
