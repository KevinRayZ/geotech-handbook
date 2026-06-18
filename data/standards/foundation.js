/**
 * 地基基础类规范数据（扩充版）
 * 来源：ima知识库 "04-地基基础" 文件夹（14个文件）
 */
module.exports = {
  'GB50007': {
    code: 'GB 50007-2011',
    name: '建筑地基基础设计规范',
    year: 2011,
    publisher: '住房和城乡建设部',
    scope: '适用于工业与民用建筑的地基基础设计',
    keyProvisions: [
      { id: 'found-01', title: '设计等级', clause: '3.0.1', content: '甲级：重要建筑，30层以上高层\n乙级：除甲级、丙级以外\n丙级：七层以下民用建筑', tags: ['设计等级'] },
      { id: 'found-02', title: '承载力特征值', clause: '5.2.3', content: 'fa = fak + ηb·γ·(b-3) + ηd·γm·(d-0.5)\nfak：承载力特征值\nb：基础宽度\nd：基础埋深', formula: 'fa = fak + ηb·γ·(b-3) + ηd·γm·(d-0.5)', tags: ['承载力', '修正'] },
      { id: 'found-03', title: '宽度修正系数', clause: '5.2.4', content: '砂土：ηb=0.3~1.2\n粉土：ηb=0.5\n黏性土：ηb=0\n淤泥：ηb=0', tags: ['修正系数'] },
      { id: 'found-04', title: '埋深修正系数', clause: '5.2.4', content: '砂土：ηd=1.0~2.0\n粉土：ηd=1.5\n黏性土：ηd=1.0~1.6', tags: ['修正系数'] },
      { id: 'found-05', title: '沉降计算', clause: '5.3.5', content: 's = ψs·Σ(Δσi·hi/Esi)\nψs：沉降计算经验系数\nΔσi：附加应力\nhi：土层厚度\nEsi：压缩模量', formula: 's = ψs·Σ(Δσi·hi/Esi)', tags: ['沉降'] },
      { id: 'found-06', title: '变形允许值', clause: '5.3.4', content: '砌体承重：局部倾斜0.002\n框架结构：柱基沉降差0.002L\n高耸结构：倾斜0.004~0.008', tags: ['变形', '允许值'] },
      { id: 'found-07', title: '扩展基础', clause: '8.1.1', content: '混凝土基础：宽高比1:1.00\n毛石混凝土：宽高比1:1.25\n砖基础：宽高比1:1.50', tags: ['扩展基础'] },
      { id: 'found-08', title: '桩基承载力', clause: '8.5.5', content: 'Ra = qpa·Ap + up·Σqsia·li\nqpa：桩端阻力\nAp：桩截面积\nup：桩周长\nqsia：桩侧阻力', formula: 'Ra = qpa·Ap + up·Σqsia·li', tags: ['桩基', '承载力'] },
      { id: 'found-09', title: '桩间距', clause: '8.5.3', content: '非挤土桩：≥3d\n部分挤土桩：≥3.5d\n挤土桩：≥4d\nd：桩径', tags: ['桩间距'] },
      { id: 'found-10', title: '桩基沉降', clause: '8.5.13', content: '采用等效作用分层总和法\ns = ψ·ψe·s\'', tags: ['桩基', '沉降'] },
      { id: 'found-11', title: '软弱下卧层验算', clause: '5.2.7', content: 'pz + pcz ≤ faz\npz：软弱下卧层顶面附加应力\npcz：自重应力\nfaz：软弱下卧层承载力', formula: 'pz + pcz ≤ faz', tags: ['软弱下卧层'] },
      { id: 'found-12', title: '抗滑移稳定性', clause: '8.2', content: 'Fs = 抗滑力/滑动力 ≥ 1.3', formula: 'Fs ≥ 1.3', tags: ['抗滑移'] },
      { id: 'found-13', title: '抗倾覆稳定性', clause: '8.2', content: 'Fs = 抗倾覆力矩/倾覆力矩 ≥ 1.5', formula: 'Fs ≥ 1.5', tags: ['抗倾覆'] }
    ]
  },

  'JGJ94': {
    code: 'JGJ 94-2008',
    name: '建筑桩基技术规范',
    year: 2008,
    publisher: '住房和城乡建设部',
    scope: '适用于建筑桩基的设计与施工',
    keyProvisions: [
      { id: 'found-jgj94-01', title: '桩基设计等级', clause: '3.1.2', content: '甲级：重要建筑，30层以上\n乙级：一般工业与民用建筑\n丙级：七层以下建筑', tags: ['设计等级'] },
      { id: 'found-jgj94-02', title: '单桩承载力', clause: '5.2.2', content: 'Ra = Quk/2\nQuk：单桩竖向极限承载力标准值\nK=2：安全系数', formula: 'Ra = Quk/2', tags: ['承载力'] },
      { id: 'found-jgj94-03', title: '桩侧阻力', clause: '5.3.5', content: 'qsia按土的物理指标查表取值', tags: ['侧阻力'] },
      { id: 'found-jgj94-04', title: '桩端阻力', clause: '5.3.6', content: 'qpa按土的物理指标查表取值', tags: ['端阻力'] },
      { id: 'found-jgj94-05', title: '桩间距', clause: '3.3.3', content: '非挤土桩：3d\n部分挤土桩：3.5d\n挤土桩：4d', tags: ['桩间距'] },
      { id: 'found-jgj94-06', title: '桩基沉降', clause: '5.5', content: '等效作用分层总和法\ns = ψ·ψe·Σ(σzi·Δhi/Esi)', formula: 's = ψ·ψe·Σ(σzi·Δhi/Esi)', tags: ['沉降'] },
      { id: 'found-jgj94-07', title: '桩身强度', clause: '5.8', content: 'N ≤ fc·Ap\nN：桩顶轴向压力设计值\nfc：混凝土轴心抗压强度\nAp：桩截面积', formula: 'N ≤ fc·Ap', tags: ['桩身强度'] },
      { id: 'found-jgj94-08', title: '承台设计', clause: '5.9', content: '承台厚度：≥300mm\n承台配筋率：≥0.15%', tags: ['承台'] }
    ]
  },

  'GB50009': {
    code: 'GB 50009-2012',
    name: '建筑结构荷载规范',
    year: 2012,
    publisher: '住房和城乡建设部',
    scope: '适用于建筑结构的荷载确定',
    keyProvisions: [
      { id: 'found-gb50009-01', title: '荷载分类', clause: '3.1', content: '永久荷载：结构自重、土压力\n可变荷载：楼面活荷载、风荷载\n偶然荷载：地震、爆炸', tags: ['荷载'] },
      { id: 'found-gb50009-02', title: '荷载组合', clause: '3.2', content: '基本组合：S = γG·SGk + γQ1·SQ1k\nγG=1.2（永久荷载）\nγQ=1.4（可变荷载）', formula: 'S = γG·SGk + γQ1·SQ1k', tags: ['荷载组合'] },
      { id: 'found-gb50009-03', title: '土压力荷载', clause: '4.6', content: '主动土压力分项系数：γQ=1.4\n被动土压力分项系数：γG=1.0（有利时0.9）', tags: ['土压力'] },
      { id: 'found-gb50009-04', title: '楼面活荷载', clause: '4.2', content: '住宅：2.0kN/m²\n办公室：2.0kN/m²\n教室：2.5kN/m²\n商店：3.5kN/m²', tags: ['活荷载'] }
    ]
  },

  'JGJ123': {
    code: 'JGJ 123-2012',
    name: '既有建筑地基基础加固技术规范',
    year: 2012,
    publisher: '住房和城乡建设部',
    scope: '适用于既有建筑地基基础加固',
    keyProvisions: [
      { id: 'found-jgj123-01', title: '加固方法', clause: '4.1', content: '基础加宽\n基础加深\n桩式托换\n注浆加固', tags: ['加固'] },
      { id: 'found-jgj123-02', title: '加固设计', clause: '5.1', content: '加固后承载力应满足要求\n变形应控制在允许范围内', tags: ['加固设计'] }
    ]
  },

  'JGJ106': {
    code: 'JGJ 106-2014',
    name: '建筑基桩检测技术规范',
    year: 2014,
    publisher: '住房和城乡建设部',
    scope: '适用于建筑基桩检测',
    keyProvisions: [
      { id: 'found-jgj106-01', title: '静载试验', clause: '4.1', content: '抽检数量：不少于3根\n加载方式：慢速维持荷载法\n沉降标准：s≥40mm或s/d≥0.06', tags: ['静载试验'] },
      { id: 'found-jgj106-02', title: '高应变法', clause: '5.1', content: '抽检数量：5%~10%且不少于5根\n适用：桩身完整性+承载力', tags: ['高应变'] },
      { id: 'found-jgj106-03', title: '低应变法', clause: '6.1', content: '抽检数量：20%~30%且不少于20根\n适用：桩身完整性', tags: ['低应变'] }
    ]
  }
};
