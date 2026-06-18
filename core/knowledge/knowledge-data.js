/**
 * 岩土工程知识库数据（完整版）
 * 直接内嵌数据，避免微信小程序 require JSON 的路径问题
 * 包含：公式、工法、参数、规范条文
 */

const KNOWLEDGE_DATA = {
  // ========== 工程地质 ==========
  geology: {
    name: '工程地质',
    icon: 'leaf',
    color: '#07a35a',
    formulas: [
      // 物理性质指标
      { id: 'geo-f-01', name: '孔隙率', formula: 'n = Vv/V × 100%', description: '土中孔隙体积与总体积之比', category: '物理性质', tags: ['孔隙率', '物理指标'] },
      { id: 'geo-f-02', name: '孔隙比', formula: 'e = Vv/Vs', description: '土中孔隙体积与固体颗粒体积之比', category: '物理性质', tags: ['孔隙比', '物理指标'] },
      { id: 'geo-f-03', name: '饱和度', formula: 'Sr = Vw/Vv × 100%', description: '土中水的体积与孔隙体积之比', category: '物理性质', tags: ['饱和度', '含水量'] },
      { id: 'geo-f-04', name: '含水量', formula: 'w = mw/ms × 100%', description: '土中水的质量与干土质量之比', category: '物理性质', tags: ['含水量', '含水率'] },
      { id: 'geo-f-05', name: '干密度', formula: 'ρd = ms/V', description: '单位体积土中固体颗粒的质量', category: '物理性质', tags: ['干密度', '密度'] },
      { id: 'geo-f-06', name: '饱和密度', formula: 'ρsat = (ms + Vv·ρw)/V', description: '土孔隙完全充满水时的密度', category: '物理性质', tags: ['饱和密度'] },
      { id: 'geo-f-07', name: '浮密度', formula: "ρ' = ρsat - ρw", description: '土在水中的有效密度', category: '物理性质', tags: ['浮密度', '有效密度'] },
      // 稠度指标
      { id: 'geo-f-08', name: '塑性指数', formula: 'Ip = wL - wP', description: '液限与塑限之差', category: '稠度', tags: ['塑性指数', '液限', '塑限'] },
      { id: 'geo-f-09', name: '液性指数', formula: 'IL = (w - wP)/(wL - wP)', description: '天然含水量与塑限之差和塑性指数之比', category: '稠度', tags: ['液性指数', '稠度状态'] },
      { id: 'geo-f-10', name: '活动度', formula: 'A = Ip/(% < 0.002mm)', description: '塑性指数与黏粒含量之比', category: '稠度', tags: ['活动度', '黏粒'] },
      // 颗粒级配
      { id: 'geo-f-11', name: '不均匀系数', formula: 'Cu = d60/d10', description: '反映土颗粒大小的不均匀程度', category: '级配', tags: ['不均匀系数', '级配'] },
      { id: 'geo-f-12', name: '曲率系数', formula: 'Cc = (d30)²/(d10·d60)', description: '反映土颗粒级配曲线的形状', category: '级配', tags: ['曲率系数', '级配'] },
      // 压缩性
      { id: 'geo-f-13', name: '压缩系数', formula: 'a = (e1-e2)/(p2-p1)', description: '单位压力增量引起的孔隙比变化', category: '压缩性', tags: ['压缩系数', '压缩性'] },
      { id: 'geo-f-14', name: '压缩模量', formula: 'Es = (1+e1)/a', description: '土在侧限条件下的竖向应力与应变之比', category: '压缩性', tags: ['压缩模量', '变形'] },
      { id: 'geo-f-15', name: '体积压缩系数', formula: 'mv = 1/Es', description: '压缩模量的倒数', category: '压缩性', tags: ['体积压缩系数'] },
      // 抗剪强度
      { id: 'geo-f-16', name: '莫尔-库仑准则', formula: 'τf = c + σ·tanφ', description: '土的抗剪强度公式', category: '抗剪强度', tags: ['抗剪强度', '库仑', '黏聚力', '内摩擦角'] },
      { id: 'geo-f-17', name: '有效应力原理', formula: "σ' = σ - u", description: '太沙基有效应力原理', category: '有效应力', tags: ['有效应力', '太沙基', '孔隙水压力'] },
      { id: 'geo-f-18', name: '固结度', formula: 'U = 1 - exp(-π²Tv/4)', description: '一维固结理论固结度', category: '固结', tags: ['固结度', '太沙基', '固结'] },
      { id: 'geo-f-19', name: '固结系数', formula: 'Cv = k/(mv·γw)', description: '反映土体固结快慢的参数', category: '固结', tags: ['固结系数', '渗透'] },
      // 渗透性
      { id: 'geo-f-20', name: '达西定律', formula: 'v = k·i', description: '渗透速度与水力梯度成正比', category: '渗透性', tags: ['达西', '渗透', '水力梯度'] },
      { id: 'geo-f-21', name: '渗透力', formula: 'j = γw·i', description: '单位体积土所受的渗透力', category: '渗透性', tags: ['渗透力', '流土'] }
    ],
    parameters: [
      { name: '黏聚力', symbol: 'c', unit: 'kPa', description: '土的抗剪强度参数' },
      { name: '内摩擦角', symbol: 'φ', unit: '°', description: '土的抗剪强度参数' },
      { name: '压缩模量', symbol: 'Es', unit: 'MPa', description: '土的压缩性指标' },
      { name: '承载力特征值', symbol: 'fak', unit: 'kPa', description: '地基承载力' },
      { name: '渗透系数', symbol: 'k', unit: 'cm/s', description: '土的渗透性指标' },
      { name: '孔隙比', symbol: 'e', unit: '-', description: '土的孔隙比' },
      { name: '液限', symbol: 'wL', unit: '%', description: '土的液限含水量' },
      { name: '塑限', symbol: 'wP', unit: '%', description: '土的塑限含水量' },
      { name: '标贯击数', symbol: 'N', unit: '击', description: '标准贯入试验锤击数' },
      { name: '压缩系数', symbol: 'a', unit: 'MPa⁻¹', description: '土的压缩系数' },
      { name: '固结系数', symbol: 'Cv', unit: 'cm²/s', description: '土的固结系数' },
      { name: '不均匀系数', symbol: 'Cu', unit: '-', description: '颗粒级配不均匀系数' }
    ],
    methods: [
      { id: 'geo-m-01', name: '标准贯入试验', description: '用63.5kg穿心锤，以76cm落距，将标准贯入器打入土中15cm后，记录每打入10cm的锤击数', applicable: '砂土、粉土、一般黏性土' },
      { id: 'geo-m-02', name: '静力触探试验', description: '用静力将探头匀速压入土中，量测探头阻力', applicable: '软土、黏性土、砂土' },
      { id: 'geo-m-03', name: '十字板剪切试验', description: '在软土中插入十字板，旋转测定不排水抗剪强度', applicable: '饱和软黏土' },
      { id: 'geo-m-04', name: '旁压试验', description: '在钻孔中施加径向压力，测定土的变形模量', applicable: '各类土层' },
      { id: 'geo-m-05', name: '载荷试验', description: '在地基上逐级加载，测定沉降与压力关系', applicable: '确定地基承载力' },
      { id: 'geo-m-06', name: '波速测试', description: '测定剪切波和压缩波在土中的传播速度', applicable: '场地类别划分、液化判别' },
      { id: 'geo-m-07', name: '室内三轴试验', description: '在不同围压下进行剪切，测定强度参数', applicable: '测定c、φ值' },
      { id: 'geo-m-08', name: '室内固结试验', description: '在侧限条件下逐级加载，测定压缩参数', applicable: '测定Es、a、Cv' }
    ]
  },

  // ========== 基坑工程 ==========
  pit: {
    name: '基坑工程',
    icon: 'building-1',
    color: '#0052d9',
    formulas: [
      // 土压力计算
      { id: 'pit-f-01', name: '朗肯主动土压力系数', formula: 'Ka = tan²(45° - φ/2) = (1-sinφ)/(1+sinφ)', description: '用于计算挡土墙主动土压力系数', category: '土压力', tags: ['朗肯', '主动', '土压力系数'] },
      { id: 'pit-f-02', name: '朗肯被动土压力系数', formula: 'Kp = tan²(45° + φ/2) = (1+sinφ)/(1-sinφ)', description: '用于计算挡土墙被动土压力系数', category: '土压力', tags: ['朗肯', '被动', '土压力系数'] },
      { id: 'pit-f-03', name: '静止土压力系数', formula: 'K0 = 1 - sinφ（正常固结土）\nK0 = (1-sinφ)·√OCR（超固结土）', description: '用于计算静止土压力', category: '土压力', tags: ['静止', '土压力', 'K0', '超固结'] },
      { id: 'pit-f-04', name: '主动土压力强度（黏性土）', formula: 'σa = γzKa - 2c√Ka', description: '计算任意深度处的主动土压力强度', category: '土压力', tags: ['主动', '黏性土', '土压力'] },
      { id: 'pit-f-05', name: '被动土压力强度（黏性土）', formula: 'σp = γzKp + 2c√Kp', description: '计算任意深度处的被动土压力强度', category: '土压力', tags: ['被动', '黏性土', '土压力'] },
      { id: 'pit-f-06', name: '库仑主动土压力系数', formula: 'Ka = cos²(φ-α) / [cos²α·cos(α+δ)·(1+√(sin(φ+δ)·sin(φ-β)/(cos(α+δ)·cos(α-β))))²]', description: '考虑墙背摩擦的主动土压力系数', category: '土压力', tags: ['库仑', '主动', '墙背摩擦'] },
      { id: 'pit-f-07', name: '库仑被动土压力系数', formula: 'Kp = cos²(φ+α) / [cos²α·cos(α-δ)·(1-√(sin(φ+δ)·sin(φ+β)/(cos(α-δ)·cos(α-β))))²]', description: '考虑墙背摩擦的被动土压力系数', category: '土压力', tags: ['库仑', '被动', '墙背摩擦'] },
      { id: 'pit-f-08', name: '水土合算土压力', formula: 'σa = γsat·z·Ka - 2c√Ka', description: '地下水位以下采用水土合算', category: '土压力', tags: ['水土合算', '饱和土'] },
      { id: 'pit-f-09', name: '水土分算土压力', formula: "σa = γ'·z·Ka + γw·z - 2c'√Ka", description: '地下水位以下采用水土分算', category: '土压力', tags: ['水土分算', '有效应力'] },
      { id: 'pit-f-10', name: '地面超载引起的土压力', formula: 'σa = q·Ka', description: '均布超载引起的附加土压力', category: '土压力', tags: ['超载', '附加土压力'] },
      // 稳定性验算
      { id: 'pit-f-11', name: '抗倾覆安全系数', formula: 'Ks = Mp/Mo ≥ 1.2', description: '验算支护结构抗倾覆稳定性', category: '稳定性', tags: ['抗倾覆', '安全系数'] },
      { id: 'pit-f-12', name: '抗隆起安全系数（Prandtl）', formula: 'Ks = (γDNq + cNc)/(γH + q) ≥ 1.6\nNq = e^(πtanφ)·tan²(45°+φ/2)\nNc = (Nq-1)/tanφ', description: '验算基坑底部抗隆起稳定性', category: '稳定性', tags: ['抗隆起', 'Prandtl', '承载力系数'] },
      { id: 'pit-f-13', name: '抗管涌安全系数', formula: 'Ks = γ\'D/(γw·h) ≥ 1.5', description: '验算基坑底部抗管涌稳定性', category: '稳定性', tags: ['抗管涌', '渗流'] },
      { id: 'pit-f-14', name: '抗滑移安全系数', formula: 'Ks = (Ep + f)/Ea ≥ 1.3', description: '验算重力式挡墙抗滑移稳定性', category: '稳定性', tags: ['抗滑移', '摩擦力'] },
      { id: 'pit-f-15', name: '抗承压水稳定性', formula: 'Ks = γsat·t/(γw·hw) ≥ 1.1', description: '验算基坑底部抗承压水稳定性', category: '稳定性', tags: ['承压水', '抗突涌'] },
      // 支护结构计算
      { id: 'pit-f-16', name: '土钉抗拔力', formula: 'Tu = π·D·L·τ', description: '计算单根土钉的抗拔承载力', category: '土钉墙', tags: ['土钉', '抗拔', '承载力'] },
      { id: 'pit-f-17', name: '锚杆抗拔力', formula: 'Tu = π·D·La·τ·ξ', description: '计算单根锚杆的抗拔承载力', category: '锚杆', tags: ['锚杆', '抗拔', '锚固段'] },
      { id: 'pit-f-18', name: '锚杆自由段长度', formula: 'Lf = (H-a)/sin(45°-φ/2+α)', description: '锚杆自由段长度计算', category: '锚杆', tags: ['锚杆', '自由段'] },
      { id: 'pit-f-19', name: '基坑顶部水平位移', formula: 'δ = α·H²/(E·D)', description: '估算基坑顶部水平位移', category: '变形', tags: ['变形', '位移', '水平'] },
      { id: 'pit-f-20', name: '降水井出水量', formula: 'Q = 2πkHs/ln(R/r)', description: '计算单井出水量（Dupuit公式）', category: '降水', tags: ['降水', '出水量', 'Dupuit'] },
      { id: 'pit-f-21', name: '支撑轴力', formula: 'N = γ·Ka·H·s·L/2', description: '内支撑轴力计算', category: '支撑', tags: ['支撑', '轴力'] },
      { id: 'pit-f-22', name: '地下连续墙弯矩', formula: 'M = q·L²/10', description: '地下连续墙最大弯矩估算', category: '连续墙', tags: ['连续墙', '弯矩'] },
      { id: 'pit-f-23', name: '灌注桩配筋率', formula: 'ρ = As/Ac ≥ 0.2%', description: '钻孔灌注桩最小配筋率', category: '排桩', tags: ['配筋率', '灌注桩'] },
      { id: 'pit-f-24', name: '水泥土墙厚度', formula: 'B ≥ H/12（悬臂式）\nB ≥ H/15（锚固式）', description: '水泥土重力式挡墙厚度', category: '水泥土墙', tags: ['水泥土', '挡墙厚度'] },
      { id: 'pit-f-25', name: '截水帷幕深度', formula: 'L ≥ H + 2m（渗透性弱）\nL ≥ 1.5H（渗透性强）', description: '止水帷幕入土深度', category: '止水', tags: ['止水帷幕', '入土深度'] }
    ],
    parameters: [
      { name: '主动土压力系数', symbol: 'Ka', unit: '-', description: '朗肯或库仑主动土压力系数' },
      { name: '被动土压力系数', symbol: 'Kp', unit: '-', description: '朗肯或库仑被动土压力系数' },
      { name: '静止土压力系数', symbol: 'K0', unit: '-', description: '静止土压力系数' },
      { name: '安全系数', symbol: 'K', unit: '-', description: '各类稳定性安全系数' },
      { name: '基坑深度', symbol: 'H', unit: 'm', description: '基坑开挖深度' },
      { name: '入土深度', symbol: 'D', unit: 'm', description: '支护结构嵌固深度' },
      { name: '土的重度', symbol: 'γ', unit: 'kN/m³', description: '土的天然重度' },
      { name: '黏聚力', symbol: 'c', unit: 'kPa', description: '土的黏聚力' },
      { name: '内摩擦角', symbol: 'φ', unit: '°', description: '土的内摩擦角' },
      { name: '墙背摩擦角', symbol: 'δ', unit: '°', description: '墙背与土的摩擦角' },
      { name: '地面超载', symbol: 'q', unit: 'kPa', description: '基坑周边地面荷载' },
      { name: '地下水位', symbol: 'hw', unit: 'm', description: '地下水位埋深' },
      { name: '渗透系数', symbol: 'k', unit: 'm/d', description: '土层综合渗透系数' },
      { name: '锚杆间距', symbol: 's', unit: 'm', description: '锚杆水平和竖向间距' }
    ],
    methods: [
      { id: 'pit-m-01', name: '土钉墙支护', description: '在土体中设置土钉，形成复合土体挡墙。施工流程：开挖→钻孔→插入土钉→注浆→挂网→喷射混凝土', applicable: '深度≤12m，地下水位以上或降水后，无淤泥质土' },
      { id: 'pit-m-02', name: '排桩+锚杆支护', description: '钻孔灌注桩+预应力锚杆。适用于周边环境宽松，允许一定变形的基坑', applicable: '深度6-20m，周边环境宽松，锚杆有足够锚固空间' },
      { id: 'pit-m-03', name: '排桩+内支撑', description: '钻孔灌注桩+钢支撑或混凝土支撑。适用于周边环境严格，变形控制要求高的基坑', applicable: '深度6-25m，周边环境严格，有地铁、管线等' },
      { id: 'pit-m-04', name: '地下连续墙', description: '现浇钢筋混凝土连续墙体，兼作挡土和止水。施工采用液压抓斗或铣槽机成槽', applicable: '深度>10m，严格变形控制，兼作永久结构' },
      { id: 'pit-m-05', name: '水泥土重力式挡墙', description: '水泥土搅拌桩相互搭接形成挡墙，依靠自重维持稳定', applicable: '深度≤7m，软土地区，周边环境简单' },
      { id: 'pit-m-06', name: 'SMW工法', description: '型钢水泥土搅拌墙，三轴搅拌桩内插入H型钢', applicable: '深度8-15m，兼作止水帷幕，型钢可回收' },
      { id: 'pit-m-07', name: '钢板桩支护', description: '打入钢板桩形成挡墙，可配合内支撑或锚杆', applicable: '深度≤10m，临时性工程，软土地区' },
      { id: 'pit-m-08', name: '放坡开挖', description: '按一定坡率放坡，无需支护结构', applicable: '深度≤5m，场地开阔，无地下水' },
      { id: 'pit-m-09', name: '复合土钉墙', description: '土钉+预应力锚杆+微型桩组合支护', applicable: '深度8-15m，有一定变形控制要求' },
      { id: 'pit-m-10', name: '双排桩支护', description: '前后两排灌注桩+连梁形成门式刚架', applicable: '深度10-15m，变形控制要求较高' }
    ]
  },

  // ========== 边坡工程 ==========
  slope: {
    name: '边坡工程',
    icon: 'chart',
    color: '#e37318',
    formulas: [
      { id: 'slope-f-01', name: '瑞典圆弧法安全系数', formula: 'Fs = Σ(c·l + N·tanφ) / ΣT', description: '边坡稳定性分析的基本方法，适用于圆弧滑面', category: '稳定性', tags: ['瑞典法', '圆弧滑动', '安全系数'] },
      { id: 'slope-f-02', name: '简化Bishop法', formula: 'Fs = Σ[(c·b + (W - u·b)·tanφ) / mα] / Σ(W·sinα)\nmα = cosα + sinα·tanφ/Fs', description: '考虑条间力的简化方法，精度较高', category: '稳定性', tags: ['Bishop', '条分法', '迭代'] },
      { id: 'slope-f-03', name: '不平衡推力法（传递系数法）', formula: 'Pi = Pi-1·ψ + Ti - Ni·tanφ/Fs - c·l/Fs\nψ = cos(αi-1-αi) - sin(αi-1-αi)·tanφ/Fs', description: '传递系数法，适用于折线形滑面', category: '稳定性', tags: ['推力法', '折线滑面', '传递系数'] },
      { id: 'slope-f-04', name: 'Morgenstern-Price法', description: '严格条分法，同时满足力和力矩平衡', formula: 'Fs(F) = Fs(M)', category: '稳定性', tags: ['严格法', '力平衡', '力矩平衡'] },
      { id: 'slope-f-05', name: 'Sarma法', formula: '考虑滑体内部剪切面的稳定性分析方法', description: '适用于岩质边坡，考虑结构面', category: '稳定性', tags: ['Sarma', '岩质边坡', '结构面'] },
      { id: 'slope-f-06', name: '边坡安全系数标准', formula: '一级Fs≥1.35，二级Fs≥1.30，三级Fs≥1.25（永久边坡）\n一级Fs≥1.25，二级Fs≥1.20，三级Fs≥1.15（临时边坡）', description: 'GB 50330-2013边坡安全系数要求', category: '规范', tags: ['安全系数', '标准', 'GB50330'] },
      { id: 'slope-f-07', name: '抗滑桩推力', formula: 'E = Ka·γ·H²/2 - Kp·γ·h²/2', description: '作用于抗滑桩上的剩余推力', category: '抗滑桩', tags: ['抗滑桩', '推力'] },
      { id: 'slope-f-08', name: '锚杆设计拉力', formula: 'Nt = Ka·γ·H·s / cosα', description: '边坡锚杆设计拉力', category: '锚杆', tags: ['锚杆', '拉力'] },
      { id: 'slope-f-09', name: '边坡坡率允许值', formula: '硬质岩：1:0.1~1:0.3\n软质岩：1:0.3~1:0.75\n土质边坡：1:1~1:1.5', description: '不同岩土类型的边坡允许坡率', category: '设计', tags: ['坡率', '放坡'] },
      { id: 'slope-f-10', name: '平面滑动安全系数', formula: 'Fs = (c·A + (W·cosβ - U - V·sinβ)·tanφ) / (W·sinβ + V·cosβ)', description: '岩质边坡沿单一结构面滑动', category: '稳定性', tags: ['平面滑动', '岩质边坡'] },
      { id: 'slope-f-11', name: '楔形滑动安全系数', formula: 'Fs = (R·tanφ + c·A) / W·sinα', description: '两组结构面组合形成的楔形体滑动', category: '稳定性', tags: ['楔形滑动', '结构面'] },
      { id: 'slope-f-12', name: '倾倒破坏判据', formula: 'tanβ < tanφ - c/(γ·h·cos²β)', description: '岩质边坡倾倒破坏的判别', category: '稳定性', tags: ['倾倒', '岩质边坡'] }
    ],
    parameters: [
      { name: '边坡安全系数', symbol: 'Fs', unit: '-', description: '边坡稳定性安全系数' },
      { name: '边坡高度', symbol: 'H', unit: 'm', description: '边坡垂直高度' },
      { name: '边坡坡度', symbol: 'β', unit: '°', description: '边坡与水平面的夹角' },
      { name: '剩余推力', symbol: 'E', unit: 'kN/m', description: '滑坡剩余下滑力' },
      { name: '滑面倾角', symbol: 'α', unit: '°', description: '滑动面与水平面的夹角' },
      { name: '滑面黏聚力', symbol: 'c', unit: 'kPa', description: '滑动面的黏聚力' },
      { name: '滑面内摩擦角', symbol: 'φ', unit: '°', description: '滑动面的内摩擦角' },
      { name: '滑体厚度', symbol: 'h', unit: 'm', description: '滑动体的平均厚度' },
      { name: '孔隙水压力', symbol: 'u', unit: 'kPa', description: '滑动面上的孔隙水压力' }
    ],
    methods: [
      { id: 'slope-m-01', name: '抗滑桩', description: '在滑坡前缘设置钢筋混凝土桩，依靠桩的抗剪和抗弯能力抵抗滑坡推力', applicable: '滑坡治理，深度较大的滑面，滑面以下有足够锚固段' },
      { id: 'slope-m-02', name: '预应力锚索', description: '通过锚索提供抗滑力，锚固段深入稳定地层', applicable: '岩质边坡、深层滑动，需要主动加固' },
      { id: 'slope-m-03', name: '挡土墙', description: '重力式、悬臂式或扶壁式挡墙，依靠自重或土重维持稳定', applicable: '高度较小的边坡（≤8m），滑坡前缘' },
      { id: 'slope-m-04', name: '喷锚支护', description: '喷射混凝土+锚杆，封闭坡面，加固表层', applicable: '岩质边坡表层防护，风化破碎带' },
      { id: 'slope-m-05', name: '排水工程', description: '地表排水（截水沟、排水沟）+地下排水（排水盲沟、排水孔）', applicable: '所有边坡，降低地下水，减小孔隙水压力' },
      { id: 'slope-m-06', name: '削坡减载', description: '对滑坡后缘进行削方，减小下滑力', applicable: '推移式滑坡，后缘有削方空间' },
      { id: 'slope-m-07', name: '回填反压', description: '在滑坡前缘堆载，增加抗滑力', applicable: '牵引式滑坡，前缘有堆载空间' },
      { id: 'slope-m-08', name: '注浆加固', description: '通过注浆提高滑面强度和整体性', applicable: '岩质边坡裂隙发育，需要提高强度' },
      { id: 'slope-m-09', name: '格构锚固', description: '钢筋混凝土格构+锚杆/锚索', applicable: '高边坡防护，需要坡面绿化' },
      { id: 'slope-m-10', name: '柔性防护网', description: '钢丝绳网或高强度钢丝格栅覆盖坡面', applicable: '岩质边坡落石防护' }
    ]
  },

  // ========== 深基坑 ==========
  deepPit: {
    name: '深基坑工程',
    icon: 'layers',
    color: '#8b5cf6',
    formulas: [
      { id: 'dp-f-01', name: '深基坑整体稳定性', formula: 'Fs = Mr/Ms ≥ 1.3', description: '深基坑整体稳定性验算', category: '稳定性', tags: ['整体稳定', '深基坑'] },
      { id: 'dp-f-02', name: '渗流稳定性', formula: 'i = Δh/L ≤ ic/γw', description: '渗流稳定性验算，防止流土和管涌', category: '渗流', tags: ['渗流', '流土', '管涌'] },
      { id: 'dp-f-03', name: '多道支撑轴力', formula: 'Ni = ki·Δi·Li', description: '各道支撑轴力计算，考虑支撑刚度', category: '支撑', tags: ['支撑', '轴力', '多道'] },
      { id: 'dp-f-04', name: '时空效应系数', formula: 'λ = f(B/H, t/T)', description: '考虑时空效应的土压力调整系数', category: '时空效应', tags: ['时空效应', '调整'] },
      { id: 'dp-f-05', name: '围护墙最大弯矩', formula: 'Mmax = γ·Ka·H³/15', description: '围护墙最大弯矩估算', category: '围护结构', tags: ['弯矩', '连续墙'] },
      { id: 'dp-f-06', name: '支撑道数估算', formula: 'n = H/4~H/5（软土）\nn = H/5~H/6（硬土）', description: '根据基坑深度估算支撑道数', category: '支撑', tags: ['支撑道数', '经验'] },
      { id: 'dp-f-07', name: '基坑回弹量', formula: 'δr = Σ(mi·Δhi·γi/Es)', description: '基坑开挖引起的基底回弹', category: '变形', tags: ['回弹', '变形'] },
      { id: 'dp-f-08', name: '基坑降水沉降', formula: 's = Σ(Δσi·hi/Es)', description: '降水引起的周边地面沉降', category: '降水', tags: ['沉降', '降水影响'] }
    ],
    parameters: [
      { name: '围护墙厚度', symbol: 'B', unit: 'mm', description: '地下连续墙或灌注桩厚度' },
      { name: '支撑间距', symbol: 'L', unit: 'm', description: '水平支撑间距' },
      { name: '嵌固深度', symbol: 'D', unit: 'm', description: '围护结构入土深度' },
      { name: '安全等级', symbol: '-', unit: '-', description: '一级/二级/三级' },
      { name: '支撑刚度', symbol: 'k', unit: 'kN/m', description: '支撑水平刚度' },
      { name: '预加轴力', symbol: 'N0', unit: 'kN', description: '支撑预加轴力' },
      { name: '开挖步序', symbol: '-', unit: '-', description: '分层开挖的层数和深度' }
    ],
    methods: [
      { id: 'dp-m-01', name: '逆作法', description: '利用主体结构作为支撑，自上而下施工。先施工地下一层顶板，再向下开挖', applicable: '超深基坑（>15m），严格变形控制，周边有重要建筑' },
      { id: 'dp-m-02', name: '半逆作法', description: '部分采用逆作，部分采用顺作，兼顾工期和变形控制', applicable: '深度较大（10-20m），工期紧张' },
      { id: 'dp-m-03', name: '环形支撑', description: '采用环形内支撑体系，受力合理，便于土方开挖', applicable: '大面积基坑（>10000m²），减少支撑道数' },
      { id: 'dp-m-04', name: '对撑+角撑', description: '采用对撑和角撑组合的支撑体系', applicable: '矩形基坑，常规支撑方案' },
      { id: 'dp-m-05', name: '栈桥开挖', description: '设置施工栈桥，车辆直接进入基坑内运土', applicable: '大面积深基坑，提高出土效率' },
      { id: 'dp-m-06', name: '盆式开挖', description: '先开挖中部土方，保留周边土台，最后开挖周边', applicable: '大面积基坑，减小围护变形' },
      { id: 'dp-m-07', name: '岛式开挖', description: '先开挖周边土方，保留中部土岛，最后开挖中部', applicable: '需要先施工周边结构' }
    ]
  },

  // ========== 地基处理 ==========
  foundation: {
    name: '地基处理',
    icon: 'root',
    color: '#d54941',
    formulas: [
      { id: 'found-f-01', name: '复合地基承载力', formula: 'fspk = m·Ra/Ap + β·(1-m)·fsk', description: '复合地基承载力特征值计算', category: '承载力', tags: ['复合地基', '承载力', '置换率'] },
      { id: 'found-f-02', name: '面积置换率', formula: 'm = Ap/A = d²/de²', description: '桩截面积与处理面积之比', category: '置换率', tags: ['置换率', '面积'] },
      { id: 'found-f-03', name: '复合地基沉降', formula: 's = ψsp·Σ(Δspi) = ψsp·(s1 + s2)', description: '复合地基总沉降量=加固区沉降+下卧层沉降', category: '沉降', tags: ['沉降', '复合地基'] },
      { id: 'found-f-04', name: '强夯有效深度', formula: 'H = α·√(M·h/10)', description: '强夯法有效加固深度估算（Menard公式）', category: '强夯', tags: ['强夯', '加固深度'] },
      { id: 'found-f-05', name: 'CFG桩承载力', formula: 'Ra = up·Σqsi·li + qp·Ap\nRa = η·fcu·Ap（取小值）', description: 'CFG桩单桩承载力特征值', category: 'CFG桩', tags: ['CFG', '承载力', '桩'] },
      { id: 'found-f-06', name: '搅拌桩承载力', formula: 'Ra = up·Σqsi·li + α·qp·Ap\nRa = η·fcu·Ap（取小值）', description: '水泥土搅拌桩单桩承载力', category: '搅拌桩', tags: ['搅拌桩', '承载力'] },
      { id: 'found-f-07', name: '桩土应力比', formula: 'n = σp/σs', description: '桩顶应力与桩间土应力之比', category: '应力比', tags: ['应力比', '荷载分担'] },
      { id: 'found-f-08', name: '复合模量', formula: 'Esp = m·Ep + (1-m)·Es', description: '复合地基压缩模量', category: '模量', tags: ['复合模量', '压缩'] },
      { id: 'found-f-09', name: '褥垫层厚度', formula: 'h = 150~300mm', description: '复合地基褥垫层厚度', category: '褥垫层', tags: ['褥垫层', '厚度'] },
      { id: 'found-f-10', name: '砂石桩承载力', formula: 'fspk = [1+m(n-1)]·fsk', description: '砂石桩复合地基承载力', category: '砂石桩', tags: ['砂石桩', '承载力'] },
      { id: 'found-f-11', name: '灰土挤密桩', formula: 'fspk = m·fpk + (1-m)·fsk', description: '灰土挤密桩复合地基承载力', category: '灰土桩', tags: ['灰土桩', '挤密'] },
      { id: 'found-f-12', name: '预压固结度', formula: 'U = 1 - 8/π²·exp(-π²Tv/4)', description: '堆载预压固结度计算', category: '预压', tags: ['预压', '固结度'] },
      { id: 'found-f-13', name: '真空预压', formula: 'σv = P0·(1-exp(-t/τ))', description: '真空预压加固效果', category: '预压', tags: ['真空预压', '负压'] }
    ],
    parameters: [
      { name: '面积置换率', symbol: 'm', unit: '-', description: '桩截面积与处理面积之比' },
      { name: '桩土应力比', symbol: 'n', unit: '-', description: '桩顶应力与桩间土应力之比' },
      { name: '承载力特征值', symbol: 'fspk', unit: 'kPa', description: '复合地基承载力特征值' },
      { name: '压缩模量', symbol: 'Esp', unit: 'MPa', description: '复合地基压缩模量' },
      { name: '桩径', symbol: 'd', unit: 'mm', description: '桩身直径' },
      { name: '桩间距', symbol: 's', unit: 'mm', description: '桩中心间距' },
      { name: '桩长', symbol: 'L', unit: 'm', description: '桩的有效长度' },
      { name: '桩身强度', symbol: 'fcu', unit: 'MPa', description: '桩身立方体抗压强度' },
      { name: '桩间土承载力', symbol: 'fsk', unit: 'kPa', description: '处理后桩间土承载力' },
      { name: '折减系数', symbol: 'β', unit: '-', description: '桩间土承载力折减系数' }
    ],
    methods: [
      { id: 'found-m-01', name: 'CFG桩复合地基', description: '水泥粉煤灰碎石桩复合地基，桩身强度C15~C25，采用长螺旋钻孔管内泵压施工', applicable: '处理深度5-25m，承载力要求高，变形控制严格' },
      { id: 'found-m-02', name: '水泥土搅拌桩', description: '深层搅拌法形成水泥土桩，分为湿法（浆喷）和干法（粉喷）', applicable: '处理深度15-20m（湿法）/12m（干法），软土地区' },
      { id: 'found-m-03', name: '强夯法', description: '重锤（10-40t）高落差（10-40m）夯击地基，提高地基承载力', applicable: '处理深度3-12m，碎石土、砂土、粉土、低饱和度黏性土' },
      { id: 'found-m-04', name: '碎石桩', description: '振动或冲击形成碎石桩，置换软弱土层', applicable: '松散砂土、粉土、杂填土，深度≤15m' },
      { id: 'found-m-05', name: '换填垫层法', description: '挖除软弱土，换填砂石、灰土等，分层夯实', applicable: '处理深度≤3m，浅层处理' },
      { id: 'found-m-06', name: '堆载预压法', description: '在地基上堆载，利用荷载使地基固结', applicable: '软土、淤泥质土，有足够预压时间' },
      { id: 'found-m-07', name: '真空预压法', description: '在地基中设置排水板，覆盖密封膜，抽真空形成负压', applicable: '软土、淤泥质土，加固深度≤20m' },
      { id: 'found-m-08', name: '高压旋喷桩', description: '高压喷射水泥浆，与土体混合形成水泥土桩', applicable: '处理深度≤30m，可用于止水帷幕' },
      { id: 'found-m-09', name: '灰土挤密桩', description: '成孔后填入灰土（石灰:土=2:8或3:7），夯实挤密', applicable: '湿陷性黄土，处理深度≤15m' },
      { id: 'found-m-10', name: '注浆法', description: '通过注浆管将浆液注入地层，充填裂隙，提高强度', applicable: '岩溶、裂隙发育地层，既有建筑加固' }
    ]
  },

  // ========== 挡土墙 ==========
  retainingWall: {
    name: '挡土墙',
    icon: 'shelter',
    color: '#0891b2',
    formulas: [
      { id: 'rw-f-01', name: '重力式挡墙土压力', formula: 'Ea = 0.5·γ·H²·Ka', description: '作用于挡墙的主动土压力', category: '土压力', tags: ['重力式', '土压力'] },
      { id: 'rw-f-02', name: '挡墙抗倾覆', formula: 'Ks = ΣM抗/ΣM倾 ≥ 1.6', description: '挡墙抗倾覆稳定性验算', category: '稳定性', tags: ['抗倾覆', '稳定'] },
      { id: 'rw-f-03', name: '挡墙抗滑移', formula: 'Ks = f·ΣV/ΣH ≥ 1.3', description: '挡墙抗滑移稳定性验算', category: '稳定性', tags: ['抗滑移', '摩擦'] },
      { id: 'rw-f-04', name: '地基承载力验算', formula: 'σmax ≤ 1.2·fa', description: '墙底地基承载力验算', category: '承载力', tags: ['地基', '承载力'] },
      { id: 'rw-f-05', name: '挡墙截面强度', formula: 'M ≤ Mu/γ', description: '挡墙截面抗弯承载力验算', category: '截面', tags: ['强度', '配筋'] },
      { id: 'rw-f-06', name: '衡重式挡墙', formula: '利用衡重台上的填土重量增加稳定性', description: '衡重式挡土墙设计原理', category: '设计', tags: ['衡重式', '设计'] }
    ],
    parameters: [
      { name: '墙高', symbol: 'H', unit: 'm', description: '挡土墙高度' },
      { name: '墙背倾角', symbol: 'α', unit: '°', description: '墙背与竖直面的夹角' },
      { name: '墙底摩擦系数', symbol: 'f', unit: '-', description: '墙底与地基的摩擦系数' },
      { name: '墙身重度', symbol: 'γc', unit: 'kN/m³', description: '挡墙材料的重度' },
      { name: '基底应力', symbol: 'σ', unit: 'kPa', description: '墙底地基应力' }
    ],
    methods: [
      { id: 'rw-m-01', name: '重力式挡墙', description: '依靠墙身自重维持稳定，常用浆砌石或混凝土', applicable: '墙高≤8m，地基条件好' },
      { id: 'rw-m-02', name: '悬臂式挡墙', description: '由立壁、墙趾板和墙踵板组成，钢筋混凝土结构', applicable: '墙高≤6m，地基条件一般' },
      { id: 'rw-m-03', name: '扶壁式挡墙', description: '在悬臂式基础上增设扶壁，提高抗弯能力', applicable: '墙高6-10m，填土较高' },
      { id: 'rw-m-04', name: '锚杆挡墙', description: '立柱+挡板+锚杆，依靠锚杆拉力维持稳定', applicable: '墙高>8m，有锚固地层' },
      { id: 'rw-m-05', name: '加筋土挡墙', description: '利用土工格栅或拉筋与填土的摩擦力维持稳定', applicable: '墙高≤12m，填料为砂性土' }
    ]
  },

  // ========== 地基基础 ==========
  foundationDesign: {
    name: '地基基础',
    icon: 'home',
    color: '#ca8a04',
    formulas: [
      { id: 'fd-f-01', name: '地基承载力修正', formula: 'fa = fak + ηb·γ·(b-3) + ηd·γm·(d-0.5)', description: '地基承载力特征值修正', category: '承载力', tags: ['承载力', '修正', 'GB50007'] },
      { id: 'fd-f-02', name: '基底压力', formula: 'pk = (Fk+Gk)/A', description: '基础底面平均压力', category: '基底压力', tags: ['基底压力', '荷载'] },
      { id: 'fd-f-03', name: '基底附加压力', formula: 'p0 = pk - γm·d', description: '基础底面附加压力', category: '附加压力', tags: ['附加压力', '沉降'] },
      { id: 'fd-f-04', name: '分层总和法沉降', formula: 's = ψs·Σ(p0·Δzi/Esi)', description: '地基最终沉降量计算', category: '沉降', tags: ['沉降', '分层总和'] },
      { id: 'fd-f-05', name: '桩基承载力', formula: 'Quk = Qsk + Qpk = u·Σqsik·li + qpk·Ap', description: '单桩竖向极限承载力', category: '桩基', tags: ['桩基', '承载力'] },
      { id: 'fd-f-06', name: '桩基沉降', formula: 's = ψ·Σ(σzi·Δzi/Esi)', description: '桩基最终沉降量', category: '桩基', tags: ['桩基', '沉降'] },
      { id: 'fd-f-07', name: '承台抗冲切', formula: 'Fl ≤ 0.7·βhp·ft·um·h0', description: '桩基承台抗冲切承载力', category: '承台', tags: ['冲切', '承台'] },
      { id: 'fd-f-08', name: '承台抗剪切', formula: 'V ≤ 0.7·βhs·ft·b·h0', description: '桩基承台抗剪承载力', category: '承台', tags: ['剪切', '承台'] }
    ],
    parameters: [
      { name: '承载力特征值', symbol: 'fak', unit: 'kPa', description: '地基承载力特征值' },
      { name: '修正后承载力', symbol: 'fa', unit: 'kPa', description: '修正后的地基承载力' },
      { name: '基底压力', symbol: 'pk', unit: 'kPa', description: '基础底面压力' },
      { name: '附加压力', symbol: 'p0', unit: 'kPa', description: '基础底面附加压力' },
      { name: '沉降量', symbol: 's', unit: 'mm', description: '地基最终沉降量' },
      { name: '桩径', symbol: 'd', unit: 'mm', description: '桩身直径' },
      { name: '桩长', symbol: 'L', unit: 'm', description: '桩的有效长度' },
      { name: '桩间距', symbol: 'sa', unit: 'mm', description: '桩中心间距' }
    ],
    methods: [
      { id: 'fd-m-01', name: '浅基础', description: '独立基础、条形基础、筏板基础', applicable: '地基条件好，荷载不大' },
      { id: 'fd-m-02', name: '桩基础', description: '预制桩、灌注桩、钢管桩', applicable: '荷载大，浅层地基差' },
      { id: 'fd-m-03', name: '筏板基础', description: '整板式基础，适用于高层建筑', applicable: '荷载大，地基条件一般' },
      { id: 'fd-m-04', name: '箱形基础', description: '由顶板、底板和纵横墙组成', applicable: '高层建筑，地下室' },
      { id: 'fd-m-05', name: '桩筏基础', description: '桩+筏板组合基础', applicable: '超高层建筑，地基条件差' }
    ]
  }
};

