Page({
  data: {
    hotel: null,
    photos: [],
  },

  onLoad() {
    try {
      const hotel = wx.getStorageSync('hotelDetail');
      wx.removeStorageSync('hotelDetail');
      if (!hotel) throw new Error('无酒店数据');

      // 照片来源: 高德真实照片 > Pexels风景照
      let photos = [];
      if (hotel.amapPhotos && hotel.amapPhotos.length > 0) {
        photos = hotel.amapPhotos.filter(u => u && u.startsWith('http'));
      }
      if (photos.length === 0 && hotel.image) {
        photos = [hotel.image];
      }

      this.setData({ hotel, photos });

      wx.setNavigationBarTitle({ title: hotel.name || '酒店详情' });
    } catch (e) {
      console.error('[hotel] 加载失败:', e);
      wx.showToast({ title: '数据加载失败', icon: 'none' });
      setTimeout(() => wx.navigateBack(), 1500);
    }
  },

  // 预览图片
  previewImage(e) {
    const src = e.currentTarget.dataset.src;
    if (src && src.startsWith('http')) {
      wx.previewImage({ current: src, urls: this.data.photos });
    }
  },

  // 打电话
  callHotel() {
    const tel = this.data.hotel.tel;
    if (tel) {
      wx.makePhoneCall({ phoneNumber: tel.replace(/[^0-9\-]/g, '').split(';')[0].trim() });
    }
  },

  // 导航
  navigateToHotel() {
    const hotel = this.data.hotel;
    if (hotel.location && hotel.location.longitude) {
      wx.openLocation({
        longitude: hotel.location.longitude,
        latitude: hotel.location.latitude,
        name: hotel.name,
        address: hotel.address || '',
        scale: 16
      });
    } else {
      wx.showToast({ title: '暂无精确坐标', icon: 'none' });
    }
  },

  onShareAppMessage() {
    const hotel = this.data.hotel;
    return {
      title: `🏨 ${hotel.name} - ${hotel.rating ? '⭐'+hotel.rating : ''}`,
      path: '/pages/index/index'
    };
  }
});
