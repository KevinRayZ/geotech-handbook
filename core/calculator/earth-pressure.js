// core/calculator/earth-pressure.js - 土压力计算器

const GeoCalculator = require('./base');

/**
 * 土压力计算器
 * 支持朗肯理论和库仑理论计算主动、被动、静止土压力
 */
class EarthPressureCalculator extends GeoCalculator {
  constructor() {
    super({
      id: 'earth-pressure',
      name: '土压力计算器',
      category: 'pit',
      description: '计算主动、被动、静止土压力，支持朗肯和库仑理论',
      formula: 'σa = γzKa - 2c√Ka',
      inputSchema: [
        {
          key: 'method',
          label: '计算理论',
          type: 'select',
          options: ['朗肯', '库仑'],
          required: true,
          defaultValue: '朗肯',
          description: '选择土压力计算理论'
        },
        {
          key: 'pressureType',
          label: '土压力类型',
          type: 'select',
          options: ['主动', '被动', '静止'],
          required: true,
          defaultValue: '主动',
          description: '选择要计算的土压力类型'
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
          description: '土的天然重度'
        },
        {
          key: 'phi',
          label: '内摩擦角φ',
          type: 'number',
          unit: '°',
          min: 0,
          max: 50,
          required: true,
          placeholder: '25',
          description: '土的内摩擦角'
        },
        {
          key: 'c',
          label: '粘聚力c',
          type: 'number',
          unit: 'kPa',
          min: 0,
          max: 200,
          required: false,
          defaultValue: 0,
          placeholder: '0',
          description: '土的粘聚力，无粘性土填0'
        },
        {
          key: 'depth',
          label: '计算深度z',
          type: 'number',
          unit: 'm',
          min: 0.1,
          max: 50,
          required: true,
          placeholder: '5.0',
          description: '从地表到计算点的垂直距离'
        },
        {
          key: 'surcharge',
          label: '地面超载q',
          type: 'number',
          unit: 'kPa',
          min: 0,
          max: 200,
          required: false,
          defaultValue: 0,
          placeholder: '0',
          description: '地面均布超载'
        },
        {
          key: 'alpha',
          label: '墙背倾角α',
          type: 'number',
          unit: '°',
          min: -30,
          max: 30,
          required: false,
          defaultValue: 0,
          placeholder: '0',
          description: '墙背与垂直面的夹角，俯斜为正（仅库仑理论）'
        },
        {
          key: 'delta',
          label: '墙土摩擦角δ',
          type: 'number',
          unit: '°',
          min: 0,
          max: 30,
          required: false,
          defaultValue: 0,
          placeholder: '0',
          description: '墙背与土体间的摩擦角（仅库仑理论）'
        },
        {
          key: 'beta',
          label: '填土坡角β',
          type: 'number',
          unit: '°',
          min: 0,
          max: 30,
          required: false,
          defaultValue: 0,
          placeholder: '0',
          description: '填土表面与水平面的夹角（仅库仑理论）'
        }
      ],
      outputSchema: [
        { key: 'K', label: '土压力系数', unit: '无量纲', description: '计算得到的土压力系数' },
        { key: 'sigmaAtBottom', label: '坑底处土压力强度', unit: 'kPa', description: '计算深度处的土压力强度' },
        { key: 'totalForce', label: '总土压力', unit: 'kN/m', description: '单位墙长的总土压力' },
        { key: 'forcePoint', label: '合力作用点', unit: 'm', description: '合力作用点距墙底的距离' }
      ],
      references: [
        { code: 'JGJ 120-2012', clause: '3.4', description: '建筑基坑支护技术规程' },
        { code: 'GB 50007-2011', clause: '9.3', description: '建筑地基基础设计规范' }
      ]
    });
  }

