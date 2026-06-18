// core/advisor/pit-scheme.js - 基坑支护方案推荐

/**
 * 基坑支护方案推荐引擎
 * 参考规范：JGJ 120-2012《建筑基坑支护技术规程》
 * 基于规范和工程经验构建决策树
 */

/**
 * 基坑支护方案决策树
 * 三级决策：开挖深度 → 土质条件 → 周边环境
 */
const pitDecisionTree = {
  // 第一层：按开挖深度分类
  depth: {
    // 浅基坑：≤6m
    shallow: {
      maxDepth: 6,
      // 第二层：按土质条件分类
      soil: {
        clay: {
          name: '黏性土',
          // 第三层：按周边环境分类
          environment: {
            relaxed: {
              recommendation: '放坡开挖',
              alternatives: ['土钉墙', '水泥土重力式挡墙'],
              notes: '深度较浅，土质良好，环境宽松，放坡开挖最经济',
              designParams: {
                slopeRatio: '1:1.0~1:1.5',
                platformWidth: '≥1.0m（每级）',
                platformHeight: '≤4m（每级）'
              }
            },
            normal: {
              recommendation: '土钉墙',
              alternatives: ['水泥土重力式挡墙', '悬臂式排桩'],
              notes: '深度较浅，黏性土适合土钉墙施工，经济性好',
              designParams: {
                nailLength: '0.5~1.2倍开挖深度',
                nailSpacing: '1.0~2.0m',
                nailAngle: '5°~15°',
                faceThickness: '80~150mm'
              }
            },
            strict: {
              recommendation: '悬臂式排桩',
              alternatives: ['水泥土重力式挡墙'],
              notes: '环境要求较严，需控制变形，悬臂式排桩刚度较大',
              designParams: {
                pileDiameter: '600~1000mm',
                pileSpacing: '1.5~2.5倍桩径',
                embedDepth: '0.5~1.0倍开挖深度'
              }
            }
          }
        },
        sand: {
          name: '砂土',
          environment: {
            relaxed: {
              recommendation: '放坡开挖+降水',
              alternatives: ['土钉墙+降水', '水泥土搅拌桩帷幕+放坡'],
              notes: '砂土需注意降水和边坡稳定，建议配合井点降水',
              designParams: {
                slopeRatio: '1:1.25~1:1.5',
                dewateringType: '井点降水或管井降水'
              }
            },
            normal: {
              recommendation: '土钉墙+降水',
              alternatives: ['排桩+止水帷幕'],
              notes: '砂土中土钉墙需配合降水措施，确保施工安全',
              designParams: {
                nailLength: '0.6~1.2倍开挖深度',
                dewateringType: '井点降水'
              }
            },
            strict: {
              recommendation: '排桩+止水帷幕',
              alternatives: ['水泥土搅拌桩'],
              notes: '砂土环境下需严格控制水土流失，止水帷幕必不可少',
              designParams: {
                pileDiameter: '600~800mm',
                curtainType: '搅拌桩或旋喷桩',
                curtainDepth: '穿过砂层进入不透水层≥1.0m'
              }
            }
          }
        },
        softSoil: {
          name: '软土/淤泥',
          environment: {
            relaxed: {
              recommendation: '水泥土重力式挡墙',
              alternatives: ['放坡+卸载'],
              notes: '软土不宜采用土钉墙，水泥土重力式挡墙整体性好',
              designParams: {
                wallWidth: '0.6~1.0倍开挖深度',
                cementContent: '12%~15%',
                blockLength: '200~300mm'
              }
            },
            normal: {
              recommendation: '水泥土重力式挡墙',
              alternatives: ['SMW工法'],
              notes: '软土地区首选水泥土重力式挡墙，施工简便',
              designParams: {
                wallWidth: '0.7~1.2倍开挖深度',
                embedDepth: '0.8~1.2倍开挖深度'
              }
            },
            strict: {
              recommendation: 'SMW工法+内支撑',
              alternatives: ['排桩+内支撑'],
              notes: '软土深基坑需刚度较大的围护结构，SMW工法止水性好',
              designParams: {
                pileDiameter: '650~850mm',
                insertType: 'H型钢',
                supportType: '混凝土支撑或钢支撑'
              }
            }
          }
        }
      }
    },
    // 中等基坑：6~15m
    medium: {
      minDepth: 6,
      maxDepth: 15,
      soil: {
        clay: {
          name: '黏性土',
          environment: {
            relaxed: {
              recommendation: '土钉墙（≤12m）',
              alternatives: ['排桩+锚杆', '排桩+内支撑'],
              notes: '深度较大时土钉墙需验算稳定性，超过12m不建议使用',
              designParams: {
                nailLength: '0.6~1.0倍开挖深度',
                nailSpacing: '1.2~1.8m',
                stabilityCheck: '必须进行整体稳定性验算'
              }
            },
            normal: {
              recommendation: '排桩+锚杆',
              alternatives: ['排桩+内支撑', '地下连续墙'],
              notes: '黏性土中排桩+锚杆是常用方案，施工方便',
              designParams: {
                pileDiameter: '800~1200mm',
                anchorSpacing: '1.5~3.0m',
                anchorAngle: '15°~35°',
                anchorLength: '15~30m'
              }
            },
            strict: {
              recommendation: '排桩+内支撑',
              alternatives: ['地下连续墙+内支撑'],
              notes: '环境严格时内支撑变形控制更好，建议采用混凝土支撑',
              designParams: {
                pileDiameter: '800~1200mm',
                supportType: '混凝土支撑',
                supportSpacing: '3~6m'
              }
            }
          }
        },
        sand: {
          name: '砂土',
          environment: {
            relaxed: {
              recommendation: '排桩+止水帷幕+锚杆',
              alternatives: ['SMW工法+锚杆'],
              notes: '砂土需做好止水，止水帷幕是关键',
              designParams: {
                pileDiameter: '800~1000mm',
                curtainType: '搅拌桩或旋喷桩',
                anchorSpacing: '1.5~2.5m'
              }
            },
            normal: {
              recommendation: '排桩+止水帷幕+内支撑',
              alternatives: ['地下连续墙'],
              notes: '砂土深基坑建议内支撑，避免锚杆施工困难',
              designParams: {
                pileDiameter: '800~1200mm',
                supportType: '钢支撑或混凝土支撑',
                supportSpacing: '3~6m'
              }
            },
            strict: {
              recommendation: '地下连续墙+内支撑',
              alternatives: ['排桩+止水帷幕+内支撑'],
              notes: '严格环境下地连墙可靠性最高，止水效果好',
              designParams: {
                wallThickness: '600~1000mm',
                panelWidth: '4~6m',
                supportType: '混凝土支撑'
              }
            }
          }
        },
        softSoil: {
          name: '软土/淤泥',
          environment: {
            relaxed: {
              recommendation: 'SMW工法+内支撑',
              alternatives: ['水泥土重力式挡墙（≤10m）'],
              notes: '软土深基坑必须有支撑，SMW工法止水性好',
              designParams: {
                pileDiameter: '650~850mm',
                insertType: 'H型钢',
                supportType: '钢支撑'
              }
            },
            normal: {
              recommendation: '排桩+内支撑+止水帷幕',
              alternatives: ['地下连续墙'],
              notes: '软土深基坑需刚度大的支撑体系',
              designParams: {
                pileDiameter: '800~1000mm',
                supportType: '混凝土支撑',
                curtainType: '搅拌桩帷幕'
              }
            },
            strict: {
              recommendation: '地下连续墙+内支撑（逆作法）',
              alternatives: ['排桩+内支撑'],
              notes: '严格变形控制可考虑逆作法',
              designParams: {
                wallThickness: '800~1000mm',
                constructionMethod: '逆作法',
                supportType: '主体结构梁板'
              }
            }
          }
        }
      }
    },
    // 深基坑：>15m
    deep: {
      minDepth: 15,
      recommendation: '地下连续墙+内支撑',
      alternatives: ['排桩+多道内支撑', '逆作法'],
      notes: '超深基坑建议采用地下连续墙，必要时采用逆作法',
      designParams: {
        wallThickness: '800~1200mm',
        supportType: '多道混凝土支撑',
        supportLevels: '3~5道',
        constructionMethod: '顺作法或逆作法'
      }
    }
  }
};

