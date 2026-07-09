const api = require('../../utils/api');
const util = require('../../utils/util');

Page({
  data: {
    loadingStep: 0,
    formData: {
      departure: '',
      destination: '',
      budget: '',
      days: ''
    },
    quickBudget: 0,
    suggestions: [],
    showSuggestions: false,
    hotDestinations: ['北京', '上海', '成都', '杭州', '西安', '大理', '三亚', '日本', '泰国'],
    isLoading: false,
    canGenerate: false,
    // 预计算展示字段
    dailyBudget: 0,
    accommodationBudget: 0,
    foodBudget: 0,
    playBudget: 0,
    transportBudget: 0,
    showPreview: false
  },

  onLoad() {
    const saved = wx.getStorageSync('lastFormData');
    if (saved) {
      this.setData({ formData: saved });
      this.checkCanGenerate();
      this.updateBudgetPreview();
    }
  },

  onDepartureInput(e) {
    this.setData({ 'formData.departure': e.detail.value });
  },
  clearDeparture() { this.setData({ 'formData.departure': '' }); },

  onDestinationInput(e) {
    const value = e.detail.value;
    this.setData({
      'formData.destination': value,
      showSuggestions: value.length > 0,
      suggestions: api.getDestinationSuggestions(value)
    });
    this.checkCanGenerate();
  },

  handleConfirmDestination() {
    this.setData({ showSuggestions: false });
  },

  selectSuggestion(e) {
    const item = e.currentTarget.dataset.item;
    this.setData({
      'formData.destination': item,
      showSuggestions: false,
      suggestions: []
    });
    this.checkCanGenerate();
  },

  selectDestination(e) {
    const item = e.currentTarget.dataset.item;
    this.setData({
      'formData.destination': item,
      showSuggestions: false,
      suggestions: []
    });
    this.checkCanGenerate();
  },

  clearDestination() {
    this.setData({
      'formData.destination': '',
      showSuggestions: false,
      suggestions: []
    });
    this.checkCanGenerate();
  },

  onBudgetInput(e) {
    let value = e.detail.value || '';
    value = value.replace(/\D/g, '');
    if (value === '') {
      this.setData({ 'formData.budget': '', quickBudget: 0 });
      this.checkCanGenerate();
      this.updateBudgetPreview();
      return;
    }
    this.setData({
      'formData.budget': value,
      quickBudget: 0
    });
    this.checkCanGenerate();
    this.updateBudgetPreview();
  },

  onDaysInput(e) {
    // 直接读取用户输入，不做限制，避免删除卡死
    const value = e.detail.value;
    this.setData({ 'formData.days': value });
    this.checkCanGenerate();
    this.updateBudgetPreview();
  },

  onDaysBlur(e) {
    // 失焦时清理非数字内容
    let value = e.detail.value || '';
    value = value.replace(/\D/g, '');
    if (value.length > 2) value = value.slice(0, 2);
    this.setData({ 'formData.days': value });
    this.checkCanGenerate();
    this.updateBudgetPreview();
  },

  selectQuickBudget(e) {
    const value = parseInt(e.currentTarget.dataset.value);
    this.setData({
      'formData.budget': String(value),
      quickBudget: value
    });
    this.checkCanGenerate();
    this.updateBudgetPreview();
  },

  checkCanGenerate() {
    const { destination, budget, days } = this.data.formData;
    const canGenerate = destination && budget && days && parseInt(budget) > 0 && parseInt(days) > 0;
    this.setData({ canGenerate });
  },

  // 预计算预算概览
  updateBudgetPreview() {
    const { budget, days } = this.data.formData;
    const b = parseInt(budget);
    const d = parseInt(days);
    if (b > 0 && d > 0) {
      this.setData({
        showPreview: true,
        dailyBudget: Math.round(b / d),
        accommodationBudget: Math.round(b * 0.3),
        foodBudget: Math.round(b * 0.25),
        playBudget: Math.round(b * 0.15),
        transportBudget: Math.round(b * 0.15)
      });
    } else {
      this.setData({ showPreview: false });
    }
  },


  openPrivacy() {
    wx.navigateTo({ url: '/pages/privacy/privacy' });
  },

  async handleGenerate() {
    const { formData } = this.data;
    const { destination, budget, days } = formData;
    
    if (!this.data.canGenerate) {
      wx.showToast({ title: '请完整填写信息', icon: 'none' });
      return;
    }

    // 校验天数有效性
    const daysNum = parseInt(days, 10);
    if (isNaN(daysNum) || daysNum < 1) {
      wx.showToast({ title: '请输入有效的游玩天数', icon: 'none' });
      return;
    }
    if (daysNum > 30) {
      wx.showToast({ title: '游玩天数不能超过30天', icon: 'none' });
      return;
    }

    this.setData({ isLoading: true, loadingStep: 0 });

    // 模拟进度
    const steps = [1,2,3,4];
    let si = 0;
    const tick = setInterval(() => {
      if (si < steps.length) { this.setData({ loadingStep: steps[si] }); si++; }
    }, 2500);

    try {
      wx.setStorageSync('lastFormData', formData);
      const startDate = util.formatDate(new Date());
      const departure = formData.departure || '';
      const result = await api.getTravelGuide(destination, startDate, daysNum, parseInt(budget), departure);

      wx.setStorageSync('travelResult', result);
      // 插屏广告（开通流量主后替换 adUnitId）
      const goResult = () => { wx.navigateTo({ url: '/pages/result/result' }); };
      if (wx.createInterstitialAd) {
        try {
          const ia = wx.createInterstitialAd({ adUnitId: 'adunit-interstitial-placeholder' });
          ia.onError(goResult);
          ia.onClose(goResult);
          ia.show().catch(goResult);
        } catch(e) { goResult(); }
      } else { goResult(); }
    } catch (err) {
      wx.showToast({
        title: err.message || '生成失败，请重试',
        icon: 'none',
        duration: 3000
      });
    } finally {
      clearInterval(tick);
      this.setData({ isLoading: false, loadingStep: 0 });
    }
  }
});
