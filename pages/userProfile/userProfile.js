Page({
    data: {
      nickName: '',
      name: '',
      school: '',
      interest: '',
      description: '',
      images: [], // Array to store uploaded image paths (optional, if storing in storage)
    },
    onLoad() {
      // Fetch user data (including nickname) on page load
      this.fetchUserData();
    },
    onShow() {
      // Refresh user data on page show (optional, can be triggered differently)
      this.fetchUserData();
    },
    onUserInfoUpdate(updatedInfo) {
        // Update data object with received information
        this.setData(updatedInfo);
      },
    fetchUserData() {
      const storedUserInfo = wx.getStorageSync('userInfo'); // Load user info from storage
  
      // Check if data exists in storage
      if (storedUserInfo) {
        this.setData({
          nickName: storedUserInfo.name, // Assuming nickname is stored as "name"
          name: storedUserInfo.name || '', // Assuming name is also stored as "name"
          school: storedUserInfo.school || '',
          interest: storedUserInfo.interest || '',
          description: storedUserInfo.description || '',
          images: storedUserInfo.images || [], // Assuming images are stored as "images"
        });
      } else {
        // Handle the case where no user data is found in storage (optional)
        console.log('No user data found in storage');
      }
    },
    
    openEditInfoPage() {
      wx.navigateTo({
        url: '/pages/userInfo/userInfo', // Replace with the actual path to your info page
      });
    },
  });