/**
 * 根据工程条件推荐支护方案
 * @param {Object} params - 工程条件参数
 * @returns {Object} 推荐方案
 */
const recommendPitScheme = (params) => {
  const {
    depth,           // 开挖深度(m)
    soilType,        // 土质类型：clay/sand/softSoil
    environment,     // 周边环境：relaxed/normal/strict
    waterLevel,      // 地下水位(m)
    surcharge,       // 地面超载(kPa)
    pitLevel         // 基坑安全等级
  } = params;

  // 第一层：按深度分类
  let depthCategory;
  if (depth <= 6) {
    depthCategory = pitDecisionTree.depth.shallow;
  } else if (depth <= 15) {
    depthCategory = pitDecisionTree.depth.medium;
  } else {
    depthCategory = pitDecisionTree.depth.deep;
  }

  // 深基坑直接返回
  if (depth > 15) {
    return {
      depthCategory: '深基坑',
      recommendation: depthCategory.recommendation,
      alternatives: depthCategory.alternatives,
      notes: depthCategory.notes,
      designParams: depthCategory.designParams,
      warnings: ['超深基坑需进行专项论证', '建议采用逆作法控制变形']
    };
  }

  // 第二层：按土质分类
  const soilData = depthCategory.soil[soilType];
  if (!soilData) {
    return {
      error: `不支持的土质类型：${soilType}`,
      supportedTypes: Object.keys(depthCategory.soil)
    };
  }

  // 第三层：按环境分类
  const envData = soilData.environment[environment];
  if (!envData) {
    return {
      error: `不支持的环境类型：${environment}`,
      supportedTypes: Object.keys(soilData.environment)
    };
  }

  // 生成推荐结果
  const result = {
    depthCategory: depth <= 6 ? '浅基坑' : '中等基坑',
    soilType: soilData.name,
    environment: environment === 'relaxed' ? '宽松' : environment === 'normal' ? '一般' : '严格',
    recommendation: envData.recommendation,
    alternatives: envData.alternatives,
    notes: envData.notes,
    designParams: envData.designParams,
    warnings: [],
    normativeBasis: 'JGJ 120-2012《建筑基坑支护技术规程》',
    recommendations: [
      '本推荐为初步方案，详细设计需依据JGJ 120-2012进行',
      '应按JGJ 120-2012第3.1.3节确定基坑安全等级',
      '应按JGJ 120-2012第4.2节进行稳定性验算',
      '应按JGJ 120-2012第8.2节进行监测设计'
    ],
    consultationTip: '详细方案请联系专业设计院，依据JGJ 120-2012进行设计'
  };

  // 添加特殊情况警告
  if (depth > 10 && soilType === 'softSoil') {
    result.warnings.push('软土深基坑变形控制难度大，建议进行专项设计');
  }

  if (waterLevel && waterLevel < depth) {
    result.warnings.push('地下水位高于坑底，需配合降水或止水措施');
  }

  if (surcharge && surcharge > 20) {
    result.warnings.push('地面超载较大，需验算附加荷载对围护结构的影响');
  }

  if (pitLevel === '一级') {
    result.warnings.push('一级基坑需进行专项论证，建议进行信息化施工');
  }

  return result;
};

