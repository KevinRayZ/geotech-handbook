/**
 * 专项方案咨询页面
 */
const { getServiceTypes, getConsultationProcess, getContactInfo } = require('../../core/consultation/consultation-service');

Page({
  data: {
    // 服务类型
    services: [],
    
    // 服务范围
    scopeList: [
      '基坑支护专项方案',
      '边坡防护专项方案',
      '地基处理专项方案',
      '降水专项方案',
      '监测专项方案',
      '边坡病害诊断',
      '基坑事故分析',
      '方案审查优化',
      '施工疑难解答',
      '计算书复核'
    ],
    
    // 服务流程
    process: [],
    
    // 专家信息
    experts: [],
    
    // 联系方式
    contact: {}
  },

  onLoad() {
    this.loadData();
  },

  /**
   * 加载数据
   */
  loadData() {
    const services = getServiceTypes().map(s => ({
      ...s,
      icon: this.getServiceIcon(s.id)
    }));
    
    const process = getConsultationProcess();
    const contact = {
      phone: '15368855434',
      wechat: 'rayz1000',
      workHours: '周一至周五 9:00-18:00'
    };
    
    this.setData({ services, process, contact });
  },

  /**
   * 获取服务图标
   */
  getServiceIcon(serviceId) {
    const icons = {
      'special_plan': 'file',
      'expert_consultation': 'chat',
      'scheme_review': 'check-rectangle'
    };
    return icons[serviceId] || 'info-circle';
  },

  /**
   * 复制微信号
   */
  copyWechat() {
    wx.setClipboardData({
      data: this.data.contact.wechat,
      success: () => {
        wx.showToast({ title: '微信号已复制', icon: 'success' });
      }
    });
  },

  /**
   * 拨打电话
   */
  callPhone() {
    wx.makePhoneCall({
      phoneNumber: this.data.contact.phone,
      fail: () => {}
    });
  },

  /**
   * 提交咨询
   */
  submitConsultation() {
    wx.showModal({
      title: '提交咨询需求',
      content: '将跳转到咨询表单页面，填写您的工程信息和咨询需求',
      confirmText: '继续',
      success: (res) => {
        if (res.confirm) {
          // 这里可以跳转到咨询表单页面
          wx.showToast({
            title: '功能开发中，请先通过微信联系我们',
            icon: 'none',
            duration: 2000
          });
        }
      }
    });
  },

  /**
   * 分享
   */
  onShareAppMessage() {
    return {
      title: '岩土工程专项方案咨询 - 专业技术支持',
      path: '/pages/consultation/consultation'
    };
  }
});
