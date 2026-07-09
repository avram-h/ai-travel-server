/**
 * api.js - 数据获取接口层
 * 支持两种模式：
 *   - cloud: 调用微信云开发 AI 大模型（需先部署云函数）
 *   - mock: 使用本地模拟数据（离线兜底，默认模式）
 */

const mock = require('./mock');
const util = require('./util');

// ====== 配置 ======
const CONFIG = {
  // 模式: 'cloud' | 'mock'
  mode: 'cloud',
};

// ========== 云函数模式 ==========
async function callCloudFunction(data) {
  try {
    const res = await wx.cloud.callFunction({
      name: 'deepseek-travel',
      data
    });
    if (res.result.code === 0) {
      return res.result.data;
    } else {
      throw new Error(res.result.message || '云函数返回异常');
    }
  } catch (err) {
    console.error('[API] 云函数调用失败:', err.message);
    throw err;
  }
}

// ========== Mock 模式 ==========
function generateMockGuide(destination, startDate, days, budget) {
  const attractions = mock.getAttractions(destination);
  const instagramSpots = mock.getInstagramSpots(destination);
  const weather = mock.getWeather(destination, startDate, days);
  const foods = mock.getFoods(destination, budget);
  const isOverseas = mock.isOverseas(destination);
  const budgetLevel = util.getBudgetLevel(budget);

  let safetyInfo = null;
  let localNews = null;

  if (isOverseas) {
    safetyInfo = mock.getSafetyInfo(destination);
    localNews = mock.getLocalNews(destination);
  }

  return {
    destination,
    startDate,
    days,
    budget,
    budgetLevel,
    attractions,
    instagramSpots,
    weather,
    foods,
    isOverseas,
    safetyInfo,
    localNews,
    generatedAt: new Date().toISOString()
  };
}

// ========== 对外接口 ==========

// 获取旅行攻略
async function getTravelGuide(destination, startDate, days, budget, departure) {
  const data = { destination, startDate, days, budget, departure: departure || '' };

  // Cloud 模式：优先调云函数
  if (CONFIG.mode === 'cloud') {
    try {
      const result = await callCloudFunction(data);
      result.budgetLevel = util.getBudgetLevel(budget);
      return result;
    } catch (err) {
      console.warn('[API] 云函数失败，降级到mock:', err.message);
      return generateMockGuide(destination, startDate, days, budget);
    }
  }

  // Mock 模式：直接用离线数据
  return generateMockGuide(destination, startDate, days, budget);
}

// 获取目的地建议
function getDestinationSuggestions(keyword) {
  const all = ['北京','上海','广州','深圳','成都','杭州','西安','重庆',
    '武汉','长沙','青岛','大理','丽江','厦门','三亚','香港','澳门','台北',
    '南京','苏州','桂林','张家界','黄山',
    '日本','泰国','韩国','新加坡','马来西亚','巴厘岛','马尔代夫',
    '法国','意大利','英国','美国','澳大利亚'];
  if (!keyword) return all;
  return all.filter(d => d.includes(keyword));
}

// 切换模式
function setMode(mode) {
  CONFIG.mode = mode;
}

module.exports = {
  getTravelGuide,
  getDestinationSuggestions,
  setMode
};