  /**
   * 执行土压力计算
   * @param {Object} params - 输入参数
   * @returns {Object} 计算结果
   */
  calculate(params) {
    const {
      method = '朗肯',
      pressureType = '主动',
      gamma,
      phi,
      c = 0,
      depth,
      surcharge = 0,
      alpha = 0,
      delta = 0,
      beta = 0
    } = params;

    const phiRad = this.toRadians(phi);
    let K, sigma, sigmaAtBottom, warnings = [];

    if (method === '朗肯') {
      // 朗肯理论计算
      K = this._rankineCoeff(pressureType, phiRad);
      
      if (pressureType === '主动') {
        // 主动土压力：σa = γzKa - 2c√Ka + qKa
        const sqrtKa = Math.sqrt(K);
        sigmaAtBottom = gamma * depth * K - 2 * c * sqrtKa + surcharge * K;
        
        // 临界深度（粘性土可能出现负土压力）
        if (c > 0) {
          const z0 = (2 * c * sqrtKa - surcharge * K) / (gamma * K);
          if (z0 > 0) {
            warnings.push(`粘性土临界深度z₀=${this.round(z0)}m，此深度以上土压力为0`);
          }
        }
      } else if (pressureType === '被动') {
        // 被动土压力：σp = γzKp + 2c√Kp + qKp
        const sqrtKp = Math.sqrt(K);
        sigmaAtBottom = gamma * depth * K + 2 * c * sqrtKp + surcharge * K;
      } else {
        // 静止土压力：σ0 = γzK0 + qK0
        sigmaAtBottom = gamma * depth * K + surcharge * K;
      }
    } else {
      // 库仑理论计算
      K = this._coulombCoeff(pressureType, phiRad, alpha, delta, beta);
      
      if (pressureType === '主动') {
        sigmaAtBottom = gamma * depth * K + surcharge * K;
      } else if (pressureType === '被动') {
        sigmaAtBottom = gamma * depth * K + surcharge * K;
      } else {
        // 库仑理论无静止土压力，使用朗肯
        K = this._rankineCoeff('静止', phiRad);
        sigmaAtBottom = gamma * depth * K + surcharge * K;
        warnings.push('库仑理论无静止土压力计算，已自动切换为朗肯理论');
      }
    }

    // 确保土压力不为负
    if (sigmaAtBottom < 0) {
      sigmaAtBottom = 0;
      warnings.push('计算结果为负值，已自动调整为0');
    }

    // 总土压力（简化为三角形分布）
    const totalForce = 0.5 * sigmaAtBottom * depth;
    
    // 合力作用点（三角形分布为距墙底h/3）
    const forcePoint = depth / 3;

    return this.formatResult({
      params: {
        method,
        pressureType,
        gamma,
        phi,
        c,
        depth,
        surcharge,
        alpha,
        delta,
        beta
      },
      results: {
        K: {
          value: this.round(K, 4),
          label: `${method}${pressureType}土压力系数`,
          unit: '无量纲'
        },
        sigmaAtBottom: {
          value: this.round(sigmaAtBottom, 2),
          label: '计算深度处土压力强度',
          unit: 'kPa'
        },
        totalForce: {
          value: this.round(totalForce, 2),
          label: '总土压力',
          unit: 'kN/m'
        },
        forcePoint: {
          value: this.round(forcePoint, 2),
          label: '合力作用点（距墙底）',
          unit: 'm'
        }
      },
      summary: `${method}${pressureType}土压力系数K=${this.round(K, 4)}，计算深度处土压力强度${this.round(sigmaAtBottom, 2)}kPa，总土压力${this.round(totalForce, 2)}kN/m，合力作用点距墙底${this.round(forcePoint, 2)}m`,
      warnings
    });
  }

  /**
   * 朗肯土压力系数计算
   * @param {string} type - 土压力类型
   * @param {number} phiRad - 内摩擦角（弧度）
   * @returns {number} 土压力系数
   */
  _rankineCoeff(type, phiRad) {
    switch (type) {
      case '主动':
        // Ka = tan²(45° - φ/2)
        return Math.pow(Math.tan(Math.PI / 4 - phiRad / 2), 2);
      case '被动':
        // Kp = tan²(45° + φ/2)
        return Math.pow(Math.tan(Math.PI / 4 + phiRad / 2), 2);
      case '静止':
        // K0 = 1 - sinφ
        return 1 - Math.sin(phiRad);
      default:
        return 0;
    }
  }

  /**
   * 库仑主动土压力系数计算
   * @param {string} type - 土压力类型
   * @param {number} phiRad - 内摩擦角（弧度）
   * @param {number} alphaDeg - 墙背倾角（度）
   * @param {number} deltaDeg - 墙土摩擦角（度）
   * @param {number} betaDeg - 填土坡角（度）
   * @returns {number} 土压力系数
   */
  _coulombCoeff(type, phiRad, alphaDeg, deltaDeg, betaDeg) {
    const alpha = this.toRadians(alphaDeg || 0);
    const delta = this.toRadians(deltaDeg || 0);
    const beta = this.toRadians(betaDeg || 0);

    if (type === '主动') {
      // 库仑主动土压力系数
      const cosAlpha = Math.cos(alpha);
      const cosAlphaDelta = Math.cos(alpha + delta);
      const cosPhiAlpha = Math.cos(phiRad - alpha);
      const sinPhiDelta = Math.sin(phiRad + delta);
      const sinPhiBeta = Math.sin(phiRad - beta);
      const cosAlphaBeta = Math.cos(alpha - beta);

      const numerator = Math.pow(cosPhiAlpha, 2);
      const denominator = Math.pow(cosAlpha, 2) * cosAlphaDelta * 
        Math.pow(1 + Math.sqrt((sinPhiDelta * sinPhiBeta) / (cosAlphaDelta * cosAlphaBeta)), 2);

      return numerator / denominator;
    } else if (type === '被动') {
      // 库仑被动土压力系数
      const cosAlpha = Math.cos(alpha);
      const cosAlphaDelta = Math.cos(alpha - delta);
      const cosPhiAlpha = Math.cos(phiRad + alpha);
      const sinPhiDelta = Math.sin(phiRad + delta);
      const sinPhiBeta = Math.sin(phiRad + beta);
      const cosAlphaBeta = Math.cos(alpha - beta);

      const numerator = Math.pow(cosPhiAlpha, 2);
      const denominator = Math.pow(cosAlpha, 2) * cosAlphaDelta * 
        Math.pow(1 - Math.sqrt((sinPhiDelta * sinPhiBeta) / (cosAlphaDelta * cosAlphaBeta)), 2);

      return numerator / denominator;
    }

    return 0;
  }
}

module.exports = new EarthPressureCalculator();