// 安全系数标准
const SAFETY_FACTORS = {
  pit: {
    antiOverturning: { level1: 1.2, level2: 1.2, level3: 1.2 },
    antiHeave: { level1: 1.8, level2: 1.6, level3: 1.4 },
    antiPiping: { level1: 1.5, level2: 1.5, level3: 1.5 },
    antiSliding: { level1: 1.3, level2: 1.3, level3: 1.3 }
  },
  slope: {
    permanent: { level1: 1.35, level2: 1.30, level3: 1.25 },
    temporary: { level1: 1.25, level2: 1.20, level3: 1.15 }
  },
  retainingWall: {
    antiOverturning: { level1: 1.6, level2: 1.5, level3: 1.4 },
    antiSliding: { level1: 1.3, level2: 1.3, level3: 1.3 }
  }
};

// 土层参数经验值
const SOIL_PARAMS = {
  clay: { name: '黏性土', gamma: [18, 20], c: [10, 50], phi: [8, 20], Es: [4, 15], fak: [100, 250] },
  silt: { name: '粉土', gamma: [18, 20], c: [5, 20], phi: [15, 28], Es: [5, 15], fak: [100, 200] },
  sand: { name: '砂土', gamma: [18, 21], c: [0, 5], phi: [25, 38], Es: [10, 30], fak: [150, 350] },
  gravel: { name: '碎石土', gamma: [19, 22], c: [0, 5], phi: [30, 42], Es: [15, 40], fak: [200, 500] },
  fill: { name: '填土', gamma: [16, 19], c: [5, 15], phi: [8, 15], Es: [2, 8], fak: [60, 120] },
  softClay: { name: '软土', gamma: [15, 18], c: [5, 15], phi: [3, 10], Es: [1, 4], fak: [40, 80] },
  loess: { name: '黄土', gamma: [14, 18], c: [10, 30], phi: [15, 25], Es: [5, 20], fak: [100, 200] },
  rock: { name: '岩石', gamma: [22, 28], c: [100, 500], phi: [30, 50], Es: [100, 1000], fak: [500, 5000] },
  expansive: { name: '膨胀土', gamma: [18, 21], c: [20, 60], phi: [8, 20], Es: [5, 15], fak: [100, 200] },
  collapsible: { name: '湿陷性黄土', gamma: [14, 17], c: [10, 25], phi: [15, 22], Es: [4, 15], fak: [80, 180] }
};

