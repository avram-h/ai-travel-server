/**
 * util.js - 工具函数
 */

// 格式化日期 YYYY-MM-DD
function formatDate(date) {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

// 根据预算返回等级
function getBudgetLevel(budget) {
  if (budget <= 500) return { label: '穷游模式', icon: '🎒', color: '#0d9f6e' };
  if (budget <= 1500) return { label: '经济之旅', icon: '🚶', color: '#1a73e8' };
  if (budget <= 3000) return { label: '舒适享受', icon: '🌟', color: '#e3741a' };
  if (budget <= 5000) return { label: '品质之旅', icon: '✨', color: '#9c27b0' };
  return { label: '奢华假期', icon: '👑', color: '#e31a1a' };
}

// 排序函数 - 按评分
function sortByScore(list) {
  return [...list].sort((a, b) => b.score - a.score);
}

// 格式化预算显示
function formatBudget(budget) {
  if (budget >= 1000) return `¥${(budget / 1000).toFixed(1)}k`;
  return `¥${budget}`;
}

// 深拷贝
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

module.exports = {
  formatDate,
  getBudgetLevel,
  sortByScore,
  formatBudget,
  deepClone
};
