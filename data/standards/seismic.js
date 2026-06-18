/**
 * 抗震类规范数据
 */
module.exports = {
  'GB50011_seismic': {
    code: 'GB 50011-2010',
    name: '建筑抗震设计规范',
    year: 2010,
    publisher: '住房和城乡建设部',
    scope: '适用于建筑抗震设计',
    keyProvisions: [
      { id: 'seismic-01', title: '抗震设防目标', clause: '1.0', content: '三水准目标：\n小震不坏（50年超越概率63%）\n中震可修（50年超越概率10%）\n大震不倒（50年超越概率2%）', tags: ['抗震', '设防'] },
      { id: 'seismic-02', title: '场地类别', clause: '4.1', content: '场地类别划分：\nⅠ类：坚硬土\nⅡ类：中硬土\nⅢ类：中软土\nⅣ类：软弱土', tags: ['场地类别', '抗震'] },
      { id: 'seismic-03', title: '地基基础抗震', clause: '4.2', content: '地基基础抗震措施：\n1. 选择有利场地\n2. 加强基础整体性\n3. 地基处理消除液化', tags: ['地基', '抗震'] }
    ]
  }
};
