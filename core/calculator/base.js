// core/calculator/base.js - 计算器基类

/**
 * 岩土工程计算器基类
 * 所有计算器都继承此类，提供统一的验证、计算、格式化接口
 */
class GeoCalculator {
  constructor(config) {
    this.id = config.id;
    this.name = config.name;
    this.category = config.category;
    this.description = config.description || '';
    this.inputSchema = config.inputSchema || [];
    this.outputSchema = config.outputSchema || [];
    this.references = config.references || [];
    this.formula = config.formula || '';
  }

  /**
   * 验证输入参数
   * @param {Object} params - 输入参数
   * @returns {Object} { valid: boolean, errors: string[] }
   */
  validate(params) {
    const errors = [];
    
    for (const field of this.inputSchema) {
      const value = params[field.key];
      
      // 必填验证
      if (field.required && (value === undefined || value === null || value === '')) {
        errors.push(`${field.label}为必填项`);
        continue;
      }
      
      // 如果值为空且非必填，跳过后续验证
      if (value === undefined || value === null || value === '') {
        continue;
      }
      
      // 类型验证
      if (field.type === 'number' && isNaN(Number(value))) {
        errors.push(`${field.label}必须为数字`);
        continue;
      }
      
      // 最小值验证
      if (field.min !== undefined && Number(value) < field.min) {
        errors.push(`${field.label}不能小于${field.min}${field.unit || ''}`);
      }
      
      // 最大值验证
      if (field.max !== undefined && Number(value) > field.max) {
        errors.push(`${field.label}不能大于${field.max}${field.unit || ''}`);
      }
      
      // 选项验证
      if (field.type === 'select' && field.options && !field.options.includes(value)) {
        errors.push(`${field.label}的值无效`);
      }
    }
    
    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * 执行计算（子类必须实现）
   * @param {Object} params - 输入参数
   * @returns {Object} 计算结果
   */
  calculate(params) {
    throw new Error('子类必须实现calculate方法');
  }

  /**
   * 格式化输出结果
   * @param {Object} rawResult - 原始计算结果
   * @returns {Object} 格式化后的结果
   */
  formatResult(rawResult) {
    return {
      calculatorId: this.id,
      calculatorName: this.name,
      category: this.category,
      timestamp: new Date().toISOString(),
      params: rawResult.params || {},
      results: rawResult.results || {},
      summary: rawResult.summary || '',
      warnings: rawResult.warnings || [],
      references: this.references,
      formula: this.formula
    };
  }

  /**
   * 获取输入字段定义
   * @returns {Array} 输入字段定义数组
   */
  getInputFields() {
    return this.inputSchema.map(field => ({
      key: field.key,
      label: field.label,
      type: field.type || 'number',
      unit: field.unit || '',
      placeholder: field.placeholder || `请输入${field.label}`,
      required: field.required || false,
      min: field.min,
      max: field.max,
      options: field.options || [],
      defaultValue: field.defaultValue,
      description: field.description || ''
    }));
  }

  /**
   * 获取输出字段定义
   * @returns {Array} 输出字段定义数组
   */
  getOutputFields() {
    return this.outputSchema.map(field => ({
      key: field.key,
      label: field.label,
      unit: field.unit || '',
      description: field.description || ''
    }));
  }

  /**
   * 角度转弧度
   * @param {number} degrees - 角度
   * @returns {number} 弧度
   */
  toRadians(degrees) {
    return degrees * Math.PI / 180;
  }

  /**
   * 弧度转角度
   * @param {number} radians - 弧度
   * @returns {number} 角度
   */
  toDegrees(radians) {
    return radians * 180 / Math.PI;
  }

  /**
   * 保留指定小数位数
   * @param {number} value - 数值
   * @param {number} digits - 小数位数
   * @returns {number} 处理后的数值
   */
  round(value, digits = 2) {
    const factor = Math.pow(10, digits);
    return Math.round(value * factor) / factor;
  }

  /**
   * 安全除法（避免除以0）
   * @param {number} numerator - 分子
   * @param {number} denominator - 分母
   * @param {number} defaultValue - 默认值
   * @returns {number} 结果
   */
  safeDivide(numerator, denominator, defaultValue = 0) {
    if (denominator === 0 || isNaN(denominator)) {
      return defaultValue;
    }
    return numerator / denominator;
  }
}

module.exports = GeoCalculator;
