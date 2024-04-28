Page({
    data: {
      likedActivities: [],
    },
    onLoad() {
      // Fetch liked activities (replace with your logic)
      const likedActivities = wx.getStorageSync('likedActivities') || [];
      this.setData({ likedActivities });
    },
    deleteActivity(event) {
        const activityIndex = event.currentTarget.dataset.index;
    
        // Update likedActivities data
        const likedActivities = this.data.likedActivities.slice(); // Create a copy
        likedActivities.splice(activityIndex, 1); // Remove the activity at the index
        this.setData({ likedActivities });
    
        // Update storage (replace with your logic)
        wx.setStorageSync('likedActivities', likedActivities);
      },
  });