/**
 * 特殊土类规范数据
 */
module.exports = {
  'GB50025': {
    code: 'GB 50025-2018',
    name: '湿陷性黄土地区建筑标准',
    year: 2018,
    publisher: '住房和城乡建设部',
    scope: '适用于湿陷性黄土地区的建筑工程',
    keyProvisions: [
      { id: 'special-01', title: '湿陷性判定', clause: '4.1', content: '湿陷系数δs≥0.015 → 湿陷性黄土\n自重湿陷系数δzs≥0.015 → 自重湿陷性黄土', tags: ['湿陷性', '黄土'] },
      { id: 'special-02', title: '湿陷等级', clause: '4.2', content: 'Ⅰ级(轻微)：Δs≤300mm\nⅡ级(中等)：300<Δs≤600mm\nⅢ级(严重)：600<Δs≤900mm\nⅣ级(很严重)：Δs>900mm', tags: ['湿陷等级', '黄土'] },
      { id: 'special-03', title: '地基处理', clause: '6.1', content: '处理方法：\n1. 垫层法：≤3m\n2. 强夯法：3~12m\n3. 挤密法：5~15m\n4. 预浸水法：深层', tags: ['地基处理', '黄土'] },
      { id: 'special-04', title: '防水措施', clause: '7.1', content: '防水措施：\n1. 散水坡度≥5%\n2. 管道接口防渗\n3. 防止施工用水', tags: ['防水', '黄土'] }
    ]
  },

  'GB50112': {
    code: 'GB 50112-2013',
    name: '膨胀土地区建筑技术规范',
    year: 2013,
    publisher: '住房和城乡建设部',
    scope: '适用于膨胀土地区的建筑工程',
    keyProvisions: [
      { id: 'special-gb50112-01', title: '膨胀土判定', clause: '3.1', content: '自由膨胀率δef≥40% → 膨胀土\n膨胀潜势：弱(40%~65%)、中(65%~90%)、强(≥90%)', tags: ['膨胀土', '判定'] },
      { id: 'special-gb50112-02', title: '胀缩等级', clause: '3.2', content: 'Ⅰ级(轻微)：sc=15~35mm\nⅡ级(中等)：sc=35~70mm\nⅢ级(严重)：sc≥70mm', tags: ['胀缩等级', '膨胀土'] },
      { id: 'special-gb50112-03', title: '地基处理', clause: '5.1', content: '处理方法：\n1. 换填法\n2. 土性改良\n3. 桩基础\n4. 深基础', tags: ['地基处理', '膨胀土'] }
    ]
  },

  'GBT50942': {
    code: 'GB/T 50942-2014',
    name: '盐渍土地区建筑技术规范',
    year: 2014,
    publisher: '住房和城乡建设部',
    scope: '适用于盐渍土地区的建筑工程',
    keyProvisions: [
      { id: 'special-gbt50942-01', title: '盐渍土判定', clause: '3.1', content: '易溶盐含量≥0.3% → 盐渍土\n按含盐性质：氯盐、亚氯盐、亚硫酸盐、硫酸盐', tags: ['盐渍土', '判定'] },
      { id: 'special-gbt50942-02', title: '盐渍土分类', clause: '3.2', content: '按含盐量：\n弱盐渍土：0.3%~1%\n中盐渍土：1%~3%\n强盐渍土：3%~6%\n超盐渍土：>6%', tags: ['盐渍土', '分类'] }
    ]
  },

  'GB50011': {
    code: 'GB 50011-2010',
    name: '建筑抗震设计规范',
    year: 2010,
    publisher: '住房和城乡建设部',
    scope: '适用于建筑抗震设计',
    keyProvisions: [
      { id: 'special-gb50011-01', title: '液化判别', clause: '4.3', content: '液化判别：\n初步判别：黏粒含量、地下水位\n标贯判别：N63.5 < Ncr → 液化', tags: ['液化', '判别'] },
      { id: 'special-gb50011-02', title: '液化指数', clause: '4.4', content: '液化指数：IlE = Σ(1-Ni/Ncri)·di·wi\n轻微液化：IlE<5\n中等液化：5≤IlE≤15\n严重液化：IlE>15', formula: 'IlE = Σ(1-Ni/Ncri)·di·wi', tags: ['液化指数', '抗震'] },
      { id: 'special-gb50011-03', title: '地基处理', clause: '4.5', content: '液化地基处理：\n1. 强夯法\n2. 碎石桩\n3. 深层搅拌\n4. 桩基础穿越', tags: ['地基处理', '液化'] }
    ]
  }
};
