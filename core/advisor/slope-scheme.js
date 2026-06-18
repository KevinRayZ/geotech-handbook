/**
 * 边坡治理方案推荐引擎
 * 参考规范：GB 50330-2013《建筑边坡工程技术规范》
 *          GB/T 38509-2020《滑坡防治设计规范》
 */

// 边坡治理方案库（基于GB 50330-2013第6章支护结构选型）
const SLOPE_SCHEMES = {
  // ========== 岩质边坡 ==========
  rock_light: {
    name: '喷锚支护',
    type: '岩质边坡表层防护',
    description: '喷射混凝土+锚杆，封闭坡面，加固表层',
    applicable: '岩质边坡风化破碎带、表层剥落',
    advantages: ['施工简便', '造价较低', '可绿化'],
    disadvantages: ['仅适用于表层', '深度有限'],
    designParams: {
      '喷射混凝土厚度': '100-150mm',
      '混凝土强度': 'C20-C25',
      '锚杆长度': '3-6m',
      '锚杆间距': '1.5-2.5m',
      '锚杆直径': 'Φ22-Φ28',
      '钢筋网': 'Φ6@150-200mm'
    },
    normativeBasis: 'GB 50330-2013 第6.1节：岩质边坡可采用喷锚支护',
    safetyFactor: { permanent: 1.30, temporary: 1.20 }
  },
  rock_medium: {
    name: '格构锚固',
    type: '岩质边坡深层加固',
    description: '钢筋混凝土格构+预应力锚杆/锚索',
    applicable: '岩质边坡稳定性不足、有深层滑动风险',
    advantages: ['加固深度大', '可控制变形', '可绿化'],
    disadvantages: ['造价较高', '施工周期长'],
    designParams: {
      '格构截面': '300×300mm~400×400mm',
      '格构间距': '2-3m',
      '锚杆长度': '6-15m',
      '锚杆预应力': '100-500kN',
      '锚杆间距': '2-3m',
      '混凝土强度': 'C25-C30'
    },
    normativeBasis: 'GB 50330-2013 第7.1节：锚杆倾角宜为15°~35°',
    safetyFactor: { permanent: 1.35, temporary: 1.25 }
  },
  rock_heavy: {
    name: '预应力锚索+抗滑桩',
    type: '岩质边坡深层滑动治理',
    description: '预应力锚索加固+抗滑桩支挡',
    applicable: '岩质边坡有深层滑动面、大型滑坡',
    advantages: ['加固深度大', '承载力高', '可靠性强'],
    disadvantages: ['造价高', '施工复杂'],
    designParams: {
      '锚索长度': '15-40m',
      '锚索吨位': '500-2000kN',
      '抗滑桩截面': '1.5×2.0m~2.5×3.5m',
      '桩间距': '4-6m（2~5倍桩径）',
      '桩长': '10-25m',
      '嵌固深度': '桩长的1/3~1/2'
    },
    normativeBasis: 'GB 50330-2013 第8.1节：抗滑桩桩间距宜为2~5倍桩径',
    safetyFactor: { permanent: 1.35, temporary: 1.25 }
  },

  // ========== 土质边坡 ==========
  soil_light: {
    name: '放坡+植草护坡',
    type: '土质边坡浅层防护',
    description: '按稳定坡率放坡，坡面植草防护',
    applicable: '高度较小的土质边坡，场地开阔',
    advantages: ['造价最低', '生态环保', '施工简便'],
    disadvantages: ['占地面积大', '高度受限'],
    designParams: {
      '坡率': '1:1.0~1:1.75（按土质类型）',
      '坡高': '≤8m（每8m设一级平台）',
      '平台宽度': '≥2m',
      '植草方式': '喷播植草',
      '截水沟': '坡顶设置',
      '排水沟': '坡脚设置'
    },
    normativeBasis: 'GB 50330-2013 第6.2节：土质边坡坡率宜为1:1.0~1:1.75',
    safetyFactor: { permanent: 1.25, temporary: 1.15 }
  },
  soil_medium: {
    name: '土钉墙+喷射混凝土',
    type: '土质边坡表层加固',
    description: '土钉加固+挂网喷射混凝土护面',
    applicable: '土质边坡高度6-15m，无深层滑动',
    advantages: ['施工快', '造价适中', '可垂直开挖'],
    disadvantages: ['需要降水', '不适用于软土'],
    designParams: {
      '土钉长度': '0.5-1.0倍坡高',
      '土钉间距': '1.0-2.0m',
      '土钉直径': 'Φ20-Φ25',
      '钻孔直径': '100-150mm',
      '喷射混凝土': '80-150mm厚',
      '注浆压力': '0.3-0.5MPa'
    },
    normativeBasis: 'GB 50330-2013 第6.1节：土质边坡可采用土钉墙支护',
    safetyFactor: { permanent: 1.30, temporary: 1.20 }
  },
  soil_heavy: {
    name: '抗滑桩+预应力锚索',
    type: '土质边坡深层滑动治理',
    description: '抗滑桩支挡+预应力锚索加固',
    applicable: '土质边坡有深层滑动面、大型滑坡',
    advantages: ['加固深度大', '可靠性高'],
    disadvantages: ['造价高', '施工周期长'],
    designParams: {
      '抗滑桩截面': '1.5×2.0m~2.5×3.5m',
      '桩间距': '4-6m（2~5倍桩径）',
      '桩长': '10-25m',
      '锚索长度': '15-35m',
      '锚索吨位': '500-1500kN',
      '嵌固深度': '桩长的1/3~1/2'
    },
    normativeBasis: 'GB/T 38509-2020 第7.1节：抗滑桩安全系数Fs≥1.25',
    safetyFactor: { permanent: 1.35, temporary: 1.25 }
  },

  // ========== 特殊边坡 ==========
  loess_slope: {
    name: '挡土墙+排水',
    type: '黄土边坡治理',
    description: '重力式挡墙+完善排水系统',
    applicable: '黄土地区边坡，有湿陷性',
    advantages: ['针对性强', '可靠性高'],
    disadvantages: ['造价较高', '需要地基处理'],
    designParams: {
      '挡墙类型': '重力式/衡重式',
      '墙高': '≤8m',
      '基础埋深': '≥1.0m',
      '排水孔': 'Φ100@2-3m',
      '反滤层': '300mm厚砂砾',
      '截水沟': '坡顶设置'
    },
    normativeBasis: 'GB 50330-2013 第6.1节：重力式挡墙高度不宜超过8m',
    safetyFactor: { permanent: 1.30, temporary: 1.20 }
  },
  expansive_slope: {
    name: '柔性支护+排水',
    type: '膨胀土边坡治理',
    description: '土工格栅加筋+完善排水系统',
    applicable: '膨胀土地区边坡',
    advantages: ['适应变形', '排水效果好'],
    disadvantages: ['需要长期维护'],
    designParams: {
      '坡率': '1:1.5~1:2.0',
      '土工格栅': '双向拉伸，50-100kN/m',
      '铺设间距': '0.5-0.8m',
      '排水层': '300mm厚碎石',
      '坡面防护': '骨架植草',
      '坡脚防护': '浆砌石护脚'
    },
    normativeBasis: 'GB 50330-2013 第9.1节：排水设计应包括地表排水和地下排水',
    safetyFactor: { permanent: 1.30, temporary: 1.20 }
  },

  // ========== 通用推荐 ==========
  default: {
    name: '综合防护',
    type: '边坡综合防护',
    description: '根据具体情况采用综合防护措施',
    applicable: '各类边坡，需结合现场情况',
    advantages: ['适用范围广', '可针对性设计'],
    disadvantages: ['需要详细勘察'],
    designParams: {
      '勘察要求': '详细工程地质勘察',
      '稳定性分析': '采用多种方法验算',
      '排水系统': '地表+地下排水',
      '监测要求': '位移、沉降、裂缝监测',
      '设计周期': '15-30天',
      '施工周期': '根据方案确定'
    },
    normativeBasis: 'GB 50330-2013 第5.2节：应采用多种方法进行稳定性分析',
    safetyFactor: { permanent: 1.30, temporary: 1.20 }
  }
};

