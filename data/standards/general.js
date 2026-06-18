/**
 * 通用规范数据
 * 来源：ima知识库 "07-通用规范" 文件夹（9个文件）
 */
module.exports = {
  'GB55001': {
    code: 'GB 55001-2021',
    name: '工程结构通用规范',
    year: 2021,
    publisher: '住房和城乡建设部',
    scope: '全文强制性规范，适用于工程结构设计',
    keyProvisions: [
      { id: 'gen-01', title: '设计使用年限', clause: '2.1', content: '临时结构：5年\n普通结构：50年\n标志性结构：100年\n特别重要结构：100年以上', tags: ['使用年限'] },
      { id: 'gen-02', title: '安全等级', clause: '3.1', content: '一级：破坏后果很严重\n二级：破坏后果严重\n三级：破坏后果不严重', tags: ['安全等级'] },
      { id: 'gen-03', title: '荷载组合', clause: '4.1', content: '承载能力极限状态：γG·SGk + γQ·SQk\n正常使用极限状态：SGk + SQk', tags: ['荷载组合'] }
    ]
  },

  'GB55003': {
    code: 'GB 55003-2021',
    name: '建筑与市政地基基础通用规范',
    year: 2021,
    publisher: '住房和城乡建设部',
    scope: '全文强制性规范，适用于建筑与市政地基基础',
    keyProvisions: [
      { id: 'gen-gb55003-01', title: '地基承载力', clause: '2.1', content: '地基承载力应通过载荷试验或其他原位测试确定', tags: ['承载力'] },
      { id: 'gen-gb55003-02', title: '变形控制', clause: '3.1', content: '地基变形应满足建筑物使用要求', tags: ['变形'] },
      { id: 'gen-gb55003-03', title: '稳定性', clause: '4.1', content: '地基应满足稳定性要求', tags: ['稳定性'] }
    ]
  },

  'GB55008': {
    code: 'GB 55008-2021',
    name: '混凝土结构通用规范',
    year: 2021,
    publisher: '住房和城乡建设部',
    scope: '全文强制性规范，适用于混凝土结构',
    keyProvisions: [
      { id: 'gen-gb55008-01', title: '混凝土强度', clause: '2.1', content: '最低强度等级：C15\n基础：C25\n主体结构：C30', tags: ['混凝土', '强度'] },
      { id: 'gen-gb55008-02', title: '钢筋保护层', clause: '3.1', content: '基础：40mm\n柱：30mm\n梁：25mm\n板：15mm', tags: ['保护层'] }
    ]
  },

  'GB55021': {
    code: 'GB 55021-2021',
    name: '既有建筑鉴定与加固通用规范',
    year: 2021,
    publisher: '住房和城乡建设部',
    scope: '全文强制性规范，适用于既有建筑鉴定与加固',
    keyProvisions: [
      { id: 'gen-gb55021-01', title: '鉴定内容', clause: '2.1', content: '安全性鉴定\n正常使用性鉴定\n抗震鉴定', tags: ['鉴定'] },
      { id: 'gen-gb55021-02', title: '加固方法', clause: '3.1', content: '增大截面加固\n粘贴钢板加固\n粘贴碳纤维加固\n预应力加固', tags: ['加固'] }
    ]
  },

  'GB50153': {
    code: 'GB 50153-2008',
    name: '工程结构可靠性设计统一标准',
    year: 2008,
    publisher: '住房和城乡建设部',
    scope: '适用于工程结构可靠性设计',
    keyProvisions: [
      { id: 'gen-gb50153-01', title: '可靠性指标', clause: '3.1', content: '一级：β≥3.7\n二级：β≥3.2\n三级：β≥2.7', tags: ['可靠性'] },
      { id: 'gen-gb50153-02', title: '极限状态', clause: '4.1', content: '承载能力极限状态\n正常使用极限状态', tags: ['极限状态'] }
    ]
  },

  'GB55018': {
    code: 'GB 55018-2021',
    name: '工程测量通用规范',
    year: 2021,
    publisher: '住房和城乡建设部',
    scope: '全文强制性规范，适用于工程测量',
    keyProvisions: [
      { id: 'gen-gb55018-01', title: '测量精度', clause: '2.1', content: '平面精度：±10mm~±50mm\n高程精度：±5mm~±20mm', tags: ['测量', '精度'] }
    ]
  }
};
