// core/calculator/stability-pit.js - 基坑稳定性验算计算器

const GeoCalculator = require('./base');

/**
 * 基坑稳定性验算计算器
 * 包含抗隆起、抗倾覆、抗滑移、抗流土、抗突涌等验算
 */
class PitStabilityCalculator extends GeoCalculator {
  constructor() {
    super({
      id: 'pit-stability',
      name: '基坑稳定性验算',
      category: 'pit',
      description: '基坑稳定性验算，包含抗隆起、抗倾覆、抗滑移、抗流土、抗突涌',
      formula: 'Fs = 抗力矩 / 滑动力矩',
      inputSchema: [
        {
          key: 'checkType',
          label: '验算类型',
          type: 'select',
          options: ['抗隆起', '抗倾覆', '抗滑移', '抗流土', '抗突涌'],
          required: true,
          defaultValue: '抗隆起',
          description: '选择要验算的稳定性类型'
        },
        {
          key: 'pitLevel',
          label: '基坑安全等级',
          type: 'select',
          options: ['一级', '二级', '三级'],
          required: true,
          defaultValue: '二级',
          description: '基坑安全等级'
        },
        {
          key: 'excavationDepth',
          label: '开挖深度h',
          type: 'number',
          unit: 'm',
          min: 1,
          max: 30,
          required: true,
          placeholder: '8.0',
          description: '基坑开挖深度'
        },
        {
          key: 'embedDepth',
          label: '入土深度t',
          type: 'number',
          unit: 'm',
          min: 0,
          max: 30,
          required: false,
          placeholder: '5.0',
          description: '围护结构入土深度（抗隆起/抗倾覆/抗滑移需要）'
        },
        {
          key: 'gamma',
          label: '土体重度γ',
          type: 'number',
          unit: 'kN/m³',
          min: 10,
          max: 25,
          required: true,
          placeholder: '18.5',
          description: '坑底以下土的天然重度'
        },
        {
          key: 'c',
          label: '粘聚力c',
          type: 'number',
          unit: 'kPa',
          min: 0,
          max: 200,
          required: true,
          placeholder: '15',
          description: '坑底以下土的粘聚力'
        },
        {
          key: 'phi',
          label: '内摩擦角φ',
          type: 'number',
          unit: '°',
          min: 0,
          max: 50,
          required: true,
          placeholder: '20',
          description: '坑底以下土的内摩擦角'
        },
        {
          key: 'surcharge',
          label: '地面超载q',
          type: 'number',
          unit: 'kPa',
          min: 0,
          max: 200,
          required: false,
          defaultValue: 10,
          placeholder: '10',
          description: '坑边地面均布超载'
        },
        {
          key: 'waterLevel',
          label: '地下水位深度',
          type: 'number',
          unit: 'm',
          min: 0,
          max: 30,
          required: false,
          placeholder: '2.0',
          description: '地下水位距地表深度（抗流土/抗突涌需要）'
        },
        {
          key: 'confinedWaterHead',
          label: '承压水头高度',
          type: 'number',
          unit: 'm',
          min: 0,
          max: 30,
          required: false,
          placeholder: '10',
          description: '承压含水层水头高度（抗突涌需要）'
        },
        {
          key: 'confinedTopThickness',
          label: '承压层顶板厚度',
          type: 'number',
          unit: 'm',
          min: 0,
          max: 20,
          required: false,
          placeholder: '3',
          description: '承压含水层顶板至坑底的土层厚度（抗突涌需要）'
        }
      ],
      outputSchema: [
        { key: 'Fs', label: '安全系数', unit: '无量纲', description: '计算得到的安全系数' },
        { key: 'requiredFs', label: '要求安全系数', unit: '无量纲', description: '规范要求的最小安全系数' },
        { key: 'passed', label: '是否满足', unit: '', description: '是否满足规范要求' }
      ],
      references: [
        { code: 'JGJ 120-2012', clause: '4.2', description: '建筑基坑支护技术规程' },
        { code: 'GB 50497-2019', clause: '5.1', description: '建筑基坑工程监测技术标准' }
      ]
    });
  }

