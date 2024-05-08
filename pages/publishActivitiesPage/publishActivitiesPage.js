Page({
    data: {
      activityName: '',
      location: '',
      date: '',
      description: '',
      peopleArray: ['1', '2', '3', '4', '5', '6'],
      peopleIndex: 0,
      typeArray: ['Entertainment', 'Educational', 'Sport', 'Cultural'],
      typeIndex: 0,
      durationArray: ['当天', '1-3天', '4-7天', '大于7天'],
      durationIndex: 0,
      imageUrl: '',
    },

    updatePeople: function(e) {
      this.setData({ peopleIndex: e.detail.value });
    },

    updateType: function(e) {
      this.setData({ typeIndex: e.detail.value });
    },

    updateDuration: function(e) {
      this.setData({ durationIndex: e.detail.value });
    },

    updateDate: function(e) {
      this.setData({ date: e.detail.value });
    },

    onInputActivityName: function(e) {
      this.setData({ activityName: e.detail.value });
    },

    onInputCity: function(e) {
      this.setData({ location: e.detail.value });
    },

    onInputDescription: function(e) {
      this.setData({ description: e.detail.value });
    },

    chooseImage: function() {
      var that = this;
      wx.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: function(res) {
          const imageUrl = res.tempFilePaths[0];
          that.setData({ imageUrl: imageUrl });
        }
      });
    },

    submitActivity: function() {
      if (!this.data.imageUrl) {
        wx.showToast({
          title: 'Please upload an image',
          icon: 'none',
          duration: 2000
        });
        return;
      }

      var activity = {
        name: this.data.activityName,
        city: this.data.location,
        date: this.data.date,
        description: this.data.description,
        numberOfPeople: this.data.peopleArray[this.data.peopleIndex],
        activityType: this.data.typeArray[this.data.typeIndex],
        duration: this.data.durationArray[this.data.durationIndex],
        imageUrl: this.data.imageUrl
      };

      wx.request({
        url: 'http://localhost:3000/activities', // Adjust URL to your server's address
        method: 'POST',
        data: activity,
        success: function(res) {
          if (res.statusCode === 200) {
            wx.showToast({
              title: 'Activity published successfully!',
              icon: 'success',
              duration: 2000
            });
            wx.navigateTo({
              url: '/pages/activitiesListPage/activitiesListPage?publishSuccess=true'
            });
          } else {
            wx.showToast({
              title: 'Failed to publish activity',
              icon: 'none',
              duration: 2000
            });
          }
        },
        fail: function(error) {
          wx.showToast({
            title: 'Failed to connect to server',
            icon: 'none',
            duration: 2000
          });
        }
      });
    },
});

  