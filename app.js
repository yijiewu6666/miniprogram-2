// app.js
App({
    onLaunch() {
      // 展示本地存储能力
      const logs = wx.getStorageSync('logs') || [];
      logs.unshift(Date.now());
      wx.setStorageSync('logs', logs);
  
      // 登录
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          if (res.code) {
            // Call function to send code to your server
            this.getUserInfo(res.code);
          } else {
            console.log('Login failed!' + res.errMsg);
          }
        }
      });
    },
  
    globalData: {
      userInfo: null
    },
  
    // Function to send the code to the server and get user info
    getUserInfo: function(code) {
      const url = 'http://localhost:3000/login';  // Change this URL to your production server URL
      wx.request({
        url: url,
        method: 'POST',
        data: {
          code: code
        },
        success: res => {
          if (res.data.success) {
            console.log('User info retrieved successfully');
            this.globalData.userInfo = res.data.userInfo;  // Assuming the user info is returned from your server
            if (this.userInfoReadyCallback) {
              this.userInfoReadyCallback(res.data.userInfo);
            }
          } else {
            console.log('Failed to retrieve user info:', res.data.message);
          }
        },
        fail: error => {
          console.error('Failed to communicate with the server:', error);
        }
      });
    }
  });
  