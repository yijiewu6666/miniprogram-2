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
      showOptions: false // Control the visibility of the additional dropdowns
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
    const city = this.data.cityArray[this.data.cityIndex];
    const date = this.data.date;
    const numberOfPeople = this.data.peopleArray[this.data.peopleIndex];
    const activityType = this.data.typeArray[this.data.typeIndex];
    const durationType = this.data.durationArray[this.data.durationIndex];
  
    // Prepare the request payload
    const payload = {
      city, date, numberOfPeople, activityType, duration: durationType
    };
  
    // Send the search data to the backend
    wx.request({
      url: 'http://localhost:3000/search', // Replace with your deployed server URL in production
      method: 'POST',
      data: payload,
      success: (res) => {
        // Handle the response from the server
        console.log('Search results:', res.data);
        // Optionally navigate to the results page and pass the results via options or global data
        wx.navigateTo({
          url: `/pages/resultsPage/resultsPage?city=${encodeURIComponent(city)}&date=${encodeURIComponent(date)}&people=${encodeURIComponent(numberOfPeople)}&type=${encodeURIComponent(activityType)}&duration=${encodeURIComponent(durationType)}`,
          success: function() {
            // Set the results to global data or something similar if needed
          }
        });
      },
      fail: (error) => {
        console.error('Failed to fetch data:', error);
      }
    });
  },
  

  // Method to navigate to the trending activities page
    goToTrending: function() {
    wx.navigateTo({
      url: '/pages/trendingPage/trendingPage' // Adjust the URL as necessary
    });
  },
  goToActivitiesList: function() {
    wx.navigateTo({
      url: '/pages/activitiesListPage/activitiesListPage'
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
});

  