  /**
   * 执行稳定性验算
   */
  calculate(params) {
    const {
      checkType,
      pitLevel,
      excavationDepth,
      embedDepth = 0,
      gamma,
      c,
      phi,
      surcharge = 10,
      waterLevel = 0,
      confinedWaterHead = 0,
      confinedTopThickness = 0
    } = params;

    const phiRad = this.toRadians(phi);
    let result;

    switch (checkType) {
      case '抗隆起':
        result = this._checkAntiHeave({ gamma, c, phi, phiRad, excavationDepth, embedDepth, surcharge });
        break;
      case '抗倾覆':
        result = this._checkAntiOverturning({ gamma, c, phi, phiRad, excavationDepth, embedDepth, surcharge });
        break;
      case '抗滑移':
        result = this._checkAntiSliding({ gamma, c, phi, phiRad, excavationDepth, embedDepth, surcharge });
        break;
      case '抗流土':
        result = this._checkAntiPiping({ gamma, embedDepth, waterLevel, excavationDepth });
        break;
      case '抗突涌':
        result = this._checkAntiBurst({ gamma, confinedTopThickness, confinedWaterHead });
        break;
      default:
        result = this._checkAntiHeave({ gamma, c, phi, phiRad, excavationDepth, embedDepth, surcharge });
    }

    // 获取规范要求的安全系数
    const requiredFs = this._getRequiredSafetyFactor(checkType, pitLevel);
    const passed = result.Fs >= requiredFs;

    return this.formatResult({
      params: {
        checkType,
        pitLevel,
        excavationDepth,
        embedDepth,
        gamma,
        c,
        phi,
        surcharge,
        waterLevel,
        confinedWaterHead,
        confinedTopThickness
      },
      results: {
        Fs: {
          value: this.round(result.Fs, 2),
          label: '计算安全系数',
          unit: '无量纲'
        },
        requiredFs: {
          value: requiredFs,
          label: '要求安全系数',
          unit: '无量纲'
        },
        passed: {
          value: passed,
          label: '验算结果',
          unit: ''
        },
        details: result.details || {}
      },
      summary: `${checkType}验算：安全系数Fs=${this.round(result.Fs, 2)}，要求≥${requiredFs}，${passed ? '满足' : '不满足'}规范要求`,
      warnings: passed ? [] : [`安全系数不满足${pitLevel}基坑要求，建议增加入土深度或采取加固措施`]
    });
  }

  /**
   * 抗隆起稳定性验算 - Prandtl公式
   */
  _checkAntiHeave({ gamma, c, phi, phiRad, excavationDepth, embedDepth, surcharge }) {
    // 地基承载力系数
    const Nq = Math.exp(Math.PI * Math.tan(phiRad)) * Math.pow(Math.tan(Math.PI / 4 + phiRad / 2), 2);
    const Nc = phi > 0 ? (Nq - 1) / Math.tan(phiRad) : Math.PI + 2;

    // 安全系数
    const numerator = gamma * embedDepth * Nq + c * Nc;
    const denominator = gamma * excavationDepth + surcharge;
    const Fs = this.safeDivide(numerator, denominator, 0);

    return {
      Fs,
      details: {
        Nq: this.round(Nq, 2),
        Nc: this.round(Nc, 2),
        numerator: this.round(numerator, 2),
        denominator: this.round(denominator, 2),
        formula: 'Fs = (γtNq + cNc) / (γh + q)'
      }
    };
  }

