/**
 * 勘察类规范数据（扩充版）
 * 来源：ima知识库 "05-勘察规范" 文件夹（15个文件）
 */
module.exports = {
  'GB50021': {
    code: 'GB 50021-2001',
    name: '岩土工程勘察规范',
    year: 2001,
    publisher: '住房和城乡建设部',
    scope: '适用于各类建设工程的岩土工程勘察',
    keyProvisions: [
      { id: 'survey-01', title: '岩土工程勘察等级', clause: '3.1', content: '甲级：工程重要性、场地复杂程度、地基复杂程度有一项为一级\n乙级：除甲级和丙级以外\n丙级：三项均为三级', tags: ['勘察等级'] },
      { id: 'survey-02', title: '工程重要性等级', clause: '3.1.1', content: '一级：重要工程，破坏后果很严重\n二级：一般工程，破坏后果严重\n三级：次要工程，破坏后果不严重', tags: ['重要性等级'] },
      { id: 'survey-03', title: '场地复杂程度', clause: '3.1.2', content: '一级（复杂）：抗震危险地段，不良地质强烈发育\n二级（中等）：抗震不利地段，不良地质一般发育\n三级（简单）：抗震有利地段，不良地质不发育', tags: ['场地等级'] },
      { id: 'survey-04', title: '勘探点间距', clause: '4.1', content: '甲级：15~30m\n乙级：30~50m\n丙级：50~80m', tags: ['勘探点', '间距'] },
      { id: 'survey-05', title: '勘探深度', clause: '4.2', content: '1. 控制地基主要受力层\n2. 满足地基变形计算深度\n3. 满足稳定性验算要求', tags: ['勘探深度'] },
      { id: 'survey-06', title: '取样要求', clause: '9.4', content: '主要土层取样不少于6个\n原状土试样质量等级：Ⅰ级不扰动\n软土用薄壁取土器，硬土用回转取土器', tags: ['取样'] },
      { id: 'survey-07', title: '地下水勘察', clause: '7.1', content: '地下水类型、含水层分布\n地下水位及其变化幅度\n水文地质参数\n水的腐蚀性评价', tags: ['地下水'] },
      { id: 'survey-08', title: '岩石坚硬程度', clause: '3.2', content: '坚硬岩：fr>60MPa\n较硬岩：30<fr≤60MPa\n较软岩：15<fr≤30MPa\n软岩：5<fr≤15MPa\n极软岩：fr≤5MPa', formula: 'fr：饱和单轴抗压强度', tags: ['岩石', '分类'] },
      { id: 'survey-09', title: '岩体完整程度', clause: '3.3', content: '完整：Kv>0.75\n较完整：0.55<Kv≤0.75\n较破碎：0.35<Kv≤0.55\n破碎：0.15<Kv≤0.35\n极破碎：Kv≤0.15', formula: 'Kv：完整性指数', tags: ['岩体', '完整性'] },
      { id: 'survey-10', title: '土的分类', clause: '3.4', content: '碎石土：粒径>2mm超过50%\n砂土：粒径>0.075mm超过50%\n粉土：Ip≤10，粒径>0.075mm≤50%\n粉质黏土：10<Ip≤17\n黏土：Ip>17', tags: ['土', '分类'] },
      { id: 'survey-11', title: '标贯试验', clause: '10.1', content: '落锤质量：63.5kg\n落距：76cm\n先打入15cm不计数\n记录打入30cm锤击数N', tags: ['标贯', '试验'] },
      { id: 'survey-12', title: '勘察报告内容', clause: '14.1', content: '1. 工程概况\n2. 勘察方法\n3. 地层描述\n4. 地下水条件\n5. 岩土参数\n6. 地基评价\n7. 结论与建议', tags: ['勘察报告'] }
    ]
  },

  'JGJ87': {
    code: 'JGJ/T 87-2012',
    name: '建筑工程地质勘探与取样技术规程',
    year: 2012,
    publisher: '住房和城乡建设部',
    scope: '适用于建筑工程地质勘探与取样',
    keyProvisions: [
      { id: 'survey-jgj87-01', title: '钻探方法选择', clause: '4.1', content: '回转钻进：黏性土、砂土\n冲击钻进：碎石土、岩石\n振动钻进：松散砂土', tags: ['钻探'] },
      { id: 'survey-jgj87-02', title: '取土器类型', clause: '6.1', content: '薄壁取土器：软土、淤泥\n厚壁取土器：一般黏性土\n回转取土器：硬土、岩石', tags: ['取土器'] },
      { id: 'survey-jgj87-03', title: '取样质量等级', clause: '6.2', content: 'Ⅰ级：不扰动，室内土工试验\nⅡ级：轻微扰动，强度试验\nⅢ级：显著扰动，仅定名分类', tags: ['取样', '质量'] }
    ]
  },

  'GBT50218': {
    code: 'GB/T 50218-2014',
    name: '工程岩体分级标准',
    year: 2014,
    publisher: '住房和城乡建设部',
    scope: '适用于工程岩体分级',
    keyProvisions: [
      { id: 'survey-gbt50218-01', title: '岩体基本质量指标', clause: '4.1', content: 'BQ = 90 + 3Rc + 250Kv\nRc：岩石饱和单轴抗压强度\nKv：岩体完整性指数', formula: 'BQ = 90 + 3Rc + 250Kv', tags: ['BQ', '岩体分级'] },
      { id: 'survey-gbt50218-02', title: '岩体质量等级', clause: '4.2', content: 'Ⅰ级（极坚硬完整）：BQ>550\nⅡ级（坚硬完整）：450<BQ≤550\nⅢ级（中等）：350<BQ≤450\nⅣ级（较软破碎）：250<BQ≤350\nⅤ级（极软极破碎）：BQ≤250', tags: ['岩体', '等级'] }
    ]
  },

  'GBT50123': {
    code: 'GB/T 50123-2019',
    name: '土工试验方法标准',
    year: 2019,
    publisher: '住房和城乡建设部',
    scope: '适用于土工试验',
    keyProvisions: [
      { id: 'survey-gbt50123-01', title: '含水量', clause: '5.1', content: 'w = (m1-m2)/(m2-m0) × 100%\nm0：盒质量\nm1：盒+湿土\nm2：盒+干土', formula: 'w = (m1-m2)/(m2-m0) × 100%', tags: ['含水量'] },
      { id: 'survey-gbt50123-02', title: '密度', clause: '6.1', content: 'ρ = m/V\nm：土样质量\nV：土样体积', formula: 'ρ = m/V', tags: ['密度'] },
      { id: 'survey-gbt50123-03', title: '塑性指数', clause: '8.1', content: 'Ip = wL - wP\nwL：液限\nwP：塑限', formula: 'Ip = wL - wP', tags: ['塑性指数'] },
      { id: 'survey-gbt50123-04', title: '压缩系数', clause: '10.1', content: 'a = (e1-e2)/(p2-p1)\ne1、e2：p1、p2压力下的孔隙比', formula: 'a = (e1-e2)/(p2-p1)', tags: ['压缩系数'] },
      { id: 'survey-gbt50123-05', title: '抗剪强度', clause: '12.1', content: 'τ = σtanφ + c\nσ：法向应力\nφ：内摩擦角\nc：黏聚力', formula: 'τ = σtanφ + c', tags: ['抗剪强度'] },
      { id: 'survey-gbt50123-06', title: '压缩模量', clause: '10.2', content: 'Es = (1+e1)/a\ne1：初始孔隙比\na：压缩系数', formula: 'Es = (1+e1)/a', tags: ['压缩模量'] },
      { id: 'survey-gbt50123-07', title: '孔隙比', clause: '7.1', content: 'e = (Gs·ρw/ρd) - 1\nGs：土粒比重\nρw：水密度\nρd：干密度', formula: 'e = (Gs·ρw/ρd) - 1', tags: ['孔隙比'] },
      { id: 'survey-gbt50123-08', title: '饱和度', clause: '7.2', content: 'Sr = w·Gs/e\nw：含水量\nGs：土粒比重\ne：孔隙比', formula: 'Sr = w·Gs/e', tags: ['饱和度'] }
    ]
  },

  'GB50307': {
    code: 'GB 50307-2012',
    name: '城市轨道交通岩土工程勘察规范',
    year: 2012,
    publisher: '住房和城乡建设部',
    scope: '适用于城市轨道交通岩土工程勘察',
    keyProvisions: [
      { id: 'survey-gb50307-01', title: '勘察等级', clause: '3.1', content: '甲级：地下车站、穿越重要建筑物\n乙级：一般区间隧道\n丙级：地面线路', tags: ['勘察等级', '轨道交通'] },
      { id: 'survey-gb50307-02', title: '勘探点间距', clause: '4.1', content: '车站：15~25m\n区间隧道：25~50m\n联络通道：每个通道1~2个孔', tags: ['勘探点', '轨道交通'] }
    ]
  }
};
