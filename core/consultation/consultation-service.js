/**
 * 专项方案咨询模块
 * 提供专业岩土工程咨询服务入口
 * 
 * 功能：
 * 1. 展示咨询服务介绍
 * 2. 提交咨询需求
 * 3. 咨询流程说明
 * 4. 付费咨询入口
 */

// 咨询服务配置
const CONSULTATION_CONFIG = {
  // 服务类型
  serviceTypes: [
    {
      id: 'special_plan',
      name: '专项方案编制',
      description: '针对具体工程编制详细专项施工方案',
      scope: [
        '基坑支护专项方案',
        '边坡防护专项方案',
        '地基处理专项方案',
        '降水专项方案',
        '监测专项方案'
      ],
      deliverables: [
        '详细计算书',
        '施工图纸',
        '施工工艺说明',
        '安全措施',
        '监测方案'
      ],
      priceRange: '5,000-50,000元（视工程复杂程度）'
    },
    {
      id: 'expert_consultation',
      name: '专家技术咨询',
      description: '一对一专家咨询，解决复杂技术问题',
      scope: [
        '边坡病害诊断',
        '基坑事故分析',
        '地基处理方案论证',
        '施工疑难问题解答',
        '方案优化建议'
      ],
      deliverables: [
        '咨询记录',
        '专家意见书',
        '技术建议报告'
      ],
      priceRange: '500-5,000元/次'
    },
    {
      id: 'scheme_review',
      name: '方案审查',
      description: '对已有方案进行专业审查和优化',
      scope: [
        '基坑支护方案审查',
        '边坡治理方案审查',
        '地基处理方案审查',
        '计算书复核',
        '施工图审查'
      ],
      deliverables: [
        '审查意见书',
        '优化建议',
        '风险提示'
      ],
      priceRange: '2,000-20,000元'
    }
  ],

  // 咨询流程
  process: [
    {
      step: 1,
      title: '提交需求',
      description: '填写工程基本信息和咨询需求'
    },
    {
      step: 2,
      title: '需求评估',
      description: '专业人员评估工作量和报价'
    },
    {
      step: 3,
      title: '确认付费',
      description: '确认服务内容并完成付费'
    },
    {
      step: 4,
      title: '专家对接',
      description: '安排对应领域专家进行咨询'
    },
    {
      step: 5,
      title: '交付成果',
      description: '按时交付咨询成果文件'
    }
  ],

  // 联系方式
  contact: {
    wechat: 'geotech-expert',
    phone: '400-XXX-XXXX',
    email: 'consult@geotech.com',
    workHours: '工作日 9:00-18:00'
  }
};

/**
 * 获取咨询服务列表
 */
function getServiceTypes() {
  return CONSULTATION_CONFIG.serviceTypes;
}

/**
 * 根据ID获取服务详情
 */
function getServiceById(serviceId) {
  return CONSULTATION_CONFIG.serviceTypes.find(s => s.id === serviceId) || null;
}

/**
 * 获取咨询流程
 */
function getConsultationProcess() {
  return CONSULTATION_CONFIG.process;
}

/**
 * 获取联系方式
 */
function getContactInfo() {
  return CONSULTATION_CONFIG.contact;
}

/**
 * 生成咨询表单数据结构
 */
function createConsultationForm() {
  return {
    // 基本信息
    projectName: '',        // 项目名称
    projectLocation: '',    // 项目地点
    projectType: '',        // 项目类型：基坑/边坡/地基处理
    
    // 工程概况
    engineeringInfo: {
      depth: '',            // 开挖深度或边坡高度
      area: '',             // 面积
      soilType: '',         // 土质条件
      waterLevel: '',       // 地下水位
      surroundings: ''      // 周边环境
    },
    
    // 咨询需求
    serviceType: '',        // 服务类型
    requirements: '',       // 具体需求描述
    urgency: 'normal',     // 紧急程度：normal/urgent
    
    // 联系方式
    contact: {
      name: '',             // 联系人
      phone: '',            // 电话
      wechat: ''            // 微信
    },
    
    // 附件
    attachments: []         // 勘察报告、设计图纸等
  };
}

/**
 * 提交咨询需求（模拟）
 */
function submitConsultationRequest(formData) {
  // 实际项目中这里会调用后端API
  console.log('[Consultation] 提交咨询需求:', formData);
  
  return {
    success: true,
    requestId: 'REQ' + Date.now(),
    message: '咨询需求已提交，我们将在24小时内与您联系'
  };
}

module.exports = {
  getServiceTypes,
  getServiceById,
  getConsultationProcess,
  getContactInfo,
  createConsultationForm,
  submitConsultationRequest
};
