/**
 * 基坑工程类规范数据
 */
module.exports = {
  'JGJ120': {
    code: 'JGJ 120-2012',
    name: '建筑基坑支护技术规程',
    year: 2012,
    publisher: '住房和城乡建设部',
    scope: '适用于一般地质条件下建筑基坑工程的勘察、设计、施工、检测和监测',
    keyProvisions: [
      { id: 'pit-01', title: '基坑安全等级划分', clause: '3.1.3', content: '一级：破坏后果很严重\n二级：破坏后果严重\n三级：破坏后果不严重', tags: ['安全等级'] },
      { id: 'pit-02', title: '重要性系数', clause: '3.1.4', content: 'γ0：一级1.10，二级1.00，三级0.90', formula: 'γ0: 一级1.10，二级1.00，三级0.90', tags: ['重要性系数'] },
      { id: 'pit-03', title: '水土合算', clause: '3.4.1', content: '黏性土采用水土合算', formula: 'σa = γzKa - 2c√Ka', tags: ['土压力', '水土合算'] },
      { id: 'pit-04', title: '水土分算', clause: '3.4.2', content: '砂土、粉土采用水土分算', formula: 'σa = γ\'zKa + γwz', tags: ['土压力', '水土分算'] },
      { id: 'pit-05', title: '朗肯主动土压力系数', clause: '3.4.3', content: '朗肯主动土压力系数', formula: 'Ka = tan²(45° - φ/2)', tags: ['朗肯', '主动'] },
      { id: 'pit-06', title: '朗肯被动土压力系数', clause: '3.4.4', content: '朗肯被动土压力系数', formula: 'Kp = tan²(45° + φ/2)', tags: ['朗肯', '被动'] },
      { id: 'pit-07', title: '静止土压力系数', clause: '3.4.5', content: '静止土压力系数', formula: 'K0 = 1 - sinφ', tags: ['静止', 'K0'] },
      { id: 'pit-08', title: '抗隆起稳定性', clause: '4.2.1', content: 'Prandtl公式验算', formula: 'Fs = (γtNq + cNc)/(γh + q)', params: {K_l1:1.8, K_l2:1.6, K_l3:1.4}, tags: ['抗隆起'] },
      { id: 'pit-09', title: '抗倾覆稳定性', clause: '4.2.2', content: '力矩比值验算', formula: 'Fs = Mp/Mo', params: {K_l1:1.2, K_l2:1.15, K_l3:1.1}, tags: ['抗倾覆'] },
      { id: 'pit-10', title: '抗滑移稳定性', clause: '4.2.3', content: '力的比值验算', formula: 'Fs = (Ep+f)/Ea', params: {K_l1:1.3, K_l2:1.2, K_l3:1.1}, tags: ['抗滑移'] },
      { id: 'pit-11', title: '抗流土稳定性', clause: '4.2.4', content: '承压水验算', formula: 'Fs = γt/(γwh)', params: {K:1.5}, tags: ['抗流土'] },
      { id: 'pit-12', title: '抗管涌稳定性', clause: '4.2.5', content: '渗流验算', formula: 'Fs = γ\'D/(γwiL)', params: {K:1.5}, tags: ['抗管涌'] },
      { id: 'pit-13', title: '嵌固深度', clause: '4.3', content: '悬臂式支护结构嵌固深度不宜小于0.3h', tags: ['嵌固深度'] },
      { id: 'pit-14', title: '支撑间距', clause: '5.2', content: '水平支撑间距不宜大于4m', tags: ['支撑', '间距'] },
      { id: 'pit-15', title: '锚杆倾角', clause: '6.1', content: '锚杆倾角宜为15°~35°', tags: ['锚杆', '倾角'] },
      { id: 'pit-16', title: '土钉长度', clause: '7.1', content: '土钉长度宜为0.5~1.2倍开挖深度', tags: ['土钉', '长度'] },
      { id: 'pit-17', title: '土钉间距', clause: '7.2', content: '土钉水平和竖向间距宜为1.0~2.0m', tags: ['土钉', '间距'] },
      { id: 'pit-18', title: '监测频率', clause: '8.2', content: '开挖期间1次/天，底板浇筑后1次/2~3天', tags: ['监测', '频率'] },
      { id: 'pit-19', title: '位移控制值', clause: '8.3', content: '一级0.2%~0.5%H，二级0.5%~1.0%H', tags: ['位移', '控制'] },
      { id: 'pit-20', title: '地下水控制', clause: '9.1', content: '降水井深度应比基坑底深5~6m', tags: ['降水', '地下水'] }
    ]
  }
};
