Page({
    data: {
      cityArray: ['New York', 'London', 'Paris', 'Tokyo'],
      cityIndex: 0,
      date: '2024-01-01', // Default starting date
      peopleArray: ['1', '2', '3', '4', '5', '6'],
      peopleIndex: 0,
      typeArray: ['Entertainment', 'Educational', 'Sport', 'Cultural'],
      typeIndex: 0,
      durationArray: ['当天', '1-3天', '4-7天', '大于7天'],
      durationIndex: 0,
      showOptions: false, // Control the visibility of the additional dropdowns,
      trendingContent: []  
    },
    toggleSearchOptions: function() {
        this.setData({
          showOptions: !this.data.showOptions // Toggle the visibility
        });
      },
    // Function to update the selected index for city
    updateCity: function(e) {
      this.setData({
        cityIndex: e.detail.value
      });
    },

    // Function to update the selected date
    updateDate: function(e) {
      this.setData({
        date: e.detail.value
      });
    },

    // Function to update the selected index for number of people
    updatePeople: function(e) {
      this.setData({
        peopleIndex: e.detail.value
      });
    },

    // Function to update the selected index for activity type
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
  
    // Function to handle the search submission
    submitSearch: function() {
        // Fetch values from arrays using selected indexes
        const city = this.data.cityArray[this.data.cityIndex];
        const date = this.data.date;
        const numberOfPeople = this.data.peopleArray[this.data.peopleIndex];
        const activityType = this.data.typeArray[this.data.typeIndex];
        const durationType = this.data.durationArray[this.data.durationIndex];
    
        // Navigate to the results page with query parameters
        wx.navigateTo({
          url: `/pages/resultsPage/resultsPage?city=${encodeURIComponent(city)}&date=${encodeURIComponent(date)}&people=${encodeURIComponent(numberOfPeople)}&type=${encodeURIComponent(activityType)}&duration=${encodeURIComponent(durationType)}`
        });
      },
  
      goToPublishActivities: function() {
        wx.navigateTo({
          url: '/pages/publishActivitiesPage/publishActivitiesPage' // Adjust the URL as necessary
        });
      },
  // Method to navigate to the trending activities page
    goToTrending: function() {
    wx.navigateTo({
      url: '/pages/trendingPage/trendingPage' // Adjust the URL as necessary
    });
  },
  goToActivitiesList: function() {
    const app = getApp();
    console.log('Sending data:', app.globalData.trendingData); // Debugging line
  
    wx.navigateTo({
      url: '/pages/trendingPage/trendingPage',
      success: function(res) {
        res.eventChannel.emit('acceptDataFromOpeningPage', { data: app.globalData.trendingData });
      }
    });
  },
  goToWatchActivities() {
    wx.navigateTo({
      url: '/pages/likeListPage/likeListPage' // Replace with the actual path to your watchlist page
    });
  },
  goToChat() {
    wx.navigateTo({
      url: '/pages/messagePage/messagePage' // Replace with the actual path to your watchlist page
    });
  },
  goToInfo() {
    wx.navigateTo({
      url: '/pages/userProfile/userProfile', // Replace with the actual path to your info page
    });
  },
  goToActivitiesList: function() {
    wx.navigateTo({
      url: '/pages/activitiesListPage/activitiesListPage'
    });
  },
  onLoad: function() {
        this.setData({
            trendingContent: [
                { id: 1, name: 'Concert', location: 'Central Park', date: '2024-05-15' },
                { id: 2, name: 'Art Exhibit', location: 'Modern Art Museum', date: '2024-05-20' }
            ]
        });
    },
    onLoad: function() {
        this.setData({
            trendingContent: [
                { id: 1, name: 'Concert', location: 'Central Park', date: '2024-05-15' },
                { id: 2, name: 'Art Exhibit', location: 'Modern Art Museum', date: '2024-05-20' }
            ]
        });
    },
});

  