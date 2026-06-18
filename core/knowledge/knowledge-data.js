/**
 * 岩土工程知识库数据
 * 直接内嵌数据，避免微信小程序 require JSON 的路径问题
 */

const KNOWLEDGE_DATA = {
  // ========== 工程地质 ==========
  geology: {
    name: '工程地质',
    icon: 'leaf',
    color: '#07a35a',
    formulas: [
      { id: 'geo-f-01', name: '孔隙率', formula: 'n = Vv/V × 100%', description: '土中孔隙体积与总体积之比', category: '物理性质', tags: ['孔隙率', '物理指标'] },
      { id: 'geo-f-02', name: '孔隙比', formula: 'e = Vv/Vs', description: '土中孔隙体积与固体颗粒体积之比', category: '物理性质', tags: ['孔隙比', '物理指标'] },
      { id: 'geo-f-03', name: '饱和度', formula: 'Sr = Vw/Vv × 100%', description: '土中水的体积与孔隙体积之比', category: '物理性质', tags: ['饱和度', '含水量'] },
      { id: 'geo-f-04', name: '含水量', formula: 'w = mw/ms × 100%', description: '土中水的质量与干土质量之比', category: '物理性质', tags: ['含水量', '含水率'] },
      { id: 'geo-f-05', name: '干密度', formula: 'ρd = ms/V', description: '单位体积土中固体颗粒的质量', category: '物理性质', tags: ['干密度', '密度'] },
      { id: 'geo-f-06', name: '塑性指数', formula: 'Ip = wL - wP', description: '液限与塑限之差', category: '稠度', tags: ['塑性指数', '液限', '塑限'] },
      { id: 'geo-f-07', name: '液性指数', formula: 'IL = (w - wP)/(wL - wP)', description: '天然含水量与塑限之差和塑性指数之比', category: '稠度', tags: ['液性指数', '稠度状态'] }
    ],
    parameters: [
      { name: '黏聚力', symbol: 'c', unit: 'kPa', description: '土的抗剪强度参数' },
      { name: '内摩擦角', symbol: 'φ', unit: '°', description: '土的抗剪强度参数' },
      { name: '压缩模量', symbol: 'Es', unit: 'MPa', description: '土的压缩性指标' },
      { name: '承载力特征值', symbol: 'fak', unit: 'kPa', description: '地基承载力' },
      { name: '渗透系数', symbol: 'k', unit: 'cm/s', description: '土的渗透性指标' }
    ],
    methods: [
      { id: 'geo-m-01', name: '标准贯入试验', description: '用63.5kg穿心锤，以76cm落距，将标准贯入器打入土中15cm后，记录每打入10cm的锤击数', applicable: '砂土、粉土、一般黏性土' },
      { id: 'geo-m-02', name: '静力触探试验', description: '用静力将探头匀速压入土中，量测探头阻力', applicable: '软土、黏性土、砂土' },
      { id: 'geo-m-03', name: '十字板剪切试验', description: '在软土中插入十字板，旋转测定不排水抗剪强度', applicable: '饱和软黏土' }
    ]
  },

  // ========== 基坑工程 ==========
  pit: {
    name: '基坑工程',
    icon: 'building-1',
    color: '#0052d9',
    formulas: [
      { id: 'pit-f-01', name: '朗肯主动土压力系数', formula: 'Ka = tan²(45° - φ/2)', description: '用于计算挡土墙主动土压力系数', category: '土压力', tags: ['朗肯', '主动', '土压力'] },
      { id: 'pit-f-02', name: '朗肯被动土压力系数', formula: 'Kp = tan²(45° + φ/2)', description: '用于计算挡土墙被动土压力系数', category: '土压力', tags: ['朗肯', '被动', '土压力'] },
      { id: 'pit-f-03', name: '静止土压力系数', formula: 'K0 = 1 - sinφ', description: '用于计算静止土压力', category: '土压力', tags: ['静止', '土压力', 'K0'] },
      { id: 'pit-f-04', name: '主动土压力强度', formula: 'σa = γzKa - 2c√Ka', description: '计算任意深度处的主动土压力强度', category: '土压力', tags: ['主动', '土压力', '强度'] },
      { id: 'pit-f-05', name: '被动土压力强度', formula: 'σp = γzKp + 2c√Kp', description: '计算任意深度处的被动土压力强度', category: '土压力', tags: ['被动', '土压力', '强度'] },
      { id: 'pit-f-06', name: '库仑主动土压力系数', formula: 'Ka = cos²(φ-α) / [cos²α·cos(α+δ)·(1+√(sin(φ+δ)·sin(φ-β)/cos(α+δ)·cos(α-β)))²]', description: '考虑墙背摩擦的主动土压力系数', category: '土压力', tags: ['库仑', '主动', '土压力'] },
      { id: 'pit-f-07', name: '抗倾覆安全系数', formula: 'Ks = Mr/Mo ≥ 1.2', description: '验算支护结构抗倾覆稳定性', category: '稳定性', tags: ['抗倾覆', '安全系数'] },
      { id: 'pit-f-08', name: '抗隆起安全系数', formula: 'Kh = (γDNc + q)/(γH + q) ≥ 1.6', description: '验算基坑底部抗隆起稳定性', category: '稳定性', tags: ['抗隆起', '安全系数'] },
      { id: 'pit-f-09', name: '抗管涌安全系数', formula: 'Kp = γw·h/(γ·D) ≥ 1.5', description: '验算基坑底部抗管涌稳定性', category: '稳定性', tags: ['抗管涌', '安全系数'] },
      { id: 'pit-f-10', name: '土钉抗拔力', formula: 'Tu = π·D·L·τ', description: '计算单根土钉的抗拔承载力', category: '土钉墙', tags: ['土钉', '抗拔', '承载力'] },
      { id: 'pit-f-11', name: '锚杆抗拔力', formula: 'Tu = π·D·L·τ·α', description: '计算单根锚杆的抗拔承载力', category: '锚杆', tags: ['锚杆', '抗拔', '承载力'] },
      { id: 'pit-f-12', name: '基坑顶部水平位移', formula: 'δ = α·H²/(E·D)', description: '估算基坑顶部水平位移', category: '变形', tags: ['变形', '位移', '水平'] },
      { id: 'pit-f-13', name: '降水井出水量', formula: 'Q = 2πkHs/ln(R/r)', description: '计算单井出水量', category: '降水', tags: ['降水', '出水量', '井'] },
      { id: 'pit-f-14', name: '支撑轴力', formula: 'N = q·L·s', description: '内支撑轴力计算', category: '支撑', tags: ['支撑', '轴力'] },
      { id: 'pit-f-15', name: '地下连续墙弯矩', formula: 'M = q·L²/10', description: '地下连续墙最大弯矩估算', category: '连续墙', tags: ['连续墙', '弯矩'] }
    ],
    parameters: [
      { name: '主动土压力系数', symbol: 'Ka', unit: '-', description: '朗肯或库仑主动土压力系数' },
      { name: '被动土压力系数', symbol: 'Kp', unit: '-', description: '朗肯或库仑被动土压力系数' },
      { name: '静止土压力系数', symbol: 'K0', unit: '-', description: '静止土压力系数' },
      { name: '安全系数', symbol: 'K', unit: '-', description: '各类稳定性安全系数' },
      { name: '基坑深度', symbol: 'H', unit: 'm', description: '基坑开挖深度' },
      { name: '入土深度', symbol: 'D', unit: 'm', description: '支护结构嵌固深度' },
      { name: '土的重度', symbol: 'γ', unit: 'kN/m³', description: '土的天然重度' },
      { name: '黏聚力', symbol: 'c', unit: 'kPa', description: '土的黏聚力' },
      { name: '内摩擦角', symbol: 'φ', unit: '°', description: '土的内摩擦角' }
    ],
    methods: [
      { id: 'pit-m-01', name: '土钉墙支护', description: '在土体中设置土钉，形成复合土体挡墙', applicable: '深度≤12m，地下水位以上或降水后' },
      { id: 'pit-m-02', name: '排桩+锚杆支护', description: '钻孔灌注桩+预应力锚杆', applicable: '深度6-20m，周边环境宽松' },
      { id: 'pit-m-03', name: '排桩+内支撑', description: '钻孔灌注桩+钢支撑或混凝土支撑', applicable: '深度6-25m，周边环境严格' },
      { id: 'pit-m-04', name: '地下连续墙', description: '现浇钢筋混凝土连续墙体', applicable: '深度>10m，严格变形控制' },
      { id: 'pit-m-05', name: '水泥土重力式挡墙', description: '水泥土搅拌桩相互搭接形成挡墙', applicable: '深度≤7m，软土地区' },
      { id: 'pit-m-06', name: 'SMW工法', description: '型钢水泥土搅拌墙', applicable: '深度8-15m，兼作止水帷幕' }
    ]
  },

  // ========== 边坡工程 ==========
  slope: {
    name: '边坡工程',
    icon: 'chart',
    color: '#e37318',
    formulas: [
      { id: 'slope-f-01', name: '瑞典圆弧法安全系数', formula: 'Fs = Σ(c·l + N·tanφ) / ΣT', description: '边坡稳定性分析的基本方法', category: '稳定性', tags: ['瑞典法', '圆弧滑动', '安全系数'] },
      { id: 'slope-f-02', name: '简化Bishop法', formula: 'Fs = Σ[(c·b + (W - u·b)·tanφ) / mα] / Σ(W·sinα)', description: '考虑条间力的简化方法', category: '稳定性', tags: ['Bishop', '条分法', '安全系数'] },
      { id: 'slope-f-03', name: '不平衡推力法', formula: 'Pi = Pi-1·ψ + Ti - Ni·tanφ/Fs - c·l/Fs', description: '传递系数法，适用于折线形滑面', category: '稳定性', tags: ['推力法', '折线滑面'] },
      { id: 'slope-f-04', name: '边坡安全系数标准', formula: '一级Fs≥1.35，二级Fs≥1.30，三级Fs≥1.25', description: '永久边坡安全系数要求', category: '规范', tags: ['安全系数', '标准'] },
      { id: 'slope-f-05', name: '抗滑桩推力', formula: 'E = Ka·γ·H²/2 - Kp·γ·h²/2', description: '作用于抗滑桩上的剩余推力', category: '抗滑桩', tags: ['抗滑桩', '推力'] },
      { id: 'slope-f-06', name: '锚杆设计拉力', formula: 'Nt = Ka·γ·H·s / cosα', description: '边坡锚杆设计拉力', category: '锚杆', tags: ['锚杆', '拉力'] }
    ],
    parameters: [
      { name: '边坡安全系数', symbol: 'Fs', unit: '-', description: '边坡稳定性安全系数' },
      { name: '边坡高度', symbol: 'H', unit: 'm', description: '边坡垂直高度' },
      { name: '边坡坡度', symbol: 'β', unit: '°', description: '边坡与水平面的夹角' },
      { name: '剩余推力', symbol: 'E', unit: 'kN/m', description: '滑坡剩余下滑力' }
    ],
    methods: [
      { id: 'slope-m-01', name: '抗滑桩', description: '在滑坡前缘设置钢筋混凝土桩', applicable: '滑坡治理，深度较大的滑面' },
      { id: 'slope-m-02', name: '预应力锚索', description: '通过锚索提供抗滑力', applicable: '岩质边坡、深层滑动' },
      { id: 'slope-m-03', name: '挡土墙', description: '重力式或悬臂式挡墙', applicable: '高度较小的边坡' },
      { id: 'slope-m-04', name: '喷锚支护', description: '喷射混凝土+锚杆', applicable: '岩质边坡表层防护' },
      { id: 'slope-m-05', name: '排水工程', description: '地表排水+地下排水', applicable: '所有边坡，降低地下水' }
    ]
  },

  // ========== 深基坑 ==========
  deepPit: {
    name: '深基坑工程',
    icon: 'layers',
    color: '#8b5cf6',
    formulas: [
      { id: 'dp-f-01', name: '深基坑整体稳定性', formula: 'Fs = Mr/Ms ≥ 1.3', description: '深基坑整体稳定性验算', category: '稳定性', tags: ['整体稳定', '深基坑'] },
      { id: 'dp-f-02', name: '渗流稳定性', formula: 'i = Δh/L ≤ ic/γw', description: '渗流稳定性验算', category: '渗流', tags: ['渗流', '稳定性'] },
      { id: 'dp-f-03', name: '多道支撑轴力', formula: 'Ni = ki·Δi·Li', description: '各道支撑轴力计算', category: '支撑', tags: ['支撑', '轴力', '多道'] },
      { id: 'dp-f-04', name: '时空效应系数', formula: 'λ = f(B/H, t/T)', description: '考虑时空效应的土压力调整系数', category: '时空效应', tags: ['时空效应', '调整'] }
    ],
    parameters: [
      { name: '围护墙厚度', symbol: 'B', unit: 'mm', description: '地下连续墙或灌注桩厚度' },
      { name: '支撑间距', symbol: 'L', unit: 'm', description: '水平支撑间距' },
      { name: '嵌固深度', symbol: 'D', unit: 'm', description: '围护结构入土深度' },
      { name: '安全等级', symbol: '-', unit: '-', description: '一级/二级/三级' }
    ],
    methods: [
      { id: 'dp-m-01', name: '逆作法', description: '利用主体结构作为支撑，自上而下施工', applicable: '超深基坑，严格变形控制' },
      { id: 'dp-m-02', name: '半逆作法', description: '部分采用逆作，部分采用顺作', applicable: '深度较大，工期紧张' },
      { id: 'dp-m-03', name: '环形支撑', description: '采用环形内支撑体系', applicable: '大面积基坑，减少支撑道数' }
    ]
  },

  // ========== 地基处理 ==========
  foundation: {
    name: '地基处理',
    icon: 'root',
    color: '#d54941',
    formulas: [
      { id: 'found-f-01', name: '复合地基承载力', formula: 'fspk = m·Ra/Ap + β·(1-m)·fsk', description: '复合地基承载力特征值计算', category: '承载力', tags: ['复合地基', '承载力', '置换率'] },
      { id: 'found-f-02', name: '面积置换率', formula: 'm = Ap/A', description: '桩截面积与处理面积之比', category: '置换率', tags: ['置换率', '面积'] },
      { id: 'found-f-03', name: '复合地基沉降', formula: 's = ψsp·Σ(Δspi)', description: '复合地基总沉降量', category: '沉降', tags: ['沉降', '复合地基'] },
      { id: 'found-f-04', name: '强夯有效深度', formula: 'H = α·√(M·h/10)', description: '强夯法有效加固深度估算', category: '强夯', tags: ['强夯', '加固深度'] },
      { id: 'found-f-05', name: 'CFG桩承载力', formula: 'Ra = up·Σqsili + qp·Ap', description: 'CFG桩单桩承载力特征值', category: 'CFG桩', tags: ['CFG', '承载力', '桩'] },
      { id: 'found-f-06', name: '搅拌桩承载力', formula: 'Ra = η·fcu·Ap', description: '水泥土搅拌桩单桩承载力', category: '搅拌桩', tags: ['搅拌桩', '承载力'] }
    ],
    parameters: [
      { name: '面积置换率', symbol: 'm', unit: '-', description: '桩截面积与处理面积之比' },
      { name: '桩土应力比', symbol: 'n', unit: '-', description: '桩顶应力与桩间土应力之比' },
      { name: '承载力特征值', symbol: 'fspk', unit: 'kPa', description: '复合地基承载力特征值' },
      { name: '压缩模量', symbol: 'Esp', unit: 'MPa', description: '复合地基压缩模量' }
    ],
    methods: [
      { id: 'found-m-01', name: 'CFG桩复合地基', description: '水泥粉煤灰碎石桩复合地基', applicable: '处理深度5-25m，承载力要求高' },
      { id: 'found-m-02', name: '水泥土搅拌桩', description: '深层搅拌法形成水泥土桩', applicable: '处理深度15-20m，软土地区' },
      { id: 'found-m-03', name: '强夯法', description: '重锤高落差夯击地基', applicable: '处理深度3-12m，碎石土、砂土' },
      { id: 'found-m-04', name: '碎石桩', description: '振动或冲击形成碎石桩', applicable: '松散砂土、粉土、杂填土' },
      { id: 'found-m-05', name: '换填垫层法', description: '挖除软弱土，换填砂石等', applicable: '处理深度≤3m，浅层处理' }
    ]
  }
};

