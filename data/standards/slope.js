/**
 * 边坡工程类规范数据
 * 来源：ima知识库 "02-边坡规范" 文件夹
 */
module.exports = {
  'GB50330': {
    code: 'GB 50330-2013',
    name: '建筑边坡工程技术规范',
    year: 2013,
    publisher: '住房和城乡建设部',
    scope: '适用于建筑边坡工程的勘察、设计、施工、监测',
    keyProvisions: [
      { id: 'slope-01', title: '边坡安全等级', clause: '3.2', content: '一级：岩质≥30m，土质≥15m\n二级：岩质15~30m，土质10~15m\n三级：岩质<15m，土质<10m', tags: ['安全等级', '边坡'] },
      { id: 'slope-02', title: '安全系数-永久边坡', clause: '5.3', content: '一级Fs≥1.35，二级Fs≥1.30，三级Fs≥1.25', formula: '一级1.35，二级1.30，三级1.25', tags: ['安全系数', '永久边坡'] },
      { id: 'slope-03', title: '安全系数-临时边坡', clause: '5.3', content: '一级Fs≥1.25，二级Fs≥1.20，三级Fs≥1.15', formula: '一级1.25，二级1.20，三级1.15', tags: ['安全系数', '临时边坡'] },
      { id: 'slope-04', title: '稳定性分析方法', clause: '5.2', content: '圆弧滑动：简化Bishop法\n折线滑动：不平衡推力法\n平面滑动：平面滑动分析法', tags: ['稳定性', '分析方法'] },
      { id: 'slope-05', title: '支护结构选型', clause: '6.1', content: '重力式挡墙：≤8m\n悬臂式挡墙：≤6m\n锚杆挡墙：高度较大\n抗滑桩：滑坡治理', tags: ['支护选型', '挡墙'] },
      { id: 'slope-06', title: '边坡坡率', clause: '6.2', content: '土质边坡：1:1.0~1:1.75\n岩质边坡：1:0.3~1:1.0\n按岩土类型和风化程度确定', tags: ['坡率', '边坡'] },
      { id: 'slope-07', title: '锚杆设计', clause: '7.1', content: '锚杆倾角：15°~35°\n锚杆间距：1.5~3.0m\n锚固段长度：通过计算确定', formula: 'Nt = Ka·γ·H·s / cosα', tags: ['锚杆', '设计'] },
      { id: 'slope-08', title: '抗滑桩设计', clause: '8.1', content: '桩间距：2~5倍桩径\n嵌固深度：桩长的1/3~1/4\n桩截面：矩形或圆形', tags: ['抗滑桩', '设计'] },
      { id: 'slope-09', title: '排水设计', clause: '9.1', content: '地表排水：截水沟、排水沟\n地下排水：排水孔、排水盲沟\n排水孔间距：2~3m', tags: ['排水', '设计'] },
      { id: 'slope-10', title: '监测要求', clause: '10.1', content: '一级边坡：必须监测\n监测项目：位移、沉降、裂缝\n监测频率：施工期1次/天', tags: ['监测', '边坡'] },
      { id: 'slope-11', title: '边坡变形控制', clause: '5.4', content: '一级边坡：位移≤30mm\n二级边坡：位移≤50mm\n三级边坡：位移≤80mm', tags: ['变形', '控制'] },
      { id: 'slope-12', title: '土压力计算', clause: '5.5', content: '主动土压力：Ea = 0.5·Ka·γ·H²\n被动土压力：Ep = 0.5·Kp·γ·H²', formula: 'Ea = 0.5·Ka·γ·H²', tags: ['土压力', '计算'] }
    ]
  },

  'GB50843': {
    code: 'GB 50843-2013',
    name: '建筑边坡工程鉴定与加固技术规范',
    year: 2013,
    publisher: '住房和城乡建设部',
    scope: '适用于既有建筑边坡工程的鉴定与加固',
    keyProvisions: [
      { id: 'slope-gb50843-01', title: '鉴定等级', clause: '3.1', content: '根据边坡安全等级和损坏程度确定鉴定等级', tags: ['鉴定', '等级'] },
      { id: 'slope-gb50843-02', title: '加固方法', clause: '5.1', content: '加固方法：锚杆加固、挡墙加固、注浆加固、排水加固', tags: ['加固', '方法'] },
      { id: 'slope-gb50843-03', title: '加固设计', clause: '6.1', content: '加固后安全系数应满足规范要求', formula: 'Fs_加固后 ≥ Fs_要求', tags: ['加固', '设计'] }
    ]
  },

  'GB50086': {
    code: 'GB 50086-2015',
    name: '岩土锚杆与喷射混凝土支护工程技术规范',
    year: 2015,
    publisher: '住房和城乡建设部',
    scope: '适用于岩土锚杆与喷射混凝土支护工程',
    keyProvisions: [
      { id: 'slope-gb50086-01', title: '锚杆类型', clause: '3.1', content: '拉力型、压力型、荷载分散型', tags: ['锚杆', '类型'] },
      { id: 'slope-gb50086-02', title: '锚杆设计', clause: '5.1', content: '锚杆承载力：Nt = As·fyk/K\nAs：锚杆截面积\nfyk：钢材屈服强度\nK：安全系数（取1.6~2.0）', formula: 'Nt = As·fyk/K', tags: ['锚杆', '承载力'] },
      { id: 'slope-gb50086-03', title: '锚固长度', clause: '5.2', content: '锚固长度：La = Nt/(π·D·τ)\nD：锚杆孔径\nτ：锚固体与岩土界面粘结强度', formula: 'La = Nt/(π·D·τ)', tags: ['锚固', '长度'] },
      { id: 'slope-gb50086-04', title: '喷射混凝土', clause: '7.1', content: '喷射混凝土强度等级：C20~C30\n喷射厚度：50~150mm', tags: ['喷射混凝土', '强度'] }
    ]
  },

  'GBT38509': {
    code: 'GB/T 38509-2020',
    name: '滑坡防治设计规范',
    year: 2020,
    publisher: '国家市场监督管理总局',
    scope: '适用于滑坡防治工程设计',
    keyProvisions: [
      { id: 'slope-gbt38509-01', title: '滑坡分类', clause: '4.1', content: '按滑动面深度：浅层<6m，中层6~20m，深层>20m', tags: ['滑坡', '分类'] },
      { id: 'slope-gbt38509-02', title: '防治原则', clause: '5.1', content: '预防为主、综合治理\n治坡先治水\n因地制宜、经济合理', tags: ['防治', '原则'] },
      { id: 'slope-gbt38509-03', title: '抗滑桩设计', clause: '7.1', content: '桩间距：2~5倍桩径\n嵌固深度：桩长的1/3~1/4\n安全系数：Fs≥1.25', tags: ['抗滑桩', '设计'] },
      { id: 'slope-gbt38509-04', title: '排水设计', clause: '8.1', content: '地表排水：截水沟、排水沟\n地下排水：排水孔、排水盲沟、排水隧洞', tags: ['排水', '滑坡'] }
    ]
  },

  'JTGT3334': {
    code: 'JTG/T 3334-2018',
    name: '公路滑坡防治设计规范',
    year: 2018,
    publisher: '交通运输部',
    scope: '适用于公路滑坡防治工程设计',
    keyProvisions: [
      { id: 'slope-jtgt3334-01', title: '滑坡稳定性评价', clause: '5.1', content: '稳定系数Fs计算：\nFs = ΣR / ΣT\nR：抗滑力\nT：下滑力', formula: 'Fs = ΣR / ΣT', tags: ['稳定性', '评价'] },
      { id: 'slope-jtgt3334-02', title: '防治措施', clause: '6.1', content: '削坡减载、反压填土\n抗滑桩、锚索框架\n排水工程', tags: ['防治', '措施'] }
    ]
  },

  'DZT0219': {
    code: 'DZ/T 0219-2006',
    name: '滑坡防治工程设计与施工技术规范',
    year: 2006,
    publisher: '国土资源部',
    scope: '适用于滑坡防治工程设计与施工',
    keyProvisions: [
      { id: 'slope-dzt0219-01', title: '滑坡推力计算', clause: '5.1', content: '滑坡推力：Ti = Ti-1·ψ + K·Wi·sinαi - Wi·cosαi·tanφi - ci·li\nψ：传递系数\nK：安全系数', formula: 'Ti = Ti-1·ψ + K·Wi·sinαi - Wi·cosαi·tanφi - ci·li', tags: ['滑坡推力', '计算'] },
      { id: 'slope-dzt0219-02', title: '抗滑桩设计', clause: '6.1', content: '桩截面：矩形1.5×2.0m~2.5×3.5m\n桩间距：4~6m\n嵌固深度：桩长的1/3', tags: ['抗滑桩', '设计'] }
    ]
  }
};