// 岩石分类标准
const ROCK_CLASSIFICATION = {
  hardRock: { name: '硬质岩', examples: ['花岗岩', '玄武岩', '石英砂岩', '石灰岩'], uniaxialStrength: '>60MPa', description: '单轴抗压强度>60MPa的岩石' },
  mediumRock: { name: '中硬岩', examples: ['砂岩', '大理岩', '白云岩'], uniaxialStrength: '30-60MPa', description: '单轴抗压强度30-60MPa的岩石' },
  softRock: { name: '软质岩', examples: ['泥岩', '页岩', '泥质砂岩'], uniaxialStrength: '15-30MPa', description: '单轴抗压强度15-30MPa的岩石' },
  extremelySoftRock: { name: '极软岩', examples: ['全风化岩', '强风化岩'], uniaxialStrength: '<15MPa', description: '单轴抗压强度<15MPa的岩石' }
};

// 岩体完整程度
const ROCK_INTEGRITY = {
  intact: { name: '完整', RQD: '>90', Kv: '>0.75', description: '岩体完整，节理裂隙不发育' },
  relativelyIntact: { name: '较完整', RQD: '75-90', Kv: '0.55-0.75', description: '岩体较完整，节理裂隙较发育' },
  relativelyBroken: { name: '较破碎', RQD: '50-75', Kv: '0.35-0.55', description: '岩体较破碎，节理裂隙发育' },
  broken: { name: '破碎', RQD: '25-50', Kv: '0.15-0.35', description: '岩体破碎，节理裂隙很发育' },
  extremelyBroken: { name: '极破碎', RQD: '<25', Kv: '<0.15', description: '岩体极破碎，呈碎石状' }
};