  /**
   * 抗倾覆稳定性验算
   */
  _checkAntiOverturning({ gamma, c, phi, phiRad, excavationDepth, embedDepth, surcharge }) {
    const Ka = Math.pow(Math.tan(Math.PI / 4 - phiRad / 2), 2);
    const Kp = Math.pow(Math.tan(Math.PI / 4 + phiRad / 2), 2);

    // 主动侧倾覆力矩
    const activeForce = 0.5 * Ka * gamma * Math.pow(excavationDepth + embedDepth, 2) + surcharge * Ka * (excavationDepth + embedDepth);
    const activeMoment = activeForce * (excavationDepth + embedDepth) / 3;

    // 被动侧抗倾覆力矩
    const passiveForce = 0.5 * Kp * gamma * Math.pow(embedDepth, 2) + 2 * c * Math.sqrt(Kp) * embedDepth;
    const passiveMoment = passiveForce * embedDepth / 3;

    const Fs = this.safeDivide(passiveMoment, activeMoment, 0);

    return {
      Fs,
      details: {
        Ka: this.round(Ka, 4),
        Kp: this.round(Kp, 4),
        activeMoment: this.round(activeMoment, 2),
        passiveMoment: this.round(passiveMoment, 2),
        formula: 'Fs = 被动抗倾覆力矩 / 主动倾覆力矩'
      }
    };
  }

  /**
   * 抗滑移稳定性验算
   */
  _checkAntiSliding({ gamma, c, phi, phiRad, excavationDepth, embedDepth, surcharge }) {
    const Ka = Math.pow(Math.tan(Math.PI / 4 - phiRad / 2), 2);
    const Kp = Math.pow(Math.tan(Math.PI / 4 + phiRad / 2), 2);

    // 主动侧滑动力
    const activeForce = 0.5 * Ka * gamma * Math.pow(excavationDepth + embedDepth, 2) + surcharge * Ka * (excavationDepth + embedDepth);

    // 被动侧抗滑力
    const passiveForce = 0.5 * Kp * gamma * Math.pow(embedDepth, 2) + 2 * c * Math.sqrt(Kp) * embedDepth;

    // 基底摩擦力
    const frictionForce = c * (excavationDepth + embedDepth);

    const Fs = this.safeDivide(passiveForce + frictionForce, activeForce, 0);

    return {
      Fs,
      details: {
        activeForce: this.round(activeForce, 2),
        passiveForce: this.round(passiveForce, 2),
        frictionForce: this.round(frictionForce, 2),
        formula: 'Fs = (被动抗力 + 摩擦力) / 主动力'
      }
    };
  }

  /**
   * 抗流土稳定性验算
   */
  _checkAntiPiping({ gamma, embedDepth, waterLevel, excavationDepth }) {
    const gammaW = 9.81; // 水的重度
    const gammaPrime = gamma - gammaW; // 有效重度
    const hw = excavationDepth - waterLevel; // 水头差

    const Fs = this.safeDivide(gammaPrime * embedDepth, gammaW * hw, 0);

    return {
      Fs,
      details: {
        gammaPrime: this.round(gammaPrime, 2),
        hw: this.round(hw, 2),
        formula: 'Fs = γ\'t / γwhw'
      }
    };
  }

  /**
   * 抗突涌稳定性验算
   */
  _checkAntiBurst({ gamma, confinedTopThickness, confinedWaterHead }) {
    const gammaW = 9.81;

    const Fs = this.safeDivide(gamma * confinedTopThickness, gammaW * confinedWaterHead, 0);

    return {
      Fs,
      details: {
        topWeight: this.round(gamma * confinedTopThickness, 2),
        waterPressure: this.round(gammaW * confinedWaterHead, 2),
        formula: 'Fs = γD / γwH'
      }
    };
  }

  /**
   * 获取规范要求的安全系数
   */
  _getRequiredSafetyFactor(checkType, pitLevel) {
    const factors = {
      '抗隆起': { '一级': 1.8, '二级': 1.6, '三级': 1.4 },
      '抗倾覆': { '一级': 1.2, '二级': 1.15, '三级': 1.1 },
      '抗滑移': { '一级': 1.3, '二级': 1.2, '三级': 1.1 },
      '抗流土': { '一级': 2.0, '二级': 2.0, '三级': 2.0 },
      '抗突涌': { '一级': 1.1, '二级': 1.1, '三级': 1.1 }
    };

    return factors[checkType]?.[pitLevel] || 1.5;
  }
}

module.exports = new PitStabilityCalculator();
