/**
 * 岩土工程常用规范数据
 * 收录常用规范的核心条款和关键参数
 */

const STANDARDS_DATA = {
  // 基坑支护规范
  pit: {
    code: 'JGJ 120-2012',
    name: '建筑基坑支护技术规程',
    year: 2012,
    publisher: '住房和城乡建设部',
    keyProvisions: [
      {
        id: 'pit-01',
        title: '基坑安全等级划分',
        clause: '3.1.3',
        content: '基坑支护结构的安全等级应根据破坏后果按下列规定确定：\n1. 一级：支护结构破坏、土体失稳或过大变形对基坑周边环境及地下结构施工影响很严重\n2. 二级：支护结构破坏、土体失稳或过大变形对基坑周边环境及地下结构施工影响严重\n3. 三级：支护结构破坏、土体失稳或过大变形对基坑周边环境及地下结构施工影响不严重',
        tags: ['安全等级', '基坑']
      },
      {
        id: 'pit-02',
        title: '土压力计算',
        clause: '3.4',
        content: '作用在支护结构上的土压力应按下列规定确定：\n1. 对地下水位以上或渗透性较低的黏性土，可采用水土合算\n2. 对地下水位以下的砂土、粉土，宜采用水土分算',
        formula: '主动土压力：σa = γzKa - 2c√Ka\n被动土压力：σp = γzKp + 2c√Kp',
        tags: ['土压力', '水土分算', '水土合算']
      },
      {
        id: 'pit-03',
        title: '抗隆起稳定性验算',
        clause: '4.2',
        content: '基坑底面以下有软弱土层时，应进行基坑底抗隆起稳定性验算。',
        formula: 'Fs = (γtNq + cNc) / (γh + q) ≥ K',
        params: { K_l1: 1.8, K_l2: 1.6, K_l3: 1.4 },
        tags: ['抗隆起', '稳定性']
      },
      {
        id: 'pit-04',
        title: '抗倾覆稳定性验算',
        clause: '4.2',
        content: '悬臂式支挡结构应进行抗倾覆稳定性验算。',
        formula: 'Fs = Mp / Mo ≥ K',
        params: { K_l1: 1.2, K_l2: 1.15, K_l3: 1.1 },
        tags: ['抗倾覆', '稳定性']
      },
      {
        id: 'pit-05',
        title: '支护结构水平位移限值',
        clause: '8.1',
        content: '基坑支护结构水平位移控制值应根据周边环境条件确定：\n1. 一级基坑：0.2%H~0.5%H\n2. 二级基坑：0.5%H~1.0%H\n3. 三级基坑：1.0%H~2.0%H',
        tags: ['变形', '位移限值']
      }
    ]
  },

  // 边坡工程规范
  slope: {
    code: 'GB 50330-2013',
    name: '建筑边坡工程技术规范',
    year: 2013,
    publisher: '住房和城乡建设部',
    keyProvisions: [
      {
        id: 'slope-01',
        title: '边坡安全等级',
        clause: '3.2',
        content: '边坡工程安全等级应根据边坡高度、破坏后果严重性确定：\n1. 一级：破坏后果很严重的下列边坡：岩质边坡高度≥30m，土质边坡高度≥15m\n2. 二级：破坏后果严重的下列边坡：岩质边坡高度15~30m，土质边坡高度10~15m\n3. 三级：破坏后果不严重的下列边坡：岩质边坡高度<15m，土质边坡高度<10m',
        tags: ['安全等级', '边坡']
      },
      {
        id: 'slope-02',
        title: '边坡稳定性安全系数',
        clause: '5.3',
        content: '边坡稳定性安全系数应满足下列要求：',
        formula: '永久边坡：一级Fs≥1.35，二级Fs≥1.30，三级Fs≥1.25\n临时边坡：一级Fs≥1.25，二级Fs≥1.20，三级Fs≥1.15',
        tags: ['安全系数', '稳定性']
      },
      {
        id: 'slope-03',
        title: '边坡稳定性分析方法',
        clause: '5.2',
        content: '边坡稳定性分析方法应根据边坡类型选择：\n1. 圆弧形滑动：宜采用简化Bishop法\n2. 折线形滑动：宜采用不平衡推力法\n3. 平面形滑动：宜采用平面滑动分析法',
        tags: ['稳定性分析', '计算方法']
      },
      {
        id: 'slope-04',
        title: '边坡支护结构选型',
        clause: '6.1',
        content: '边坡支护结构形式应根据边坡高度、地质条件、环境要求等因素综合确定：\n1. 重力式挡墙：适用于高度≤8m的边坡\n2. 悬臂式挡墙：适用于高度≤6m的边坡\n3. 锚杆挡墙：适用于高度较大的边坡\n4. 抗滑桩：适用于滑坡治理',
        tags: ['支护选型', '挡墙']
      }
    ]
  },

  // 地基基础规范
  foundation: {
    code: 'GB 50007-2011',
    name: '建筑地基基础设计规范',
    year: 2011,
    publisher: '住房和城乡建设部',
    keyProvisions: [
      {
        id: 'found-01',
        title: '地基基础设计等级',
        clause: '3.0.1',
        content: '地基基础设计等级应根据地基复杂程度、建筑物规模和功能特征确定：\n甲级：重要的工业与民用建筑物；30层以上的高层建筑\n乙级：除甲级、丙级以外的工业与民用建筑物\n丙级：场地和地基条件简单、荷载分布均匀的七层及以下民用建筑',
        tags: ['设计等级', '地基']
      },
      {
        id: 'found-02',
        title: '地基承载力特征值',
        clause: '5.2',
        content: '地基承载力特征值可由载荷试验或其他原位测试、公式计算、并结合工程实践经验等方法综合确定。',
        formula: 'fa = fak + ηb·γ·(b-3) + ηd·γm·(d-0.5)',
        tags: ['承载力', '特征值']
      },
      {
        id: 'found-03',
        title: '地基变形计算',
        clause: '5.3',
        content: '建筑物的地基变形计算值不应大于地基变形允许值。',
        formula: 's = ψs·s\' = ψs·Σ(p0·zi·ᾱi - p0·zi-1·ᾱi-1)/Esi',
        tags: ['沉降', '变形']
      }
    ]
  },

  // 地基处理规范
  treatment: {
    code: 'JGJ 79-2012',
    name: '建筑地基处理技术规范',
    year: 2012,
    publisher: '住房和城乡建设部',
    keyProvisions: [
      {
        id: 'treat-01',
        title: '复合地基承载力',
        clause: '7.2',
        content: '复合地基承载力特征值应通过复合地基载荷试验确定。',
        formula: 'fspk = m·Ra/Ap + β·(1-m)·fsk',
        params: { beta_range: '0.75~0.95' },
        tags: ['复合地基', '承载力']
      },
      {
        id: 'treat-02',
        title: '水泥土搅拌桩',
        clause: '7.3',
        content: '水泥土搅拌桩适用于处理正常固结的淤泥、淤泥质土、粉土、饱和黄土、素填土、黏性土等地基。',
        formula: '单桩承载力：Ra = up·Σqsili + qp·Ap\n或：Ra = η·fcu·Ap',
        tags: ['搅拌桩', '水泥土']
      },
      {
        id: 'treat-03',
        title: '强夯法',
        clause: '6.2',
        content: '强夯法适用于处理碎石土、砂土、低饱和度的粉土与黏性土、湿陷性黄土、素填土和杂填土等地基。',
        formula: '有效加固深度：H = α·√(M·h/10)',
        params: { alpha_range: '0.3~0.8' },
        tags: ['强夯', '加固深度']
      }
    ]
  },

  // 勘察规范
  survey: {
    code: 'GB 50021-2001',
    name: '岩土工程勘察规范',
    year: 2001,
    publisher: '住房和城乡建设部',
    keyProvisions: [
      {
        id: 'survey-01',
        title: '岩土工程勘察等级',
        clause: '3.1',
        content: '岩土工程勘察等级应根据工程重要性等级、场地复杂程度等级和地基复杂程度等级综合确定。',
        tags: ['勘察等级', '岩土工程']
      },
      {
        id: 'survey-02',
        title: '取样要求',
        clause: '9.4',
        content: '取样应符合下列规定：\n1. 取土试样间距：主要土层不少于6个\n2. 原状土试样质量等级：Ⅰ级不扰动\n3. 取样方法：软土宜用薄壁取土器',
        tags: ['取样', '勘察']
      }
    ]
  },

  // 监测规范
  monitoring: {
    code: 'GB 50497-2019',
    name: '建筑基坑工程监测技术标准',
    year: 2019,
    publisher: '住房和城乡建设部',
    keyProvisions: [
      {
        id: 'monitor-01',
        title: '监测项目',
        clause: '4.1',
        content: '基坑工程监测项目应根据安全等级确定：\n一级：应测项包括支护结构水平位移、周边建筑沉降、地下水位\n二级：应测项包括支护结构水平位移、周边建筑沉降\n三级：应测项为支护结构水平位移',
        tags: ['监测项目', '基坑']
      },
      {
        id: 'monitor-02',
        title: '监测频率',
        clause: '7.1',
        content: '监测频率应根据施工阶段确定：\n开挖期间：1次/天\n底板浇筑后：1次/2~3天\n回填后：1次/周',
        tags: ['监测频率', '基坑']
      },
      {
        id: 'monitor-03',
        title: '报警值',
        clause: '8.1',
        content: '监测报警值应根据设计要求确定，一般取设计允许值的70%~80%。',
        tags: ['报警值', '监测']
      }
    ]
  }
};

/**
 * 获取规范数据
 */
function getStandardsData() {
  return STANDARDS_DATA;
}

/**
 * 根据分类获取规范
 */
function getStandardByCategory(category) {
  return STANDARDS_DATA[category] || null;
}

/**
 * 搜索规范条款
 */
function searchStandards(keyword) {
  const results = [];
  const kw = keyword.toLowerCase();

  Object.keys(STANDARDS_DATA).forEach(category => {
    const standard = STANDARDS_DATA[category];
    standard.keyProvisions.forEach(provision => {
      const searchText = [
        provision.title,
        provision.content,
        provision.clause,
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

module.exports = {
  getStandardsData,
  getStandardByCategory,
  searchStandards
};