/**
 * 推荐边坡治理方案
 * 基于GB 50330-2013《建筑边坡工程技术规范》推荐
 * @param {Object} params 边坡参数
 * @returns {Object} 推荐方案
 */
function recommendSlopeScheme(params) {
  const {
    slopeHeight,     // 边坡高度(m)
    slopeType,       // 边坡类型：rock/soil
    rockType,        // 岩石类型：hard/medium/soft（岩质边坡）
    soilType,        // 土质类型：clay/silt/sand/loess/expansive（土质边坡）
    slopeAngle,      // 边坡坡度(°)
    hasSlidingFace,  // 是否有滑动面
    slidingDepth,    // 滑动面深度(m)
    environment,     // 环境条件：urban/rural/highway
    slopeLevel       // 边坡等级：一级/二级/三级
  } = params;

  // 参数验证
  if (!slopeHeight || slopeHeight <= 0) {
    return { error: '请输入有效的边坡高度' };
  }

  let schemeKey = 'default';

  // 根据GB 50330-2013第3.2节边坡安全等级划分
  let slopeGrade = '三级';
  if (slopeType === 'rock') {
    if (slopeHeight >= 30) slopeGrade = '一级';
    else if (slopeHeight >= 15) slopeGrade = '二级';
  } else {
    if (slopeHeight >= 15) slopeGrade = '一级';
    else if (slopeHeight >= 10) slopeGrade = '二级';
  }

  // 根据边坡类型和高度推荐（参考GB 50330-2013第6章）
  if (slopeType === 'rock') {
    // 岩质边坡
    if (slopeHeight <= 10 && !hasSlidingFace) {
      schemeKey = 'rock_light';
    } else if (slopeHeight <= 20 || (hasSlidingFace && slidingDepth <= 10)) {
      schemeKey = 'rock_medium';
    } else {
      schemeKey = 'rock_heavy';
    }
  } else if (slopeType === 'soil') {
    // 土质边坡
    if (soilType === 'loess') {
      schemeKey = 'loess_slope';
    } else if (soilType === 'expansive') {
      schemeKey = 'expansive_slope';
    } else if (slopeHeight <= 8 && !hasSlidingFace) {
      schemeKey = 'soil_light';
    } else if (slopeHeight <= 15 || (hasSlidingFace && slidingDepth <= 8)) {
      schemeKey = 'soil_medium';
    } else {
      schemeKey = 'soil_heavy';
    }
  }

  const scheme = SLOPE_SCHEMES[schemeKey];

  // 计算安全系数要求（根据GB 50330-2013第5.3节）
  const level = slopeLevel || slopeGrade;
  let fsRequired = scheme.safetyFactor.permanent;
  if (level === '一级') fsRequired = 1.35;
  else if (level === '二级') fsRequired = 1.30;
  else fsRequired = 1.25;

  return {
    schemeName: scheme.name,
    schemeType: scheme.type,
    description: scheme.description,
    applicable: scheme.applicable,
    advantages: scheme.advantages,
    disadvantages: scheme.disadvantages,
    designParams: scheme.designParams,
    safetyFactor: fsRequired,
    normativeBasis: scheme.normativeBasis,
    recommendations: [
      '本推荐为初步方案，详细设计需进行工程地质勘察',
      '应按GB 50330-2013第5.2节采用多种方法进行稳定性分析',
      '应按GB 50330-2013第9.1节设计完善的排水系统',
      '应按GB 50330-2013第10.1节建立边坡监测系统',
      '一级边坡必须进行监测，监测频率施工期1次/天'
    ],
    consultationTip: '详细方案请联系专业设计院，依据GB 50330-2013进行设计'
  };
}

/**
 * 获取方案详情
 */
function getSchemeDetail(schemeName) {
  const scheme = SLOPE_SCHEMES[schemeName];
  return scheme || SLOPE_SCHEMES.default;
}

/**
 * 获取所有方案列表
 */
function getAllSchemes() {
  return Object.keys(SLOPE_SCHEMES).map(key => ({
    key,
    name: SLOPE_SCHEMES[key].name,
    type: SLOPE_SCHEMES[key].type
  }));
}

module.exports = {
  recommendSlopeScheme,
  getSchemeDetail,
  getAllSchemes,
  SLOPE_SCHEMES
};
