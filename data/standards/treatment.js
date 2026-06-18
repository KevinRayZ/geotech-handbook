/**
 * 地基处理类规范数据
 */
module.exports = {
  'JGJ79': {
    code: 'JGJ 79-2012',
    name: '建筑地基处理技术规范',
    year: 2012,
    publisher: '住房和城乡建设部',
    scope: '适用于建筑地基处理设计与施工',
    keyProvisions: [
      { id: 'treat-01', title: '复合地基承载力', clause: '7.2', content: '复合地基承载力特征值应通过复合地基载荷试验确定', formula: 'fspk = m·Ra/Ap + β·(1-m)·fsk', tags: ['复合地基', '承载力'] },
      { id: 'treat-02', title: '面积置换率', clause: '7.3', content: '面积置换率：m = Ap/A\nAp：桩截面积\nA：单桩处理面积', formula: 'm = Ap/A', tags: ['置换率', '面积'] },
      { id: 'treat-03', title: 'CFG桩', clause: '8.1', content: 'CFG桩：水泥粉煤灰碎石桩\n桩径：350~600mm\n桩长：5~25m\n桩身强度：C15~C25', tags: ['CFG桩', '设计'] },
      { id: 'treat-04', title: '水泥土搅拌桩', clause: '9.1', content: '搅拌桩直径：500~700mm\n水泥掺入量：12%~20%\n桩长：≤20m', tags: ['搅拌桩', '水泥土'] },
      { id: 'treat-05', title: '强夯法', clause: '10.1', content: '有效加固深度：H = α·√(M·h/10)\nM：锤重(t)\nh：落距(m)\nα：系数（0.3~0.8）', formula: 'H = α·√(M·h/10)', tags: ['强夯', '加固深度'] },
      { id: 'treat-06', title: '换填垫层法', clause: '6.1', content: '垫层厚度：1~3m\n垫层材料：砂石、灰土、碎石\n压实系数：≥0.95', tags: ['换填', '垫层'] },
      { id: 'treat-07', title: '排水固结法', clause: '11.1', content: '堆载预压：荷载≥设计荷载\n真空预压：真空度≥80kPa\n固结度：U = 1 - e^(-8Th/Cv)', formula: 'U = 1 - e^(-8Th/Cv)', tags: ['排水固结', '预压'] },
      { id: 'treat-08', title: '碎石桩', clause: '12.1', content: '桩径：500~800mm\n桩间距：1.5~3.0m\n桩长：5~15m', tags: ['碎石桩', '设计'] },
      { id: 'treat-09', title: '灰土挤密桩', clause: '13.1', content: '桩径：300~450mm\n桩间距：2~3倍桩径\n桩长：5~15m', tags: ['灰土桩', '挤密'] },
      { id: 'treat-10', title: '单桩承载力', clause: '7.4', content: '单桩承载力特征值：\nRa = up·Σqsia·li + qpa·Ap\n或 Ra = η·fcu·Ap（取小值）', formula: 'Ra = up·Σqsia·li + qpa·Ap', tags: ['承载力', '单桩'] },
      { id: 'treat-11', title: '桩土应力比', clause: '7.5', content: '桩土应力比：n = σp/σs\n一般取2~5', formula: 'n = σp/σs', tags: ['应力比', '桩土'] },
      { id: 'treat-12', title: '复合地基沉降', clause: '7.6', content: '复合地基沉降：s = ψsp·Σ(Δspi)\nψsp：沉降计算经验系数', formula: 's = ψsp·Σ(Δspi)', tags: ['沉降', '复合地基'] },
      { id: 'treat-13', title: '褥垫层', clause: '7.7', content: '褥垫层厚度：150~300mm\n材料：中砂、粗砂、碎石\n作用：协调桩土变形', tags: ['褥垫层', '复合地基'] },
      { id: 'treat-14', title: '检测要求', clause: '14.1', content: '复合地基载荷试验：不少于3点\n单桩静载试验：不少于3根\n桩身完整性：低应变法10%~20%', tags: ['检测', '复合地基'] }
    ]
  }
};
