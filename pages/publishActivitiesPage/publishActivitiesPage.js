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
     // Methods to update the picker selections
  updatePeople: function(e) {
    this.setData({
      peopleIndex: e.detail.value
    });
  },

  updateType: function(e) {
    this.setData({
      typeIndex: e.detail.value
    });
  },

  updateDuration: function(e) {
    this.setData({
      durationIndex: e.detail.value
    });
  },
  // Handler for the date picker
  updateDate: function(e) {
    this.setData({
      date: e.detail.value // e.detail.value is the selected date
    });
  },
  onInputActivityName: function(e) {
    this.setData({
        activityName: e.detail.value
    });
    console.log('Updated Activity Name:', this.data.activityName);
},

onInputCity: function(e) {
    this.setData({
        location: e.detail.value
    });
    console.log('Updated City:', this.data.location);
},

onInputDescription: function(e) {
    this.setData({
        description: e.detail.value
    });
    console.log('Updated Description:', this.data.description);
},
chooseImage: function() {
    var that = this;
    wx.chooseImage({
      count: 1, // number of images to select
      sizeType: ['compressed'], // can also include 'original'
      sourceType: ['album', 'camera'], // can be 'album', 'camera'
      success: function(res) {
        const imageUrl = res.tempFilePaths[0]; // Get the first image path
        that.setData({
          imageUrl: imageUrl
        });
        console.log('Image selected:', imageUrl);
      },
      fail: function() {
        wx.showToast({
          title: 'Image selection cancelled',
          icon: 'none',
          duration: 2000
        });
      }
    });
  },
    // Functions to update the state
submitActivity: function() {
    // Gather all activity details from the data
    if (!this.data.imageUrl) {
        wx.showToast({
          title: 'Please upload an image',
          icon: 'none',
          duration: 2000
        });
        return; // Stop the function if no image
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
    console.log('Activity before saving:', activity);
    // Save the activity to local storage
    var activities = wx.getStorageSync('activities') || [];
    activities.push(activity);
    wx.setStorageSync('activities', activities);
    console.log('All activities after adding new:', activities);
    // Navigate to the activities list page with a success message
    wx.navigateTo({
        url: '/pages/activitiesListPage/activitiesListPage?publishSuccess=true'
    });
    },
  });
  