// 安全系数标准
const SAFETY_FACTORS = {
  pit: {
    antiOverturning: { level1: 1.2, level2: 1.2, level3: 1.2 },
    antiHeave: { level1: 1.8, level2: 1.6, level3: 1.4 },
    antiPiping: { level1: 1.5, level2: 1.5, level3: 1.5 },
    antiSliding: { level1: 1.3, level2: 1.3, level3: 1.3 }
  },
  slope: {
    permanent: { level1: 1.35, level2: 1.30, level3: 1.25 },
    temporary: { level1: 1.25, level2: 1.20, level3: 1.15 }
  }
};

// 土层参数经验值
const SOIL_PARAMS = {
  clay: { name: '黏性土', gamma: [18, 20], c: [10, 50], phi: [8, 20], Es: [4, 15] },
  silt: { name: '粉土', gamma: [18, 20], c: [5, 20], phi: [15, 28], Es: [5, 15] },
  sand: { name: '砂土', gamma: [18, 21], c: [0, 5], phi: [25, 38], Es: [10, 30] },
  gravel: { name: '碎石土', gamma: [19, 22], c: [0, 5], phi: [30, 42], Es: [15, 40] },
  fill: { name: '填土', gamma: [16, 19], c: [5, 15], phi: [8, 15], Es: [2, 8] },
  softClay: { name: '软土', gamma: [15, 18], c: [5, 15], phi: [3, 10], Es: [1, 4] }
};

