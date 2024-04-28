Page({
    data: {
      activities: []
    },
    onLoad: function(options) {
      // Check if we came here after publishing an activity
      if (options.publishSuccess) {
        // Read all activities from storage
        const activities = wx.getStorageSync('activities') || [];
        // Update local data
        this.setData({ activities });
      }
    },
    onShow: function() {
        this.loadActivities();
      },
    loadActivities: function() {
        // Load activities from local storage
        const activities = wx.getStorageSync('activities') || [];
        console.log('Loaded activities from storage:', activities);
        this.setData({ activities });
    },
    
    onInputActivityName: function(e) {
        this.setData({
            activityName: e.detail.value
        });
    },
    onInputCity: function(e) {
        this.setData({
            location: e.detail.value
        });
    },
    onInputDescription: function(e) {
        this.setData({
            description: e.detail.value
        });

    },
    deleteActivity: function(e) {
        const index = e.currentTarget.dataset.index;
        const that = this;
      
        wx.showModal({
          title: 'Confirm Deletion',
          content: 'Are you sure you want to delete this activity?',
          success(res) {
            if (res.confirm) {
              let activities = that.data.activities;
              activities.splice(index, 1);
              wx.setStorageSync('activities', activities);
              that.setData({ activities });
      
              wx.showToast({
                title: 'Activity Deleted',
                icon: 'success',
                duration: 2000
              });
            }
          }
        });
      },
      likeActivity(event) {
    const activityIndex = event.currentTarget.dataset.index;

    // Update activity data (optional)
    // You can optionally mark the activity as liked in the current page data
    this.data.activities[activityIndex].liked = true;

    // Show toast message
    wx.showToast({
      title: 'Activity saved to Watchlist!',
      icon: 'success',
      duration: 2000,
    });

    // Persist liked activities (replace with your logic)
    const likedActivities = wx.getStorageSync('likedActivities') || [];
    likedActivities.push(this.data.activities[activityIndex]);
    wx.setStorageSync('likedActivities', likedActivities);
  },
  sendMessage(event) {
    const activityIndex = event.currentTarget.dataset.index;
    const activity = this.data.activities[activityIndex];
  
    wx.navigateTo({
      url: '/pages/composeMessagePage/composeMessagePage',
      success: function(res) {
        res.eventChannel.emit('receiveActivity', JSON.stringify(activity));
      },
    });
  }
    // You can include other methods, such as filtering based on user preferences
  });
  