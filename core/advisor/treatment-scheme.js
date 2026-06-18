/**
 * 地基处理方案推荐引擎
 * 参考规范：JGJ 79-2012《建筑地基处理技术规范》
 */

// 地基处理方案库（基于JGJ 79-2012第4~15章）
const TREATMENT_SCHEMES = {
  // ========== 浅层处理（JGJ 79-2012第4章） ==========
  replacement: {
    name: '换填垫层法',
    type: '浅层处理',
    description: '挖除软弱土，换填砂石、灰土等，分层夯实',
    applicable: '处理深度≤3m，浅层软弱土',
    advantages: ['施工简便', '造价低', '工期短'],
    disadvantages: ['处理深度有限', '需要大量换填材料'],
    designParams: {
      '处理深度': '≤3m',
      '换填材料': '砂石、灰土、碎石',
      '压实系数': '≥0.95',
      '分层厚度': '200-300mm',
      '承载力要求': '≥150kPa',
      '检测方法': '环刀法、载荷试验'
    },
    normativeBasis: 'JGJ 79-2012 第4章：换填垫层法适用于处理浅层软弱地基'
  },
  
  // ========== 强夯法（JGJ 79-2012第6章） ==========
  dynamicCompaction: {
    name: '强夯法',
    type: '浅层-中层处理',
    description: '重锤高落差夯击地基，提高地基承载力',
    applicable: '处理深度3-12m，碎石土、砂土、粉土、低饱和度黏性土',
    advantages: ['处理深度较大', '造价适中', '施工快'],
    disadvantages: ['振动大', '不适用于高饱和度软土'],
    designParams: {
      '处理深度': '3-12m',
      '夯锤重量': '10-40t',
      '落距': '10-40m',
      '夯击遍数': '2-4遍',
      '每遍击数': '5-10击',
      '夯点间距': '3-6m'
    },
    normativeBasis: 'JGJ 79-2012 第6章：强夯法适用于处理碎石土、砂土、粉土等'
  },
  dynamicReplacement: {
    name: '强夯置换法',
    type: '中层处理',
    description: '强夯形成碎石墩，与周围土体形成复合地基',
    applicable: '处理深度4-10m，软弱土层较厚',
    advantages: ['处理深度大', '承载力提高明显'],
    disadvantages: ['造价较高', '施工振动大'],
    designParams: {
      '处理深度': '4-10m',
      '碎石墩直径': '1.0-2.0m',
      '墩间距': '2-4m',
      '夯击能': '3000-8000kN·m',
      '置换率': '0.2-0.4',
      '承载力要求': '≥200kPa'
    },
    normativeBasis: 'JGJ 79-2012 第6.2节：强夯置换法适用于高饱和度粉土和软塑黏性土'
  },

  // ========== 复合地基（JGJ 79-2012第7~12章） ==========
  cfgPile: {
    name: 'CFG桩复合地基',
    type: '深层处理',
    description: '水泥粉煤灰碎石桩复合地基',
    applicable: '处理深度5-25m，承载力要求高，变形控制严格',
    advantages: ['承载力高', '变形小', '施工成熟'],
    disadvantages: ['造价较高', '需要养护期'],
    designParams: {
      '处理深度': '5-25m',
      '桩径': '400-600mm',
      '桩间距': '1.2-2.0m',
      '桩身强度': 'C15-C25',
      '置换率': '0.06-0.15',
      '褥垫层': '150-300mm厚'
    },
    normativeBasis: 'JGJ 79-2012 第9章：水泥粉煤灰碎石桩复合地基'
  },
  cementMixing: {
    name: '水泥土搅拌桩',
    type: '深层处理',
    description: '深层搅拌法形成水泥土桩',
    applicable: '处理深度15-20m（湿法）/12m（干法），软土地区',
    advantages: ['施工快', '造价适中', '无振动'],
    disadvantages: ['承载力有限', '强度增长慢'],
    designParams: {
      '处理深度': '≤20m（湿法）/≤12m（干法）',
      '桩径': '500-700mm',
      '桩间距': '1.0-1.5m',
      '水泥掺量': '15-20%',
      '置换率': '0.2-0.3',
      '养护期': '≥28天'
    },
    normativeBasis: 'JGJ 79-2012 第7章：水泥土搅拌桩适用于处理正常固结的淤泥质土'
  },
  highPressureJet: {
    name: '高压旋喷桩',
    type: '深层处理',
    description: '高压喷射水泥浆，与土体混合形成水泥土桩',
    applicable: '处理深度≤30m，可用于止水帷幕',
    advantages: ['处理深度大', '可形成止水帷幕'],
    disadvantages: ['造价高', '质量控制难度大'],
    designParams: {
      '处理深度': '≤30m',
      '桩径': '600-1200mm',
      '桩间距': '0.8-1.5m',
      '水泥用量': '200-400kg/m',
      '喷射压力': '20-40MPa',
      '提升速度': '10-20cm/min'
    },
    normativeBasis: 'JGJ 79-2012 第8章：高压喷射注浆法适用于处理淤泥质土'
  },

  // ========== 排水固结（JGJ 79-2012第5章） ==========
  preloading: {
    name: '堆载预压法',
    type: '排水固结',
    description: '在地基上堆载，利用荷载使地基固结',
    applicable: '软土、淤泥质土，有足够预压时间',
    advantages: ['造价低', '效果可靠'],
    disadvantages: ['工期长', '需要大量堆载材料'],
    designParams: {
      '处理深度': '≤20m',
      '堆载高度': '根据设计确定',
      '预压时间': '3-12个月',
      '排水板间距': '1.0-2.0m',
      '排水板深度': '穿过软土层',
      '固结度要求': '≥80%'
    },
    normativeBasis: 'JGJ 79-2012 第5章：预压法适用于处理淤泥质土、淤泥'
  },
  vacuumPreloading: {
    name: '真空预压法',
    type: '排水固结',
    description: '在地基中设置排水板，覆盖密封膜，抽真空形成负压',
    applicable: '软土、淤泥质土，加固深度≤20m',
    advantages: ['不需要堆载', '工期可控'],
    disadvantages: ['需要密封条件', '设备要求高'],
    designParams: {
      '处理深度': '≤20m',
      '真空度': '≥80kPa',
      '排水板间距': '0.8-1.5m',
      '预压时间': '3-6个月',
      '密封膜': '2-3层',
      '固结度要求': '≥85%'
    },
    normativeBasis: 'JGJ 79-2012 第5.2节：真空预压法适用于加固深度≤20m的软土地基'
  },

  // ========== 挤密处理（JGJ 79-2012第10~11章） ==========
  gravelPile: {
    name: '碎石桩',
    type: '挤密处理',
    description: '振动或冲击形成碎石桩，置换软弱土层',
    applicable: '松散砂土、粉土、杂填土，深度≤15m',
    advantages: ['施工快', '造价适中', '排水效果好'],
    disadvantages: ['不适用于软黏土', '承载力有限'],
    designParams: {
      '处理深度': '≤15m',
      '桩径': '500-800mm',
      '桩间距': '1.0-2.0m',
      '置换率': '0.2-0.4',
      '填料': '级配碎石',
      '充盈系数': '≥1.2'
    },
    normativeBasis: 'JGJ 79-2012 第10章：碎石桩法适用于处理松散砂土和粉土'
  },
  limeSoilPile: {
    name: '灰土挤密桩',
    type: '挤密处理',
    description: '成孔后填入灰土（石灰:土=2:8或3:7），夯实挤密',
    applicable: '湿陷性黄土，处理深度≤15m',
    advantages: ['消除湿陷性', '造价较低'],
    disadvantages: ['仅适用于黄土', '需要大型设备'],
    designParams: {
      '处理深度': '≤15m',
      '桩径': '400-600mm',
      '桩间距': '0.8-1.5m',
      '灰土配合比': '2:8或3:7',
      '压实系数': '≥0.95',
      '桩间土挤密系数': '≥0.93'
    },
    normativeBasis: 'JGJ 79-2012 第11章：灰土挤密桩法适用于处理湿陷性黄土'
  },

  // ========== 注浆法（JGJ 79-2012第13章） ==========
  grouting: {
    name: '注浆法',
    type: '加固处理',
    description: '通过注浆管将浆液注入地层，充填裂隙，提高强度',
    applicable: '岩溶、裂隙发育地层，既有建筑加固',
    advantages: ['适用范围广', '可加固已有建筑'],
    disadvantages: ['质量控制难度大', '造价较高'],
    designParams: {
      '注浆材料': '水泥浆、化学浆液',
      '注浆压力': '0.2-1.0MPa',
      '注浆孔间距': '1.0-2.0m',
      '注浆量': '根据地层确定',
      '浆液配比': '水灰比0.5-1.0',
      '养护期': '≥7天'
    },
    normativeBasis: 'JGJ 79-2012 第13章：注浆法适用于处理岩溶、裂隙发育地基'
  },

  // ========== 通用推荐 ==========
  default: {
    name: '综合处理方案',
    type: '地基处理',
    description: '根据具体情况采用综合处理措施',
    applicable: '各类软弱地基，需结合现场情况',
    advantages: ['适用范围广', '可针对性设计'],
    disadvantages: ['需要详细勘察'],
    designParams: {
      '勘察要求': '详细工程地质勘察',
      '土工试验': '室内土工试验',
      '原位测试': '静力触探、标贯试验',
      '处理方案': '根据试验结果确定',
      '检测要求': '静载试验、标贯检测',
      '设计周期': '10-20天'
    },
    normativeBasis: 'JGJ 79-2012 第3章：地基处理方法选择应根据地基条件和工程要求确定'
  }
};

