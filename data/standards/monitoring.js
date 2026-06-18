/**
 * 监测检测类规范数据
 */
module.exports = {
  'GB50497': {
    code: 'GB 50497-2019',
    name: '建筑基坑工程监测技术标准',
    year: 2019,
    publisher: '住房和城乡建设部',
    scope: '适用于建筑基坑工程监测',
    keyProvisions: [
      { id: 'monitor-01', title: '监测项目', clause: '4.1', content: '应测项：支护结构水平位移、周边建筑沉降\n选测项：支撑轴力、锚杆拉力、地下水位', tags: ['监测项目'] },
      { id: 'monitor-02', title: '监测频率', clause: '7.1', content: '开挖期间：1次/天\n底板浇筑后：1次/2~3天\n回填后：1次/周', tags: ['监测频率'] },
      { id: 'monitor-03', title: '报警值', clause: '8.1', content: '报警值取设计允许值的70%~80%\n位移速率：≥3mm/天', tags: ['报警值', '监测'] },
      { id: 'monitor-04', title: '监测点布置', clause: '5.1', content: '水平位移：间距20~50m\n沉降观测：间距15~30m\n深层位移：间距30~50m', tags: ['监测点', '布置'] },
      { id: 'monitor-05', title: '巡视检查', clause: '6.1', content: '巡视内容：\n1. 支护结构变形\n2. 周边建筑裂缝\n3. 地下水位变化\n4. 施工工况', tags: ['巡视', '检查'] }
    ]
  },

  'JGJ340': {
    code: 'JGJ 340-2015',
    name: '建筑地基检测技术规范',
    year: 2015,
    publisher: '住房和城乡建设部',
    scope: '适用于建筑地基检测',
    keyProvisions: [
      { id: 'monitor-jgj340-01', title: '载荷试验', clause: '4.1', content: '地基承载力载荷试验：\n压板面积：≥0.5m²\n加载级数：≥8级\n沉降标准：s/b≥0.06', tags: ['载荷试验', '承载力'] },
      { id: 'monitor-jgj340-02', title: '标准贯入试验', clause: '5.1', content: '标贯试验要求：\n落锤质量：63.5kg\n落距：76cm\n记录30cm锤击数', tags: ['标贯', '试验'] },
      { id: 'monitor-jgj340-03', title: '静力触探试验', clause: '6.1', content: '静力触探：\n锥头阻力：qc\n侧壁摩阻力：fs\n摩阻比：Rf = fs/qc×100%', formula: 'Rf = fs/qc×100%', tags: ['静力触探', '试验'] },
      { id: 'monitor-jgj340-04', title: '桩基检测', clause: '8.1', content: '单桩静载试验：不少于3根\n高应变法：抽检5%~10%\n低应变法：抽检20%~30%', tags: ['桩基', '检测'] }
    ]
  }
};
