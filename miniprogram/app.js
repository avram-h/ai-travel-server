App({
  globalData: {
    userInfo: null,
    theme: 'light',
    cloudEnv: 'cloud1-d8g2xdh6t2e692564'
  },

  onLaunch() {
    // 初始化云开发环境（失败不阻塞启动）
    try {
      if (!wx.cloud) {
        console.warn('[App] 当前基础库不支持云开发，跳过初始化');
      } else {
        wx.cloud.init({
          env: this.globalData.cloudEnv,
          traceUser: true
        });
        console.log('[App] 云开发初始化成功');
      }
    } catch (err) {
      console.warn('[App] 云开发初始化失败，将使用离线模式:', err.message);
    }

    // 检查更新
    const updateManager = wx.getUpdateManager();
    updateManager.onUpdateReady(() => {
      wx.showModal({
        title: '更新提示',
        content: '新版本已准备好，是否重启应用？',
        success: (res) => {
          if (res.confirm) updateManager.applyUpdate();
        }
      });
    });
  }
});
