// pages/expert-chat/expert-chat.js
const { getExpert } = require('../../core/experts/expert-data');
const aiService = require('../../core/ai/ai-service');

Page({
  data: {
    expert: null,
    messages: [],
    inputValue: '',
    isLoading: false,
    scrollToMessage: '',
    welcomeTime: '',
    quickQuestions: []
  },

  onLoad(options) {
    const { expertId } = options;
    const expert = getExpert(expertId);
    
    if (!expert) {
      wx.showToast({ title: '专家不存在', icon: 'none' });
      setTimeout(() => wx.navigateBack(), 1500);
      return;
    }
    
    // 根据专家生成快捷问题
    const quickQuestions = this.generateQuickQuestions(expert);
    
    this.setData({
      expert,
      welcomeTime: this.formatTime(new Date()),
      quickQuestions
    });
    
    wx.setNavigationBarTitle({
      title: `${expert.nameCN} · AI专家`
    });
  },

  // 生成快捷问题
  generateQuickQuestions(expert) {
    const questions = [];
    
    // 基于心智模型生成问题
    if (expert.mentalModels.length > 0) {
      questions.push(`请介绍一下${expert.mentalModels[0].name}`);
    }
    if (expert.mentalModels.length > 1) {
      questions.push(`${expert.mentalModels[1].name}的核心思想是什么？`);
    }
    
    // 基于专长领域生成问题
    if (expert.id === 'terzaghi') {
      questions.push('如何理解有效应力原理？');
      questions.push('固结理论在工程中如何应用？');
      questions.push('您如何看待理论与实践的关系？');
    } else if (expert.id === 'shen-zhujiang') {
      questions.push('南水模型有什么优势？');
      questions.push('如何选择合适的本构模型？');
      questions.push('您对现代土力学发展有什么看法？');
    } else if (expert.id === 'cheng-yonggang') {
      questions.push('边坡病害如何诊断？');
      questions.push('滑坡治理的基本原则是什么？');
      questions.push('如何预防边坡失稳？');
    }
    
    return questions.slice(0, 4);
  },

  // 快捷问题点击
  onQuickQuestion(e) {
    const question = e.currentTarget.dataset.question;
    this.setData({ inputValue: question });
    this.onSend();
  },

  // 输入事件
  onInput(e) {
    this.setData({ inputValue: e.detail.value });
  },

  // 发送消息
  async onSend() {
    const { inputValue, expert, messages, isLoading } = this.data;
    
    if (!inputValue.trim() || isLoading) return;
    
    const userMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: inputValue.trim(),
      time: this.formatTime(new Date())
    };
    
    this.setData({
      messages: [...messages, userMessage],
      inputValue: '',
      isLoading: true,
      scrollToMessage: `msg-${userMessage.id}`
    });
    
    try {
      // 构建对话历史
      const chatHistory = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));
      
      // 调用AI服务，使用专家的系统提示词
      const response = await this.callExpertAI(expert, inputValue.trim(), chatHistory);
      
      const assistantMessage = {
        id: `msg-${Date.now()}`,
        role: 'assistant',
        content: response,
        time: this.formatTime(new Date())
      };
      
      this.setData({
        messages: [...this.data.messages, assistantMessage],
        isLoading: false,
        scrollToMessage: `msg-${assistantMessage.id}`
      });
      
      // 保存到历史记录
      this.saveToHistory(inputValue.trim(), response);
      
    } catch (err) {
      console.error('AI回复失败:', err);
      
      const errorMessage = {
        id: `msg-${Date.now()}`,
        role: 'assistant',
        content: '抱歉，我暂时无法回答这个问题。请稍后再试。',
        time: this.formatTime(new Date())
      };
      
      this.setData({
        messages: [...this.data.messages, errorMessage],
        isLoading: false
      });
    }
  },

  // 调用专家AI
  async callExpertAI(expert, question, history) {
    // 使用ai-service的askAI方法
    const systemPrompt = expert.systemPrompt;
    
    // 构建完整提示词
    const fullPrompt = `${systemPrompt}

用户问题：${question}

请以${expert.nameCN}的身份和视角回答这个问题。`;
    
    try {
      const result = await aiService.askAI(fullPrompt, {
        temperature: 0.7,
        maxTokens: 1000
      });
      return result;
    } catch (err) {
      // 如果AI服务不可用，使用本地知识库
      console.warn('AI服务不可用，使用本地知识库:', err);
      return this.getLocalResponse(expert, question);
    }
  },

  // 本地知识库回复（降级方案）
  getLocalResponse(expert, question) {
    // 根据问题关键词匹配心智模型
    for (const model of expert.mentalModels) {
      if (question.includes(model.name) || 
          model.summary.includes(question) ||
          question.includes(model.name.substring(0, 2))) {
        return `关于${model.name}：\n\n${model.summary}\n\n${model.detail || ''}\n\n——${expert.nameCN}`;
      }
    }
    
    // 匹配启发式
    for (const h of expert.heuristics) {
      if (question.includes(h.rule.substring(0, 4))) {
        return `${h.rule}：\n\n${h.desc}\n\n——${expert.nameCN}`;
      }
    }
    
    // 默认回复
    return `感谢你的提问。作为${expert.nameCN}，我想强调：${expert.beliefs[0]}\n\n请尝试询问与${expert.mentalModels.map(m => m.name).join('、')}相关的问题。`;
  },

  // 保存到历史记录
  saveToHistory(question, answer) {
    try {
      const history = wx.getStorageSync('expert_chat_history') || [];
      history.unshift({
        expertId: this.data.expert.id,
        expertName: this.data.expert.nameCN,
        question,
        answer: answer.substring(0, 100) + '...',
        time: new Date().toISOString()
      });
      // 只保留最近50条
      wx.setStorageSync('expert_chat_history', history.slice(0, 50));
    } catch (e) {
      console.error('保存历史失败:', e);
    }
  },

  // 复制消息
  onCopyMessage(e) {
    const content = e.currentTarget.dataset.content;
    wx.setClipboardData({
      data: content,
      success: () => {
        wx.showToast({ title: '已复制', icon: 'success' });
      }
    });
  },

  // 格式化时间
  formatTime(date) {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }
});