// 土的工程分类
const SOIL_CLASSIFICATION = {
  gravel: { name: '碎石土', subtypes: ['漂石', '块石', '卵石', '碎石', '圆砾', '角砾'], description: '粒径>2mm的颗粒超过总质量50%' },
  sand: { name: '砂土', subtypes: ['砾砂', '粗砂', '中砂', '细砂', '粉砂'], description: '粒径>2mm的颗粒不超过总质量50%，且>0.075mm的超过50%' },
  silt: { name: '粉土', subtypes: ['砂质粉土', '黏质粉土'], description: '粒径>0.075mm的不超过50%，且Ip≤10' },
  clay: { name: '黏性土', subtypes: ['粉质黏土', '黏土'], description: 'Ip>10的土' },
  fill: { name: '填土', subtypes: ['素填土', '杂填土', '冲填土', '压实填土'], description: '人工堆填的土' }
};

/**
 * 获取所有知识库数据
 */
function getAllKnowledge() {
  return KNOWLEDGE_DATA;
}

/**
 * 根据分类获取知识库
 */
function getCategoryKnowledge(category) {
  return KNOWLEDGE_DATA[category] || null;
}

/**
 * 搜索知识库
 */
function searchKnowledge(keyword) {
  if (!keyword) return [];
  
  const results = [];
  const kw = keyword.toLowerCase();
  
  Object.keys(KNOWLEDGE_DATA).forEach(category => {
    const data = KNOWLEDGE_DATA[category];
    
    // 搜索公式
    data.formulas.forEach(item => {
      const searchText = `${item.name} ${item.formula} ${item.description} ${(item.tags || []).join(' ')}`.toLowerCase();
      if (searchText.includes(kw)) {
        results.push({ type: 'formula', category, category_name: data.name, data: item });
      }
    });
    
    // 搜索工法
    data.methods.forEach(item => {
      const searchText = `${item.name} ${item.description} ${item.applicable}`.toLowerCase();
      if (searchText.includes(kw)) {
        results.push({ type: 'method', category, category_name: data.name, data: item });
      }
    });
    
    // 搜索参数
    data.parameters.forEach(item => {
      const searchText = `${item.name} ${item.symbol} ${item.description}`.toLowerCase();
      if (searchText.includes(kw)) {
        results.push({ type: 'parameter', category, category_name: data.name, data: item });
      }
    });
  });
  
  return results;
}

/**
 * 获取安全系数
 */
function getSafetyFactors() {
  return SAFETY_FACTORS;
}

/**
 * 获取土层参数
 */
function getSoilParams() {
  return SOIL_PARAMS;
}

/**
 * 获取岩石分类
 */
function getRockClassification() {
  return ROCK_CLASSIFICATION;
}

/**
 * 获取岩体完整程度
 */
function getRockIntegrity() {
  return ROCK_INTEGRITY;
}

/**
 * 获取土的分类
 */
function getSoilClassification() {
  return SOIL_CLASSIFICATION;
}

/**
 * 获取知识库统计信息
 */
function getStatistics() {
  let formulas = 0;
  let methods = 0;
  let parameters = 0;
  const categories = Object.keys(KNOWLEDGE_DATA).length;
  
  Object.values(KNOWLEDGE_DATA).forEach(data => {
    formulas += data.formulas.length;
    methods += data.methods.length;
    parameters += data.parameters.length;
  });
  
  return { categories, formulas, methods, parameters };
}

module.exports = {
  getAllKnowledge,
  getCategoryKnowledge,
  searchKnowledge,
  getSafetyFactors,
  getSoilParams,
  getRockClassification,
  getRockIntegrity,
  getSoilClassification,
  getStatistics
};