/**
 * 推荐地基处理方案
 * 基于JGJ 79-2012《建筑地基处理技术规范》推荐
 * @param {Object} params 地基参数
 * @returns {Object} 推荐方案
 */
function recommendTreatmentScheme(params) {
  const {
    treatmentDepth,    // 处理深度(m)
    soilType,          // 土质类型：softClay/clay/silt/sand/fill/loess
    bearingCapacity,   // 要求承载力(kPa)
    settlementReq,     // 沉降要求：strict/normal/loose
    waterLevel,        // 地下水位(m)
    hasTime,           // 工期是否充足
    isExpansive,       // 是否膨胀土
    isCollapsible,     // 是否湿陷性黄土
    projectType        // 工程类型：building/road/embankment
  } = params;

  // 参数验证
  if (!treatmentDepth || treatmentDepth <= 0) {
    return { error: '请输入有效的处理深度' };
  }

  let schemeKey = 'default';

  // 湿陷性黄土（JGJ 79-2012第11章）
  if (isCollapsible || soilType === 'collapsible') {
    if (treatmentDepth <= 15) {
      schemeKey = 'limeSoilPile';
    } else {
      schemeKey = 'cfgPile';
    }
  }
  // 膨胀土
  else if (isExpansive || soilType === 'expansive') {
    schemeKey = 'dynamicCompaction';
  }
  // 浅层处理（JGJ 79-2012第4章）
  else if (treatmentDepth <= 3) {
    schemeKey = 'replacement';
  }
  // 中层处理（JGJ 79-2012第5~6章）
  else if (treatmentDepth <= 10) {
    if (soilType === 'softClay' && hasTime) {
      schemeKey = 'vacuumPreloading';
    } else if (soilType === 'sand' || soilType === 'silt') {
      schemeKey = 'dynamicCompaction';
    } else {
      schemeKey = 'dynamicReplacement';
    }
  }
  // 深层处理（JGJ 79-2012第7~12章）
  else {
    if (bearingCapacity >= 200) {
      schemeKey = 'cfgPile';
    } else if (soilType === 'softClay') {
      schemeKey = 'cementMixing';
    } else {
      schemeKey = 'highPressureJet';
    }
  }

  const scheme = TREATMENT_SCHEMES[schemeKey];

  return {
    schemeName: scheme.name,
    schemeType: scheme.type,
    description: scheme.description,
    applicable: scheme.applicable,
    advantages: scheme.advantages,
    disadvantages: scheme.disadvantages,
    designParams: scheme.designParams,
    normativeBasis: scheme.normativeBasis,
    recommendations: [
      '本推荐为初步方案，详细设计需依据JGJ 79-2012进行',
      '应按JGJ 79-2012第3.2节进行地基处理方案比选',
      '应按JGJ 79-2012第3.4节进行现场试验确定施工参数',
      '应按JGJ 79-2012第3.5节进行质量检测和验收'
    ],
    consultationTip: '详细方案请联系专业设计院，依据JGJ 79-2012进行设计'
  };
}

/**
 * 获取方案详情
 */
function getSchemeDetail(schemeName) {
  const scheme = TREATMENT_SCHEMES[schemeName];
  return scheme || TREATMENT_SCHEMES.default;
}

/**
 * 获取所有方案列表
 */
function getAllSchemes() {
  return Object.keys(TREATMENT_SCHEMES).map(key => ({
    key,
    name: TREATMENT_SCHEMES[key].name,
    type: TREATMENT_SCHEMES[key].type
  }));
}

module.exports = {
  recommendTreatmentScheme,
  getSchemeDetail,
  getAllSchemes,
  TREATMENT_SCHEMES
};
