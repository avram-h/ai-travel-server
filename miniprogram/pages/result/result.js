Page({
  data: {
    data: {
      destination: '',
      days: 0,
      budget: 0,
      budgetLevel: { label: '', icon: '', color: '' },
      attractions: [],
      instagramSpots: [],
      weather: [],
      foods: [],
      hotels: [],
      isOverseas: false,
      safetyInfo: null,
      localNews: null
    },
    activeTab: 'attractions',
    tabs: ["attractions", "instagramSpots", "hotels", "foods", "weather"],
    tempRange: '',
    overallAdvice: '',
    imgErrors: {},
    showAd: true,
    pageReady: false,
  },

  onAdError(e) {
    console.log('[广告] 加载失败:', e.detail);
    this.setData({ showAd: false });
  },
  onAdLoad() {
    console.log('[广告] 加载成功');
  },

  onLoad(options) {
    try {
      const travelData = wx.getStorageSync('travelResult');
      if (!travelData) throw new Error('无缓存数据');
      wx.removeStorageSync('travelResult');
      // 先渲染头部，立即可见
      this.setData({
        'data.destination': travelData.destination,
        'data.days': travelData.days,
        'data.budget': travelData.budget,
        'data.budgetLevel': travelData.budgetLevel,
        'data.isOverseas': travelData.isOverseas
      });
      this.setNavigationTitle(travelData.destination);
      // 延迟处理大数据，避免阻塞渲染
      setTimeout(() => {
        try {
          const processedData = this.processResultData(travelData);
          this.setData({
            data: processedData,
            tempRange: this.calcTempRange(processedData.weather),
            overallAdvice: this.calcOverallAdvice(processedData.weather),
            pageReady: true
          });
        } catch (e) {
          console.error('[result] 数据处理失败:', e);
        }
      }, 50);
    } catch (e) {
      console.error('[result] 加载失败:', e);
      wx.showToast({ title: '数据加载失败', icon: 'none' });
      setTimeout(() => wx.navigateBack(), 1500);
    }
  },

  setNavigationTitle(destination) {
    wx.setNavigationBarTitle({ title: `${destination} 旅行攻略` });
  },

  // 图片加载失败兜底
  onImageError(e) {
    const key = e.currentTarget.dataset.imgkey;
    if (key && !this.data.imgErrors[key]) {
      const imgErrors = { ...this.data.imgErrors, [key]: true };
      this.setData({ imgErrors });
    }
  },


  // 图片加载完成，移除骨架屏
  onImgLoad(e) {
    // 图片加载成功自动触发淡入，无需额外处理
  },
  getFallbackSrc(item, prefix) {
    const key = `${prefix}-${item.name}`;
    const text = encodeURIComponent(item.name);
    return `https://placehold.co/400x300/667eea/ffffff?text=${text}&font=source-sans-pro`;
  },

  // 预处理全部展示数据
  processResultData(data) {
    // 天气 - 添加温度条位置
    const weather = (data.weather || []).map(item => {
      const tempBarLeft = Math.max(0, ((item.low - 5) / 45) * 100);
      const tempBarWidth = Math.max(5, ((item.high - item.low) / 45) * 100);
      return { ...item, tempBarLeft, tempBarWidth };
    });

    // 美食 - 预计算预算匹配样式
    const foods = (data.foods || []).map(item => {
      if (!item.budgetMatch) {
        const perDay = parseInt(data.budget) / parseInt(data.days);
        const perMeal = perDay / 3;
        if (item.price <= perMeal) item.budgetMatch = '✅ 预算友好';
        else if (item.price <= perMeal * 1.5) item.budgetMatch = '💰 适中';
        else item.budgetMatch = '💎 稍贵但值得';
      }
      let budgetClass = 'premium';
      if (item.budgetMatch.indexOf('友好') !== -1) {
        budgetClass = 'friendly';
      } else if (item.budgetMatch.indexOf('适中') !== -1) {
        budgetClass = 'moderate';
      }
      return { ...item, budgetClass };
    });

    // 交通：标记最优性价比 + 自驾标记
    if (data.transport && data.transport.modes) {
      data.transport.modes.forEach(m => {
        m.best = false;
        m.isDrive = (m.type || '').indexOf('自驾') !== -1;
      });
      const best = data.transport.modes[0]; // 已按价格排序
      if (best) best.best = true;
    }
    return { ...data, weather, foods };
  },

  calcTempRange(weather) {
    if (!weather || weather.length === 0) return '--';
    const lows = weather.map(w => w.low);
    const highs = weather.map(w => w.high);
    return `${Math.min(...lows)}° ~ ${Math.max(...highs)}°`;
  },

  calcOverallAdvice(weather) {
    if (!weather || weather.length === 0) return '';
    const conditions = weather.map(w => w.condition);
    const rainy = conditions.filter(c => c.indexOf('雨') !== -1 || c.indexOf('阵') !== -1).length;
    const sunny = conditions.filter(c => c.indexOf('晴') !== -1).length;
    const hot = weather.some(w => w.high >= 33);
    const cold = weather.some(w => w.low <= 5);

    let advice = '';
    const total = weather.length;
    if (rainy >= total / 2) advice = '🌧️ 降雨概率较高，建议随身携带雨具';
    else if (rainy > 0) advice = '🌦️ 部分时段有雨，建议准备雨伞备用';
    else if (sunny >= total / 2) advice = '☀️ 以晴好天气为主，非常适合出行';
    else advice = '🌤️ 天气状况良好，适合出行游玩';
    
    if (hot) advice += ' 🔥 注意防暑降温';
    if (cold) advice += ' 🧣 注意保暖防寒';
    
    return advice;
  },

  scrollTo(e) {
    const target = e.currentTarget.dataset.target;
    this.setData({ activeTab: target });
    
    wx.createSelectorQuery()
      .select(`#${target}`)
      .boundingClientRect(rect => {
        if (rect) {
          wx.pageScrollTo({
            scrollTop: rect.top - 100,
            duration: 300
          });
        }
      }).exec();
  },

  onShareAppMessage() {
    const { destination, days, budget } = this.data.data;
    return {
      title: `🎯 ${destination} ${days}天旅行攻略，预算¥${budget}！`,
      path: '/pages/index/index'
    };
  },


  // 点击图片全屏预览

  // 城市坐标（用于导航）
  cityCoords: {
    "北京":[39.9042,116.4074],"上海":[31.2304,121.4737],"广州":[23.1291,113.2644],
    "深圳":[22.5431,114.0579],"成都":[30.5728,104.0668],"杭州":[30.2741,120.1551],
    "西安":[34.3416,108.9398],"重庆":[29.4316,106.9123],"武汉":[30.5928,114.3055],
    "长沙":[28.2282,112.9388],"青岛":[36.0671,120.3826],"大理":[25.6065,100.2676],
    "丽江":[26.8721,100.2299],"厦门":[24.4798,118.0894],"三亚":[18.2528,109.5120],
    "香港":[22.3193,114.1694],"澳门":[22.1987,113.5439],"南京":[32.0603,118.7969],
    "苏州":[31.2990,120.5853],"桂林":[25.2736,110.2900],"张家界":[29.1170,110.4782],
    "黄山":[29.7147,118.3375],"昆明":[25.0389,102.7183],"天津":[39.3434,117.3616],
    "郑州":[34.7466,113.6254],"济南":[36.6512,117.1201],"合肥":[31.8206,117.2272],
    "南昌":[28.6820,115.8579],"福州":[26.0745,119.2965],"贵阳":[26.6470,106.6302],
    "兰州":[36.0611,103.8343],"南宁":[22.8170,108.3665],"拉萨":[29.6500,91.1000]
  },

  // 导航到餐厅
  navigateToRestaurant(e) {
    const { name, city, lon, lat } = e.currentTarget.dataset;
    console.log('[navigate] name:', name, 'city:', city, 'lon:', lon, 'lat:', lat, 'type:', typeof lon);
    let longitude = parseFloat(lon);
    let latitude = parseFloat(lat);
    if (!isNaN(longitude) && !isNaN(latitude) && longitude !== 0 && latitude !== 0) {
      wx.openLocation({ longitude, latitude, name: name, address: city, scale: 16 });
    } else {
      // 降级：用城市中心坐标
      const coords = this.cityCoords[city] || this.cityCoords[city.replace(/市|县$/,'')];
      if (coords) {
        console.log('[navigate] 使用城市中心坐标:', city, coords);
        wx.openLocation({ longitude: coords[1], latitude: coords[0], name: name, address: city, scale: 14 });
      } else {
        console.error('[navigate] 无坐标: name=' + name + ' city=' + city + ' lon=' + lon + ' lat=' + lat);
        wx.showToast({ title: '暂无精确坐标', icon: 'none' });
      }
    }
  },


  // 打开酒店详情页
  openHotelDetail(e) {
    const ds = e.currentTarget.dataset;
    const hotels = this.data.data.hotels || [];
    // 优先按 index 查找，失败则按名称查找
    let hotel = hotels[parseInt(ds.index)];
    if (!hotel && ds.name) {
      hotel = hotels.find(h => h.name === ds.name);
    }
    if (hotel) {
      console.log('[openHotelDetail] ->', hotel.name);
      wx.setStorageSync('hotelDetail', hotel);
      wx.navigateTo({ url: '/pages/hotel/hotel' });
    } else {
      console.error('[openHotelDetail] 未找到酒店');
      wx.showToast({ title: '未找到酒店数据', icon: 'none' });
    }
  },


  // 自驾导航
  navigateDrive(e) {
    const to = e.currentTarget.dataset.to;
    const coords = this.cityCoords[to] || this.cityCoords[to.replace(/市|县$/, '')];
    if (coords) {
      wx.openLocation({ longitude: coords[1], latitude: coords[0], name: to, address: to, scale: 14 });
    } else {
      wx.showToast({ title: '暂无精确坐标，请在地图APP搜索', icon: 'none' });
    }
  },

  // 购票跳转
  buyTicket(e) {
    const { type, from, to } = e.currentTarget.dataset;
    const t = type || '';
    if (t.includes('飞机')) {
      wx.navigateToMiniProgram({
        appId: 'wx0f50400a5b6f3f07',
        path: 'pages/flight/search/search?departCityName=' + encodeURIComponent(from) + '&arriveCityName=' + encodeURIComponent(to),
        fail: () => {
          wx.setClipboardData({ data: 'https://flights.ctrip.com/online/channel/domestic', success: () => {
            wx.showToast({ title: '已复制携程链接，请在浏览器打开', icon: 'none', duration: 2500 });
          }});
        }
      });
    } else if (t.includes('高铁') || t.includes('火车') || t.includes('大巴')) {
      wx.setClipboardData({ data: 'https://www.12306.cn', success: () => {
        wx.showModal({
          title: '购票提示',
          content: '12306链接已复制。\n请打开浏览器访问 12306.cn 购票\n（微信内不支持直接打开）',
          showCancel: false,
          confirmText: '知道了'
        });
      }});

    }
  },
  previewImage(e) {
    const src = e.currentTarget.dataset.src;
    if (src && !src.startsWith("data:")) {
      wx.previewImage({ current: src, urls: [src] });
    }
  },

  onShareTimeline() {
    const { destination, days } = this.data.data;
    return {
      title: `📸 ${destination} ${days}天旅行攻略，快来查看！`
    };
  }
});
