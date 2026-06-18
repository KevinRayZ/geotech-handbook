/**
 * 勘察类规范数据
 */
module.exports = {
  'GB50021': {
    code: 'GB 50021-2001',
    name: '岩土工程勘察规范',
    year: 2001,
    publisher: '住房和城乡建设部',
    scope: '适用于各类建设工程的岩土工程勘察',
    keyProvisions: [
      {
        id: 'survey-01',
        title: '岩土工程勘察等级',
        clause: '3.1',
        content: '岩土工程勘察等级应根据工程重要性等级、场地复杂程度等级和地基复杂程度等级综合确定：\n甲级：在工程重要性、场地复杂程度和地基复杂程度中，有一项为一级\n乙级：除甲级和丙级以外的勘察工程\n丙级：工程重要性、场地复杂程度和地基复杂程度均为三级',
        tags: ['勘察等级', '岩土工程']
      },
      {
        id: 'survey-02',
        title: '工程重要性等级',
        clause: '3.1.1',
        content: '工程重要性等级划分：\n一级：重要工程，破坏后果很严重\n二级：一般工程，破坏后果严重\n三级：次要工程，破坏后果不严重',
        tags: ['重要性等级', '工程']
      },
      {
        id: 'survey-03',
        title: '场地复杂程度',
        clause: '3.1.2',
        content: '场地复杂程度划分：\n一级场地（复杂场地）：对建筑抗震危险的地段，不良地质作用强烈发育\n二级场地（中等复杂场地）：对建筑抗震不利的地段，不良地质作用一般发育\n三级场地（简单场地）：对建筑抗震有利的地段，不良地质作用不发育',
        tags: ['场地等级', '复杂程度']
      },
      {
        id: 'survey-04',
        title: '勘探点间距',
        clause: '4.1',
        content: '勘探点间距应根据勘察等级确定：\n甲级：15~30m\n乙级：30~50m\n丙级：50~80m',
        tags: ['勘探点', '间距']
      },
      {
        id: 'survey-05',
        title: '勘探深度',
        clause: '4.2',
        content: '勘探孔深度应满足下列要求：\n1. 能控制地基主要受力层\n2. 满足地基变形计算深度\n3. 满足稳定性验算要求',
        tags: ['勘探深度', '受力层']
      },
      {
        id: 'survey-06',
        title: '取样要求',
        clause: '9.4',
        content: '取样应符合下列规定：\n1. 取土试样间距：主要土层不少于6个\n2. 原状土试样质量等级：Ⅰ级不扰动\n3. 取样方法：软土宜用薄壁取土器，硬土宜用回转取土器',
        tags: ['取样', '原状土']
      },
      {
        id: 'survey-07',
        title: '地下水勘察',
        clause: '7.1',
        content: '地下水勘察应包括：\n1. 地下水类型、含水层分布\n2. 地下水位及其变化幅度\n3. 水文地质参数\n4. 水的腐蚀性评价',
        tags: ['地下水', '水位']
      }
    ]
  },

  'JGJ87': {
    code: 'JGJ/T 87-2012',
    name: '建筑工程地质勘探与取样技术规程',
    year: 2012,
    publisher: '住房和城乡建设部',
    scope: '适用于建筑工程地质勘探与取样',
    keyProvisions: [
      {
        id: 'survey-jgj87-01',
        title: '钻探方法选择',
        clause: '4.1',
        content: '钻探方法应根据地层条件选择：\n回转钻进：适用于黏性土、砂土\n冲击钻进：适用于碎石土、岩石\n振动钻进：适用于松散砂土',
        tags: ['钻探', '方法']
      },
      {
        id: 'survey-jgj87-02',
        title: '标准贯入试验',
        clause: '6.2',
        content: '标准贯入试验要求：\n1. 落锤质量：63.5kg\n2. 落距：76cm\n3. 贯入深度：先打入15cm不计数，后记录打入30cm的锤击数N',
        formula: 'N63.5 = 记录值',
        tags: ['标贯', '试验']
      }
    ]
  },

  'GBT50218': {
    code: 'GB/T 50218-2014',
    name: '工程岩体分级标准',
    year: 2014,
    publisher: '住房和城乡建设部',
    scope: '适用于工程岩体分级',
    keyProvisions: [
      {
        id: 'survey-gbt50218-01',
        title: '岩体基本质量分级',
        clause: '4.1',
        content: '岩体基本质量指标BQ计算：\nBQ = 90 + 3Rc + 250Kv\n其中：Rc为岩石饱和单轴抗压强度，Kv为岩体完整性指数',
        formula: 'BQ = 90 + 3Rc + 250Kv',
        tags: ['岩体分级', 'BQ']
      },
      {
        id: 'survey-gbt50218-02',
        title: '岩体完整程度',
        clause: '3.2',
        content: '岩体完整程度划分：\n完整：Kv > 0.75\n较完整：0.55 < Kv ≤ 0.75\n较破碎：0.35 < Kv ≤ 0.55\n破碎：0.15 < Kv ≤ 0.35\n极破碎：Kv ≤ 0.15',
        tags: ['完整性', 'Kv']
      }
    ]
  },

  'GBT50123': {
    code: 'GB/T 50123-2019',
    name: '土工试验方法标准',
    year: 2019,
    publisher: '住房和城乡建设部',
    scope: '适用于土工试验',
    keyProvisions: [
      {
        id: 'survey-gbt50123-01',
        title: '含水量试验',
        clause: '5.1',
        content: '含水量计算公式：\nw = (m1-m2)/(m2-m0) × 100%\n其中：m0为盒质量，m1为盒+湿土质量，m2为盒+干土质量',
        formula: 'w = (m1-m2)/(m2-m0) × 100%',
        tags: ['含水量', '试验']
      },
      {
        id: 'survey-gbt50123-02',
        title: '密度试验',
        clause: '6.1',
        content: '密度计算公式：\nρ = m/V\n其中：m为土样质量，V为土样体积',
        formula: 'ρ = m/V',
        tags: ['密度', '试验']
      },
      {
        id: 'survey-gbt50123-03',
        title: '液塑限试验',
        clause: '8.1',
        content: '塑性指数计算：\nIp = wL - wP\n其中：wL为液限，wP为塑限',
        formula: 'Ip = wL - wP',
        tags: ['液限', '塑限', '塑性指数']
      },
      {
        id: 'survey-gbt50123-04',
        title: '压缩试验',
        clause: '10.1',
        content: '压缩系数计算：\na = (e1-e2)/(p2-p1)\n其中：e1、e2分别为p1、p2压力下的孔隙比',
        formula: 'a = (e1-e2)/(p2-p1)',
        tags: ['压缩', '压缩系数']
      },
      {
        id: 'survey-gbt50123-05',
        title: '直接剪切试验',
        clause: '12.1',
        content: '抗剪强度参数：\nτ = σtanφ + c\n其中：σ为法向应力，φ为内摩擦角，c为黏聚力',
        formula: 'τ = σtanφ + c',
        tags: ['剪切', '抗剪强度']
      }
    ]
  }
};