/**
 * 获取所有知识库数据
 */
function getAllKnowledge() {
  return KNOWLEDGE_DATA;
}

/**
 * 根据分类获取知识库
 */
function getCategoryKnowledge(category) {
  return KNOWLEDGE_DATA[category] || null;
}

/**
 * 搜索知识库
 */
function searchKnowledge(keyword) {
  if (!keyword) return [];
  
  const results = [];
  const kw = keyword.toLowerCase();
  
  Object.keys(KNOWLEDGE_DATA).forEach(category => {
    const data = KNOWLEDGE_DATA[category];
    
    // 搜索公式
    data.formulas.forEach(item => {
      const searchText = `${item.name} ${item.formula} ${item.description} ${(item.tags || []).join(' ')}`.toLowerCase();
      if (searchText.includes(kw)) {
        results.push({ type: 'formula', category, category_name: data.name, data: item });
      }
    });
    
    // 搜索工法
    data.methods.forEach(item => {
      const searchText = `${item.name} ${item.description} ${item.applicable}`.toLowerCase();
      if (searchText.includes(kw)) {
        results.push({ type: 'method', category, category_name: data.name, data: item });
      }
    });
    
    // 搜索参数
    data.parameters.forEach(item => {
      const searchText = `${item.name} ${item.symbol} ${item.description}`.toLowerCase();
      if (searchText.includes(kw)) {
        results.push({ type: 'parameter', category, category_name: data.name, data: item });
      }
    });
  });
  
  return results;
}

/**
 * 获取安全系数
 */
function getSafetyFactors() {
  return SAFETY_FACTORS;
}

/**
 * 获取土层参数
 */
function getSoilParams() {
  return SOIL_PARAMS;
}

module.exports = {
  getAllKnowledge,
  getCategoryKnowledge,
  searchKnowledge,
  getSafetyFactors,
  getSoilParams
};
