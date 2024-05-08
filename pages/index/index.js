Page({
    data: {
        motto: 'UK PlayGround',
        userInfo: {
            avatarUrl: '', // Set a default avatar URL
            nickName: '',
        },
        hasUserInfo: false,
        canIUseGetUserProfile: wx.canIUse('getUserProfile'),
        canIUseNicknameComp: wx.canIUse('input.type.nickname'),
    },

    // Function to navigate to logs
    bindViewTap() {
        wx.navigateTo({
            url: '../logs/logs'
        });
    },

    // Function to handle avatar selection
    onChooseAvatar(e) {
        const { avatarUrl } = e.detail;
        const { nickName } = this.data.userInfo;
        this.setData({
            "userInfo.avatarUrl": avatarUrl,
            hasUserInfo: nickName && avatarUrl,
        });
    },

    // Function to handle nickname input change
    onInputChange(e) {
        const nickName = e.detail.value;
        this.setData({
            "userInfo.nickName": nickName,
            hasUserInfo: nickName && this.data.userInfo.avatarUrl,
        });
    },

    getUserProfile(e) {
        wx.getUserProfile({
            desc: '展示用户信息',
            success: (res) => {
                console.log('User profile received:', res.userInfo);
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true,
                });
    
                wx.login({
                    success: loginRes => {
                        if (loginRes.code) {
                            wx.request({
                                url: 'http://localhost:3000/status/login', // Updated link with GET method
                                method: 'GET',
                                data: { code: loginRes.code },
                                success: loginServerRes => {
                                    const openId = loginServerRes.data.openId;
                                    console.log('OpenId received:', openId);
    
                                    // Now send the user info with the openId
                                    wx.request({
                                        url: 'http://localhost:3000/user', // Ensure this endpoint exists and can handle POST
                                        method: 'POST',
                                        data: {
                                            nickName: res.userInfo.nickName,
                                            avatarUrl: res.userInfo.avatarUrl,
                                            openId: openId,
                                        },
                                        success: serverRes => {
                                            console.log('Server response:', serverRes.data);
                                            // After saving user info, navigate to the next page
                                            wx.navigateTo({
                                                url: '/pages/searchPage/searchPage' 
                                            });
                                        },
                                        fail: error => {
                                            console.error('Failed to send user info:', error);
                                        }
                                    });
                                },
                                fail: error => {
                                    console.error('Failed to send login code:', error);
                                }
                            });
                        }
                    }
                });
            }
        });
    }
    
});