/**
 * 获取方案的详细说明
 * @param {string} schemeName - 方案名称
 * @returns {Object} 方案详情
 */
const getSchemeDetail = (schemeName) => {
  const schemeDetails = {
    '放坡开挖': {
      description: '直接放坡开挖，是最经济的基坑支护方式',
      applicableConditions: ['深度≤6m', '场地开阔', '土质较好', '无严格变形要求'],
      advantages: ['造价最低', '施工简便', '工期短'],
      disadvantages: ['占地大', '深度受限', '不适用于软土'],
      keyPoints: ['坡率根据土质确定', '每级坡高≤4m', '设置平台和排水沟']
    },
    '土钉墙': {
      description: '在土体中设置土钉，形成复合土体维持基坑稳定',
      applicableConditions: ['深度≤12m', '地下水位以上或降水后', '无严格变形要求'],
      advantages: ['施工简便', '造价较低', '可信息化施工'],
      disadvantages: ['不适用于软土', '深度受限', '变形较大'],
      keyPoints: ['土钉长度0.5~1.2倍开挖深度', '间距1.0~2.0m', '面层厚度80~150mm']
    },
    '排桩+锚杆': {
      description: '排桩作为围护结构，锚杆提供水平支撑力',
      applicableConditions: ['深度6~15m', '土质较好', '周边有锚杆施工空间'],
      advantages: ['刚度大', '变形小', '施工空间开阔'],
      disadvantages: ['造价较高', '需要锚杆施工空间', '不适用于软土'],
      keyPoints: ['桩径800~1200mm', '锚杆间距1.5~3.0m', '锚杆倾角15°~35°']
    },
    '排桩+内支撑': {
      description: '排桩作为围护结构，内支撑提供水平支撑力',
      applicableConditions: ['深度6~20m', '各种土质', '周边环境严格'],
      advantages: ['变形控制好', '适用于各种土质', '不影响周边'],
      disadvantages: ['造价高', '支撑影响土方开挖', '需拆除支撑'],
      keyPoints: ['支撑间距3~6m', '支撑预加轴力', '分层开挖分层支撑']
    },
    '地下连续墙': {
      description: '现浇钢筋混凝土地下连续墙体，兼具挡土和止水功能',
      applicableConditions: ['深度>10m', '严格变形要求', '地下水丰富'],
      advantages: ['刚度最大', '止水效果好', '适用深度大'],
      disadvantages: ['造价最高', '施工设备大', '需专业队伍'],
      keyPoints: ['墙厚600~1200mm', '幅宽4~6m', '接头处理是关键']
    },
    '水泥土重力式挡墙': {
      description: '水泥土搅拌桩相互搭接形成重力式挡墙',
      applicableConditions: ['深度≤10m', '软土地区', '无严格变形要求'],
      advantages: ['止水效果好', '施工简便', '造价适中'],
      disadvantages: ['刚度较小', '深度受限', '变形较大'],
      keyPoints: ['墙宽0.6~1.2倍开挖深度', '水泥掺量12%~15%', '搭接宽度≥200mm']
    },
    'SMW工法': {
      description: '水泥土搅拌桩内插入H型钢，兼具挡土和止水功能',
      applicableConditions: ['深度8~15m', '软土地区', '需要止水'],
      advantages: ['止水效果好', '刚度较大', '型钢可回收'],
      disadvantages: ['造价较高', '型钢回收率受施工影响'],
      keyPoints: ['桩径650~850mm', '型钢间距1.0~1.5m', '搅拌均匀是关键']
    }
  };

  return schemeDetails[schemeName] || {
    description: '暂无该方案的详细说明',
    applicableConditions: [],
    advantages: [],
    disadvantages: [],
    keyPoints: []
  };
};

module.exports = {
  pitDecisionTree,
  recommendPitScheme,
  getSchemeDetail
};
