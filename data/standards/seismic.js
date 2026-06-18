/**
 * 抗震类规范数据（扩充版）
 * 来源：ima知识库 "06-抗震规范" 文件夹（5个文件）
 */
module.exports = {
  'GB50011': {
    code: 'GB 50011-2010',
    name: '建筑抗震设计规范',
    year: 2010,
    publisher: '住房和城乡建设部',
    scope: '适用于建筑抗震设计',
    keyProvisions: [
      { id: 'seismic-01', title: '三水准目标', clause: '1.0', content: '小震不坏（50年超越概率63%）\n中震可修（50年超越概率10%）\n大震不倒（50年超越概率2%）', tags: ['抗震', '设防'] },
      { id: 'seismic-02', title: '场地类别', clause: '4.1', content: 'Ⅰ类：坚硬土\nⅡ类：中硬土\nⅢ类：中软土\nⅣ类：软弱土', tags: ['场地类别'] },
      { id: 'seismic-03', title: '液化判别', clause: '4.3', content: '初步判别：黏粒含量、地下水位\n标贯判别：N63.5 < Ncr → 液化', tags: ['液化'] },
      { id: 'seismic-04', title: '液化指数', clause: '4.4', content: 'IlE = Σ(1-Ni/Ncri)·di·wi\n轻微：IlE<5\n中等：5≤IlE≤15\n严重：IlE>15', formula: 'IlE = Σ(1-Ni/Ncri)·di·wi', tags: ['液化指数'] },
      { id: 'seismic-05', title: '地基基础抗震', clause: '4.2', content: '选择有利场地\n加强基础整体性\n地基处理消除液化', tags: ['地基', '抗震'] },
      { id: 'seismic-06', title: '抗震措施', clause: '6.1', content: '设置圈梁和构造柱\n加强墙体连接\n提高结构整体性', tags: ['抗震措施'] }
    ]
  },

  'GB55002': {
    code: 'GB 55002-2021',
    name: '建筑与市政工程抗震通用规范',
    year: 2021,
    publisher: '住房和城乡建设部',
    scope: '全文强制性规范，适用于建筑与市政工程抗震',
    keyProvisions: [
      { id: 'seismic-gb55002-01', title: '抗震设防分类', clause: '2.1', content: '特殊设防类（甲类）\n重点设防类（乙类）\n标准设防类（丙类）\n适度设防类（丁类）', tags: ['设防分类'] },
      { id: 'seismic-gb55002-02', title: '地震动参数', clause: '3.1', content: '设计基本地震加速度：0.05g~0.40g\n设计地震分组：第一组、第二组、第三组', tags: ['地震动参数'] },
      { id: 'seismic-gb55002-03', title: '场地选择', clause: '4.1', content: '避开不利地段\n无法避开时采取加强措施', tags: ['场地选择'] }
    ]
  },

  'GB18306': {
    code: 'GB 18306-2015',
    name: '中国地震动参数区划图',
    year: 2015,
    publisher: '国家质量监督检验检疫总局',
    scope: '适用于一般建设工程的抗震设防',
    keyProvisions: [
      { id: 'seismic-gb18306-01', title: '地震动峰值加速度', clause: '4.1', content: '<0.05g：Ⅵ度以下\n0.05g：Ⅵ度\n0.10g：Ⅶ度\n0.15g：Ⅶ度\n0.20g：Ⅷ度\n0.30g：Ⅷ度\n0.40g：Ⅸ度', tags: ['地震动', '加速度'] },
      { id: 'seismic-gb18306-02', title: '特征周期', clause: '4.2', content: '按场地类别和设计地震分组确定\nⅠ类场地：0.20~0.45s\nⅡ类场地：0.25~0.65s\nⅢ类场地：0.30~0.85s\nⅣ类场地：0.35~1.10s', tags: ['特征周期'] }
    ]
  },

  'JTGB02': {
    code: 'JTG B02-2013',
    name: '公路工程抗震规范',
    year: 2013,
    publisher: '交通运输部',
    scope: '适用于公路工程抗震设计',
    keyProvisions: [
      { id: 'seismic-jtgb02-01', title: '抗震设防目标', clause: '1.0', content: 'A类：重要桥梁、隧道\nB类：一般桥梁、隧道\nC类：路基、挡墙', tags: ['公路', '抗震'] },
      { id: 'seismic-jtgb02-02', title: '路基抗震', clause: '5.1', content: '路基边坡抗震稳定性验算\n挡土墙抗震稳定性验算', tags: ['路基', '抗震'] }
    ]
  }
};
