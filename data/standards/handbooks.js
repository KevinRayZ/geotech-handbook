/**
 * 综合手册数据
 * 来源：ima知识库 "01-综合手册" 文件夹（15个文件）
 * 
 * 这些是综合性工具书，包含大量工程经验和案例
 */
module.exports = {
  'HANDBOOK_GEOLOGY': {
    code: '工具书',
    name: '工程地质手册（第五版）',
    year: 2018,
    publisher: '中国建筑工业出版社',
    scope: '综合性工程地质工具书',
    keyProvisions: [
      { id: 'hb-geo-01', title: '岩石分类', chapter: '第一篇', content: '按成因分类：岩浆岩、沉积岩、变质岩\n按坚硬程度：坚硬岩、较硬岩、较软岩、软岩、极软岩', tags: ['岩石', '分类'] },
      { id: 'hb-geo-02', title: '土的分类', chapter: '第一篇', content: '碎石土：粒径>2mm超过50%\n砂土：粒径>0.075mm超过50%\n粉土：Ip≤10\n黏性土：Ip>10', tags: ['土', '分类'] },
      { id: 'hb-geo-03', title: '勘察方法', chapter: '第二篇', content: '钻探、坑探、物探\n原位测试：标贯、静探、十字板\n室内试验：土工试验、岩石试验', tags: ['勘察', '方法'] },
      { id: 'hb-geo-04', title: '地基承载力', chapter: '第四篇', content: '载荷试验确定\n理论公式计算\n经验查表法', tags: ['承载力'] },
      { id: 'hb-geo-05', title: '特殊性土', chapter: '第五篇', content: '湿陷性黄土、膨胀土、红黏土\n软土、冻土、盐渍土\n填土、混合土', tags: ['特殊土'] },
      { id: 'hb-geo-06', title: '不良地质', chapter: '第六篇', content: '滑坡、崩塌、泥石流\n岩溶、采空区\n地面沉降、地裂缝', tags: ['不良地质'] },
      { id: 'hb-geo-07', title: '地下水', chapter: '第九篇', content: '地下水类型、运动规律\n水文地质参数测定\n降水设计', tags: ['地下水'] }
    ]
  },

  'HANDBOOK_FOUNDATION': {
    code: '工具书',
    name: '地基处理手册（第三版）',
    year: 2008,
    publisher: '中国建筑工业出版社',
    scope: '地基处理综合性工具书',
    keyProvisions: [
      { id: 'hb-found-01', title: '复合地基理论', chapter: '第2章', content: '龚晓南复合地基理论体系\n桩土共同承担荷载\n广义复合地基概念', tags: ['复合地基'] },
      { id: 'hb-found-02', title: 'CFG桩', chapter: '第8章', content: '水泥粉煤灰碎石桩\n桩径350~600mm\n桩身强度C15~C25\n适用深度5~25m', tags: ['CFG桩'] },
      { id: 'hb-found-03', title: '水泥土搅拌桩', chapter: '第9章', content: '水泥掺入量12%~20%\n桩径500~700mm\n适用深度≤20m', tags: ['搅拌桩'] },
      { id: 'hb-found-04', title: '强夯法', chapter: '第10章', content: '有效加固深度：H = α·√(M·h/10)\n适用深度3~12m', formula: 'H = α·√(M·h/10)', tags: ['强夯'] },
      { id: 'hb-found-05', title: '排水固结法', chapter: '第11章', content: '堆载预压、真空预压\n适用软土地基处理', tags: ['排水固结'] }
    ]
  },

  'HANDBOOK_PIT': {
    code: '工具书',
    name: '基坑工程手册（第二版）',
    year: 2009,
    publisher: '中国建筑工业出版社',
    scope: '基坑工程综合性工具书',
    keyProvisions: [
      { id: 'hb-pit-01', title: '土压力计算', chapter: '第4章', content: '朗肯理论、库仑理论\n水土分算、水土合算\n经验系数法', tags: ['土压力'] },
      { id: 'hb-pit-02', title: '围护工法', chapter: '第8-15章', content: '排桩、地下连续墙\n土钉墙、水泥土墙\nSMW工法、钢板桩', tags: ['围护', '工法'] },
      { id: 'hb-pit-03', title: '支撑体系', chapter: '第16章', content: '内支撑：钢支撑、混凝土支撑\n锚杆：预应力锚杆\n环形支撑、对撑', tags: ['支撑'] },
      { id: 'hb-pit-04', title: '稳定性验算', chapter: '第5章', content: '抗隆起、抗倾覆\n抗滑移、抗管涌\n抗突涌', tags: ['稳定性'] },
      { id: 'hb-pit-05', title: '变形控制', chapter: '第7章', content: '墙体水平位移\n地表沉降\n坑底隆起\n时空效应', tags: ['变形'] },
      { id: 'hb-pit-06', title: '地下水控制', chapter: '第22章', content: '降水设计\n止水帷幕\n回灌措施', tags: ['地下水'] }
    ]
  },

  'HANDBOOK_DEEP_PIT': {
    code: '工具书',
    name: '深基坑工程设计施工手册',
    year: 1998,
    publisher: '中国建筑工业出版社',
    scope: '深基坑工程设计施工工具书',
    keyProvisions: [
      { id: 'hb-dpit-01', title: '围护结构体系', chapter: '第3-11章', content: '排桩、地连墙、SMW\n土钉墙、水泥土墙\n钢板桩、咬合桩', tags: ['围护'] },
      { id: 'hb-dpit-02', title: '地下水控制', chapter: '第12-16章', content: '止水帷幕\n降水设计\n回灌措施', tags: ['地下水'] },
      { id: 'hb-dpit-03', title: '监测技术', chapter: '第19章', content: '位移监测\n应力监测\n地下水监测\n周边环境监测', tags: ['监测'] }
    ]
  },

  'HANDBOOK_SLOPE': {
    code: '工具书',
    name: '边坡工程处治技术',
    year: null,
    publisher: null,
    scope: '边坡工程处治技术工具书',
    keyProvisions: [
      { id: 'hb-slope-01', title: '边坡分类', chapter: '第1章', content: '按岩性：岩质边坡、土质边坡\n按高度：高边坡、一般边坡\n按使用年限：永久边坡、临时边坡', tags: ['边坡', '分类'] },
      { id: 'hb-slope-02', title: '稳定性分析', chapter: '第3章', content: '圆弧滑动法\n折线滑动法\n平面滑动法', tags: ['稳定性'] },
      { id: 'hb-slope-03', title: '处治方法', chapter: '第5-8章', content: '抗滑桩\n锚杆（索）\n挡土墙\n喷锚支护\n排水工程', tags: ['处治'] }
    ]
  },

  'HANDBOOK_RETAINING_WALL': {
    code: '工具书',
    name: '挡土墙设计实用手册',
    year: 2008,
    publisher: '中国建筑工业出版社',
    scope: '挡土墙设计工具书',
    keyProvisions: [
      { id: 'hb-wall-01', title: '挡土墙类型', chapter: '第1章', content: '重力式：依靠自重维持稳定\n悬臂式：钢筋混凝土结构\n扶壁式：高挡墙\n锚杆式：岩质边坡', tags: ['挡土墙', '类型'] },
      { id: 'hb-wall-02', title: '土压力计算', chapter: '第2章', content: '朗肯理论\n库仑理论\n经验公式', tags: ['土压力'] },
      { id: 'hb-wall-03', title: '稳定性验算', chapter: '第4章', content: '抗滑移：Fs≥1.3\n抗倾覆：Fs≥1.5\n地基承载力验算', tags: ['稳定性'] }
    ]
  },

  'HANDBOOK_ROAD': {
    code: '工具书',
    name: '公路路基设计手册（第二版）',
    year: null,
    publisher: null,
    scope: '公路路基设计工具书',
    keyProvisions: [
      { id: 'hb-road-01', title: '路基设计', chapter: '第1章', content: '一般路基设计\n路基排水设计\n路基防护设计', tags: ['路基'] },
      { id: 'hb-road-02', title: '特殊路基', chapter: '第4章', content: '软土路基\n黄土路基\n膨胀土路基\n岩溶路基', tags: ['特殊路基'] },
      { id: 'hb-road-03', title: '路基防护', chapter: '第3章', content: '坡面防护\n冲刷防护\n支挡结构', tags: ['防护'] }
    ]
  },

  'HANDBOOK_CASES': {
    code: '工具书',
    name: '岩土工程典型案例述评',
    year: null,
    publisher: '中国建筑工业出版社',
    scope: '岩土工程案例分析',
    keyProvisions: [
      { id: 'hb-case-01', title: '案例价值', chapter: '前言', content: '工程案例是理论与实践的桥梁\n成功案例总结经验\n失败案例吸取教训', tags: ['案例'] },
      { id: 'hb-case-02', title: '案例分类', chapter: '目录', content: '地基基础案例\n基坑工程案例\n边坡工程案例\n隧道工程案例', tags: ['分类'] }
    ]
  }
};
