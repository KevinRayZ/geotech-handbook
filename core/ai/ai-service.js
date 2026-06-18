/**
 * AI服务模块
 * 集成DashScope API提供智能搜索和问答功能
 */

// API配置
const AI_CONFIG = {
  // OpenAI兼容模式接口
  baseUrl: 'https://ws-sc6z2r215vvyg5ai.cn-beijing.maas.aliyuncs.com/compatible-mode/v1',
  apiKey: 'sk-ws-H.RPMLDPX.wrJx.MEUCIQC2W_83p-dbN3NFbA87RmNkCeq1qsUPP7ID1Q3xOmAVbgIgQdM3WjcHFJSfIHhOxg_HYjyqNlXRHLxaRek7cJEMZ90',
  model: 'qwen-turbo', // 使用通义千问turbo模型
  maxTokens: 1024,
  temperature: 0.7
};

/**
 * 系统提示词 - 岩土工程专家
 */
const SYSTEM_PROMPT = `你是一位资深的岩土工程专家助手，精通以下领域：
1. 基坑工程：土压力计算（朗肯、库仑）、稳定性验算、支护设计
2. 边坡工程：稳定性分析、抗滑桩设计、锚杆设计
3. 地基处理：复合地基理论、CFG桩、水泥土搅拌桩、强夯法
4. 工程地质：岩土分类、参数取值、勘察规范

你的回答应该：
- 专业准确，引用规范标准
- 简洁明了，直击要点
- 提供具体的公式和参数
- 给出实用的工程建议

当用户询问岩土工程相关问题时，请提供专业、准确、实用的回答。`;

/**
 * 调用AI API
 * @param {string} userMessage 用户消息
 * @param {Array} history 历史对话（可选）
 * @returns {Promise<string>} AI回复
 */
async function chat(userMessage, history = []) {
  try {
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...history,
      { role: 'user', content: userMessage }
    ];

    const response = await new Promise((resolve, reject) => {
      wx.request({
        url: `${AI_CONFIG.baseUrl}/chat/completions`,
        method: 'POST',
        header: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${AI_CONFIG.apiKey}`
        },
        data: {
          model: AI_CONFIG.model,
          messages: messages,
          max_tokens: AI_CONFIG.maxTokens,
          temperature: AI_CONFIG.temperature,
          stream: false
        },
        success: (res) => {
          if (res.statusCode === 200 && res.data.choices && res.data.choices.length > 0) {
            resolve(res.data.choices[0].message.content);
          } else {
            reject(new Error(res.data.error?.message || 'AI请求失败'));
          }
        },
        fail: (err) => {
          reject(err);
        }
      });
    });

    return response;
  } catch (err) {
    console.error('[AI Service] 调用失败:', err);
    throw err;
  }
}

/**
 * 智能搜索 - 结合本地知识库和AI
 * @param {string} query 搜索查询
 * @param {Array} localResults 本地搜索结果
 * @returns {Promise<Object>} 搜索结果
 */
async function intelligentSearch(query, localResults = []) {
  try {
    // 构建上下文
    let context = '';
    if (localResults.length > 0) {
      context = '\n\n已找到以下本地知识库结果：\n';
      localResults.forEach((item, index) => {
        context += `${index + 1}. ${item.name}`;
        if (item.formula) context += `: ${item.formula}`;
        context += ` - ${item.description}\n`;
      });
    }

    // 构建AI查询
    const prompt = `用户查询：${query}${context}

请根据查询提供：
1. 相关的专业解释
2. 涉及的公式或计算方法
3. 实用的工程建议
4. 相关规范标准

请用简洁的结构化方式回答，使用markdown格式。`;

    const aiResponse = await chat(prompt);

    return {
      query,
      aiResponse,
      localResults,
      timestamp: Date.now()
    };
  } catch (err) {
    console.error('[AI Service] 智能搜索失败:', err);
    return {
      query,
      aiResponse: null,
      localResults,
      error: err.message,
      timestamp: Date.now()
    };
  }
}

/**
 * 生成搜索建议
 * @param {string} input 用户输入
 * @returns {Array<string>} 建议列表
 */
function generateSuggestions(input) {
  if (!input || input.length < 2) return [];

  const suggestions = [];
  const inputLower = input.toLowerCase();

  // 常见搜索词映射
  const suggestionMap = {
    '土': ['土压力系数', '土钉墙', '土的分类', '土的重度'],
    '压': ['土压力', '主动土压力', '被动土压力', '静止土压力'],
    '稳': ['稳定性', '安全系数', '抗倾覆', '抗隆起'],
    '承': ['承载力', '复合地基承载力', '单桩承载力'],
    '沉': ['沉降', '复合地基沉降', '固结沉降'],
    '桩': ['CFG桩', '水泥土搅拌桩', '抗滑桩', '预制桩'],
    '锚': ['锚杆', '预应力锚索', '锚杆抗拔力'],
    '墙': ['地下连续墙', '挡土墙', '土钉墙'],
    '基': ['基坑', '基础', '地基处理', '基坑支护'],
    '边': ['边坡', '边坡稳定性', '边坡支护'],
    '朗': ['朗肯', '朗肯土压力', '朗肯理论'],
    '库': ['库仑', '库仑土压力', '库仑理论'],
    '强': ['强夯', '强夯法', '强夯有效深度'],
    '水': ['水泥土搅拌桩', '水土压力', '降水'],
    '排': ['排桩', '排水'],
    '内': ['内摩擦角', '内支撑'],
    '黏': ['黏聚力', '黏性土'],
    '砂': ['砂土', '砂石桩'],
    '软': ['软土', '软弱地基']
  };

  // 匹配建议
  for (const [key, values] of Object.entries(suggestionMap)) {
    if (inputLower.includes(key)) {
      suggestions.push(...values);
    }
  }

  // 去重并限制数量
  return [...new Set(suggestions)].slice(0, 8);
}

/**
 * 测试AI连接
 * @returns {Promise<boolean>} 是否连接成功
 */
async function testConnection() {
  try {
    const response = await chat('你好，请简单介绍你的能力。');
    return !!response;
  } catch (err) {
    console.error('[AI Service] 连接测试失败:', err);
    return false;
  }
}

module.exports = {
  chat,
  intelligentSearch,
  generateSuggestions,
  testConnection,
  AI_CONFIG
};
